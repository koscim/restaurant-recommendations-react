import React, { Component } from 'react'
import TextField from '../components/TextField';
import Select from '../components/Select';

class ReviewForm extends Component{
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      restaurant_id: '',
      name: '',
      rating: '',
      content: '',
      ratings: ['1','2','3','4','5']
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.validateInputChange = this.validateInputChange.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.rating === '1'){
      this.state.rating = 20
    } else if (this.state.rating === '2'){
      this.state.rating = 40
    } else if (this.state.rating === '3'){
      this.state.rating = 60
    } else if (this.state.rating === '4'){
      this.state.rating = 80
    } else if (this.state.rating === '5'){
      this.state.rating = 100
    }
    let formPayload ={
      restaurant_id: this.props.restaurantId,
      name: this.state.name,
      rating: this.state.rating,
      content: this.state.content
    }
    this.props.trackReviewForm(formPayload);
    this.handleClearForm(event);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      restaurant_id: '',
      name: '',
      rating: '',
      content: ''
    })
  }

  handleInputChange(event) {
    this.validateInputChange(event.target.value, event.target.name)
    this.setState({ [event.target.name]: event.target.value})
  }

  validateInputChange(value, name) {
    let label = name.replace(/([A-Z])/g, ' $1').toUpperCase();
    if (value === '' || value === ' ') {
      let newError = { [name]: `${label} may not be blank.` }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState[[name]]
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
        <Select
          handlerFunction={this.handleInputChange}
          name='rating'
          label='Rating'
          options={this.state.ratings}
          selectedOption={this.state.rating}
        />
        <TextField
          content={this.state.content}
          label='Text Content'
          name='content'
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

export default ReviewForm
