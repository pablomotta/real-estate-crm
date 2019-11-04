module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    });

    Users.associate = function(models) {
        Users.hasMany(models.Contacts, {
            onDelete: 'cascade'
        });
    };

    return Users;
};
