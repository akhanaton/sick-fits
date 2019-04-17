/* eslint-disable react/prop-types */
import GatedSignIn from '../components/GatedSignin';

const Order = ({ query: { id } }) => (
  <div>
    <GatedSignIn>
      <p>This is a single order: {id}</p>
    </GatedSignIn>
  </div>
);

export default Order;
