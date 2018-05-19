import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import MakotoContractForm from './MakotoContractForm'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import PriceChart from './PriceChart'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    CrowdSale: state.contracts.CrowdSale,
    drizzleStatus: state.drizzleStatus
  }
}

class CrowdSale extends Component {

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts
    this.web3 = context.drizzle.web3;
    if (this.props.drizzleStatus.initialized) {
      this.dataKeyTitle = this.contracts.CrowdSale.methods.title.cacheCall()
      this.contracts.CrowdSale.methods.startPrice.cacheCall()
      this.contracts.CrowdSale.methods.getPrice.cacheCall()
      this.dataKeynumParticipants = this.contracts.CrowdSale.methods.numParticipants.cacheCall()
        // Use the dataKey to display data from the store.
        console.log('keys', this.dataKeyTitle, this.dataKeynumParticipants);

        // return state.contracts.SimpleStorage.methods.storedData[dataKey].value
      console.log('CONStRUCTOR INITIALIZED')
    }else{
      console.log('CONStRUCTOR NOT INITIALIZED')
    }
  }

  render() {
    let title, numParticipants, startPrice, value;
    if(this.props.CrowdSale.title[this.dataKeynumParticipants]){
      numParticipants = this.props.CrowdSale.numParticipants[this.dataKeynumParticipants].value;
      startPrice = this.web3.utils.fromWei(this.props.CrowdSale.startPrice[this.dataKeynumParticipants].value, 'ether');
      value = this.props.CrowdSale.getPrice[this.dataKeynumParticipants].value;
      console.log('events1', this.props.SimpleStorage.events);
      console.log('events2', this.props.CrowdSale.events);
    }
    let options = {
      value: value
      // this.web3.utils.toWei('0.02','ether')
    }

    // console.log('this.contracts.SimpleStorage.methods.storedData', this.contracts.SimpleStorage.methods.storedData)
    // this.contracts.SimpleStorage.methods.storedData().call().then((r)=>{console.log('data', r)})
    // var storedData = this.contracts.SimpleStorage.methods.storedData().call().then((r)=>{console.log('data', r)})
    // var storedData = this.props.drizzleStatus.initialized ? this.contracts.SimpleStorage.methods.storedData.data() : 'Loading...'
    // var storedData = this.props.drizzleStatus.initialized ? this.contracts.SimpleStorage.methods.storedData.data() : 'Loading...'
    return (
      <div>
        <div className="pure-u-1-1 header miami">
          <h1>
          <img className="avatar" src="https://avatars.io/twitter/pitbull"></img>
          <ContractData contract="CrowdSale" method="title" />
          in 
          <ContractData contract="CrowdSale" method="location" />
          </h1>
        </div>
        <main className="container">
        <div className="pure-g">

        <div className="pure-u-1-1">
          <div className="main pure-u-2-3">
            <h2>Price info</h2>
            <PriceChart />
            <ul>
              <li>{numParticipants} participated</li>
              <li>ETH: {startPrice}</li>
              <li>target: <ContractData contract="CrowdSale" method="targetPrice" /></li>
              <li>current price: <ContractData contract="CrowdSale" method="getPrice" /></li>
              <li>participants: <ContractData contract="CrowdSale" method="numParticipants" /></li>
              <li>cap: <ContractData contract="CrowdSale" method="cap" /></li>
              <li>threshold: <ContractData contract="CrowdSale" method="threshold" /></li>
            </ul>
            <h2>
              Ticket purchase
            </h2>
            <p>
              You currently have <AccountData accountIndex="0" units="ether" precision="3" />
            </p>
          </div>
          <div className="side pure-u-1-3">            
            <h2>Action</h2>
            <MakotoContractForm className="buy"
                contract="CrowdSale" method="buy" buttonLabel="Buy Now" labels={['You Twitter name']}
                options ={options}
              />

            <h2>Activity</h2>
            <ul>
                {/* <li className="participant"><img className="avatar" src="https://avatars.io/twitter/chrisbrown"></img> <a href="http://twitter.com/@chrisbrown">@chrisbrown</a>bought ticket at ETH </li>
                <li className="participant"><img className="avatar" src="https://avatars.io/twitter/jlo"></img> <a href="http://twitter.com/@jlo">@jlo</a>bought ticket at ETH </li> */}
                {this.props.CrowdSale.events.map((input, index) => {
                  // input.returnValues._message
                  return (
                    <li className="participant">
                      {index}
                      <img className="avatar" src={`https://avatars.io/twitter/${input.returnValues.name}`}></img>
                      <a href={`https://twitter.com/${input.returnValues.name}`}>{input.returnValues.name}</a>
                       bought ticket at {this.web3.utils.fromWei(input.returnValues.deposit)} ETH
                    </li>
                  )
                })}      
            </ul>
          </div>
        </div>



        </div>
      </main>

      </div>
    )
  }
}

CrowdSale.contextTypes = {
  drizzle: PropTypes.object
}
export default drizzleConnect(CrowdSale, mapStateToProps);
