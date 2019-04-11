import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { REQUEST_RESET_MUTATION } from '../queries/mutations';
import Form from './styles/Form';
import Error from './ErrorMessage';

export default class RequestReset extends Component {
  state = {
    email: '',
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email } = this.state;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await reset();
              console.log(res);
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your password</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success, check your email.</p>
              )}
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
              <button type="submit">Request reset</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
