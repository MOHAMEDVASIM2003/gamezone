package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port         string
	MongoURI     string
	MongoDBName  string
	JWTSecret    string
	AppEnv       string
	FrontendURL  string
}

var AppConfig Config

func Load() {
	// Load .env file (only in development; in production use real env vars)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, reading environment variables directly")
	}

	AppConfig = Config{
		Port:        getEnv("PORT", "3001"),
		MongoURI:    getEnv("MONGO_URI", "mongodb://localhost:27017"),
		MongoDBName: getEnv("MONGO_DB_NAME", "gamevaultdb"),
		JWTSecret:   getEnv("JWT_SECRET", "fallback_secret_change_me"),
		AppEnv:      getEnv("APP_ENV", "development"),
		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:3000"),
	}

	log.Printf("Config loaded: PORT=%s, DB=%s, ENV=%s", AppConfig.Port, AppConfig.MongoDBName, AppConfig.AppEnv)
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
