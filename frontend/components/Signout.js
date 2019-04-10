import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNOUT_MUTATION } from '../queries/mutations';
import { CURRENT_USER_QUERY } from '../queries/queries';

export default class Signout extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {signout => <button onClick={signout}>Sign Out</button>}
      </Mutation>
    );
  }
}
