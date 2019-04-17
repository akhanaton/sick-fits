/* eslint-disable react/prop-types */
import GatedSignIn from '../components/GatedSignin';
import OrderList from '../components/OrderList';

const OrdersPage = () => (
  <div>
    <GatedSignIn>
      <OrderList />
    </GatedSignIn>
  </div>
);

export default OrdersPage;
