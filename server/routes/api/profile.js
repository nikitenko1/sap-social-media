const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Group = require('../../models/Group');
const { check, validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
//get a profile
router.get('/me', auth, async (req, res) => {
  try {
    //populate adds the field name from user to this query that we get from the profile model
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', '_id']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }
    //if there is a profile
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// create or update a profile
// router.post('/' , auth , upload.single('photo') , async(req,res) => {
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    language,
    location,
    gender,
    findMe,
    academic_degree,
    academic_institution,
    field_of_study,
    about,
    following,
    followers,
    resetPasswordLink,
  } = req.body;

  let profile = await Profile.findOne({ user: req.user.id });
  //builds profile objects
  const profileFields = {};
  profileFields.user = req.user.id;
  let newProfileImage;
  //
  if (req.body.photo) {
    try {
      if (profile && profile.photo.key) {
        await cloudinary.uploader.destroy(profile.photo.key);
      }
      const result = await cloudinary.uploader.upload(req.body.photo, {
        public_id: uuidv4(),
        folder: 'globalPal/profileImages',
      });
      newProfileImage = {
        url: result.url,
        key: result.public_id,
      };
      profile.photo = newProfileImage;
      await profile.save();
    } catch (err) {
      res.status(400).json({ msg: 'Could not upload image' });
    }
  } else {
    res.status(400).json({ msg: 'Profile photo has not changed' });
  }

  if (req.file) profileFields.photo = req.file.originalname;
  language
    ? (profileFields.language = language)
    : (profileFields.language = '');
  location
    ? (profileFields.location = location)
    : (profileFields.location = '');
  gender ? (profileFields.gender = gender) : (profileFields.gender = '');
  findMe ? (profileFields.findMe = findMe) : (profileFields.findMe = '');
  academic_degree
    ? (profileFields.academic_degree = academic_degree)
    : (profileFields.academic_degree = '');
  academic_institution
    ? (profileFields.academic_institution = academic_institution)
    : (profileFields.academic_institution = '');
  field_of_study
    ? (profileFields.field_of_study = field_of_study)
    : (profileFields.field_of_study = '');
  profileFields.field_of_study = profileFields.field_of_study.split(',');
  about ? (profileFields.about = about) : (profileFields.about = '');

  if (following)
    profileFields.following = following
      .split(',')
      .map((follow) => follow.trim());
  if (followers)
    profileFields.followers = followers
      .split(',')
      .map((follower) => follower.trim());

  if (resetPasswordLink) profileFields.resetPasswordLink = resetPasswordLink;

  try {
    //if there is a profile, it updates it
    if (profile) {
      //update the profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //if there isnt that profile already, we will create a new one
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// search for pal's
router.post('/search', auth, async (req, res) => {
  //checking in the subArray is  a sub array of the bigArray
  const subArray = (bigArray, subArray) => {
    for (let i = 0; i < subArray.length; i++) {
      if (!bigArray.includes(subArray[i])) return false;
    }
    return true;
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    language,
    location,
    gender,
    academic_degree,
    academic_institution,
    field_of_study,
  } = req.body;

  //builds profile objects
  const profileFields = {};
  language
    ? (profileFields.language = language)
    : (profileFields.language = '');

  location
    ? (profileFields.location = location)
    : (profileFields.location = '');

  gender ? (profileFields.gender = gender) : (profileFields.gender = '');

  academic_degree
    ? (profileFields.academic_degree = academic_degree)
    : (profileFields.academic_degree = '');

  academic_institution
    ? (profileFields.academic_institution = academic_institution)
    : (profileFields.academic_institution = '');

  field_of_study
    ? (profileFields.field_of_study = field_of_study)
    : (profileFields.field_of_study = '');
  profileFields.field_of_study = profileFields.field_of_study.split(',');

  //find pal
  try {
    const p = await Profile.find({ findMe: 'y' }).populate('user', ['name']);

    const profiles = p.filter(
      (x) =>
        (profileFields.language === '' ||
          x.language.toLowerCase() === profileFields.language.toLowerCase()) &&
        (profileFields.location === '' ||
          x.location.toLowerCase() === profileFields.location.toLowerCase()) &&
        (profileFields.gender === '' ||
          x.gender.toLowerCase() === profileFields.gender.toLowerCase()) &&
        (profileFields.academic_degree === '' ||
          x.academic_degree.toLowerCase() ===
            profileFields.academic_degree.toLowerCase()) &&
        (profileFields.academic_institution === '' ||
          x.academic_institution.toLowerCase() ===
            profileFields.academic_institution.toLowerCase()) &&
        (profileFields.field_of_study[0] === '' ||
          subArray(x.field_of_study, profileFields.field_of_study))
    );

    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//get all profiles , it is a public function
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find({ findMe: 'y' }).populate('user', [
      'name',
    ]);
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//get profile by user id, public function
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'photo']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//delete profile,user&posts&followers&following&groups, it is a private function
router.delete('/', auth, async (req, res) => {
  try {
    //remove user posts
    await Post.deleteMany({ user: req.user.id });

    //update the followers&following&groups
    const myProfile = await Profile.findOne({ user: req.user.id });

    for (let index = 0; index < myProfile.followers.length; index++) {
      const followerId = myProfile.followers[index];
      const FollowerProfile = await Profile.findOne({ user: followerId });
      FollowerProfile.following = FollowerProfile.following.filter(
        (f) => f.toString() !== req.user.id.toString()
      );
      await FollowerProfile.save();
      await myProfile.save();
    }
    for (let index = 0; index < myProfile.following.length; index++) {
      const followingId = myProfile.following[index];
      const FollowingProfile = await Profile.findOne({ user: followingId });
      FollowingProfile.followers = FollowingProfile.followers.filter(
        (f) => f.toString() !== req.user.id.toString()
      );
      await FollowingProfile.save();
      await myProfile.save();
    }
    for (let index = 0; index < myProfile.followingGroups.length; index++) {
      const groupId = myProfile.followingGroups[index];
      const group = await Group.findById(groupId);
      group.followers = group.followers.filter(
        (f) => f.toString() !== req.user.id.toString()
      );
      await group.save();
      await myProfile.save();
    }

    //delete the profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //delete user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'user deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put(
  '/about',
  auth,
  check('about', 'about is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { about } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.about = about;
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

//addFollower
router.put('/addFollower/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    profile.followers.unshift(req.user.id);
    await profile.save();
    const ownerProfile = await Profile.findOne({ user: req.user.id });
    ownerProfile.following.unshift(profile.user._id);
    await ownerProfile.save();
    return res.json(profile.followers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//removeFollower
router.put('/removeFollower/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    profile.followers = profile.followers.filter(
      (follower) => follower.toString() !== req.user.id
    );
    await profile.save();
    const ownerProfile = await Profile.findOne({ user: req.user.id });
    ownerProfile.following = await ownerProfile.following.filter(
      (f) => f.toString() !== profile.user._id.toString()
    );
    await ownerProfile.save();
    return res.json(profile.followers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//addFollowingGroup, id of the group
router.put('/addFollowingGroup/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById({ _id: req.params.id });
    console.log(req.params.id);
    group.followers.unshift(req.user.id);
    await group.save();
    const ownerProfile = await Profile.findOne({ user: req.user.id });
    ownerProfile.followingGroups.unshift(group._id);
    await ownerProfile.save();

    return res.json(group.followers);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
});

//removeFollowingGroup, id of the group
router.put('/removeFollowingGroup/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    group.followers = group.followers.filter(
      (follower) => follower.toString() !== req.user.id
    );
    await group.save();
    const ownerProfile = await Profile.findOne({ user: req.user.id });
    ownerProfile.followingGroups = await ownerProfile.followingGroups.filter(
      (f) => f.toString() !== group._id.toString()
    );
    await ownerProfile.save();
    return res.json(group.followers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
