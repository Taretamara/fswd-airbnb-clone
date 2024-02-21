import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import '../property/property.scss';

class BookingSuccessful extends React.Component {
  state = {
    bookings: [],
    booking: {
      start_date: '',
      end_date: '',
      title: '',
      description: '',
      price_per_night: '',
    }
  }

  componentDidMount() {
    const id = window.location.pathname.replace('/booking/', '');
    fetch('/api/booking/'+id)
      .then(handleErrors)
      .then(data => {
        console.log(data.booking),
        this.setState({
          booking: data.booking,
        })
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

  render() {
    const { booking } = this.state;

    const {
      id,
      start_date,
      end_date,
      title,
      image,
      description,
      price_per_night,
    } = booking

    const totalPrice = this.calculateTotal(booking);
    return (
      <Layout>
        <div className="mt-3 row">
          <div className="text-center mb-5">
            <h2>We are processing your payment</h2>
            <p>You will receive an email shortly with confirmation. <br/>Here are the details of your upcoming trip:</p>
          </div>
          <div className="col-3 offset-3">
            <div className="property-image mb-3" style={{ backgroundImage: `url(${image})` }} />
          </div>
          <div className="col-4">
            <p>From: {start_date} to {end_date}</p>
            <h4>{title}</h4>
            <p>{description}</p>
            <h6>Total: <small>${totalPrice.toLocaleString()}</small></h6>
          </div>
        </div>
      </Layout>
    )
  }
}


  export default BookingSuccessful