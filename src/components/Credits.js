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

    handleAmountChange = (e)=>{
        const addedAmount = parseFloat(e.target.value)
        const updatedObj = {...this.state.CreditObj}
        updatedObj.amount = addedAmount
        this.setState({CreditObj: updatedObj})
    }

    handleDescriptionChange = (e)=>{
        const newDescription = e.target.value
        const updatedObj = {...this.state.CreditObj}
        updatedObj.description = newDescription
        this.setState({CreditObj: updatedObj})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const dateObj = new Date()
        const updatedObj = {...this.state.CreditObj}
        updatedObj.date = dateObj.toString()
        this.setState({CreditObj: updatedObj}, ()=>this.props.updateCredit(this.state.CreditObj))
    }

    render(){
        return(
            <div>
            <Link to="/">Home</Link>
            <h1>Credits</h1>
            {this.props.creditsArray.map(credit =>
            <div>
                <h4>
                    {credit.description}
                </h4>
                <p>
                    amount: {credit.amount}
                </p>
                <p>
                    date: {credit.date}
                </p>
            </div>)}
            
            <form onSubmit = {this.handleSubmit}>


            <label>Credit Description</label>
            <input type="text" name="description" onChange={this.handleDescriptionChange} value={this.state.CreditObj.description}/>
            <br></br>
            <label>Credit Amount</label>
            <input type="number" name="amount" onChange = {this.handleAmountChange} value={this.state.CreditObj.amount}/>
            <br></br>
            <button>Add Credit</button>

            <AccountBalance accountBalance={this.props.accountBalance}/>
            </form>
            </div>
            
        )
    }
}

export default Credits