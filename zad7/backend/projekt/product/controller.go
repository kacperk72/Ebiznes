package product

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// UnsetProductID represents a product ID value when it's unset or not found.
const UnsetProductID = 0

// Controller handles the routes related to products.
type Controller struct {
	db *gorm.DB
}

// NewController creates a new product controller with the given database.
func NewController(db *gorm.DB) *Controller {
	return &Controller{db}
}

// GetAll retrieves all the products.
func (c *Controller) GetAll(ctx echo.Context) error {
	var products []Product
	c.db.Find(&products)
	return ctx.JSON(http.StatusOK, products)
}

// GetByID retrieves a product with the given id.
func (c *Controller) GetByID(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))
	var product Product
	c.db.First(&product, id)

	if product.ID == UnsetProductID {
		return ctx.NoContent(http.StatusNotFound)
	}

	return ctx.JSON(http.StatusOK, product)
}

// Create creates a new product with the data from the request.
func (c *Controller) Create(ctx echo.Context) error {
	product := new(Product)
	if err := ctx.Bind(product); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	c.db.Create(&product)
	return ctx.JSON(http.StatusCreated, product)
}

// Update updates a product with given id.
func (c *Controller) Update(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))
	var product Product
	c.db.First(&product, id)

	if product.ID == UnsetProductID {
		return ctx.NoContent(http.StatusNotFound)
	}
	newProduct := new(Product)
	if err := ctx.Bind(newProduct); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	product.Name = newProduct.Name
	product.Price = newProduct.Price
	c.db.Save(&product)

	return ctx.JSON(http.StatusOK, product)
}

// Delete deletes a product with given id.
func (c *Controller) Delete(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))

	var product Product
	c.db.First(&product, id)

	if product.ID == UnsetProductID {
		return ctx.NoContent(http.StatusNotFound)
	}

	c.db.Delete(&product)

	return ctx.NoContent(http.StatusNoContent)
}

