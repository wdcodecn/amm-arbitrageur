import { Contract } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { FlashBot, IWETH } from '../typechain';
import { Token } from '@uniswap/sdk-core';
import { getPairAddress, MdexSwapFactoryV2, PancakeSwapFactoryV2 } from '../Address';

describe('Flashswap', () => {
  let weth: IWETH;
  let flashBot: FlashBot;

  let WBNB: string = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
  let USDC: string = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
  let USDT: string = '0x55d398326f99059ff775485246999027b3197955';
  let CAKE: string = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82';

  beforeEach(async () => {
    flashBot = await ethers.deployContract('FlashBot', [WBNB]) as FlashBot;
  });

  describe('flash swap arbitrage', () => {
    // const TokenA = new Token(56, USDC, 18, 'USDC', 'USD Coin');
    // const TokenB = new Token(56, USDT, 18, 'USDT', 'USDT');
    // const TokenC = new Token(56, WBNB, 18, 'WBNB', 'WBNB');

    let signer: SignerWithAddress;

    // const uniFactoryAbi = ['function getPair(address, address) view returns (address pair)'];
    // const uniPairAbi = ['function sync()'];
    //
    // const mdexFactoryAddr = '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8';
    // const mdexFactory = new ethers.Contract(MdexSwapFactoryV2, uniFactoryAbi, ethers.provider);
    let mdexPairAddr: string;
    // let mdexPair: Contract;
    //
    // const pancakeFactoryAddr = '0xBCfCcbde45cE874adCB698cC183deBcF17952812';
    // const pancakeFactory = new ethers.Contract(pancakeFactoryAddr, uniFactoryAbi, waffle.provider);
    let pancakePairAddr: any;


    before(async () => {
      [signer] = await ethers.getSigners();
      mdexPairAddr = await getPairAddress(MdexSwapFactoryV2, WBNB, USDT, ethers);
      pancakePairAddr = await getPairAddress(PancakeSwapFactoryV2, WBNB, USDT, ethers);


      // mdexPairAddr = await mdexFactory.getPair(WBNB, USDT);
      // mdexPair = new ethers.Contract(mdexPairAddr, uniPairAbi, waffle.provider);
      // pancakePairAddr = await pancakeFactory.getPair(WBNB, USDT);
    });

    it('do flash swap between Pancake and MDEX', async () => {
      // transfer 100000 to mdex pair
      const amountEth = ethers.utils.parseEther('100000');
      // await weth.deposit({ value: amountEth });
      // await weth.transfer(mdexPairAddr, amountEth);
      // await mdexPair.connect(signer).sync();

      const balanceBefore = await ethers.provider.getBalance(flashBot.address);
      await flashBot.flashArbitrage(mdexPairAddr, pancakePairAddr);
      const balanceAfter = await ethers.provider.getBalance(flashBot.address);

      expect(balanceAfter).to.be.gt(balanceBefore);
    });

    // it('calculate how much profit we get', async () => {
    //   // transfer 100000 to mdex pair
    //   const amountEth = ethers.utils.parseEther('100000');
    //   await weth.deposit({ value: amountEth });
    //   await weth.transfer(mdexPairAddr, amountEth);
    //   await mdexPair.connect(signer).sync();
    //
    //   const res = await flashBot.getProfit(mdexPairAddr, pancakePairAddr);
    //   expect(res.profit).to.be.gt(ethers.utils.parseEther('500'));
    //   expect(res.baseToken).to.be.eq(WBNB);
    // });

    it('revert if callback is called from address without permission', async () => {
      await expect(
        flashBot.uniswapV2Call(flashBot.address, ethers.utils.parseEther('1000'), 0, '0xabcd')
      ).to.be.revertedWith('Non permissioned address call');
    });
  });
});
