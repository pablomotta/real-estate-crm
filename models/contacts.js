module.exports = function(sequelize, DataTypes) {
    var Contacts = sequelize.define('Contacts', {
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
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        purchaseZipCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        notes: {
            type: DataTypes.STRING
        },
        lastContacted: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Interested'
        }
    });

    Contacts.associate = function(models) {
        Contacts.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Contacts;
};
