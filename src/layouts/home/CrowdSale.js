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
      this.key_title = this.contracts.CrowdSale.methods.title.cacheCall()
      this.key_location = this.contracts.CrowdSale.methods.location.cacheCall()
      this.key_startPrice = this.contracts.CrowdSale.methods.startPrice.cacheCall()
      this.key_getPrice = this.contracts.CrowdSale.methods.getPrice.cacheCall()
      this.key_numParticipants = this.contracts.CrowdSale.methods.numParticipants.cacheCall()
      this.key_targetPrice = this.contracts.CrowdSale.methods.targetPrice.cacheCall()
      this.key_cap = this.contracts.CrowdSale.methods.cap.cacheCall()
      this.key_threshold = this.contracts.CrowdSale.methods.threshold.cacheCall()
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
    let title, venue, numParticipants, startPrice, value, currentPrice, targetPrice, cap, threshold, delta, message;
    title = this.setKey('title');
    venue = this.setKey('location');
    numParticipants = this.setKey('numParticipants');
    startPrice = this.web3.utils.fromWei(this.setKey('startPrice'), 'ether');
    targetPrice = this.web3.utils.fromWei(this.setKey('targetPrice'), 'ether');
    value = this.setKey('getPrice');
    currentPrice = this.web3.utils.fromWei(value, 'ether');
    cap = this.setKey('cap');
    threshold = this.setKey('threshold');
    title = this.setKey('title');
    delta = (parseInt(startPrice) - parseInt(targetPrice)) / (parseInt(cap) - parseInt(threshold));
    message = `Bought ${title} ticket at ETH ${currentPrice}. Let's all go together to make it ETH ${targetPrice}`

    // if(this.props.CrowdSale.title[this.dataKeyTitle]){
    //   title = this.props.CrowdSale.title[this.dataKeyTitle].value;
    //   venue = this.props.CrowdSale.location[this.dataKeyTitle].value;
    //   numParticipants = this.props.CrowdSale.numParticipants[this.dataKeyTitle].value;
    //   startPrice = this.web3.utils.fromWei(this.props.CrowdSale.startPrice[this.dataKeyTitle].value, 'ether');
    //   value = this.props.CrowdSale.getPrice[this.dataKeyTitle].value;
    //   currentPrice = this.web3.utils.fromWei(value, 'ether'); 
    //   targetPrice = this.web3.utils.fromWei(this.props.CrowdSale.targetPrice[this.dataKeyTitle].value, 'ether');
    //   cap = this.props.CrowdSale.cap[this.dataKeyTitle].value;
    //   threshold = this.props.CrowdSale.threshold[this.dataKeyTitle].value;
    //   delta = (parseInt(startPrice) - parseInt(targetPrice)) / (parseInt(cap) - parseInt(threshold));
    //   // message = `Got ticket for ${title}`
    // }
    // message = title;
    console.log('message', title, message)
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
                contract="CrowdSale" method="buy" buttonLabel="Buy Now" labels={['@twitter_handle']}
                options ={options}
              />
            <Tweet message={message} />
            <MakotoContractForm className="buy"
                contract="CrowdSale" method="withdraw" buttonLabel="Give me!"
                message="Sale is over. You can get ETH back"
              />
            <Ticket />
            <h2>Activity</h2>
            <ul>
                {/* <li className="participant"><img className="avatar" src="https://avatars.io/twitter/chrisbrown"></img> <a href="http://twitter.com/@chrisbrown">@chrisbrown</a>bought ticket at ETH </li>
                <li className="participant"><img className="avatar" src="https://avatars.io/twitter/jlo"></img> <a href="http://twitter.com/@jlo">@jlo</a>bought ticket at ETH </li> */}
                {this.props.CrowdSale.events.sort((a,b)=>{return b.blockNumber-a.blockNumber }).map((input, index) => {
                  console.log(input, index);
                  return (
                    <li className="participant">
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
