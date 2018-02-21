import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

class AddSupersetSource extends Component {
  state = {
    id: 0,
    name: '',
    url: '',
    tags: [],
    isSubmit: false,
    options: [],
  }

  componentDidMount() {
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTagsAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleTagsChange = (e, { value }) => this.setState({ tags: value })

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/source/`, {
      name: this.state.name,
      url: this.state.url,
      tags: this.state.tags,
      type: this.props.type,
    })
      .then((res) => {
        this.setState({
          isSubmit: true,
          id: res.data.id,
        })
      })
      .catch(() => {
      })
  }

  render() {
    const { tags } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='name'>Name
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={this.state.name}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='field'>
            <label htmlFor='url'>URL
              <input
                type='url'
                name='url'
                placeholder='URL'
                value={this.state.url}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='field'>
            <label htmlFor='tags'>tags
              <Dropdown
                options={this.state.options}
                placeholder='Insert Tag'
                name='tags'
                search
                selection
                fluid
                multiple
                allowAdditions
                value={tags}
                onAddItem={this.handleTagsAddition}
                onChange={this.handleTagsChange}
              />
            </label>
          </div>
          <hr />
          <button className='ui primary button' type='submit'>Add</button>
        </form>
        {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
      </div>
    )
  }
}

AddSupersetSource.propTypes = {
  type: PropTypes.string.isRequired,
}

export default AddSupersetSource
