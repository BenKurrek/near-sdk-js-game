import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

// Initializing contract
async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    ...nearConfig
  });

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);

  return { walletConnection, nearConfig };
}

window.nearInitPromise = initContract()
  .then(({ walletConnection, nearConfig }) => {
    ReactDOM.render(
      <App
        wallet={walletConnection}
        contractId={nearConfig.contractName}
      />,
      document.getElementById('root')
    );
  });
