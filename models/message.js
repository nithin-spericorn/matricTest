module.exports = function (sequelize, DataTypes) {
    const message = sequelize.define(
      'message',
      {
        message_id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false,
        }
      

    }
    )
    
   
  
    return message;
  }