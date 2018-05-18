import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus
  }
}

class CrowdSale extends Component {
  render() {
    return (
        <div className="pure-u-1-1">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />
          <h2>SimpleStorage</h2>
          <p>This shows a simple ContractData component with no arguments, along with a form to set its value.</p>
          <p><strong>Stored Value</strong>: <ContractData contract="SimpleStorage" method="storedData" /></p>
          <ContractForm contract="SimpleStorage" method="set" />

          <br/><br/>
        </div>

    )
  }
}

export default drizzleConnect(CrowdSale, mapStateToProps);
