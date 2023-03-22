import React, { Component } from "react";
import WalletDataService from "../services/wallets.service";
import { Link } from "react-router-dom";

export default class WalletsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchWallet = this.onChangeSearchWallet.bind(this);
    this.retrieveWallets = this.retrieveWallets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveWallet = this.setActiveWallet.bind(this);
    this.removeAllWallets = this.removeAllWallets.bind(this);
    this.searchWallet = this.searchWallet.bind(this);

    this.state = {
      wallets: [],
      currentWallet: null,
      currentIndex: -1,
      searchWallet: ""
    };
  }

  componentDidMount() {
    this.retrieveWallets();
  }

  onChangeSearchWallet(e) {
    const searchWallet = e.target.value;

    this.setState({
      searchWallet: searchWallet
    });
  }

  retrieveWallets() {
    WalletDataService.getAll()
      .then(response => {
        this.setState({
          wallets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveWallets();
    this.setState({
      currentWallet: null,
      currentIndex: -1
    });
  }

  setActiveWallet(wallet, index) {
    this.setState({
      currentWallet: wallet,
      currentIndex: index
    });
  }

  removeAllWallets() {
    WalletDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchWallet() {
    this.setState({
      currentWallet: null,
      currentIndex: -1
    });

    WalletDataService.findByWallet(this.state.searchWallet)
      .then(response => {
        this.setState({
          Wallets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchWallet, wallets, currentWallet, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Wallet name"
              value={searchWallet}
              onChange={this.onChangeSearchWallet}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchWallet}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Wallets List</h4>

          <ul className="list-group">
            {Wallets &&
              Wallets.map((wallet, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index == currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveWallet(Wallet, index)}
                  key={index}
                >
                  {Wallet.wallet}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllWallets}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentWallet ? (
            <div>
              <h4>Wallet</h4>
              <div>
                <label>
                  <strong>Wallet Name:</strong>
                </label>{" "}
                {currentWallet.wallet}
              </div>
              <div>
                <label>
                  <strong>Wallet Address:</strong>
                </label>{" "}
                {currentWallet.Address}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentWallet.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/wallets/" + currentWallet.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Wallet for more details...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
