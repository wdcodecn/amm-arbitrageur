import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { getAddress } from 'ethers/lib/utils';
import fs from 'fs';
import { ethers } from 'hardhat';
import {
  ApeSwapFactoryV2,
  ApeSwapRouterV2,
  BabySwapFactoryV2,
  BabySwapRouterV2,
  BakerySwapFactoryV2,
  BakerySwapRouterV2,
  BiSwapFactoryV2,
  BiSwapRouterV2,
  getPairAddress,
  getRouterContract,
  MdexSwapFactoryV2,
  MdexSwapRouterV2,
  PancakeSwapFactoryV2,
  PancakeSwapRouterV2,
  UniSwapFactoryV2,
  UniSwapRouterV2
} from '../Address';
import { FlashBot, IWETH, IWETH__factory } from '../typechain';

describe('Flashswap', async () => {
  let weth: IWETH;
  let flashBot: FlashBot;

  let WBNB: string = getAddress('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c');
  let USDC: string = getAddress('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d');
  let USDT: string = getAddress('0x55d398326f99059ff775485246999027b3197955');
  let BUSD: string = getAddress('0xe9e7cea3dedca5984780bafc599bd69add087d56');
  let DAI: string = getAddress('0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3');

  // let CAKE: string = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82';
  beforeEach(async () => {
  });

  const bscQuoteTokens: any = {};

  describe('scan swap arbitrage', () => {
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

    const bscScanTokens = [
      { symbol: 'pvc', address: getAddress('0x75ca521892DE7f2ecFB070Cab545c250d0cEB7e3'), decimal: 9 }
    ];
    const bscBaseTokens = [
      { symbol: 'WBNB', address: getAddress('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c') },
      { symbol: 'USDT', address: getAddress('0x55d398326f99059ff775485246999027b3197955') },
      { symbol: 'BUSD', address: getAddress('0xe9e7cea3dedca5984780bafc599bd69add087d56') },
      { symbol: 'USDC', address: getAddress('0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d') }
      // { symbol: 'DAI', address: getAddress('0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3') }
    ];

    const bscDexes = [
      { name: 'Pancake', address: PancakeSwapRouterV2 },
      { name: 'Bakery', address: BakerySwapRouterV2 },
      { name: 'Ape', address: ApeSwapRouterV2 },
      { name: 'Biswap', address: BiSwapRouterV2 },
      { name: 'Mdex', address: MdexSwapRouterV2 },
      { name: 'Baby', address: BabySwapRouterV2 },
      { name: 'Uniswap', address: UniSwapRouterV2 }
    ];

    const bscDexeFactorys = [
      { name: 'Pancake', address: PancakeSwapFactoryV2 },
      { name: 'Bakery', address: BakerySwapFactoryV2 },
      { name: 'Ape', address: ApeSwapFactoryV2 },
      { name: 'Biswap', address: BiSwapFactoryV2 },
      { name: 'Mdex', address: MdexSwapFactoryV2 },
      { name: 'Baby', address: BabySwapFactoryV2 },
      { name: 'Uniswap', address: UniSwapFactoryV2 }
    ];

    before(async () => {
      [signer] = await ethers.getSigners();
      mdexPairAddr = await getPairAddress(MdexSwapFactoryV2, WBNB, USDT, ethers);
      pancakePairAddr = await getPairAddress(PancakeSwapFactoryV2, WBNB, USDT, ethers);

      flashBot = (await ethers.deployContract('FlashBot', [WBNB])) as FlashBot;

      for (const dex of bscDexes) {
        (await flashBot.addRouterV2(dex.address)).wait();
      }

      console.log(await flashBot.getRouterV2s());

      // mdexPairAddr = await mdexFactory.getPair(WBNB, USDT);
      // mdexPair = new ethers.Contract(mdexPairAddr, uniPairAbi, waffle.provider);
      // pancakePairAddr = await pancakeFactory.getPair(WBNB, USDT);
    });

    it('do flash swap', async () => {
      return;

      //    todo 代币流
      let iUniswapV2Router02 = getRouterContract(PancakeSwapRouterV2, ethers);

      // 1. 借入 wbnb 10个
      // 1. 买入 pvc 通过 wbnb busd pvc 路径
      // 1. 卖出 pvc 通过 wbnb pvc 路径

      //  todo 测试环境 创建 wbnb
      let value = ethers.utils.parseEther('10');

      let iweth = IWETH__factory.connect(WBNB, signer);

      (await iweth.deposit({ value })).wait();

      (await iweth.approve(flashBot.address, value)).wait();

      for (let bscScanToken of bscScanTokens) {
        let value1 = ethers.utils.parseEther('0.001');

        //  TODO
        // let tx = await flashBot
        //   .connect(signer)
        //   .simpleArbitrageV2(PancakeSwapRouterV2, WBNB, BUSD, bscScanToken.address, value1);

        // await tx.wait();
      }
    });

    it('scan token pool', async () => {


      // let profit = await flashBot.getProfit(1,2);
      //
      let pairInfos: pairInfo1[] = [];

      pairInfos = JSON.parse(fs.readFileSync('pairInfos.json', 'utf-8').toString());

      let newPairs: pairInfo1[] = [];
      // for (const value of pairInfos) {
      //
      //   let bscDexe = bscDexes.find((dex) => dex.address == value.router);
      //   let bscDexeFactory = bscDexeFactorys.find((dex) => dex.name == bscDexe.name);
      //
      //   let pairs = [];
      //
      //   let pair = await getPairAddress(value.factory, value.path[0], value.path[1], ethers);
      //   pairs.push(pair);
      //
      //   if (value.path.length > 2) {
      //
      //     let pair = await getPairAddress(value.factory, value.path[1], value.path[2], ethers);
      //     pairs.push(pair);
      //   }
      //
      //   newPairs.push({
      //     ...value,
      //     pairs: pairs
      //   });
      // }

      fs.writeFileSync('pairInfos.json', JSON.stringify(newPairs, null, 2));

      let MBOX_pairs = pairInfos.filter((value) => value.symbol.indexOf('MBOX') >= 0);

      let MBOX_pairs_2 = MBOX_pairs.filter((value) => value.symbol == 'MBOX-WBNB');

      for (let mboxPair of MBOX_pairs_2) {
        console.log(mboxPair);
      }

    });

    it('scan pool', async () => {

      return;

      // todo test
      Object.keys(bscQuoteTokens).forEach((key) => {
        let bscQuoteToken = bscQuoteTokens[key];
        // console.log(bscQuoteToken);
        bscScanTokens.push({ ...bscQuoteToken, decimal: 18 });
      });

      // console.log(bscScanTokens);

      let pairInfo = {
        pvc: {
          pancake: [
            {
              name: [],
              pair: [],
              price: []
            }
          ]
        }
      };

      let bscScanTokenPairs = {};


      let pairInfos: pairInfo1[] = [];

      pairInfos = JSON.parse(fs.readFileSync('pairInfos.json', 'utf-8').toString());

      for (let bscScanToken of bscScanTokens) {
        let dexPair: {
          [x in string]: {
            name: string[];
            pair: string[];
            price: string[];
          }[];
        } = {};

        for (let i = 0; i < bscDexes.length; i++) {
          const bscDex = bscDexes[i];
          const bscDexeFactory = bscDexeFactorys[i];
          console.log(bscDex);

          let dexPairs: {
            name: string[];
            pair: string[];
            price: string[];
          }[] = [];

          let iUniswapV2Router02 = getRouterContract(bscDex.address, ethers);

          for (let bscBaseToken of bscBaseTokens) {
            try {
              let result = await iUniswapV2Router02.getAmountsOut(ethers.utils.parseUnits('1', bscScanToken.decimal), [
                getAddress(bscScanToken.address),
                getAddress(bscBaseToken.address)
              ]);

              // 判断三角套利
              if (bscBaseToken.symbol != 'WBNB') {
                let bscBaseToken1 = bscBaseTokens.find((value) => value.symbol == 'WBNB');

                let result = await iUniswapV2Router02.getAmountsOut(
                  ethers.utils.parseUnits('1', bscScanToken.decimal),
                  [
                    getAddress(bscScanToken.address),
                    getAddress(bscBaseToken.address),
                    getAddress(bscBaseToken1.address)
                  ]
                );
                console.log(
                  bscDex.name +
                  `: pair [${bscScanToken.symbol}, ${bscBaseToken.symbol}, ${bscBaseToken1.symbol}] getAmountsOut (1 e${bscScanToken.decimal}) = ` +
                  result
                );

                pairInfos.push({
                  symbol: [bscScanToken.symbol, bscBaseToken.symbol, bscBaseToken1.symbol].join('-'),
                  swap: bscDex.name,
                  router: bscDex.address,
                  factory: bscDexeFactory.address,
                  path: [bscScanToken.address, bscBaseToken.address, bscBaseToken1.address],
                  price: result.map((value) => value.toString())
                });

                dexPairs.push({
                  name: [bscScanToken.symbol, bscBaseToken.symbol, bscBaseToken1.symbol],
                  pair: [bscScanToken.address, bscBaseToken.address, bscBaseToken1.address],
                  price: result.map((value) => value.toString())
                });
              } else {
                pairInfos.push({
                  symbol: [bscScanToken.symbol, bscBaseToken.symbol].join('-'),
                  swap: bscDex.name,
                  router: bscDex.address,
                  factory: bscDexeFactory.address,
                  path: [bscScanToken.address, bscBaseToken.address],
                  price: result.map((value) => value.toString())
                });

                console.log(
                  bscDex.name +
                  `: pair [${bscScanToken.symbol}, ${bscBaseToken.symbol}] getAmountsOut (1 e${bscScanToken.decimal}) = ` +
                  result
                );
                dexPairs.push({
                  name: [bscScanToken.symbol, bscBaseToken.symbol],
                  pair: [bscScanToken.address, bscBaseToken.address],
                  price: result.map((value) => value.toString())
                });
              }
            } catch (e) {
            }
          }

          dexPair[bscDex.name] = dexPairs;
        }
        bscScanTokenPairs[bscScanToken.symbol] = dexPair;

        fs.writeFileSync('pairInfos.json', JSON.stringify(pairInfos, null, 2));

        fs.writeFileSync('pair/' + bscScanToken.symbol + '.json', JSON.stringify(dexPair, null, 2));
      }

      // console.log(JSON.stringify(bscScanTokenPairs, null, 2));
      fs.writeFileSync('bscScanTokenPairs.json', JSON.stringify(bscScanTokenPairs, null, 2));
    });
  });
});

export interface pairInfo1 {
  symbol: string;
  swap: string;
  router: string;
  factory: string;
  path: string[];
  price: string[];
  pairs?: string[];
}
