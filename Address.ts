import { getAddress } from 'ethers/lib/utils';
import { IUniswapV2Factory__factory, IUniswapV2Pair__factory } from './typechain';

let Address = {
  56: {
    'WBNB': '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    'USDT': '0x55d398326f99059fF775485246999027B3197955',
    'USDC': '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
  }

};


export default Address;

// router
export const PancakeSwapRouterV2 = getAddress('0x10ED43C718714eb63d5aA57B78B54704E256024E');
export const BakerySwapRouterV2 = getAddress('0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F');
export const ApeSwapRouterV2 = getAddress('0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7');
export const BiSwapRouterV2 = getAddress('0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8');
export const MdexSwapRouterV2 = getAddress('0x62c1A0d92B09D0912F7BB9c96C5ecdC7F2b87059');
export const BabySwapRouterV2 = getAddress('0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd');
export const UniSwapRouterV2 = getAddress('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
// export const SushiSwapRouterV2 =  getAddress("0x10ED43C718714eb63d5aA57B78B54704E256024E");

// factory
export const PancakeSwapFactoryV2 = getAddress('0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73');
export const BakerySwapFactoryV2 = getAddress('0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7');
export const ApeSwapFactoryV2 = getAddress('0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6');
export const BiSwapFactoryV2 = getAddress('0x858E3312ed3A876947EA49d572A7C42DE08af7EE');
export const MdexSwapFactoryV2 = getAddress('0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8');
export const BabySwapFactoryV2 = getAddress('0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da');
export const UniSwapFactoryV2 = getAddress('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f');

export const Multicall2 = getAddress('0x963Df249eD09c358A4819E39d9Cd5736c3087184');

// export const SushiSwapFactoryV2 =  getAddress("0x10ED43C718714eb63d5aA57B78B54704E256024E");

export async function getPairAddress(factory: string, tokenA: string, tokenB: string, ethers: any) {
  let iUniswapV2Factory = IUniswapV2Factory__factory.connect(factory, ethers.provider);

  return await iUniswapV2Factory.getPair(tokenA, tokenB);
}

export function getPairContract(pair: string, ethers: any) {
  return IUniswapV2Pair__factory.connect(pair, ethers.provider);
}

