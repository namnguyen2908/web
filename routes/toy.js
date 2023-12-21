var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CategoryModel = require('../models/CategoryModel');
// const NationalModel = require('../models/NationalModel');

// const ToyModel = require('../models/ToyModel');
// router.get('/', (req, res) => {
//    res.render('toy');
//  })
// URL : localhost:3001/student
router.get('/admin', async (req, res) => {
   // SQL : SELECT * FROM student
   var toys = await ToyModel.find({}).populate('category');
   res.render('toy/index', { toys });

})

// trang toy
// phân loại theo id
router.use(['/category/:id', '/toy/:id'], async (req, res, next) => {
   try {
       const categorys = await CategoryModel.find({});
       res.locals.categorys = categorys;
       next();
   } catch (error) {
       // Handle errors
       next(error);
   }
});

// Route for rendering the toy customer page
router.get('/toy/:id', async (req, res) => {
   var categoryId = req.params.id;
  
   try {
       // Retrieve toys for a specific category and populate the 'category' field
       var toys = await ToyModel.find({ category: categoryId }).populate('category');
       res.render('toy/customer', { toys, categorys: res.locals.categorys });
   } catch (error) {
       res.render('error', { message: 'Error retrieving toy data', error });
   }
});
// kết phân loại

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   // SELECT * FROM student WHERE id = 'id'
   var toy = await ToyModel.findById(id).populate('category');
   var categorys = await CategoryModel.find({});
   res.render('toy/detail', { toy, categorys });
})

router.get('/delete/:id', async (req, res) => {
   await ToyModel.findByIdAndDelete(req.params.id);
   // console.log('Delete toy succeed');
   res.redirect('/toy/admin');
})

router.get('/add', async (req, res) => {
   var categorys = await CategoryModel.find({});
   // var nationals = await NationalModel.find({});
   res.render('toy/add', { categorys});
})

router.post('/add', async (req, res) => {
   var toy = req.body;
   await ToyModel.create(toy);
   res.redirect('/toy/admin');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id).populate('category');
   var categorys = await CategoryModel.find({});
   res.render('toy/edit', { toy, categorys })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   
   try {

      console.log('Category ID:', req.body.category);
      console.log('Toy Data:', toy);
      await ToyModel.findByIdAndUpdate(id, toy);
      console.log('Update toy succeed !');
   } catch (err) {
      console.log('Update failed. Error: ' + err);
   }
   res.redirect('/toy/admin');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //relative search
   var toys = await ToyModel.find({ name: new RegExp(keyword, "i") }).populate('category');
   res.render('toy/index', { toys });
})

router.get('/', async (req, res) => {
   var toys = await ToyModel.find({}).populate('category');
   //Path: views/mobile/index.hbs
   res.render('toy/customer', { toys });
})
// router.get('/nameasc', async (req, res) => {
//    //1: ascending,  -1: descending
//    var toys = await ToyModel.find().sort({ name: 1 });
//    res.render('toy/index', { toys: toys });
// })

// router.get('/namedesc', async (req, res) => {
//    var toys = await ToyModel.find().sort({ name: -1 });
//    res.render('toy/index', { toys: toys });
// })

module.exports = router;