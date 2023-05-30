package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"projekt/product"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))
	db, err := gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	err = db.AutoMigrate(&product.Product{})
	if err != nil {
		panic("failed to migrate database")
	}

	pc := product.NewController(db)

	const (
		productsRoute    = "/products"
		productIDRoute   = "/products/:id"
	)

	e.GET(productsRoute, pc.GetAll)
	e.POST(productsRoute, pc.Create)
	e.GET(productIDRoute, pc.GetByID)
	e.PUT(productIDRoute, pc.Update)
	e.DELETE(productIDRoute, pc.Delete)

	e.Start(":8080")
}
