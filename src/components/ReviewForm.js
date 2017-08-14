import React, { Component } from 'react'
import TextField from '../components/TextField';
import Select from '../components/Select';

class ReviewForm extends Component{
  constructor(props) {
    super(props)
    this.state = {
      restaurant_id: '',
      name: '',
      rating: '',
      content: '',
      ratings: ['1','2','3','4','5']
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
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
      restaurant_id: '',
      name: '',
      rating: '',
      content: ''
    })
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value})
  }

  render() {
    return(
      <form className="callout" onSubmit={this.handleFormSubmit}>
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
