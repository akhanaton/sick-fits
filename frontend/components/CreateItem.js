import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import ErrorMessage from './ErrorMessage';
import { CREATE_ITEM_MUTATION } from '../queries/mutations';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

class CreateItem extends Component {
  state = {
    title: 'Cool shoes',
    description: 'These will make you the coolest cat in town',
    image: 'shoes_small.jpg',
    largeImage: 'shoes_large.jpg',
    price: 20000,
  };

  handleChange = event => {
    const { name, type, value } = event.target;

    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  handleSubmit = createItem => async event => {
    event.preventDefault();
    const res = await createItem();

    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id },
    });
  };

  render() {
    const { title, description, image, largeImage, price } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={this.handleSubmit(createItem)}>
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
                  value={title}
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
                  value={price}
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
                  value={description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
