import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class MakotoContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
            this.inputs = abi[i].inputs;

            for (var i = 0; i < this.inputs.length; i++) {
                initialState[this.inputs[i].name] = '';
            }

            break;
        }
    }

    this.state = initialState;
  }

  handleSubmit() {
    let options = {
        gas:parseInt(300000),
        gasPrice:this.web3.utils.toWei('20','gwei')
    }

    if(this.props.options){
        options = Object.assign(options, this.props.options);
    }
    console.log('options', options)
    const stackId = this.contracts[this.props.contract].methods[this.props.method].cacheSend(this.state.name, options);
    // if (state.transactionStack[stackId]) {
    //     const txHash = state.transactionStack[stackId]
    //     return state.transactions[txHash].status
    // }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch(true) {
        case /^uint/.test(type):
            return 'number'
            break
        case /^string/.test(type) || /^bytes/.test(type):
            return 'text'
            break
        case /^bool/.test(type):
            return 'checkbox'
            break
        default:
            return 'text'
    }
  }

  render() {
    var buttonLabel = this.props.buttonLabel ? this.props.buttonLabel : 'Submit';
    var message;
    if(this.props.message){
      message = (<div>{this.props.message}</div>)
    }

    return (
      <form className="buy pure-form pure-form-stacked">
        {this.inputs.map((input, index) => {            
            var inputType = this.translateType(input.type)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            // check if input type is struct and if so loop out struct fields as well
            return (<input className="buy-input" key={input.name} type={inputType} name={input.name} value={this.state[input.name]} placeholder={inputLabel} onChange={this.handleInputChange} />)
        })}
        {message}
        <button key="submit" className="pure-button buy-cta" type="button" onClick={this.handleSubmit}>{buttonLabel}</button>
      </form>
    )
  }
}

MakotoContractForm.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(MakotoContractForm, mapStateToProps)