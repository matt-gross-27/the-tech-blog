const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');
const Flag = require('./Flag');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

User.belongsToMany(Post, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'user_id'
});

User.belongsToMany(Post, {
  through: Flag,
  as: 'flagged_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Flag,
  as: 'flagged_posts',
  foreignKey: 'user_id'
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

Flag.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Flag.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

User.hasMany(Like, {
  foreignKey: 'user_id'
});

User.hasMany(Flag, {
  foreignKey: 'user_id'
});

Post.hasMany(Like, {
  foreignKey: 'post_id'
});

Post.hasMany(Flag, {
  foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Like, Flag }