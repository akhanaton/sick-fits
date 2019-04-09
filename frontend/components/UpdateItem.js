/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';

import ErrorMessage from './ErrorMessage';
import { SINGLE_ITEM_QUERY } from '../queries/queries';
import { UPDATE_ITEM_MUTATION } from '../queries/mutations';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

class UpdateItem extends Component {
  state = {};

  handleChange = event => {
    const { name, type, value } = event.target;

    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  handleSubmit = updateItem => async event => {
    event.preventDefault();
    const { id } = this.props;
    const res = await updateItem({
      variables: {
        id,
        ...this.state,
      },
    });

    console.log('Updated.');

    /**
      Router.push({
        pathname: '/item',
        query: { id: res.data.updateItem.id },
      });
    */
  };

  render() {
    // const { title, description, price, id } = this.state;
    // eslint-disable-next-line react/prop-types
    const { id } = this.props;
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No data found for id: {id}</p>;
          const { title, description, price } = data.item;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={this.handleSubmit(updateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={title}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="Number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={price}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        required
                        defaultValue={description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? 'ing' : 'e'} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
