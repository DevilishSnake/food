const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      //defaultValue: "Default recipe title from DB",
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      defaultValue: "This is a Default resume of the database recipe",
      allowNull: false
    }, 
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    }, 
    steps: {
      type: DataTypes.STRING,
      defaultValue: "1- Default step number One and final"
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }, 
    
  }, { timestamps: false });
};
