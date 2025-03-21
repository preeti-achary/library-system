module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author, { foreignKey: 'authorId' });
    Book.belongsToMany(models.Genre, { through: 'BookGenres' });
  };

  return Book;
};
