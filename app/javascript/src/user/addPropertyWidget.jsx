import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class AddPropertyWidget extends React.Component {
  state = {
    authenticated: false,
    existingBookings: [],
    startDate: null,
    endDate: null,
    focusedInput: null,
    loading: false,
    error: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

    this.getPropertyBookings();
  }


  submitBooking = (e) => {
    if (e) { e.preventDefault(); }
    const { startDate, endDate } = this.state;
    console.log(startDate.format('MMM DD YYYY'), endDate.format('MMM DD YYYY'));
    fetch(`/api/bookings`, safeCredentials({
      method: 'POST',
        body: JSON.stringify({
          booking: {
            property_id: this.props.property_id,
            start_date: startDate.format('MMM DD YYYY'),
            end_date: endDate.format('MMM DD YYYY'),
          }
        })
    }))
      .then(handleErrors)
      .then(response => {
        return this.initiateStripeCheckout(response.booking.id)
      })
      .catch(error => {
        console.log(error);
      })
  }

render () {
  const { authenticated, startDate, endDate, focusedInput } = this.state;
  if (!authenticated) {
    return (
      <div className="border p-4 mb-4">
        Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make add a property.
      </div>
    );
  };


  return (
    <div className="border p-4 mb-4">
      <form onSubmit={this.submitProperty}>
       <input type="text" placeholder="property title"></input>
        <input type="text" placeholder="property description"></input>
        <hr />
        <h5>Property Location</h5>
        <input type="text" placeholder="city"></input>
        <input type="text" placeholder="country"></input>
        <hr />
        <label for="propertyType">Select Your Property Type</label>
        <select id="propertyType">
          <option value="studio"></option>
          <option value="room in hotel"></option>
          <option value="private room in apartment"></option>
          <option value="entire apartment"></option>
          <option value="endtire condiminium"></option>
          <option value="entire house"></option>
        </select>
        <label for="price">Price per night:</label><input type="number" id="price"></input>
        <label for="guests">Max number of guests:</label><input type="number" id="guests"></input>
        <label for="bedrooms">Number of bedrooms:</label><input type="number" id="bedrooms"></input>
        <label for="beds">Number of beds:</label><input type="number" id="beds"></input>
        <label for="baths">Number of bathrooms:</label><input type="number" id="baths"></input>
        //add picture upload here
        <button type="submit" className="btn btn-large btn-danger btn-block">Add</button>
      </form>
    </div>
  )
}
}
export default AddPropertyWidget;
