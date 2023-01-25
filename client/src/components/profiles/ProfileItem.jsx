import { Link } from 'react-router-dom';
import FollowersButtons from '../profile/FollowersButtons';

const ProfileItem = ({ profile }) => {
  const {
    user: { _id, name },
    photo,
    academic_degree,
    about,
  } = profile;

  return (
    <>
      <div className="profile bg-light">
        <img className="round-img my" src={photo.url} alt="..." />
        <div>
          <h2>{name}</h2>
          <h2>{_id}</h2>
          <p className="my">
            Academic degree :{' '}
            {academic_degree && <span>{academic_degree}</span>}
          </p>
          <p className="my-1">About : {about && <span>{about}</span>}</p>
        </div>
        <div>
          <Link to={`/profile/${_id}`} className="btn btn-primary my-1">
            View Profile
          </Link>{' '}
          <FollowersButtons profile={profile} />
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
