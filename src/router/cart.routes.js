import { Router } from "express";
import CartManager from "../components/CartManager.js";

const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req,res) =>{
    res.send(await carts.addCarts())
})

CartRouter.get("/", async (req,res) =>{
    res.send(await carts.readCarts())
})

CartRouter.get("/:id", async (req,res) =>{
    res.send(await carts.getCartByID(req.params.id))
})

CartRouter.post("/:cid/products/:pid", async (req,res) =>{
    let cartID = req.params.cid
    let productID = req.params.pid
    res.send(await carts.addProductInCart(cartID, productID))
})

export default CartRouter