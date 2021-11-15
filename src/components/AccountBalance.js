import React, {Component} from "react";

//simple component to display the current balance of the account
class AccountBalance extends Component{
    render(){
        return(
            <div>
                Balance: {this.props.accountBalance}
            </div>
        );
    }
}

export default AccountBalance;