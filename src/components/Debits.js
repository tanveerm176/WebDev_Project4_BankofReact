import React, {Component} from "react"
import { Link } from "react-router-dom"
import AccountBalance from './AccountBalance';

class Debits extends Component{
    render(){
        return(
            <div>
                <Link to="/">Home</Link>
                <h1>Debits</h1>
                <label>Debit Description </label>
                <input type = "text"/>
                <br></br>
                <label>Debit Amount </label>
                <input type = "text"/>
                <br></br>
                <button>Add Debit</button>
                
                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        )
    }
}

export default Debits