const { nanoid } = require('nanoid');
const books = require('../models/bookModel');

function addBook(req, res) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt: insertedAt,
    };

    books.push(newBook);

    res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });
}

function getAllBooks(req, res) {
    res.status(200).json({
        status: 'success',
        data: {
            books: books.map(({ id, name, publisher }) => ({ id, name, publisher })),
        },
    });
}

function getBookById(req, res) {
    const { bookId } = req.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            book,
        },
    });
}

function updateBookById(req, res) {
    const { bookId } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        updatedAt,
    };

    res.status(200).json({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
}

function deleteBookById(req, res) {
    const { bookId } = req.params;
    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
    }

    books.splice(bookIndex, 1);

    res.status(200).json({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
}

module.exports = { addBook, getAllBooks, getBookById, updateBookById, deleteBookById };