import ComplexStorage from './../build/contracts/ComplexStorage.json'
import SimpleStorage from './../build/contracts/SimpleStorage.json'
import TutorialToken from './../build/contracts/TutorialToken.json'
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
    ComplexStorage,
    SimpleStorage,
    TutorialToken,
    CrowdSale
  ],
  events: {
    SimpleStorage: ['StorageSet'],
    CrowdSale: ['Bought', 'Finalised', 'Canceled', 'Withdrawn'],
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions