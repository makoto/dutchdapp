import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'

class Home extends Component {
  render() {
    return (
      <div className="pure-u-1-1">
        <h2>Turn your ticket buyers to event ambassador!</h2>

        <h2 id="introduction">Introduction</h2>

        <p>
          For any live event ticketing, filling the full capacity of the venue is crtitical part of their business yet pricing options have been limited to simple models such as "early bird discounts" or slashing the ticket price towards the end of the sale.
        </p>

        <p>
          With the programmable money powered by Ethereum smart contract, we can provide more attractive pricing model which incentivse ticket buyers to coordinate together to fill the venue while minimising the risk of loss for event organisers.
        </p>

        <h2 id="introduction">Why dutch auction?</h2>

        <p>
          A Dutch auction is one of auction models in which the auctioneer begins with a high asking price, and lowers it until some participant accepts the price. This auction model was introduced by a few well known ICO such as Gnosis or Polkadot.
        </p>

        <h2 id="introduction">Why cooperative?</h2>
        <p>
          Unlike Gnosis or Polkadot ICO where bidding price goes down according to time, We propose the pricing model where price deceases based on the number of tickets sold (as opposed to time). This will incentivise buyers(= fans) to spread the words and encourage others to buy the tickets to lower down their own ticket price.
        </p>
        <iframe src="https://makoto.github.io/dutch/" width="100%" height="650px"></iframe>
        <h2 id="introduction">Summary</h2>
        <p>
          The traditional pricing model (early bird/slashing) are based on information asynmetry where seller don't reveal the current demand/supply and using FOMO (Fear of missing out) tactic to the buyers. By making demand/supply data transparent using blockchain and make pricing dynamic using smart contract, both sellers and buyers are incentivised to sell more tickets together.
        </p>
        <a href="/demo" className="pure-button demo-cta">Got it. Take me to demo page!</a>
      </div>
    )
  }
}
export default Home
