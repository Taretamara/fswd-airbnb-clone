import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import '../property/property.scss';

class BookingSuccessful extends React.Component {
  state = {
    booking: {},
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

  render() {
    const { booking } = this.state;

    const {
      id,
      start_date,
      end_date,
      title,
      image,
      description,
    } = booking

    return (
      <Layout>
        <div className="text-center mt-3 row">
          <h2>We are processing your payment</h2>
          <p>You will receive an email shortly with confirmation. <br/>Here are the details of your upcoming trip:</p>
          <div className="col-3 offset-3">
            <div className="property-image mb-3" style={{ backgroundImage: `url(${image})` }} />
          </div>
          <div className="col-4">
            <p>From: {start_date} to {end_date}</p>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
      </Layout>
    )
  }
}


  export default BookingSuccessful