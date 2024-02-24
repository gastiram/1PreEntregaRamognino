import {promises as fs, readFile} from 'fs'
import { nanoid } from "nanoid"

class ProductManager {
    constructor(){
        this.path = "./src/models/products.json";
    }

readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
}    

writeProduct = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
}

exist = async (id) => {
    let products = await this.readProducts();
    return products.find(prod => prod.id === id)
}

addProduct = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid()
    let allProduct = [...productsOld, product];
    await this.writeProduct(allProduct);
    return "Se agregó el producto";
};

getProducts = async () =>{
    return await this.readProducts();
};

getProductsByID = async (id) =>{
    let productByID = await this.exist(id)
    if(!productByID) return "Producto no encontrado"
    return productByID
};

updateProduct = async(id, product) =>{
    let productByID = await this.exist(id)
    if(!productByID) return "Producto no encontrado"
    await this.deleteProduct(id);
    let productsOld = await this.readProducts()
    let products = [{...product, id : id}, ...productsOld]
    await this.writeProduct(products)
    return "Producto actualizado"
}

deleteProduct = async (id) =>{
    let products = await this.readProducts();
    let productExist = products.some(prod => prod.id === id)
    if(productExist){
        let filterProducts = products.filter(prod => prod.id != id)
        await this.writeProduct(filterProducts)
        return "Producto eliminado"
    }else{
        return "Producto a eliminar no existe"
    }
    
    

        }
    }

export default ProductManager;






