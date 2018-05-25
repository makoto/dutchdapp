## Inspiration

I run a Blockchain based free meetup management Dapp called BlockParty (http://noblockno.party) where you pay a small deposit when you register. You lose your deposit if you do not turn up. You will get your deposit back + we split the deposit of whom did not turn up. You go to a party and may end up getting more money.

When I was at a blockchain conference ( DevCon3 in Cancucn 2017 ), someone heard about my service and she suggested to tweak it to solve her own problem. She likes organizing dance events but has a fear of not selling out enough tickets. She suggested keeping the price high until she can cover the venue cost then cut the price to everybody once knowing that she does not lose money.

The pricing chart of her original idea is like this.

```
-------|
       |
       |
       --------
```

The problem of the above approach is that there are price points where organisers earn more money if they stop selling the ticket right before reaching the milestone. The better approach is to reduce the price gradually so that selling more ticket always increase revenue.

```
-------\
        \
         \
          \
```

This pricing model is very similar to "Dutch auction model" made popular by a couple of ICOs (such as [Gnosis](https://blog.gnosis.pm/introducing-the-gnosis-dutch-exchange-53bd3d51f9b2) and [Polkadot](https://polkadot.network/auction)) aiming to prevent whales (a bit like scalpers in music business) but will tailor to fill the need for the physical events.

The idea has been sitting around for a while but finally had a chance to create it thanks to this hackathon!

## What it does

It's basically a dutch auction system where the ticket price starts higher but it goes down as more people buy tickets. Compared to selling early birds tickets at discount price, this will ensure the organizer to break even a lot faster while people who bought their tickets at earlier stages have an incentive to promote so that their ticket price also goes down. We used Ethereum smart contract which allows people to withdraw the price difference a lot easier than traditional payment system (eg: PayPal). Please see the [gist](https://gist.github.com/makoto/8e77ec7f2ad47bd5d21ebaa402fb90a7) for the more detailed pricing analysis.

## How we built it

We used [Truffle](http://truffleframework.com) as a generic smart contract development.
For the front end development, I used Drizzle(https://github.com/trufflesuite/drizzle) .
I have [zeppelin_os integrated version](https://github.com/makoto/dutchdapp/compare/zos) though this version has not been integrated into its frontend yet as [it is not easily integratable into drizzle yet](https://github.com/zeppelinos/zos-cli/issues/206).

## Challenges we ran into

Trying out new technologies.
For this hackathon, I used Drizzle and ZeppelinOS for the first time.
It's not that ZOS nor Drizzle is difficult to use but rather because they are at their breeding edge (especially the ZOS is still pre-release stage) and the codebase keeps changing so documentation seems quickly getting out of date.
Special thanks to OpenZeppelin guys for supporting me while I was trying out.

## Accomplishments that we're proud of

We made a demo video which is fun and hopefully relatable to the judges :-)
Also, the price simulator we built (https://makoto.github.io/dutch) is quite a cool way to dynamically visualize profit/loss model as compared to just using excel chart in my original ayalysis.

## What we learned

Ticket pricing in music industry is an untapped market. Until recently I was working in an insurance company doing a lot of work optimising insurance policy price (insurance is one of the old industries where statistics and data science takes a big part of their core business). From the outsider's view, music (especially ticketing) industry seems to have primitive pricing structure so I am excited to find the opportunity where my knowledge of data science and crypto economics can apply.

## What's next for Cooperative Dutch auction for live event ticketing

I will incorporate this feature into BlockParty for paid events.

## FAQ

### Who are your target customers?

This service is primarily aimed at indie level artists who are yet to known to the masses. None of the discount will be required for popular artists who are sure to fill the venue. However, using this model enables popular artists to try to secure bigger (or more expensive) venues than usual which could cause too much risk of vacancy in traditional ticket discounting model.

### Does this prevent scalpers from buying all tickets?

At certain extent.

Scalpters join the ticket sale when they see the ticket price lower than actual demand.
It is too risky for them to join when the ticket prices are high and allows core fans to come and commit at higher price , but actually pay the same lower price once it hits the milestone.

This way, we expect that scalpers can only dominate the portion of the entire ticket sales.

### Looks like early buyers don't get anything extra 

Some people (along with scalpers) may wait until enough people buy tickets.

To solve the issue, we can modify the final pricing algorythm to be more sophisticated where early buyers receives the slight discount. We did not implement at initial iteration as it is harder to explain the concept to end users (especially in the tweet size).

### Why blockchain?

Imagine if you implement this type of system using paypal or normall payment gateway.
If you don't take customer's money until the auction ends, there are no gurantee that these buyers actually buy the tickets with the price they committed.

The alternative approach is to charge the highest amount and reimburse the difference but returning the portion of purchased price is not only difficult to program using existing payment provider but also incur additional charge to the payment providers.

However, this kind of escrow model is where blockchain based smart contract can shine. Ethereum enables us to write a flexible logic to redistribute vallues.

### Why do you NOT link tickets to ERC721 token?

ERC721(aka Non fungible token) token allows you to assign unique ID into individual asset and can program transfer rule which seems ideal for ticket management. However scalpers could buy tickets with throw away wallets and sell the wallets at higher price without actually transfering the token ownership.
To prevent that, you need to integrate with strong identification system to be able to proof the identity of the wallet, leading to more centralised service or inconvinience to users hence I did not integrate into this dapp.

### Would customers buy tickets in Ether?

Probably not. For this prototype to become production ready, integration with fiat pegged token (aka stable coin) will be crucial.