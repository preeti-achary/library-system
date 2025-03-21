const { sequelize, Author, Book, Genre } = require('./models');

async function seedDatabase() {
    await sequelize.sync({ force: true });

    const author1 = await Author.create({ name: 'J.K. Rowling' });
    const author2 = await Author.create({ name: 'George Orwell' });

    const genre1 = await Genre.create({ name: 'Fantasy' });
    const genre2 = await Genre.create({ name: 'Dystopian' });

    const book1 = await Book.create({ title: 'Harry Potter', authorId: author1.id });
    const book2 = await Book.create({ title: '1984', authorId: author2.id });

    await book1.addGenre(genre1);
    await book2.addGenre(genre2);

    console.log('Database seeded!');
}

seedDatabase();
