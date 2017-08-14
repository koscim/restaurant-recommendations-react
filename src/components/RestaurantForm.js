import React, { Component } from 'react'
import TextField from '../components/TextField';
import Select from '../components/Select';

class RestaurantForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      name:'',
      address:'',
      city:'',
      state:'',
      zipcode:'',
      states:['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS'
      ,'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI'
      ,'WY'],
      stateSelected:'',
      categories: '',
      description: '',
      image: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.validateInputChange = this.validateInputChange.bind(this);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      name: '',
      address: '',
      city: '',
      zipcode: '',
      stateSelected: '',
      categories: '',
      description: '',
      image: ''
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let location = `${this.state.address}, ${this.state.city}, ${this.state.stateSelected}, ${this.state.zipcode}`
    let id = this.state.name.replace(' ', '-').toLowerCase() + `-${this.state.city.toLowerCase()}`
    let categories = this.state.categories.split(',')
    let formPayload = {
      id: id,
      name: this.state.name,
      location: location,
      description: this.state.description,
      categories: categories,
      image: this.state.image
    };
    this.props.trackRestaurantForm(formPayload);
    this.handleClearForm(event);
  }

  handleInputChange(event) {
    if(event.target.name === 'image'){
      this.validateInputChange(event.target.value)
    }
    this.setState({ [event.target.name]: event.target.value})
  }

  validateInputChange(value) {
    if ((value === '' || value === ' ') || !value.includes('http')) {
      let newError = { image: `Must provide valid url` }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.image
      this.setState({errors: errorState })
      return true
    }
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <form className="callout" onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <TextField
          content={this.state.name}
          label='Name'
          name='name'
          handlerFunction={this.handleInputChange}
        />
        <TextField
          content={this.state.address}
          label='Address'
          name='address'
          handlerFunction={this.handleInputChange}
        />
        <TextField
          content={this.state.city}
          label='City'
          name='city'
          handlerFunction={this.handleInputChange}
        />
        <Select
          handlerFunction={this.handleInputChange}
          name='stateSelected'
          label='State'
          options={this.state.states}
          selectedOption={this.state.stateSelected}
        />
        <TextField
          content={this.state.zipcode}
          label='Zip Code'
          name='zipcode'
          handlerFunction={this.handleInputChange}
        />
        <TextField
          content={this.state.description}
          label='Description'
          name='description'
          handlerFunction={this.handleInputChange}
        />
        <TextField
          content={this.state.categories}
          label='Categories'
          name='categories'
          handlerFunction={this.handleInputChange}
        />
        <TextField
          content={this.state.image}
          label='Image URL'
          name='image'
          handlerFunction={this.handleInputChange}
        />
        <div className="button-group">
          <button className="button" onClick={this.handleClearForm}>Clear</button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}
// your code, here

export default RestaurantForm
