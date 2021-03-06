import React, { Component } from "react";
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  onDeletClick = (id, dispatch) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => dispatch({ type: 'DELETE_CONTACT', payload: id }))
    // this.props.deleteClickHandler();
  }
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {this.props.contact.name}
                <i
                  onClick={() => this.setState({
                    showContactInfo: !this.state.showContactInfo,
                  })}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer', marginLeft: 10 }}
                />

                <i className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeletClick.bind(this, this.props.contact.id, dispatch)}
                />

                <Link to={`contact/edit/${this.props.contact.id}`}>
                  <i className="fas fa-pencil-alt"
                    style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight:'1rem' }}
                  />
                </Link>

              </h4>
              {
                this.state.showContactInfo ?
                  <ul className="list-group">
                    <li className="list-group-item">{this.props.contact.email}</li>
                    <li className="list-group-item">{this.props.contact.phone}</li>
                  </ul>
                  :
                  null

              }
            </div>
          )
        }}
      </Consumer>
    );
  }
}

Contact.propType = {
  // deleteClickHandler: PropType.func.isRequired,
}

export default Contact;
