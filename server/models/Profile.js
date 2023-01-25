const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  photo: {
    url: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    key: {
      type: String,
      default: '',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },

  language: {
    type: String,
    trim: true,
    default: '',
  },
  location: {
    type: String,
    trim: true,
    default: '',
  },
  gender: {
    type: String,
    trim: true,
    default: '',
  },

  findMe: {
    type: String,
    trim: true,
    default: 'y',
  },

  academic_degree: {
    type: String,
    trim: true,
    default: '',
  },

  academic_institution: {
    type: String,
    trim: true,
    default: '',
  },
  field_of_study: {
    type: [String],
    trim: true,
    default: '',
  },
  about: {
    type: String,
    trim: true,
    default: '',
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: '',
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: '',
    },
  ],

  followingGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
      default: '',
    },
  ],

  resetPasswordLink: {
    data: String,
    default: '',
  },
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
