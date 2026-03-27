package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"gamesitebknd-main/config"
	"gamesitebknd-main/database"
	"gamesitebknd-main/handlers"
	"gamesitebknd-main/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Load configuration from .env
	config.Load()

	// 2. Connect to MongoDB
	database.Connect()
	defer database.Disconnect()

	// 3. Set Gin mode
	if config.AppConfig.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// 4. Create Gin router
	router := gin.Default()

	// 5. Apply CORS middleware (must be first)
	router.Use(middleware.CORS())

	// 6. Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "GameVault API",
			"time":    time.Now().Format(time.RFC3339),
		})
	})

	// 7. API routes under /api prefix
	api := router.Group("/api")
	{
		// --- Auth routes ---
		// GET  /api/getlogin       → Fetch all users (frontend uses this for client-side login)
		// POST /api/signup         → Register a new user
		// POST /api/login          → Secure server-side login with JWT (recommended)
		api.GET("/getlogin", handlers.GetLogin)
		api.POST("/signup", handlers.Signup)
		api.POST("/login", handlers.Login)

		// --- Contact/Feedback routes ---
		// POST   /api/contact          → Submit contact form
		// GET    /api/getContact       → List all contact submissions
		// DELETE /api/deleteContact/:id → Delete a contact by ID
		api.POST("/contact", handlers.CreateContact)
		api.GET("/getContact", handlers.GetContacts)
		api.DELETE("/deleteContact/:id", handlers.DeleteContact)

		// --- Cart / Purchase routes ---
		// POST /api/cart → Save a purchased game (called per-item on transaction confirm)
		// GET  /api/cart → View all purchased items
		api.POST("/cart", handlers.SaveCartItem)
		api.GET("/cart", handlers.GetCartItems)
	}

	// 8. Start server with graceful shutdown
	srv := &http.Server{
		Addr:    ":" + config.AppConfig.Port,
		Handler: router,
	}

	go func() {
		log.Printf("GameVault API running on http://localhost:%s", config.AppConfig.Port)
		log.Printf("Health check: http://localhost:%s/health", config.AppConfig.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
	log.Println("Server exited cleanly.")
}
