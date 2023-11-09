const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname,'../database/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath,'utf-8'));

const productosController = {
    //Index-Todos los productos
    home: (req, res) => {        
        res.render('index',{productos});
    },

    //Ruta Creat-Formulario
    getCreatePage: (req, res) => {
        res.render('create');
    },

    //Procesa formulario-crea nuevo producto
    createProduct: (req, res) => {
        const {producto, referencia, precio} = req.body;

        const newProduct = {
            id: productos[productos.length -1].id+1,
            producto,
            referencia,
            precio,
            imagen: req.file ? req.file.filename : "Default_imagen.png"
        };
        //Redirección Index + newProduct
        productos.push(newProduct);
        fs.writeFileSync(productosPath, JSON.stringify(productos, null, " "));  
        res.redirect("/");   
    },
    //-------------------------------------------------------------
// Update - Form to edit
edit: (req, res) => {
    let id = req.params.id 
    let editProduct = productos.find(producto => producto.id == id)
    res.render("edit", { editProduct })

},
// Update - Actualiza
update: (req, res) => {
    let idProducto = req.params.id 
    let productoAnt = productos.find(producto => producto.id == idProducto) 

    let productoEditado = {
        id: productoAnt.id,
        ...req.body,
        imagen: req.file ? req.file.filename : productoAnt.imagen
    }; 
    //El producto que se va a editar
   
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == productoEditado.id) {
            productos[i] = productoEditado;
            break;
        }
    }
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, ' '));
    res.redirect('/');
},
// Delete - Eliminar producto
destroy: (req, res) => {
    let id = req.params.id  
    let indexProducto = productos.findIndex(producto => producto.id == id);
    productos.splice(indexProducto,1); 
    
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, ' '));
    res.redirect('/');
}
}

module.exports = productosController;