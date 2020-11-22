module.exports = {
    rpc: {
        host: "localhost",
        port: 8545
    },
    networks: {
        development: {
            host: "localhost", //our network is running on localhost
            port: 8545, // port where your blockchain is running
            network_id: "15",
            from: "0x862e71D87856fB83f393f342F853e40b3132F3ea", // use the account-id generated during the setup process
            gasPrice: 5000000,
            gas: 5000000
        }
    },
    compilers: {
        solc: {
          version: "0.6.0",
        },
    }
};