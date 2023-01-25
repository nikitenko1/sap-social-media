import React from 'react';

const ProfileAbout = ({ profile }) => {
  const { field_of_study, about } = profile;
  return (
    <>
      <div className="profile-about bg-light p-2">
        <h2 className="custom">About Me: </h2>
        <p>{about}</p>
        <div className="line"></div>
        <h2 className="custom">Study Field</h2>
        <div className="skills">
          {field_of_study.map((field, index) => (
            <div key={index} className="p-1">
              {field}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileAbout;
