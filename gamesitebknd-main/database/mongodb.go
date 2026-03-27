package database

import (
	"context"
	"log"
	"time"

	"gamesitebknd-main/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var DB *mongo.Database

// Collection names
const (
	UsersCollection    = "users"
	ContactsCollection = "contacts"
	CartCollection     = "cart"
	OrdersCollection   = "orders"
)

func Connect() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(config.AppConfig.MongoURI)

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Ping to verify connection
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	Client = client
	DB = client.Database(config.AppConfig.MongoDBName)

	log.Printf("Connected to MongoDB: %s / %s", config.AppConfig.MongoURI, config.AppConfig.MongoDBName)
}

func GetCollection(name string) *mongo.Collection {
	return DB.Collection(name)
}

func Disconnect() {
	if Client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := Client.Disconnect(ctx); err != nil {
			log.Printf("Error disconnecting MongoDB: %v", err)
		} else {
			log.Println("MongoDB disconnected.")
		}
	}
}
