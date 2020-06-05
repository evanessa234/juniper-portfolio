import React, { Fragment } from "react";
import YourWalletsContent from "./YourWalletsContent";
import WalletDetails from "./WalletDetails";
import { Route } from "react-router-dom";
// TODO: Add State/API calls/routes
export default class YourWallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletDetailsAddress: null,
    };
  }

  viewWalletDetails = (walletDetailsAddress) => {
    this.setState({ walletDetailsAddress });
  };

  render() {
    const { walletDetailsAddress } = this.state;
    return (
      <Fragment>
        {walletDetailsAddress ? (
          <WalletDetails viewWalletDetails={this.viewWalletDetails} />
        ) : (
          <YourWalletsContent viewWalletDetails={this.viewWalletDetails} />
        )}
      </Fragment>
    );
  }
}