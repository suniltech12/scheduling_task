const { DataTypes } = require("sequelize");
const { sequelize } = require("../datasource");
const { User } = require("./User");
const { Admin } = require("./Admin");

const ScheduleTask = sequelize.define(
  "ScheduleTask",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    adminId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Admins",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Schedules_task",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

ScheduleTask.belongsTo(User, {
  foreignKey: "userId",
  as: "User",
});

ScheduleTask.belongsTo(Admin, {
  foreignKey: "adminId",
  as: "Admin",
});

module.exports = { ScheduleTask };
