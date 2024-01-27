import fs from 'fs';
import path from 'path';
import 'lodash.combinations';
import lodash from 'lodash';
import { Contract } from '@ethersproject/contracts';
import { ethers } from 'hardhat';

import log from './log';
import {
  ApeSwapFactoryV2,
  BabySwapFactoryV2,
  BakerySwapFactoryV2,
  BiSwapFactoryV2,
  MdexSwapFactoryV2,
  PancakeSwapFactoryV2,
  UniSwapFactoryV2
} from '../Address';
import { ERC20__factory } from '../typechain';


interface Token {
  readonly symbol: string;
  readonly address: string;
}

interface Tokens {
  readonly [key: string]: Token;
}

interface TokenPair {
  symbols: string;
  pairs: string[];
}

interface ArbitragePair {
  symbols: string;
  pairs: [string, string];
}

interface AmmFactories {
  readonly [propName: string]: string;
}


export enum Network {
  BSC = 'bsc',
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

interface Tokens {
}

const bscBaseTokens: Tokens = {
  wbnb: { symbol: 'WBNB', address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' },
  usdt: { symbol: 'USDT', address: '0x55d398326f99059ff775485246999027b3197955' },
  busd: { symbol: 'BUSD', address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' },
  usdc: { symbol: 'USDC', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' },
  dai: { symbol: 'DAI', address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3' }
};

const bscQuoteTokens: Tokens = {

  xrp: { symbol: 'XRP', address: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe' },
  ada: { symbol: 'ADA', address: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47' },
  avax: { symbol: 'AVAX', address: '0x1ce0c2827e2ef14d5c4f29a091d735a204794041' },
  dot: { symbol: 'DOT', address: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402' },
  link: { symbol: 'LINK', address: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd' },
  matic: { symbol: 'MATIC', address: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd' },
  shib: { symbol: 'SHIB', address: '0x2859e4544c4bb03966803b044a93563bd2d0dd4d' },
  ltc: { symbol: 'LTC', address: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94' },
  bch: { symbol: 'BCH', address: '0x8ff795a6f4d97e7887c79bea79aba5cc76444adf' },
  atom: { symbol: 'ATOM', address: '0x0eb3a705fc54725037cc9e008bdede697f62f335' },
  uni: { symbol: 'UNI', address: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1' },
  etc: { symbol: 'ETC', address: '0x3d6545b08693dae087e957cb1180ee38b9e3c25e' },
  xlm: { symbol: 'XLM', address: '0x43c934a845205f0b514417d757d7235b8f53f1b9' },
  near: { symbol: 'NEAR', address: '0x1fa4a73a3f0133f0025378af00236f3abdee5d63' },
  btt: { symbol: 'BTT', address: '0x8595f9da7b868b1822194faed312235e43007b49' },
  fil: { symbol: 'FIL', address: '0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153' },
  arbitrum: { symbol: 'Arbitrum', address: '0xa050ffb3eeb8200eeb7f61ce34ff644420fd3522' },
  vet: { symbol: 'VET', address: '0x6fdcdfef7c496407ccb0cec90f9c5aaa1cc8d888' },
  mkr: { symbol: 'MKR', address: '0x5f0da599bb2cccfcf6fdfd7d81743b6020864350' },
  flow: { symbol: 'FLOW', address: '0xc943c5320b9c18c153d1e2d12cc3074bebfb31a2' },
  egld: { symbol: 'EGLD', address: '0xbf7c81fff98bbe61b40ed186e4afd6ddd01337fe' },
  axs: { symbol: 'AXS', address: '0x715d400f88c167884bbcc41c5fea407ed4d2f8a0' },
  ftm: { symbol: 'FTM', address: '0xad29abb318791d579433d831ed122afeaf29dcfe' },
  xtz: { symbol: 'XTZ', address: '0x16939ef78684453bfdfb47825f8a5f714f12623a' },
  cheel: { symbol: 'CHEEL', address: '0x1f1c90aeb2fd13ea972f0a71e35c0753848e3db0' },
  mana: { symbol: 'MANA', address: '0x26433c8127d9b4e9b71eaa15111df99ea2eeb2f8' },
  btt1: { symbol: 'BTT', address: '0x352Cb5E19b12FC216548a2677bD0fce83BaE434B' },
  eos: { symbol: 'EOS', address: '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6' },
  fxs: { symbol: 'FXS', address: '0xe48a3d7d0bc88d552f730b62c006bc925eadb9ee' },
  bcfx: { symbol: 'bCFX', address: '0x045c4324039dA91c52C55DF5D785385Aab073DcF' },
  snx: { symbol: 'SNX', address: '0x9ac983826058b8a9c7aa1c9171441191232e8404' },
  frxeth: { symbol: 'frxETH', address: '0x64048a7eecf3a2f1ba9e144aac3d7db6e58f555e' },
  woo: { symbol: 'WOO', address: '0x4691937a7508860f876c9c0a2a617e7d9e945d4b' },
  op: { symbol: 'OP', address: '0x170C84E3b1D282f9628229836086716141995200' },
  xec: { symbol: 'XEC', address: '0x0ef2e7602add1733bfdb17ac3094d0421b502ca3' },
  fet: { symbol: 'FET', address: '0x031b41e504677879370e9dbcf937283a8691fa7f' },
  sfrxeth: { symbol: 'sfrxETH', address: '0x3cd55356433c89e50dc51ab07ee0fa0a95623d53' },
  twt: { symbol: 'TWT', address: '0x4b0f1812e5df2a09796481ff14017e6005508003' },
  ilv: { symbol: 'ILV', address: '0x4d5ac5cc4f8abdf2ec2cb986c00c382369f787d4' },
  inch1: { symbol: '1INCH', address: '0x111111111117dc0aa78b770fa6a738034120c302' },
  elf: { symbol: 'ELF', address: '0xa3f020a5c92e15be13caf0ee5c95cf79585eecc9' },
  iotx: { symbol: 'IOTX', address: '0x9678e42cebeb63f23197d726b29b1cb20d0064e5' },
  comp: { symbol: 'COMP', address: '0x52ce071bd9b1c4b00a0b92d298c512478cad67e8' },
  zec: { symbol: 'ZEC', address: '0x1ba42e5193dfa8b03d15dd1b86a3113bbbef8eeb' },
  bat: { symbol: 'BAT', address: '0x101d82428437127bf1608f699cd651e6abf9766e' },
  ksm: { symbol: 'KSM', address: '0x2aa69e8d25c045b659787bc1f03ce47a388db6e8' },
  glmr: { symbol: 'GLMR', address: '0x76f3ce6af26de7a9854dbd153acd8f46a2cf5133' },
  lrc: { symbol: 'LRC', address: '0x66e4d38b20173f509a1ff5d82866949e4fe898da' },
  sfp: { symbol: 'SFP', address: '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb' },
  ethw: { symbol: 'ETHW', address: '0x302cd8973be5ca2334b4ff7e7b01ba41455559b3' },
  jst: { symbol: 'JST', address: '0xea998d307aca04d4f0a3b3036aba84ae2e409c0a' },
  ocean: { symbol: 'OCEAN', address: '0xdce07662ca8ebc241316a15b611c89711414dd1a' },
  yfi: { symbol: 'YFI', address: '0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e' },
  ankr: { symbol: 'ANKR', address: '0xf307910a4c7bbc79691fd374889b36d8531b08e3' },
  dao: { symbol: 'DAO', address: '0x4d2d32d8652058bf98c772953e1df5c5c85d9f45' },
  band: { symbol: 'BAND', address: '0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18' },
  ont: { symbol: 'ONT', address: '0xfd7b3a77848f1c2d67e05e54d78d174a0c850335' },
  bal: { symbol: 'BAL', address: '0xd4ed60d8368a92b5f1ca33af61ef2a94714b2d46' },
  sxp: { symbol: 'SXP', address: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a' },
  xvs: { symbol: 'XVS', address: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63' },
  ctsi: { symbol: 'CTSI', address: '0x8da443f84fea710266c8eb6bc34b71702d033ef2' },
  sfund: { symbol: 'SFUND', address: '0x477bc8d23c634c154061869478bce96be6045d12' },
  dexe: { symbol: 'DEXE', address: '0x6E88056E8376AE7709496BA64D37FA2F8015CE3E' },
  c98: { symbol: 'C98', address: '0xaec945e04baf28b135fa7c640f624f8d90f1c3a6' },
  orbs: { symbol: 'ORBS', address: '0xebd49b26169e1b52c04cfd19fcf289405df55f80' },
  joe: { symbol: 'JOE', address: '0x371c7ec6d8039ff7933a2aa28eb827ffe1f52f07' },
  mav: { symbol: 'MAV', address: '0xd691d9a68c887bdf34da8c36f63487333acfd103' },
  gmt: { symbol: 'GMT', address: '0x7ddc52c4de30e94be3a6a0a2b259b2850f421989' },
  pond: { symbol: 'POND', address: '0xa1428370f540b4c4e319224165ecae513a391f77' },
  blz: { symbol: 'BLZ', address: '0x935a544bf5816e3a7c13db2efe3009ffda0acda2' },
  ygg: { symbol: 'YGG', address: '0x13ab6739368a4e4abf24695bf52959224367391f' },
  aioz: { symbol: 'AIOZ', address: '0x33d08d8c7a168333a85285a68c0042b39fc3741d' },
  rdnt: { symbol: 'RDNT', address: '0xf7DE7E8A6bd59ED41a4b5fe50278b3B7f31384dF' },
  slp: { symbol: 'SLP', address: '0x070a08beef8d36734dd67a491202ff35a6a16d97' },
  id: { symbol: 'ID', address: '0x2dfF88A56767223A5529eA5960Da7A3F5f766406' },
  syn: { symbol: 'SYN', address: '0xa4080f1778e69467e905b8d6f72f6e441f9e9484' },
  set10: { symbol: '10SET', address: '0x1ae369a6ab222aff166325b7b87eb9af06c86e57' },
  sure: { symbol: 'SURE', address: '0x9b17baadf0f21f03e35249e0e59723f34994f806' },
  dfi: { symbol: 'DFI', address: '0x361c60b7c2828fcab80988d00d1d542c83387b50' },
  hook: { symbol: 'HOOK', address: '0xa260e12d2b924cb899ae80bb58123ac3fee1e2f0' },
  stg: { symbol: 'STG', address: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b' },
  scrt: { symbol: 'SCRT', address: '0x02dd18e4981da3fc7363fe56f3b81d1860b44ea7' },
  dodo: { symbol: 'DODO', address: '0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2' },
  knc: { symbol: 'KNC', address: '0xfe56d5892bdffc7bf58f2e84be1b2c32d21c308b' },
  bmvl: { symbol: 'bMVL', address: '0x5f588efaf8eb57e3837486e834fc5a4e07768d98' },
  sdex: { symbol: 'SDEX', address: '0xfdc66a08b0d0dc44c17bbd471b88f49f50cdd20f' },
  celr: { symbol: 'CELR', address: '0x1f9f6a696c6fd109cd3956f45dc709d2b3902163' },
  bake: { symbol: 'BAKE', address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5' },
  bnt: { symbol: 'BNT', address: '0xa069008a669e2af00a86673d9d584cfb524a42cc' },
  prom: { symbol: 'PROM', address: '0xaf53d56ff99f1322515e54fdde93ff8b3b7dafd5' },
  elon: { symbol: 'ELON', address: '0x7bd6fabd64813c48545c9c0e312a0099d9be2540' },
  ogn: { symbol: 'OGN', address: '0x9c1962e0ac2a370ab4c4f4eecba6483d8764c4b2' },
  yfii: { symbol: 'YFII', address: '0x7f70642d88cf1c4a3a7abb072b53b929b653eda5' },
  alpha: { symbol: 'ALPHA', address: '0xa1faa113cbe53436df28ff0aee54275c13b40975' },
  looks: { symbol: 'LOOKS', address: '0x590d11c0696b0023176f5d7587d6b2f502a08047' },
  nrv: { symbol: 'NRV', address: '0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096' },
  om: { symbol: 'OM', address: '0xf78d2e7936f5fe18308a3b2951a93b6c4a41f5e2' },
  mbox: { symbol: 'MBOX', address: '0x3203c9e46ca618c8c1ce5dc67e7e9d75f5da2377' },
  tlos: { symbol: 'TLOS', address: '0xb6c53431608e626ac81a9776ac3e999c5556717c' },
  mbl: { symbol: 'MBL', address: '0x18e37f96628db3037d633fe4d469fb1933a63c5b' },
  hello: { symbol: 'HELLO', address: '0x0f1cbed8efa0e012adbccb1638d0ab0147d5ac00' },
  pols: { symbol: 'POLS', address: '0x7e624fa0e1c4abfd309cc15719b7e2580887f570' },
  coti: { symbol: 'COTI', address: '0xadbaf88b39d37dc68775ed1541f1bf83a5a45feb' },
  pha: { symbol: 'PHA', address: '0x0112e557d400474717056c4e6d40edd846f38351' },
  paid: { symbol: 'PAID', address: '0xad86d0e9764ba90ddd68747d64bffbd79879a238' },
  vlx: { symbol: 'VLX', address: '0xe9c803f48dffe50180bd5b01dc04da939e3445fc' },
  mtrg: { symbol: 'MTRG', address: '0xbd2949f67dcdc549c6ebe98696449fa79d988a9f' },
  dext: { symbol: 'DEXT', address: '0xe91a8d2c584ca93c7405f15c22cdfe53c29896e3' },
  cgpt: { symbol: 'CGPT', address: '0x9840652DC04fb9db2C43853633f0F62BE6f00f98' },
  beta: { symbol: 'BETA', address: '0xbe1a001fe942f96eea22ba08783140b9dcc09d28' },
  gfal: { symbol: 'GFAL', address: '0x47c454ca6be2f6def6f32b638c80f91c9c3c5949' },
  raca: { symbol: 'RACA', address: '0x12bb890508c125661e03b09ec06e404bc9289040' },
  combo: { symbol: 'COMBO', address: '0xc03fBF20A586fa89C2a5f6F941458E1Fbc40c661' },
  lina: { symbol: 'LINA', address: '0x762539b45a1dcce3d36d080f74d1aed37844b878' },
  bsw: { symbol: 'BSW', address: '0x965f527d9159dce6288a2219db51fc6eef120dd1' },
  dia: { symbol: 'DIA', address: '0x99956d38059cf7beda96ec91aa7bb2477e0901dd' },
  psp: { symbol: 'PSP', address: '0xcafe001067cdef266afb7eb5a286dcfd277f3de5' },
  cos: { symbol: 'COS', address: '0x96dd399f9c3afda1f194182f71600f1b65946501' },
  ceek: { symbol: 'CEEK', address: '0xe0f94ac5462997d2bc57287ac3a3ae4c31345d66' },
  xcad: { symbol: 'XCAD', address: '0xa026Ad2ceDa16Ca5FC28fd3C72f99e2C332c8a26' },
  idex: { symbol: 'IDEX', address: '0x0856978f7ffff0a2471b4520e3521c4b3343e36f' },
  ata: { symbol: 'ATA', address: '0xa2120b9e674d3fc3875f415a7df52e382f141225' },
  front: { symbol: 'FRONT', address: '0x928e55dab735aa8260af3cedada18b5f70c72f1b' },
  lit: { symbol: 'LIT', address: '0xb59490ab09a0f526cc7305822ac65f2ab12f9723' },
  mdx: { symbol: 'MDX', address: '0x9c65ab58d8d978db963e63f2bfb7121627e3a739' },
  bel: { symbol: 'BEL', address: '0x8443f091997f06a61670b735ed92734f5628692f' },
  omax: { symbol: 'OMAX', address: '0xeB84be66c8E71f07eA57Cf3b21626d7784F32A7F' },
  clv: { symbol: 'CLV', address: '0x09e889bb4d5b474f561db0491c38702f367a4e4d' },
  qanx: { symbol: 'QANX', address: '0xaaa9214f675316182eaa21c85f0ca99160cc3aaa' },
  idia: { symbol: 'IDIA', address: '0x0b15ddf19d47e6a86a56148fb4afffc6929bcb89' },
  xcn: { symbol: 'XCN', address: '0x7324c7c0d95cebc73eea7e85cbaac0dbdf88a05b' },
  koge: { symbol: 'KOGE', address: '0xe6df05ce8c8301223373cf5b969afcb1498c5528' },
  kmd: { symbol: 'KMD', address: '0x2003f7ba57ea956b05b85c60b4b2ceea9b111256' },
  alu: { symbol: 'ALU', address: '0x8263cd1601fe73c066bf49cc09841f35348e3be0' },
  sdao: { symbol: 'SDAO', address: '0x90ed8f1dc86388f14b64ba8fb4bbd23099f18240' },
  fine: { symbol: 'FINE', address: '0x4e6415a5727ea08aae4580057187923aec331227' },
  lto: { symbol: 'LTO', address: '0x857b222fc79e1cbbf8ca5f78cb133d1b7cf34bbd' },
  reef: { symbol: 'REEF', address: '0xf21768ccbc73ea5b6fd3c687208a7c2def2d966e' },
  derc: { symbol: 'DERC', address: '0x373e768f79c820aa441540d254dca6d045c6d25b' },
  mdt: { symbol: 'MDT', address: '0x668db7aa38eac6b40c9d13dbe61361dc4c4611d1' },
  prq: { symbol: 'PRQ', address: '0xd21d29b38374528675c34936bf7d5dd693d2a577' },
  apx: { symbol: 'APX', address: '0x78F5d389F5CDCcFc41594aBaB4B0Ed02F31398b3' },
  tor: { symbol: 'TOR', address: '0x1d6Cbdc6b29C6afBae65444a1f65bA9252b8CA83' },
  strx: { symbol: 'STRX', address: '0xd6fdde76b8c1c45b33790cc8751d5b88984c44ec' },
  tkp: { symbol: 'TKP', address: '0x7849ed1447250d0b896f89b58f3075b127ca29b3' },
  ava: { symbol: 'AVA', address: '0x13616f44ba82d63c8c0dc3ff843d36a8ec1c05a9' },
  cream: { symbol: 'CREAM', address: '0xd4cb328a82bdf5f03eb737f37fa6b370aef3e888' },
  chess: { symbol: 'CHESS', address: '0x20de22029ab63cf9a7cf5feb2b737ca1ee4c82a6' },
  math: { symbol: 'MATH', address: '0xf218184af829cf2b0019f8e6f0b2423498a36983' },
  gmm: { symbol: 'GMM', address: '0x5b6bf0c7f989de824677cfbd507d9635965e9cd3' },
  alpaca: { symbol: 'ALPACA', address: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f' },
  farm: { symbol: 'FARM', address: '0x4b5c23cac08a567ecf0c1ffca8372a45a5d33743' },
  bifi: { symbol: 'BIFI', address: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A' }

};

const bscDexes: AmmFactories = {
  pancake: PancakeSwapFactoryV2,
  mdex: MdexSwapFactoryV2,
  bakery: BakerySwapFactoryV2,
  // julswap: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
  apeswap: ApeSwapFactoryV2,
  babyswap: BabySwapFactoryV2,
  biswap: BiSwapFactoryV2,
  uniswap: UniSwapFactoryV2
  // value: '0x1B8E12F839BD4e73A47adDF76cF7F0097d74c14C',
};

function getFactories(network: Network): AmmFactories {
  switch (network) {
    case Network.BSC:
      return bscDexes;
    default:
      throw new Error(`Unsupported network:${network}`);
  }
}

export function getTokens(network: Network): [Tokens, Tokens] {
  switch (network) {
    case Network.BSC:
      return [bscBaseTokens, bscQuoteTokens];
    default:
      throw new Error(`Unsupported network:${network}`);
  }
}

async function updatePairs(network: Network): Promise<ArbitragePair[]> {
  log.info('Updating arbitrage token pairs');
  const [baseTokens, quoteTokens] = getTokens(network);
  const factoryAddrs = getFactories(network);

  const factoryAbi = ['function getPair(address, address) view returns (address pair)'];
  let factories: Contract[] = [];

  log.info(`Fetch from dexes: ${Object.keys(factoryAddrs)}`);
  for (const key in factoryAddrs) {
    const addr = factoryAddrs[key];
    const factory = new ethers.Contract(addr, factoryAbi, ethers.provider);
    factories.push(factory);
  }

  let tokenPairs: TokenPair[] = [];
  for (const key in baseTokens) {
    const baseToken = baseTokens[key];
    for (const quoteKey in quoteTokens) {
      const quoteToken = quoteTokens[quoteKey];
      let tokenPair: TokenPair = { symbols: `${quoteToken.symbol}-${baseToken.symbol}`, pairs: [] };
      for (const factory of factories) {
        const pair = await factory.getPair(baseToken.address, quoteToken.address);
        if (pair != ZERO_ADDRESS) {
          tokenPair.pairs.push(pair);
        }
      }
      if (tokenPair.pairs.length >= 2) {
        tokenPairs.push(tokenPair);
      }
    }
  }

  let allPairs: ArbitragePair[] = [];
  for (const tokenPair of tokenPairs) {
    if (tokenPair.pairs.length < 2) {
      continue;
    } else if (tokenPair.pairs.length == 2) {
      allPairs.push(tokenPair as ArbitragePair);
    } else {
      // @ts-ignore
      const combinations = lodash.combinations(tokenPair.pairs, 2);
      for (const pair of combinations) {
        const arbitragePair: ArbitragePair = {
          symbols: tokenPair.symbols,
          pairs: pair,
        };
        allPairs.push(arbitragePair);
      }
    }
  }
  return allPairs;
}

function getPairsFile(network: Network) {
  return path.join(__dirname, `../pairs-${network}.json`);
}

export async function tryLoadPairs(network: Network): Promise<ArbitragePair[]> {
  let pairs: ArbitragePair[] | null;
  const pairsFile = getPairsFile(network);
  try {
    pairs = JSON.parse(fs.readFileSync(pairsFile, 'utf-8'));
    log.info('Load pairs from json');
  } catch (err) {
    pairs = null;
  }

  if (pairs) {
    return pairs;
  }
  pairs = await updatePairs(network);

  fs.writeFileSync(pairsFile, JSON.stringify(pairs, null, 2));
  return pairs;
}

async function main() {

  log.info(`Fetch from dexes: ${Object.keys(bscQuoteTokens)}`);

  const BSC_RPC = 'https://bsc-dataseed1.defibit.io/';
  const provider = new ethers.providers.JsonRpcProvider(BSC_RPC);

  for (const key in bscQuoteTokens) {
    const addr = bscQuoteTokens[key];
    let decimal = await ERC20__factory.connect(addr.address, provider).decimals();
    if (decimal == 18) {
      // bifi: { symbol: 'BIFI', address: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A' }
      console.log(`${addr.symbol.toLowerCase()}: { symbol: '${addr.symbol}', address: '${addr.address}' },`);
    }
  }

}

main().then(console.log);
