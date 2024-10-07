const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Get all transactions
router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.render('index', { transactions });
});

// Add new transaction
router.get('/add', (req, res) => {
    res.render('addTransaction', { transaction: null }); 
});

router.post('/add', async (req, res) => {
    const { description, amount, category, date } = req.body;
    const transaction = new Transaction({ description, amount, category, date });
    await transaction.save();
    res.redirect('/');
});

// Edit transaction
router.get('/edit/:id', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.render('addTransaction', { transaction }); 
});

router.post('/edit/:id', async (req, res) => {
    const { description, amount, category, date } = req.body;
    await Transaction.findByIdAndUpdate(req.params.id, { description, amount, category, date });
    res.redirect('/');
});

// Delete transaction
router.get('/delete/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
