// package controllers

// import javax.inject._
// import play.api.mvc._
// import models.{Product, CartItem}

// @Singleton
// class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
//   // Metoda wyświetlająca zawartość koszyka
//   def showCart = Action { implicit request: Request[AnyContent] =>
//     Ok(views.html.index())
//   }

//   // Metoda dodająca produkt do koszyka
//   def addProductToCart(productId: Long) = Action { implicit request: Request[AnyContent] =>
//     val productToAdd = Product(productId, "Nazwa produktu", "Opis produktu", 123.45, Category(1, "Kategoria"))
//     cart = cart :+ productToAdd
//     Redirect(routes.CartController.showCart())
//   }

//   // Metoda usuwająca produkt z koszyka
//   def removeProductFromCart(productId: Long) = Action { implicit request: Request[AnyContent] =>
//     cart.find(_.id == productId) match {
//       case Some(product) => 
//         cart = cart.filterNot(_.id == productId)
//         Redirect(routes.CartController.showCart())
//       case None => NotFound
//     }
//   }

//   // Metoda usuwająca wszystkie produkty z koszyka
//   def clearCart = Action { implicit request: Request[AnyContent] =>
//     cart = List()
//     Redirect(routes.CartController.showCart())
//   }
// }