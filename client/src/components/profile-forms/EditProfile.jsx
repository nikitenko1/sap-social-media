import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import resizeFile from '../../utils/imageResizer';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    photo: '',
    language: '',
    location: '',
    gender: '',
    findMe: 'y',
    academic_degree: '',
    academic_institution: '',
    field_of_study: '',
    about: '',
    following: '',
    followers: '',
    resetPasswordLink: '',
  });

  useEffect(() => {
    dispatch(getCurrentProfile(auth.token));

    setFormData({
      photo: loading || !profile.photo ? '' : profile.photo.url,
      language: loading || !profile.language ? '' : profile.language,
      location: loading || !profile.location ? '' : profile.location,
      gender: loading || !profile.gender ? '' : profile.gender,
      findMe: loading || !profile.findMe ? '' : profile.findMe,
      academic_degree:
        loading || !profile.academic_degree ? '' : profile.academic_degree,
      academic_institution:
        loading || !profile.academic_institution
          ? ''
          : profile.academic_institution,
      field_of_study:
        loading || !profile.field_of_study ? '' : profile.field_of_study,
      about: loading || !profile.about ? '' : profile.about,
    });
  }, [auth.token]);

  const {
    photo,
    language,
    location,
    gender,
    academic_degree,
    academic_institution,
    field_of_study,
    about,
    findMe,
  } = formData;

  const [imagePreview, setImagePreview] = useState(profile.photo.url);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangePhoto = async (e) => {
    try {
      const file = e.target.files[0];
      const photo = await resizeFile(file, 300, 300);
      setFormData({ ...formData, photo });
      setImagePreview(URL.createObjectURL(file));
    } catch (err) {
      dispatch(setAlert(err.response.data.msg));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('photo', photo);
    newFormData.append('language', language);
    newFormData.append('location', location);
    newFormData.append('gender', gender);
    newFormData.append('findMe', findMe);
    newFormData.append('academic_degree', academic_degree);
    newFormData.append('academic_institution', academic_institution);
    newFormData.append('field_of_study', field_of_study);
    newFormData.append('about', about);

    dispatch(createProfile(newFormData, navigate, true, auth.token));
  };

  return (
    <>
      <h1 className="custom">Edit Your Profile</h1>

      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => onSubmit(e)}
        encType="multipart/form-data"
      >
        <div className="my-3">
          <img
            src={imagePreview}
            alt=""
            style={{
              width: '220px',
              height: '220px',
              objectFit: 'cover',
              borderRadius: '50%',
              marginBottom: '1.5rem',
            }}
          />
          <input
            type="file"
            className="form-control"
            name="photo"
            filename="photo"
            onChange={onChangePhoto}
          />
        </div>
        <div className="form-group">
          <small className="form-text">looking for a pal?</small>
          <select name="findMe" value={findMe} onChange={(e) => onChange(e)}>
            <option value="y">Yes</option>
            <option value="n">No</option>
          </select>
        </div>
        <div className="form-group">
          <small className="form-text">Gender</small>
          <select name="gender" value={gender} onChange={(e) => onChange(e)}>
            <option value=""></option>
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>
        <div className="form-group">
          <small className="form-text">Language</small>
          <select
            name="language"
            value={language}
            onChange={(e) => onChange(e)}
          >
            <option value=""></option>
            <option value="German">German</option>
            <option value="English">English</option>
          </select>
        </div>
        <div className="form-group">
          <small className="form-text">Location</small>
          <input
            type="text"
            placeholder=""
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Academic Institution</small>
          <input
            type="text"
            placeholder=""
            name="academic_institution"
            value={academic_institution}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Academic degree</small>
          <input
            type="text"
            placeholder=""
            name="academic_degree"
            value={academic_degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Fields of Study</small>
          <input
            type="text"
            placeholder=""
            name="field_of_study"
            value={field_of_study}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg.,JavaScript,algorithms,Data
            Structure)
          </small>
        </div>
        <div className="form-group">
          <small className="form-text">
            Tell us about yourself , and What are you looking for in your study
            partner
          </small>
          <textarea
            placeholder=""
            name="about"
            value={about}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default EditProfile;
