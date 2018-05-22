# Cooperative Dutch Auction

Turn your ticket buyers to event ambassador

## Introduciton

For any live event ticketing, filling the full capacity of the venue is crtitical part of their business yet pricing options have been limited to simple models such as "early bird discounts" or slashing the ticket price towards the end of the sale.

With the programmable money powered by Ethereum smart contract, we can provide more attractive pricing model which incentivse ticket buyers to coordinate together to fill the venue while minimising the risk of loss for event organisers.

### Why dutch auction?

A Dutch auction is one of auction models in which the auctioneer begins with a high asking price, and lowers it until some participant accepts the price. This auction model was introduced by a few well known ICO such as Gnosis or Polkadot.


### Why cooperative?

Unlike Gnosis or Polkadot ICO where bidding price goes down according to time, We propose the pricing model where price deceases based on the number of tickets sold (as opposed to time). This will incentivise buyers(= fans) to spread the words and encourage others to buy the tickets to lower down their own ticket price.

### Summary

The traditional pricing model (early bird/slashing) are based on information asynmetry where seller don't reveal the current demand/supply and using FOMO (Fear of missing out) tactic to the buyers. By making demand/supply data transparent using blockchain and make pricing dynamic using smart contract, both sellers and buyers are incentivised to sell more tickets together.

## Running Test

- Run `npm install`
- Open `ganache-cli  -a 20 -e 1000` in separate terminal
- Run `truffle test`

## Running the simulation script.

```truffle exec script/seed.js```

## NOTES

Due to bugs in drizzle, it has a problem showing activities on right bottom side when connecting via Metamask. To simulate the full capability, please connect without Metamask.

## Made with the following open source software.

- [Ethereum Solidity](http://solidity.readthedocs.io/)
- [Drizzle](https://github.com/trufflesuite/drizzle)
- [Truffle](http://truffleframework.com)
- [c3.js](http://c3js.org)

## Other materials.

- [header image of miami](https://pixabay.com/en/miami-florida-downtown-cityscape-936590/) = CC0 Creative Commons, Free for commercial use , No attribution required
- Logo made with https://cooltext.com