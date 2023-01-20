const defineCart = (conn, DataTypes) => {
    const Cart = conn.define('cart', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
    return Cart;
}

module.exports = defineCart;