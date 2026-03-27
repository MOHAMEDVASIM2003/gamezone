package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Contact represents a support/contact form submission
type Contact struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"  json:"_id,omitempty"`
	UserId      string             `bson:"UserId"         json:"UserId"`
	FirstName   string             `bson:"FirstName"      json:"FirstName"`
	LastName    string             `bson:"LastName"       json:"LastName"`
	Email       string             `bson:"Email"          json:"Email"`
	PhoneNumber string             `bson:"PhoneNumber"    json:"PhoneNumber"`
	Address     string             `bson:"Address"        json:"Address"`
	YourFeedback string            `bson:"YourFeedback"   json:"YourFeedback"`
}

// ContactRequest is the expected POST /api/contact body (matches frontend exactly)
type ContactRequest struct {
	UserId      string `json:"UserId"       binding:"required"`
	FirstName   string `json:"FirstName"    binding:"required"`
	LastName    string `json:"LastName"     binding:"required"`
	Email       string `json:"Email"        binding:"required,email"`
	PhoneNumber string `json:"PhoneNumber"  binding:"required"`
	Address     string `json:"Address"      binding:"required"`
	YourFeedback string `json:"YourFeedback" binding:"required"`
}
