/* eslint-disable react/prop-types */
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../queries/queries';
import Signin from './Signin';

const GatedSignin = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading</p>;
      if (!data.me)
        return (
          <div>
            <p>Please signin to continue</p>
            <Signin />
          </div>
        );
      return props.children;
    }}
  </Query>
);

export default GatedSignin;
