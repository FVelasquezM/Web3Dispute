module.exports = {
  networks: {
    development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    dashboard: {
      port: 24012
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.15"
    }
  }
};
