import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';


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
    } = booking

    return (
      <Layout>
        <div className="text-center mt-3">
          <h3>We are processing your payment</h3>
          <p>You will receive an email shortly with confirmation. <br/>Here are the details of your upcoming trip:</p>
          <h3>{title}</h3>
          <p>From: {start_date} to {end_date}</p>
        </div>
      </Layout>
    )
  }
}


  export default BookingSuccessful