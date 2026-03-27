package handlers

import (
	"context"
	"net/http"
	"time"

	"gamesitebknd-main/config"
	"gamesitebknd-main/database"
	"gamesitebknd-main/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

// GetLogin handles GET /api/getlogin
//
// The frontend fetches all users and validates credentials client-side.
// We return users WITHOUT the password field to protect sensitive data.
// NOTE: For a more secure app, replace client-side validation with POST /api/login.
func GetLogin(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.UsersCollection)

	// Fetch all users but omit the password field
	findOpts := options.Find().SetProjection(bson.M{"Password": 0})
	cursor, err := col.Find(ctx, bson.M{}, findOpts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}
	defer cursor.Close(ctx)

	var users []models.PublicUser
	if err := cursor.All(ctx, &users); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode users"})
		return
	}

	if users == nil {
		users = []models.PublicUser{}
	}

	c.JSON(http.StatusOK, users)
}

// Signup handles POST /api/signup
// Registers a new user with a bcrypt-hashed password.
func Signup(c *gin.Context) {
	var req models.SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.UsersCollection)

	// Check if email already exists
	var existing models.User
	err := col.FindOne(ctx, bson.M{"Email": req.Email}).Decode(&existing)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
		return
	}
	if err != mongo.ErrNoDocuments {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user := models.User{
		ID:       primitive.NewObjectID(),
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	_, err = col.InsertOne(ctx, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "User registered successfully",
		"username": user.Username,
		"email":    user.Email,
	})
}

// Login handles POST /api/login
// Proper server-side credential check with bcrypt + JWT token response.
// Recommended replacement for the client-side GET /api/getlogin approach.
func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.UsersCollection)

	var user models.User
	err := col.FindOne(ctx, bson.M{"Email": req.Email}).Decode(&user)
	if err == mongo.ErrNoDocuments {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Compare bcrypt hash
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT (24-hour expiry)
	token, err := generateJWT(user.ID.Hex(), user.Email, user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, models.LoginResponse{
		Token:    token,
		Username: user.Username,
		Email:    user.Email,
		Message:  "Login successful",
	})
}

// generateJWT creates a signed JWT token for the given user
func generateJWT(userID, email, username string) (string, error) {
	claims := jwt.MapClaims{
		"sub":      userID,
		"email":    email,
		"username": username,
		"exp":      time.Now().Add(24 * time.Hour).Unix(),
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.AppConfig.JWTSecret))
}
