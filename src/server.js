import express from "express";
import ProductManager from "./components/ProductManager.js";

const product = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/products", async (req, res) => {
    res.send(await product.getProducts());
});

app.get("/products/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await product.getProductsByID(id));
});

app.post("/products", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProduct(newProduct));
});

app.put("/products/:id", async (req, res) =>{
    let id = req.params.id;
    let updateProduct = req.body;
    res.send(await product.updateProduct(id, updateProduct));
});

app.delete("/products/:id", async (req, res) =>{
let id = req.params.id;
res.send(await product.deleteProduct(id));
});
















app.listen(PORT, () => {
    console.log(`Express por Local Host ${PORT}`);
});

