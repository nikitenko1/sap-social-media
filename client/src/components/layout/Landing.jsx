import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="light-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome To GlobalPal</h1>
        </div>
      </div>
    </section>
  );
};

export default Landing;
