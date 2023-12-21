var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CategoryModel = require('../models/CategoryModel');

// Middleware to fetch categories (global)
router.use(async (req, res, next) => {
    try {
        const categorys = await CategoryModel.find({});
        res.locals.categorys = categorys;
        next();
    } catch (error) {
        next(error);
    }
});

// Route for rendering the index page
router.get('/', async (req, res) => {
    try {
        var toys = await ToyModel.find({}).populate('category');
        res.render('index', { title: 'My kingdom', categorys: res.locals.categorys, toys });
    } catch (error) {
        res.render('error', { message: 'Error retrieving data', error });
    }
});

module.exports = router;
