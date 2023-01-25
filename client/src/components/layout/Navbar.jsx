import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Pal's</Link>
      </li>

      <li>
        <Link to="/search">Search</Link>
      </li>

      <li>
        <Link to="/adminGroups">Admin Groups</Link>
      </li>
      <li>
        <Link to="/groups">All Groups</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">My Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/videocall">Video</Link>
      </li>
      <li>
        <Link to="/messenger">InBox</Link>
      </li>
      <li>
        <Link onClick={handleLogout} to="/">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa fa-code"></i> GlobalPal
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

export default Navbar;
