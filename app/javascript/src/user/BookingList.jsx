//BookingList
import React from 'react';
import { handleErrors } from '@utils/fetchHelper';

class BookingList extends React.Component {
  state = {
    authenticated: false,
    bookings: [],
  }
  componentDidMount() {
    this.getBookings();
  };

  getBookings = () => {
    fetch('/api/user/bookings')
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({
          bookings: data.booking,
        })
      })
  };
 
  render () {
    const { bookings } = this.state;
    return (
      <div className=" ms-5">
        <div className="row">
          <h3>Your Bookings</h3>
        </div>
        <div className="row">
        {bookings.map(booking => {
              return (
               <p>{booking.id}</p>
              )
            })}
        </div>
      </div>
    )
  }
};

export default BookingList;

