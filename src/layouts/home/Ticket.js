import React, { Component } from 'react'
// var QRCode = require('qrcode-react');

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {}
    }

    handleSubmit(event) {
        // this.setState({ "message": event.target.value });
    }

    render() {
        // debugger;
        // this.setState({message:this.props.message})
        let value = this.state.message || this.props.message;
        return(
            <form className="buy pure-form pure-form-stacked">
                <div >
                    All set now. Print the ticket and enjoy the show.
                </div>
                <button className="pure-button buy-cta" type="button" onClick={this.handleSubmit}>Show ticket</button>
            </form>
        )
    }
}

export default Ticket
