'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'adminId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Admins',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'adminId');
  },
};
