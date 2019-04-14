import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGNIN_MUTATION } from '../queries/mutations';
import { CURRENT_USER_QUERY } from '../queries/queries';
import Form from './styles/Form';
import Error from './ErrorMessage';

export default class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await signin();
              this.setState({ name: '', email: '', password: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign into your account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={this.saveToState}
                />
              </label>
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
              <button type="submit">Sign In</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
