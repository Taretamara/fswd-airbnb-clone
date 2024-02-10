// propertylist
import React from 'react';
import AddPropertyWidget from './addPropertyWidget';

class PropertyList extends React.Component {
  state = {
    show_widget: false,
  }

  toggle = () => {
    this.setState(prevState => ({
      show_widget: !prevState.show_widget,
    }));
  }
  
  render () {
    const { show_widget } = this.state;
    return (
      <div className=" ms-5">
        <div className="row">
          <h3>Your Properties</h3>
        </div>
        <div className="row">
          {show_widget ? (
            <AddPropertyWidget toggle={this.toggle} />
          ) : (
            <div>
              <p>Do you want to add a <button type="button" className="btn btn-link text-decoration-none p-0 m-0" onClick={this.toggle}>property</button>?</p>
            </div>
          )}
        </div>
      </div>
    )
  }
};

export default PropertyList;
