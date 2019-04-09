/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Items from '../components/Items';

const Home = props => (
  <div>
    <Items page={parseInt(props.query.page) || 1} />
  </div>
);

export default Home;
