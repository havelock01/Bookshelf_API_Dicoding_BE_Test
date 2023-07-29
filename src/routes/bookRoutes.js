const express = require('express');
const router = express.Router();
const {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
} = require('../controllers/bookController');

router.post('/', addBook);
router.get('/', getAllBooks);
router.get('/:bookId', getBookById);
router.put('/:bookId', updateBookById);
router.delete('/:bookId', deleteBookById);

module.exports = router;