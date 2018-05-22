import CrowdSale from './../build/contracts/CrowdSale.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    CrowdSale
  ],
  events: {
    CrowdSale: ['Bought', 'Finalised', 'Canceled', 'Withdrawn'],
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions