import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import axios from 'axios';
import Router from 'next/router';

import ErrorMessage from './ErrorMessage';
import { CREATE_ITEM_MUTATION } from '../queries/mutations';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = event => {
    const { name, type, value } = event.target;

    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  uploadFile = async event => {
    console.log('Uploading file...');
    const { files } = event.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'sickfits');

    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/akhanaton/image/upload/',
      formData
    );

    this.setState({
      image: data.secure_url,
      largeImage: data.eager[0].secure_url,
    });
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
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload a file"
                  required
                  onChange={this.uploadFile}
                />
                {image && <img src={image} alt="Upload preview" />}
              </label>
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
