import javax.inject._
import play.api.mvc._
import play.api.libs.json.Json
import scala.collection.mutable.ArrayBuffer

case class Product(id: Int, name: String, description: String, price: Double)

implicit val productWrites = new Writes[Product] {
  def writes(product: Product) = Json.obj(
    "id" -> product.id,
    "name" -> product.name,
    "description" -> product.description,
    "price" -> product.price
  )
}

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  
  var products = ArrayBuffer(
    Product(1, "Product 1", "Description of product 1", 10.0),
    Product(2, "Product 2", "Description of product 2", 20.0),
    Product(3, "Product 3", "Description of product 3", 30.0)
  )
  
  def showAllProducts() = Action { implicit request: Request[AnyContent] =>
    val productsJson = Json.toJson(products)(Writes.seq(productWrites))
    Ok(productsJson)
  }
  
  def showProductById(id: Int) = Action { implicit request: Request[AnyContent] =>
    val product = products.find(_.id == id)
    product match {
      case Some(p) =>
        val productJson = Json.toJson(p)
        Ok(productJson)
      case None =>
        NotFound("Product not found")
    }
  }
  
  def updateProductById(id: Int) = Action(parse.json) { implicit request =>
    val productJson = request.body
    val product = productJson.as[Product]
    products.indexWhere(_.id == id) match {
      case -1 =>
        NotFound("Product not found")
      case i =>
        products(i) = product.copy(id)
        Ok("Product updated")
    }
  }
  
  def deleteProductById(id: Int) = Action { implicit request =>
    products.indexWhere(_.id == id) match {
      case -1 =>
        NotFound("Product not found")
      case i =>
        products.remove(i)
        Ok("Product deleted")
    }
  }
  
  def addProduct() = Action(parse.json) { implicit request =>
    val productJson = request.body
    val product = productJson.as[Product]
    val newId = products.map(_.id).max + 1
    val newProduct = product.copy(id = newId)
    products += newProduct
    Ok("Product added")
  }
}
