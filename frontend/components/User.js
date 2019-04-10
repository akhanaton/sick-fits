import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import propTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../queries/queries';

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: propTypes.func.isRequired,
};

export default User;
