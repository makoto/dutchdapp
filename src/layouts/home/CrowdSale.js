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
      this.contracts.CrowdSale.methods.title.cacheCall()
      this.contracts.CrowdSale.methods.location.cacheCall()
      this.contracts.CrowdSale.methods.startPrice.cacheCall()
      this.contracts.CrowdSale.methods.getPrice.cacheCall()
      this.dataKeynumParticipants = this.contracts.CrowdSale.methods.numParticipants.cacheCall()
      this.contracts.CrowdSale.methods.targetPrice.cacheCall()
      this.contracts.CrowdSale.methods.cap.cacheCall()
      this.contracts.CrowdSale.methods.threshold.cacheCall()
    }
  }

  render() {
    let title, venue, numParticipants, startPrice, value, currentPrice, targetPrice, cap, threshold, delta;

    if(this.props.CrowdSale.title[this.dataKeyTitle]){
      title = this.props.CrowdSale.title[this.dataKeyTitle].value;
      venue = this.props.CrowdSale.location[this.dataKeyTitle].value;
      numParticipants = this.props.CrowdSale.numParticipants[this.dataKeyTitle].value;
      startPrice = this.web3.utils.fromWei(this.props.CrowdSale.startPrice[this.dataKeyTitle].value, 'ether');
      value = this.props.CrowdSale.getPrice[this.dataKeyTitle].value;
      currentPrice = this.web3.utils.fromWei(value, 'ether'); 
      targetPrice = this.web3.utils.fromWei(this.props.CrowdSale.targetPrice[this.dataKeyTitle].value, 'ether');
      cap = this.props.CrowdSale.cap[this.dataKeyTitle].value;
      threshold = this.props.CrowdSale.threshold[this.dataKeyTitle].value;
      delta = (parseInt(startPrice) - parseInt(targetPrice)) / (parseInt(cap) - parseInt(threshold));
    }
    console.log('title', title)
    let options = {
      value: value
    }
    return (
      <div>
        <div className="pure-u-1-1 header miami">
          <h1>
          <img className="avatar" src="https://avatars.io/twitter/pitbull"></img>
          {title} in {venue}
          </h1>
        </div>
        <main className="container">
        <div className="pure-g">

        <div className="pure-u-1-1">
          <div className="main pure-u-2-3">
            <h2>Ticket price info</h2>
            <p>
              Currently {numParticipants} committed to join the event at the price of ETH {parseInt(currentPrice) + delta}.
              <br/>
              If another {cap - numParticipants} people also commits, the ticke price goes down to ETH {targetPrice}.
            </p>
            <PriceChart
              data={[startPrice, targetPrice, currentPrice, numParticipants, threshold, cap]}
            />
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
                {this.props.CrowdSale.events.sort((a,b)=>{return b.blockNumber-a.blockNumber }).map((input, index) => {
                  console.log(input, index);
                  return (
                    <li className="participant">
                      {/* {input.blockNumber} */}
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
