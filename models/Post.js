const { Model, DataTypes } = require('sequelize');
const { User, Like } = require('.');
const sequelize = require('../config/connection');

class Post extends Model {
  // Static Functions
  // Like
  static like(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'blog_text',
          'user_id',
          [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'like_count'],
        ]
      });
    });
  }

  // Unlike 
  static unlike(body, models) {
    return models.Like.destroy({
      where: {
        user_id: body.user_id,
        post_id: body.post_id,
      }
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'blog_text',
          'user_id',
          [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'like_count'],
        ]
      });
    });
  }
  

  // Flag
  static flag(body, models) {
    return models.Flag.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'blog_text',
          'user_id',
          [sequelize.literal('(SELECT COUNT(*) FROM flag WHERE post.id = flag.post_id)'), 'flag_count'],
        ]
      });
    });
  }

  // Unflag 
  static unflag(body, models) {
    return models.Flag.destroy({
      where: {
        user_id: body.user_id,
        post_id: body.post_id,
      }
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'blog_text',
          'user_id',
          [sequelize.literal('(SELECT COUNT(*) FROM flag WHERE post.id = flag.post_id)'), 'flag_count'],
        ]
      });
    });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    blog_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'post'
  });

module.exports = Post