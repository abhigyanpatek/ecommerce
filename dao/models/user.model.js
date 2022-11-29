const defineUser = (conn, DataTypes) => {
    const User = conn.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        emailId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "NORMAL_USER"
        }
    });
    return User;
}

module.exports = defineUser;