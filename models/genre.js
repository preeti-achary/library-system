module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  });

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Book, { through: 'BookGenres' });
  };

  return Genre;
};
