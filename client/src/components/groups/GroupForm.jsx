import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newGroup } from '../../actions/group';

const GroupForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    about: '',
  });

  const { name, subject, about } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(newGroup({ name, subject, about }, token));
  };

  return (
    <>
      <h1 className="sapir">Create a Group</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="subject"
            name="subject"
            value={subject}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="about"
            name="about"
            value={about}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="CreateGroup" />
      </form>
    </>
  );
};

export default GroupForm;
