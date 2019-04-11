import CreateItem from '../components/CreateItem';
import GatedSignIn from '../components/GatedSignin';

const Sell = () => (
  <div>
    <GatedSignIn>
      <CreateItem />
    </GatedSignIn>
  </div>
);

export default Sell;
