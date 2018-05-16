# Cooperative Dutch Auction

## TODO

### Factory

- Takes cost, capacity, price and creates a crowdsale contract

### Test Scenario

```
Given start_price is $120, target_price is $60, capacity is 10, and threashold is 4
And
2 pays 120
4 pays 120
6 pays 100
8 pays 80
10 pays 60
And Cap is reached.
2 can withdraw 60
4 can withdraw 60
6 can withdraw 40
8 can withdraw 20
10 can withdraw 0
```

## Admin feature

- finalize (payback the difference)
- cancel   (payback everything)

## Running Test

1. Open `ganache -a 20`
2. `truffle test`