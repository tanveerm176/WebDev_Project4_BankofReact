import React, {Component} from "react";
import {Link} from "react-router-dom"
import AccountBalance from "./AccountBalance";

class Credits extends Component{
    constructor(){
        super()
        this.state={
            CreditObj:{
                amount:0,
                description:"",
                date:null
            }
        }
    }

    render(){
        return(
            <div>
            <Link to="/">Home</Link>
            <h1>Credits</h1>
            
            
            <label>Credit Description</label>
            <input type="text" name="description"/>
            <br></br>
            <label>Credit Amount</label>
            <input type="text" name="amount"/>
            <br></br>
            <button>Add Credit</button>

            <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
            
        )
    }
}

export default Credits