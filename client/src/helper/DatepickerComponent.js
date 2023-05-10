/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from 'react-bootstrap';

class DatepickerComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Form.Group controlId="doj">
              <Form.Control
                className="form-control"
                type="date"
                id={this.props.id}
                name={this.props.name}
                defaultValue={this.props.selectedValue}
                placeholder="Select date"
                onChange={(e) => this.props.onChange(e)}
              />
            </Form.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default DatepickerComponent;
