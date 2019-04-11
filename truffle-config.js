const Web3WsProvider = require('web3-providers-ws')

module.exports = {
  networks: {
    local: {
      provider: new Web3WsProvider('ws://localhost:8545'),
      gas: 7712383,
      gasPrice: 20000000000,
      network_id: '*',
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.5.1', // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: false,
        runs: 200
      },
      evmVersion: 'byzantium'
    }
  }
}
