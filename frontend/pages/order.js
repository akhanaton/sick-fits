/* eslint-disable react/prop-types */
import GatedSignIn from '../components/GatedSignin';
import Order from '../components/Order';

const OrderPage = ({ query: { id } }) => (
  <div>
    <GatedSignIn>
      <Order id={id} />
    </GatedSignIn>
  </div>
);

export default OrderPage;
