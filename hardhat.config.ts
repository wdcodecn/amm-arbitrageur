import { task, HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import "hardhat-tracer";

import "dotenv/config";

import deployer from './.secret';

// const BSC_RPC = 'https://bsc-dataseed.binance.org/';
const BSC_RPC = 'https://bsc-dataseed1.defibit.io/';
const BSC_Tetsnet_RPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
    // version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 888,
      },
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      // loggingEnabled: true,
      forking: {
        url: BSC_RPC,
      },
      chainId: 0x38,
      accounts: [
        {
          privateKey: deployer.private,
          balance: '1000000000000000000000000', // 1 mil ether
        },
      ]
    },
    bscTestnet: {
      url: BSC_Tetsnet_RPC,
      chainId: 0x61,
      accounts: [deployer.private],
    },
    bsc: {
      url: BSC_RPC,
      chainId: 0x38,
      accounts: [deployer.private],
    },
  },
  mocha: {
    timeout: 40000,
  },
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = config;
