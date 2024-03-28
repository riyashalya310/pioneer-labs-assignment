import React, { Component } from 'react';
import Web3 from 'web3';
import './index.css'

class MetaMaskIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      errorMessage: ''
    };
  }

  connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        // Check if connected
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          this.setState({ isConnected: true, errorMessage: '' });
        }
      } else {
        this.setState({ isConnected: false, errorMessage: 'MetaMask extension not detected.' });
      }
    } catch (error) {
      this.setState({ isConnected: false, errorMessage: error.message });
    }
  };

  render() {
    const { isConnected, errorMessage } = this.state;
    return (
      <div className='container'>
        <div className='inside-container'>
          <h1> Integrate MetaMask Wallet </h1>
          <button class="btn btn-primary" onClick={this.connectWallet}>Connect Wallet</button>
          {isConnected && <p>Wallet connected successfully!</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    );
  }
}

export default MetaMaskIntegration;
