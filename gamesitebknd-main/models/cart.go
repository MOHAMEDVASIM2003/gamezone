package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// CartItem represents a purchased game saved to MongoDB
// Called from POST /api/cart on transaction confirmation
type CartItem struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Title     string             `bson:"title"         json:"title"`
	Price     float64            `bson:"price"         json:"price"`
	PurchasedAt time.Time        `bson:"purchasedAt"   json:"purchasedAt"`
}

// CartRequest is the expected POST /api/cart body (matches frontend exactly)
type CartRequest struct {
	Title string  `json:"title" binding:"required"`
	Price float64 `json:"price" binding:"required"`
}

// Order groups all cart items from a single checkout session
type Order struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Items       []CartItem         `bson:"items"         json:"items"`
	TotalAmount float64            `bson:"totalAmount"   json:"totalAmount"`
	CreatedAt   time.Time          `bson:"createdAt"     json:"createdAt"`
}
