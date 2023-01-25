import { Link } from 'react-router-dom';

const ProfileTop = ({ profile }) => {
  const {
    user: { name },
    photo,
    location,
    academic_degree,
    academic_institution,
    following,
    followers,
    followingGroups,
  } = profile;
  return (
    <>
      <div className="profile-top p-2">
        <img className="round-img my-1" src={photo.url} alt="avatar" />

        <h1 className="large">{name}</h1>
        <p className="lead">
          {academic_degree}, {academic_institution}, {location}
        </p>
        <div className="icons my-1">
          <Link to={`/myNotebook`}>{name}'s files</Link>
          <Link to={`/followers`}> followers {followers.length}</Link>
          <Link to={`/followings`}> following {following.length}</Link>
          <Link to={`/myGroups`}> my groups {followingGroups.length}</Link>
        </div>
      </div>
    </>
  );
};

export default ProfileTop;
