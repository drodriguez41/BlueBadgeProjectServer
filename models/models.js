// This model below is getting exported so Seqelize can create the table modeled below.  
module.exports = function (sequelize, DataTypes) {
    // The define method creates a new table called userTable. The second argument of the method is a object with the values that make up our table columns and their datatypes.  
    const User = sequelize.define('user', {
        id: DataTypes.INTEGER,
        firstName: DataTypes.TEXT,
        lastName: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
    });
};



module.exports = function (sequelize, DataTypes) {
    // The define method creates a new table called userTable. The second argument of the method is a object with the values that make up our table columns and their datatypes.  
    return sequelize.define('clothingTable', {
        id: DataTypes.INTEGER,
        category: DataTypes.TEXT,
        color: DataTypes.TEXT,
        description: DataTypes.TEXT,
        quantity: DataTypes.INTEGER,
        price: DataTypes.INTEGER
    });
};



module.exports = function (sequelize, DataTypes) {
    // The define method creates a new table called shoppingCartTable. The second argument of the method is a object with the values that make up our table columns and their datatypes.  
    return sequelize.define('shoppingCartTable', {
        id: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        clothingId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        
    });
};

