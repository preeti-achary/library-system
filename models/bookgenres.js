module.exports = (sequelize, DataTypes) => {
  const BookGenres = sequelize.define('BookGenres', {
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Genres',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  }, {
    timestamps: true,
    primaryKey: ['BookId', 'GenreId'],
  });

  return BookGenres;
};
