module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define(
      'user',
      {
        user_id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address:{
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull:false
        },
        isAdmin:{
          type:DataTypes.INTEGER,
          default:0
        }
      },
      
      {
        timestamps: true,
        underscored: true
      }
    )
  
   
  
    return user;
  }