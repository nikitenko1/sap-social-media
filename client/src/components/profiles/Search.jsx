import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfiles } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: '',
    language: '',
    location: '',
    academic_degree: '',
    academic_institution: '',
    field_of_study: '',
  });

  const {
    gender,
    language,
    location,
    academic_degree,
    academic_institution,
    field_of_study,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchProfiles(formData, navigate, token));
  };

  return (
    <>
      <h1 className="custom">Search a Pal</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
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
          <small className="form-text">Please use type: String</small>
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
          <small className="form-text">Please use type: String</small>
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
          <small className="form-text">Please use type: String</small>
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
            Please use comma separated values (eg.,JavaScript, algorithms, Data
            Structure)
          </small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default Search;
