import React, { Component } from "react";
import WalletsDataService from "../services/wallets.service";

export default class AddWallet extends Component {
  constructor(props) {
    super(props);
    this.onChangeWallet = this.onChangeWallet.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.saveWallet = this.saveWallet.bind(this);
    this.newWallet = this.newWallet.bind(this);

    this.state = {
      id: null,
      wallet: "",
      Address: "", 
      published: false,

      submitted: false
    };
  }

  onChangeWallet(e) {
    this.setState({
      wallet: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      Address: e.target.value
    });
  }

  saveWallet() {
    var data = {
      wallet: this.state.wallet,
      address: this.state.address
    };

    WalletDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          wallet: response.data.wallet,
          address: response.data.address,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWallet() {
    this.setState({
      id: null,
      wallet: "",
      address: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Wallet sent for approval</h4>
            <button className="btn btn-success" onClick={this.newWallet}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="wallet">Wallet Name</label>
              <input
                type="text"
                className="form-control"
                id="wallet"
                required
                value={this.state.wallet}
                onChange={this.onChangeWallet}
                name="wallet"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Wallet Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.address}
                onChange={this.onChangeAddress}
                name="address"
              />
            </div>

            <button onClick={this.saveWallet} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
