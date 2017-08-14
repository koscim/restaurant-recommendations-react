import React, { Component } from 'react'

import Restaurant from '../components/Restaurant'
import Reviews from '../components/Reviews'
import ReviewForm from '../components/ReviewForm'
import RestaurantForm from '../components/RestaurantForm'
import restaurants from '../constants/restaurants'
import reviews from '../constants/reviews'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants,
      reviews,
      selectedId: restaurants[0].id
    }
    this.restaurantClick = this.restaurantClick.bind(this)
    this.trackReviewForm = this.trackReviewForm.bind(this)
    this.trackRestaurantForm = this.trackRestaurantForm.bind(this)
  }

  restaurantClick(event) {
    event.preventDefault()
    this.setState({selectedId: event.target.id})
  }

  selectedRestaurant() {
    return this.state.restaurants.find((restaurant) =>
      (restaurant.id === this.state.selectedId)
    )
  }

  trackReviewForm(submission) {
    this.setState({ reviews: this.state.reviews.concat(submission) })
  }

  trackRestaurantForm(submission) {
    this.setState({ restaurants: this.state.restaurants.concat(submission) })
  }

  render() {
    let restaurantComponents = this.state.restaurants.map((restaurant) => {
      return (
        <Restaurant key={restaurant.id}
          data={restaurant}
          isSelected={this.state.selectedId === restaurant.id}
          handleClick={this.restaurantClick}/>
      )
    })
    let relevantReviews = this.state.reviews.filter((review) => {
      return(this.state.selectedId === review.restaurant_id)}
    )

    return(
      <div>
        <div className="row">
          <div className="small-3 columns">
            <h1>Restaurant</h1>
            {restaurantComponents}
          </div>
          <div className="small-9 columns">
            <h2>Reviews for {this.selectedRestaurant().name}</h2>
            <Reviews data={relevantReviews} />
          </div>
        </div>
        <div>
          <ReviewForm trackReviewForm={this.trackReviewForm} restaurantId={this.state.selectedId}/>
        </div>
        <div>
          <RestaurantForm trackRestaurantForm={this.trackRestaurantForm}/>
        </div>
      </div>
    )
  }
}

export default App
