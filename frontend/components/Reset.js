import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { RESET_PASSWORD_MUTATION } from '../queries/mutations';
import { CURRENT_USER_QUERY } from '../queries/queries';
import Form from './styles/Form';
import Error from './ErrorMessage';

export default class RequestReset extends Component {
  state = {
    password: '',
    confirmPassword: '',
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password, confirmPassword } = this.state;
    const { resetToken } = this.props;
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          resetToken,
          password,
          confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState({ password: '', confirmPassword: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Enter your new password</h2>
              <Error error={error} />
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="confirmPassword"
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Request reset</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
