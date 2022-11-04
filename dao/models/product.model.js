const defineProduct = (conn, DataTypes) => {
    const Product = conn.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Product;
}

module.exports = defineProduct;