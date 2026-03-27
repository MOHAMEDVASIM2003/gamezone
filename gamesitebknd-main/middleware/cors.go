package middleware

import (
	"gamesitebknd-main/config"

	"github.com/gin-gonic/gin"
)

// CORS sets the necessary headers to allow the React frontend to call this API.
// The frontend runs on http://localhost:3000 and the backend on http://localhost:3001.
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")

		// Allow the configured frontend URL and localhost variants
		allowed := config.AppConfig.FrontendURL
		if origin == allowed || origin == "http://localhost:3000" || origin == "http://127.0.0.1:3000" {
			c.Header("Access-Control-Allow-Origin", origin)
		} else {
			// In development allow all origins; tighten this in production
			if config.AppConfig.AppEnv == "development" {
				c.Header("Access-Control-Allow-Origin", "*")
			}
		}

		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Max-Age", "86400")

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
