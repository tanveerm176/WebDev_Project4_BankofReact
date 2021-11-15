import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits'
import axios from 'axios';


class App extends Component{
  constructor(){
    super();
    this.state={
      accountBalance:0,
      currentUser: {
        userName: "joe_shmo",
        memberSince: "07/23/96",
      },
      debitsData:[],
      creditsData:[]
    }
  }

  makeAPIRequest = async()=>{
    //make request to API for debits and save the data into debits var
    //sum all debits into debitCounter
    const resultDebits = await axios.get('https://moj-api.herokuapp.com/debits')
    const debits = resultDebits.data

    let debitCounter= 0
    debits.forEach(debit => {
      debitCounter += debit.amount
    });
    console.log(debitCounter)

    //make request to API for credits and save the data into credits var
    //sum all credits into creditCounter
    const resultCredits = await axios.get('https://moj-api.herokuapp.com/credits')
    const credits = resultCredits.data

    let creditCounter= 0
    credits.forEach(credit => {
      creditCounter += credit.amount
    });
    console.log(creditCounter)

    //relect current account balance based on current debits and credits
    const newBalance = debitCounter - creditCounter

    //assign debits, credits to an array
    //assign newBalance to this states balance
    this.setState({debitsData: debits, creditsData: credits, accountBalance: newBalance})
  }

  //function used to save a new user to the profile
  mockLogIn = (logInInfo)=>{
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  //function to update the accountBalance based on the addition of a new debit
  //and add the debit amount, description to the array of debits
  updateDebit = (newDebit)=>{
    const accBalance = parseFloat(this.state.accountBalance) + newDebit.amount
    const debits = this.state.debitsData
    debits.push(newDebit)

    this.setState({debitsData: debits})
    this.setState({accountBalance: accBalance})
  }

  //function to update the accountBalance based on the addition of a new credit
  //and add the credit amount, description to the array of credits
  updateCredit = (newCredit)=>{
    const accBalance = parseFloat(this.state.accountBalance) - newCredit.amount
    const credits = this.state.creditsData
    credits.push(newCredit)
    
    this.setState({creditsData: credits})
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
    const CreditsComponent = () =>(<Credits accountBalance={this.state.accountBalance} updateCredit={this.updateCredit} creditsArray={this.state.creditsData}/>)

    return(
      <Router>
        <div>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/debits" render={DebitsComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
        </div>
      </Router>
    );
  }
  
}

export default App;