import { BigNumber, BigNumberish, utils } from 'ethers';

interface Config {
  contractAddr: string;
  logLevel: string;
  minimumProfit: number;
  gasPrice: BigNumber;
  gasLimit: BigNumberish;
  bscScanUrl: string;
  concurrency: number;
}

const contractAddr = '0xXXXXXXXXXXXXXXXXXXXXXX'; // flash bot contract address
const gasPrice = utils.parseUnits('3.1', 'gwei');
const gasLimit = 600000;

const bscScanApiKey = '9SKPV4TDRSBTYYTCKVFSXJTPUP78BGUVVF'; // bscscan API key
const bscScanUrl = `https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${bscScanApiKey}`;

const config: Config = {
  contractAddr: contractAddr,
  logLevel: 'info',
  concurrency: 50,
  minimumProfit: 50, // in USD
  gasPrice: gasPrice,
  gasLimit: gasLimit,
  bscScanUrl: bscScanUrl,
};

export default config;
