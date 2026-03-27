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

// CreateContact handles POST /api/contact
// Saves a new contact/feedback form submission to MongoDB.
func CreateContact(c *gin.Context) {
	var req models.ContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.ContactsCollection)

	contact := models.Contact{
		ID:           primitive.NewObjectID(),
		UserId:       req.UserId,
		FirstName:    req.FirstName,
		LastName:     req.LastName,
		Email:        req.Email,
		PhoneNumber:  req.PhoneNumber,
		Address:      req.Address,
		YourFeedback: req.YourFeedback,
	}

	_, err := col.InsertOne(ctx, contact)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save contact"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Contact form submitted successfully",
		"id":      contact.ID.Hex(),
	})
}

// GetContacts handles GET /api/getContact
// Returns all contact submissions. Protected: only authenticated users can access this.
// The frontend /contact page lists all submissions (admin view).
func GetContacts(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.ContactsCollection)

	cursor, err := col.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch contacts"})
		return
	}
	defer cursor.Close(ctx)

	var contacts []models.Contact
	if err := cursor.All(ctx, &contacts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode contacts"})
		return
	}

	if contacts == nil {
		contacts = []models.Contact{}
	}

	c.JSON(http.StatusOK, contacts)
}

// DeleteContact handles DELETE /api/deleteContact/:id
// Deletes a single contact submission by its MongoDB ObjectID.
func DeleteContact(c *gin.Context) {
	idParam := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contact ID"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	col := database.GetCollection(database.ContactsCollection)

	result, err := col.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete contact"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Contact deleted successfully"})
}
