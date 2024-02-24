import { Router } from "express";
import ProductManager from "../components/ProductManager.js";

const ProductRouter = Router();
const product = new ProductManager();


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