import UpdateItem from '../components/UpdateItem';

// eslint-disable-next-line react/prop-types
const Update = ({ query }) => (
  <div>
    <UpdateItem id={query.id} />
  </div>
);

export default Update;
