import React, { Component } from 'react'

class Tweet extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {}
    }

    handleInputChange(event) {
        this.setState({ "message": event.target.value });
    }

    render() {
        // debugger;
        // this.setState({message:this.props.message})
        let value = this.state.message || this.props.message;
        return(
            <form className="buy pure-form pure-form-stacked">
                {/* <textarea class="pure-input-1-2" placeholder="Textareas work too"></textarea> */}
                <textarea cols="50" className="share-input" key="message" name="message" value={value} placeholder="Write message" onChange={this.handleInputChange} />
                <a className="twitter-share-button pure-button buy-cta"
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=${value}`}>
                Share</a>
            </form>
        )
    }
}

// class Tweet extends Component {
//   constructor(props, context) {
//     super(props);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.state({
//         message:"hello"
//     })
//   }


//   render() {
//     return (
//         <div>hello</div>
//         // <form className="buy pure-form pure-form-stacked">
//         //     <input className="buy-input" key="message" name="message" value={this.state.message} placeholder="Write message" onChange={this.handleInputChange} />
//         // {/* <button key="submit" className="pure-button buy-cta" type="button" onClick={this.handleSubmit}>{buttonLabel}</button> */}
//         //     <a class="twitter-share-button pure-button buy-cta"
//         //         target="_blank"
//         //         href="https://twitter.com/intent/tweet?text=Hello%20world">
//         //     Share</a>
//         // </form>
//     )
//   }
// }

// const Tweet = function(props) {
//     return <p>The logged in user is: {props.username}</p>;
// };

export default Tweet
