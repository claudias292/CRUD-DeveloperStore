const express = require ('express');
const app = express ();
const path = require ('path');
const bodyParser = require ('body-parser');
const productosRouter = require ('./routes/productosRouter');
const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.listen(5000, ()=>{
    console.log('SERVER corriendo en http://localhost:5000');
})

app.use('/',productosRouter);

