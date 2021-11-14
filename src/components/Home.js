import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

    
class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://image.shutterstock.com/image-vector/businessman-watering-dollar-plant-growth-260nw-1186508287.jpg" alt="bank"/>
          <h1>Bank of React</h1>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/userProfile">User Profile</Link>
            <br/>
            <Link to="/debits">Debits Page</Link>
            <br/>
            <Link to="/credits">Credits Page</Link>

          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;