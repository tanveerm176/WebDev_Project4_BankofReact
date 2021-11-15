//home page, debits page, credits page, 

import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import axios from 'axios';


class App extends Component{
  constructor(){
    super();
    this.state={
      accountBalance: 14568.27,
      currentUser: {
        userName: "joe_shmo",
        memberSince: "07/23/96",
      },
      debitsData:[]
    }
  }

  makeAPIRequest = async()=>{
    const result = await axios.get('https://moj-api.herokuapp.com/debits')
    const debits = result.data

    console.log(debits)
    this.setState({debitsData: debits})
  }

  mockLogIn = (logInInfo)=>{
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  updateDebit = (newDebit)=>{
    const accBalance = parseFloat(this.state.accountBalance) + newDebit.amount
    const debits = this.state.debitsData
    debits.push(newDebit)
    

    this.setState({debitsData: debits})
    this.setState({accountBalance: accBalance})
  }

  componentDidMount(){
    this.makeAPIRequest()
  }

  render(){

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn}/>)
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>);
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} updateDebit={this.updateDebit} debitsArray={this.state.debitsData}/>)

    return(
      <Router>
        <div>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
  
}

export default App;