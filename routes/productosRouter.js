const router = require('express').Router();
const productosController = require('../controllers/productosController');
const uploadImage = require('../middlewares/uploadImage');

// GET = Conseguir o traer
// POST = Crear o agregar
// PUT = Modificar o editar
// DELETE = Eliminar

router.get('/',productosController.home);
router.get('/create', productosController.getCreatePage);
router.post('/create', uploadImage.single('image'), productosController.createProduct);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productosController.edit); 
router.put('/productos/edit/:id', uploadImage.single('imagen'), productosController.update);


/*** DELETE ONE PRODUCT***/ 
router.get('/productos/delete/:id', productosController.destroy);

module.exports = router;


