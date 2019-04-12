import Permissions from '../components/Permissions';
import GatedSignin from '../components/GatedSignin';

const permissionsPage = () => (
  <div>
    <GatedSignin>
      <Permissions />
    </GatedSignin>
  </div>
);

export default permissionsPage;
