/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import SingleItem from '../components/SingleItem';

const Item = props => (
  <div>
    <SingleItem id={props.query.id} />
  </div>
);

export default Item;
