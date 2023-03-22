import React, { Component } from "react";
import WalletDataService from "../services/wallets.service";

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.onChangeWallet = this.onChangeWallet.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.getWallet = this.getWallet.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateWallet = this.updateWallet.bind(this);
    this.deleteWallet = this.deleteWallet.bind(this);

    this.state = {
      currentWallet: {
        id: null,
        wallet: "",
        address: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getWallet(this.props.match.params.id);
  }

  onChangeWallet(e) {
    const wallet = e.target.value;

    this.setState(function(prevState) {
      return {
        currentWallet: {
          ...prevState.currentWallet,
          wallet: wallet
        }
      };
    });
  }

  onChangeAddress(e) {
    const adress = e.target.value;
    
    this.setState(prevState => ({
      currentWallet: {
        ...prevState.currentWallet,
        Address: Address
      }
    }));
  }

  getWallet(id) {
    WalletDataService.get(id)
      .then(response => {
        this.setState({
          currentWallet: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentWallet.id,
      wallet: this.state.currentWallet.wallet,
      Address: this.state.currentWallet.Address,
      published: status
    };

    WalletDataService.update(this.state.currentWallet.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentWallet: {
            ...prevState.currentWallet,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateWallet() {
    WalletDataService.update(
      this.state.currentWallet.id,
      this.state.currentWallet
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Wallet was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteWallet() {    
    WalletDataService.delete(this.state.currentWallet.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Wallets')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentWallet } = this.state;

    return (
      <div>
        {currentWallet ? (
          <div className="edit-form">
            <h4>Wallet</h4>
            <form>
              <div className="form-group">
                <label htmlFor="wallet">Wallet</label>
                <input
                  type="text"
                  className="form-control"
                  id="wallet"
                  value={currentWallet.wallet}
                  onChange={this.onChangeWallet}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentWallet.Address}
                  onChange={this.onChangeAddress}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentWallet.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentWallet.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteWallet}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateWallet}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Wallet for more details...</p>
          </div>
        )}
      </div>
    );
  }
}
