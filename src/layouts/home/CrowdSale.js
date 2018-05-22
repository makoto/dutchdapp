import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import MakotoContractForm from './MakotoContractForm'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import PriceChart from './PriceChart'
import Tweet from './Tweet'
import Ticket from './Ticket'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
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
      this.key_title = this.contracts.CrowdSale.methods.title.cacheCall()
      this.key_ownerName = this.contracts.CrowdSale.methods.ownerName.cacheCall()
      this.key_location = this.contracts.CrowdSale.methods.location.cacheCall()
      this.key_startPrice = this.contracts.CrowdSale.methods.startPrice.cacheCall()
      this.key_getPrice = this.contracts.CrowdSale.methods.getPrice.cacheCall()
      this.key_numParticipants = this.contracts.CrowdSale.methods.numParticipants.cacheCall()
      this.key_targetPrice = this.contracts.CrowdSale.methods.targetPrice.cacheCall()
      this.key_cap = this.contracts.CrowdSale.methods.cap.cacheCall()
      this.key_threshold = this.contracts.CrowdSale.methods.threshold.cacheCall()
      this.key_getParticipantStatus = this.contracts.CrowdSale.methods.getParticipantStatus.cacheCall(this.props.accounts[0])
    }
  }

  setKey(keyname){
    if(this.props.CrowdSale[keyname][this[`key_${keyname}`]]){
      return  this.props.CrowdSale[keyname][this[`key_${keyname}`]].value;
    }else{
      return '';
    }
  }

  render() {
    let owner_name, title, venue, numParticipants, startPrice, value, currentPrice, targetPrice, cap, threshold, delta, message, participantStatus;
    participantStatus = 0;
    title = this.setKey('title');
    venue = this.setKey('location');
    numParticipants = this.setKey('numParticipants');
    startPrice = this.web3.utils.fromWei(this.setKey('startPrice'), 'ether');
    targetPrice = this.web3.utils.fromWei(this.setKey('targetPrice'), 'ether');
    value = this.setKey('getPrice');
    owner_name = this.setKey('ownerName');
    currentPrice = this.web3.utils.fromWei(value, 'ether');
    cap = this.setKey('cap');
    threshold = this.setKey('threshold');
    title = this.setKey('title');
    participantStatus = parseInt(this.setKey('getParticipantStatus'));
    delta = (parseInt(startPrice) - parseInt(targetPrice)) / (parseInt(cap) - parseInt(threshold));
    message = `Bought ${title} ticket at ETH ${currentPrice}. Let's all join together to make it ETH ${targetPrice}`;

    let options = {
      value: value
    }
    let action;

    console.log('participantStatus', parseInt(participantStatus) == 0);
    // debugger;
    switch (participantStatus) {
      case 0:
          action = (<MakotoContractForm className="buy"
            contract="CrowdSale" method="buy" buttonLabel="Buy Now" labels={['@twitter_handle']}
            options ={options}
          />);
          break;
      case 1:
          action = (<Tweet message={message} />);
          break;
      case 2:
          action = (
            <MakotoContractForm className="buy"
              contract="CrowdSale" method="withdraw" buttonLabel="Give me!"
              message="Sale is over. You can get ETH back"
            />      
          );
          break;
      case 3:
          action = (<Ticket />);
          break;
    }
    console.log('owner_name', owner_name);
    return (
      <div className="crowd-sale">
        <div className="pure-u-1-1 header miami">
          <h1 className="title">
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
            {action}
            <h2>Activity</h2>
            <ul className="activity">
                {/* <li className="participant"><img className="avatar" src="https://avatars.io/twitter/jlo"></img> <a href="http://twitter.com/@jlo">@jlo</a><span>  bought ticket at <bold>4</bold> ETH</span> </li> */}
                {/* <li className="participant">
                      <img className="avatar" src={`https://avatars.io/twitter/${input.returnValues.name}`}></img>
                      <a href={`https://twitter.com/${input.returnValues.name}`}>{input.returnValues.name}</a>
                        bought a ticket at <bold>{this.web3.utils.fromWei(input.returnValues.deposit)} ETH</bold>
                    </li> */}

                {this.props.CrowdSale.events.sort((a,b)=>{return b.blockNumber-a.blockNumber }).map((input, index) => {
                  console.log(input, index);
                  let activity;
                    switch (input.event) {
                      case 'Bought':
                        activity = (<li className="participant">
                                    <img className="avatar" src={`https://avatars.io/twitter/${input.returnValues.name}`}></img>
                                    <a href={`https://twitter.com/${input.returnValues.name}`}>{input.returnValues.name}</a>
                                    <span> bought a ticket at <bold>{this.web3.utils.fromWei(input.returnValues.deposit)} ETH</bold></span>
                                  </li>
                        );
                        break;
                      case 'Withdrawn':
                        activity = (<li className="participant">
                                    <img className="avatar" src={`https://avatars.io/twitter/${input.returnValues.name}`}></img>
                                    <a href={`https://twitter.com/${input.returnValues.name}`}>{input.returnValues.name}</a>
                                    <span>  got back <bold>{this.web3.utils.fromWei(input.returnValues.amount)} ETH</bold></span>
                                  </li>
                        );
                        break;
                      case 'Finalised':
                        activity = (
                          <li className="participant owner" >
                          <img className="avatar" src={`https://avatars.io/twitter/${owner_name}`}></img>
                              <a href={`https://twitter.com/${owner_name}`}>{owner_name}</a>
                              <span>  the ticket sale is over! Looking forward to seeing you all!</span>
                          </li>      
                        );
                        break;
                    }
                    return activity;
                  // )
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
