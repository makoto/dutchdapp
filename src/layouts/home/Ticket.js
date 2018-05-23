import React, { Component } from 'react'
import Modal from 'react-modal';
var QRCode = require('qrcode-react');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Ticket extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = 'black';
    this.subtitle.style.backgroundColor = 'white';
    // this.subtitle.style.width = '300px';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <form className="buy pure-form pure-form-stacked">
            <div >
                All set now. Print the ticket and enjoy the show.
            </div>
            <button className="pure-button buy-cta" type="button" onClick={this.openModal} >Show ticket</button>
        </form>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="QRCode"
        >
        <h2 ref={subtitle => this.subtitle = subtitle}>QRCode to the gig</h2>
        <QRCode value="this is dummy for now. going to be replaced with a digital signature" logo="https://avatars.io/twitter/@pitbull" size="200"/>
        </Modal>
      </div>
    );
  }
}
export default Ticket
