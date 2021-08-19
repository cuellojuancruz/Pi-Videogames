const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fechadelanzamiento: {
      type: DataTypes.DATE
    },
    rating: {
      type: DataTypes.INTEGER
    },
    plataformas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    db: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
}

