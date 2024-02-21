//BookingList
import React from 'react';
import { handleErrors } from '@utils/fetchHelper';

class BookingList extends React.Component {
  state = {
    authenticated: false,
    bookings: [],
    booking: {
    start_date: '',
      end_date: '',
      title: '',
      description: '',
      price_per_night: '',
    },
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
          bookings: data.bookings,
        })
      })
  };

  calculateTotal = (booking) => {
    const { start_date, end_date, price_per_night } = booking;
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate number of days
    return numberOfDays * price_per_night;
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
          const totalPrice = this.calculateTotal(booking);
              return (
                <div key={booking.id} className="row mb-2">
                    <h3 className="mb-0">{booking.title}</h3>
                    <p className="mb-0">From: <small>{booking.start_date}  to {booking.end_date}</small></p>
                    <h6>Total: <small>${totalPrice.toLocaleString()}</small></h6>
                </div>
              );
            })}
        </div>
      </div>
    )
  }
};

export default BookingList;

