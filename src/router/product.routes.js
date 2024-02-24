import { Router } from "express";
import ProductManager from "../components/ProductManager.js";
import { read } from "fs";

const ProductRouter = Router();
const product = new ProductManager();
const readProducts = product.readProducts();

ProductRouter.get("/", async (req, res) => {

    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)

    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);

});


ProductRouter.get("/", async (req, res) => {
    res.send(await product.getProducts());
});

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await product.getProductsByID(id));
});

ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProduct(newProduct));
});

ProductRouter.put("/:id", async (req, res) =>{
    let id = req.params.id;
    let updateProduct = req.body;
    res.send(await product.updateProduct(id, updateProduct));
});

ProductRouter.delete("/:id", async (req, res) =>{
let id = req.params.id;
res.send(await product.deleteProduct(id));
});

export default ProductRouter