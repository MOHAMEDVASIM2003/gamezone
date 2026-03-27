package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// User represents a registered user stored in MongoDB
type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"  json:"_id,omitempty"`
	Username string             `bson:"Username"       json:"Username"`
	Email    string             `bson:"Email"          json:"Email"`
	Password string             `bson:"Password"       json:"Password"` // bcrypt hashed
}

// SignupRequest is the body expected from POST /api/signup
type SignupRequest struct {
	Username string `json:"Username" binding:"required"`
	Email    string `json:"Email"    binding:"required,email"`
	Password string `json:"Password" binding:"required,min=6"`
}

// LoginRequest is the body expected from POST /api/login (recommended)
type LoginRequest struct {
	Email    string `json:"Email"    binding:"required,email"`
	Password string `json:"Password" binding:"required"`
}

// LoginResponse is returned on successful login
type LoginResponse struct {
	Token    string `json:"token"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Message  string `json:"message"`
}

// PublicUser is the safe view of a user (no password exposed)
type PublicUser struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Username string             `bson:"Username"      json:"Username"`
	Email    string             `bson:"Email"         json:"Email"`
}
