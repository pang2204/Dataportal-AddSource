import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Dropdown, Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class AddDatabaseSource extends Component {
  state = {
    types: [
      { key: '0', text: 'int', value: 'int' },
      { key: '1', text: 'double', value: 'double' },
      { key: '2', text: 'float', value: 'float' },
      { key: '3', text: 'bigint', value: 'bigint' },
      { key: '4', text: 'string', value: 'string' },
      { key: '5', text: 'boolean', value: 'boolean' },
      { key: '6', text: 'timestamp', value: 'timestamp' },
      { key: '7', text: 'date', value: 'date' },
    ],
    name: '',
    description: '',
    tags: [],
    columns: [],
    columnID: 0,
    columnName: '',
    columnType: '',
    columnDescription: '',
    isSubmit: false,
    options: [],
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
      description: this.state.description,
      columns: this.state.columns,
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDropdownChange = (value) => {
    this.setState({ columnType: value })
  }

  handleAddColumn = () => {
    this.setState({
      columns: [...this.state.columns,
        [this.state.columnName, this.state.columnType, this.state.columnDescription],
      ],
    })
    this.setState({
      columnName: '',
      columnDescription: '',
    })
  }

  handleDeleteColumn = (itemDel) => {
    this.setState({ columns: this.state.columns.filter(item => item !== itemDel) })
  }

  listColumns = () => (
    this.state.columns.map((item, id) => (
      <div className='three fields' key={item}>
        <div className='field disabled'>
          <input
            type='text'
            name='columnName'
            value={item[0]}
          />
        </div>
        <div className='field disabled'>
          <input
            type='text'
            name='columnType'
            value={item[1]}
          />
        </div>
        <div className='field disabled'>
          <textarea type='text' name='columnDescription' rows='1' value={item[2]} />
        </div>
        <Button.Group size='large'>
          <div className='ui primary icon button' role='presentation' onClick={() => this.handleShow(item, id)}>
            <i className='edit icon' />
          </div>
          <div className='ui red icon button' role='presentation' onClick={() => this.handleDeleteColumn(item)}>
            <i className='remove icon' />
          </div>
        </Button.Group>
      </div>
    ))
  )

  handleModal = () => (
    <Modal dimmer='blurring' open={this.state.isOpen} onClose={this.handleClose} closeIcon>
      <Modal.Header>Edit Column</Modal.Header>
      <Modal.Content>
        <form className='ui form'>
          <div className='three fields'>
            <div className='field'>
              <input
                placeholder='Column Name'
                type='text'
                name='columnName'
                value={this.state.columnName}
                onChange={this.handleChange}
              />
            </div>
            <div className='field'>
              <Dropdown
                selection
                placeholder='Column Type'
                name='columnType'
                defaultValue={this.state.columnType}
                options={this.state.types}
                onChange={(e, { value }) => {
                    this.handleDropdownChange(value)
                  }}
              />
            </div>
            <div className='field'>
              <textarea
                placeholder='Column Description'
                type='text'
                name='columnDescription'
                rows='1'
                value={this.state.columnDescription}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <button className='ui primary button' onClick={this.updateColumn} >Save</button>
      </Modal.Actions>
    </Modal>
  )

  handleShow = (itemEdit, id) => {
    this.setState({
      isOpen: true,
      columnID: id,
      columnName: itemEdit[0],
      columnType: itemEdit[1],
      columnDescription: itemEdit[2],
    })
  }

  handleClose = () => this.setState({ isOpen: false, columnName: '', columnDescription: '' })

  updateColumn = () => {
    const newColumns = this.state.columns
    newColumns.splice(this.state.columnID, 1, [
      this.state.columnName,
      this.state.columnType,
      this.state.columnDescription])
    this.setState({
      columns: newColumns,
      isOpen: false,
      columnName: '',
      columnDescription: '',
    })
  }

  render() {
    const { tags } = this.state
    return (
      <div>
        {this.handleModal()}
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='name'>Table Name
              <input
                type='text'
                name='name'
                placeholder='Table Name'
                value={this.state.name}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='field'>
            <label htmlFor='name'>Table Description
              <textarea
                type='text'
                name='description'
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='field'>
            <label htmlFor='name'>Tag
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
          <div className='field'>
            { this.listColumns().length !== 0 && <h4 className='ui horizontal divider header'>Columns</h4>}
            { this.listColumns()}
            <h4 className='ui horizontal divider header'>Add Columns</h4>
            <div className='three fields'>
              <div className='field'>
                <input
                  placeholder='Column Name'
                  type='text'
                  name='columnName'
                  value={this.state.columnName}
                  onChange={this.handleChange}
                />
              </div>
              <div className='field'>
                <Dropdown
                  selection
                  name='columnType'
                  options={this.state.types}
                  onChange={(e, { value }) => {
                    this.handleDropdownChange(value)
                  }}
                />
              </div>
              <div className='field'>
                <textarea
                  placeholder='Column Description'
                  type='text'
                  name='columnDescription'
                  rows='1'
                  value={this.state.columnDescription}
                  onChange={this.handleChange}
                />
              </div>
              <div className='ui primary icon button' role='presentation' onClick={this.handleAddColumn} >
                <i className='add icon' />
              </div>
            </div>
          </div>
          <hr />
          <button className='ui primary button' type='submit'>Save Table</button>
        </form>
        {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
      </div>
    )
  }
}

AddDatabaseSource.propTypes = {
  type: PropTypes.string.isRequired,
}

export default AddDatabaseSource
