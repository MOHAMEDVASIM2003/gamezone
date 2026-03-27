package handlers

import (
	"context"
	"net/http"
	"time"

	"gamesitebknd-main/database"
	"gamesitebknd-main/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// SaveCartItem handles POST /api/cart
// Called once per game during transaction confirmation on the frontend.
// Persists each purchased game to the cart collection in MongoDB.
func SaveCartItem(c *gin.Context) {
	var req models.CartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.CartCollection)

	item := models.CartItem{
		ID:          primitive.NewObjectID(),
		Title:       req.Title,
		Price:       req.Price,
		PurchasedAt: time.Now(),
	}

	_, err := col.InsertOne(ctx, item)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save cart item"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Purchase saved successfully",
		"item": gin.H{
			"id":    item.ID.Hex(),
			"title": item.Title,
			"price": item.Price,
		},
	})
}

// GetCartItems handles GET /api/cart
// Returns all purchased items stored in the cart collection.
func GetCartItems(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.CartCollection)

	cursor, err := col.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cart items"})
		return
	}
	defer cursor.Close(ctx)

	var items []models.CartItem
	if err := cursor.All(ctx, &items); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode cart items"})
		return
	}

	if items == nil {
		items = []models.CartItem{}
	}

	c.JSON(http.StatusOK, items)
}
