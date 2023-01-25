import ukr from '../../img/ukr.png';
import nova from '../../img/nova.png';

const About = () => {
  return (
    <div>
      <div>
        <img src={ukr} alt="ukr" className="img" />
        <img src={nova} alt="nova" className="img" />
      </div>
      <h3>Welcome to GlobalPal</h3>
      <br></br>
      <p>
        Send and receive parcels from all over the world in Ukraine and the
        other way round, order delivery of postal items even to the most remote
        parts of Ukraine.
      </p>
      <br></br>
      <h3>
        Our mission: International shipping rates for delivery of letters, small
        packages, parcels from Ukraine to 230 countries and territories around
        the world.
      </h3>
      <br></br>
      <p>
        GlobalPal is a social networking platform, Which specializes in finding
        suitable partners for online learning, and in addition provides a
        tailored and convenient work environment for online learning between
        partners and learning groups.
      </p>
    </div>
  );
};

export default About;
