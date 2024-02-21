//BookingList
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

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
      is_paid: false,
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

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          `result.error.message`
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

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
                    <h6>Total: <small>${totalPrice.toLocaleString()} {booking.is_paid ? 'Paid' : <button className="btn btn-sm btn-danger" onClick={(event) => {event.preventDefault(); this.initiateStripeCheckout(booking.id);}}>Pay Now</button>}</small> </h6>
                </div>
              );
            })}
        </div>
      </div>
    )
  }
};

export default BookingList;

