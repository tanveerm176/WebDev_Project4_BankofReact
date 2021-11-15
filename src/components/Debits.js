import React, {Component} from "react"
import { Link } from "react-router-dom"
import AccountBalance from './AccountBalance';

class Debits extends Component{
    constructor(){
        super()
        this.state = {
            DebitObj : {
                amount: 0,
                description: "",
                date: null
            }

        }
    }

    handleAmountChange = (e)=>{
        const addedAmount = parseFloat(e.target.value)
        const updatedObj = {...this.state.DebitObj}
        updatedObj.amount = addedAmount 
        this.setState({DebitObj: updatedObj})
    }

    handleDescriptionChange = (e)=>{
        const newDescription = e.target.value
        const updatedObj = {...this.state.DebitObj}
        updatedObj.description = newDescription
        this.setState({DebitObj: updatedObj})

    }

    handleSubmit = (e) =>{
        e.preventDefault()

        const dateObj = new Date()
        const updatedObj = {...this.state.DebitObj}
        updatedObj.date = dateObj.toString()
        this.setState({DebitObj: updatedObj}, ()=>this.props.updateDebit(this.state.DebitObj))
        
    }

    render(){
        return(
            <div>
                <Link to="/">Home</Link>
                <h1>Debits</h1>
                {this.props.debitsArray.map(debit => 
                <div>
                    <h4>
                        {debit.description}
                    </h4>
                    <p>
                        amount: {debit.amount}
                    </p>
                    <p>
                        date: {debit.date}
                    </p>
                
                </div>)}
                
                <form onSubmit = {this.handleSubmit}>
                
                
                <label>Debit Description </label>
                <input type = "text" name="description" onChange={this.handleDescriptionChange} value={this.state.DebitObj.description}/>
                <br></br>
                <label>Debit Amount </label>
                <input type = "number" name="amount" onChange={this.handleAmountChange} value={this.state.DebitObj.amount}/>
                <br></br>
                <button>Add Debit</button>
                
                <AccountBalance accountBalance={this.props.accountBalance}/>
                </form>
            </div>
            
        )
    }
}

export default Debits