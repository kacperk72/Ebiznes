package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.collection.mutable.ListBuffer

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  case class Product(id: Int, name: String, description: String, price: Double)
  implicit val productFormat = Json.format[Product]
  
  private var products = ListBuffer(
    Product(1, "Product 1", "Description of product 1", 10.0),
    Product(2, "Product 2", "Description of product 2", 20.0),
    Product(3, "Product 3", "Description of product 3", 30.0)
  )
  
  def showAllProducts() = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(products))
  }

  def showProductById(idStr: String) = Action { implicit request: Request[AnyContent] =>
    val id = idStr.toInt
    val product = products.find(_.id == id)
    product match {
      case Some(p) =>
        Ok(Json.toJson(p))
      case None =>
        NotFound("Product not found")
    }
  }
  
 def updateProductById(idStr: String, name: String, description: String, price: String) = Action { implicit request: Request[AnyContent] =>
    val idInt = idStr.toInt
    val json = request.body
    val priceInt = price.toInt
    val product = products.find(_.id == idInt)
    product match {
      case Some(p) =>
        products.update(idInt-1, Product(idInt, name, description, priceInt))
        Ok(Json.toJson(products))
      case None => NotFound("Product not found")
    }
  }
  
  def deleteProductById(idStr: String) = Action { implicit request =>
    val id = idStr.toInt
    val updatedProducts = products.filterNot(_.id == id)
    if (updatedProducts.length < products.length) {
      products = updatedProducts
      Ok(Json.toJson(products))
    } else {
      NotFound("Product not found")
    }
  }

  def addProduct(name: String, description: String, price: String) = Action { implicit request: Request[AnyContent] =>
    val priceInt = price.toInt
    val newProduct = Product(products.length + 1, name, description, priceInt)
    products = products :+ newProduct
    Ok(Json.toJson(products))
  }
}
