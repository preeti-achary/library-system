const express = require('express');
const { sequelize, Author, Book, Genre } = require('./models');

const app = express();
app.use(express.json());

app.get('/books', async (req, res) => {
    const books = await Book.findAll({ include: [Author, Genre] });
    res.json(books);
});

app.get('/authors/:authorId/books', async (req, res) => {
    const { authorId } = req.params;
    const books = await Book.findAll({ where: { authorId }, include: [Author, Genre] });
    res.json(books);
});

app.get('/genres/:genreId/books', async (req, res) => {
    const { genreId } = req.params;
    const genre = await Genre.findByPk(genreId, { include: [Book] });

    if (!genre) return res.status(404).json({ message: 'Genre not found' });

    res.json(genre.Books);
});

app.post('/books', async (req, res) => {
    const { title, authorId, genreIds } = req.body;

    if (!title || !authorId || !genreIds || !Array.isArray(genreIds)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const author = await Author.findByPk(authorId);
    if (!author) return res.status(400).json({ message: 'Invalid author ID' });

    const book = await Book.create({ title, authorId });

    const genres = await Genre.findAll({ where: { id: genreIds } });
    await book.addGenres(genres);

    res.status(201).json(book);
});

const PORT = 3000;
app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server running on port ${PORT}`);
});
