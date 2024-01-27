/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface FlashBotInterface extends ethers.utils.Interface {
  functions: {
    "addBaseToken(address)": FunctionFragment;
    "addRouterV2(address)": FunctionFragment;
    "baseTokensContains(address)": FunctionFragment;
    "flashArbitrage(address,address)": FunctionFragment;
    "getBaseTokens()": FunctionFragment;
    "getProfit(address,address)": FunctionFragment;
    "getRouterV2s()": FunctionFragment;
    "owner()": FunctionFragment;
    "removeBaseToken(address)": FunctionFragment;
    "removeRouterV2(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "simpleArbitrageV1(address,address,address,address,uint256)": FunctionFragment;
    "simpleArbitrageV2(tuple,tuple)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "uniswapV2Call(address,uint256,uint256,bytes)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addBaseToken",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "addRouterV2", values: [string]): string;
  encodeFunctionData(
    functionFragment: "baseTokensContains",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "flashArbitrage",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProfit",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRouterV2s",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeBaseToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeRouterV2",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "simpleArbitrageV1",
    values: [string, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "simpleArbitrageV2",
    values: [
      { router: string; path: string[]; buyAmount: BigNumberish },
      { router: string; path: string[] }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "uniswapV2Call",
    values: [string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "addBaseToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addRouterV2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "baseTokensContains",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "flashArbitrage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBaseTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getProfit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRouterV2s",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeBaseToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeRouterV2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "simpleArbitrageV1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "simpleArbitrageV2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniswapV2Call",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "BaseTokenAdded(address)": EventFragment;
    "BaseTokenRemoved(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RouterV2Added(address)": EventFragment;
    "RouterV2Removed(address)": EventFragment;
    "Withdrawn(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BaseTokenAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BaseTokenRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterV2Added"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterV2Removed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export class FlashBot extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: FlashBotInterface;

  functions: {
    addBaseToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addBaseToken(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addRouterV2(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addRouterV2(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    baseTokensContains(
      token: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "baseTokensContains(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    flashArbitrage(
      pool0: string,
      pool1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "flashArbitrage(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBaseTokens(
      overrides?: CallOverrides
    ): Promise<[string[]] & { tokens: string[] }>;

    "getBaseTokens()"(
      overrides?: CallOverrides
    ): Promise<[string[]] & { tokens: string[] }>;

    getProfit(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { profit: BigNumber; baseToken: string }>;

    "getProfit(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { profit: BigNumber; baseToken: string }>;

    getRouterV2s(
      overrides?: CallOverrides
    ): Promise<[string[]] & { tokens: string[] }>;

    "getRouterV2s()"(
      overrides?: CallOverrides
    ): Promise<[string[]] & { tokens: string[] }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    removeBaseToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "removeBaseToken(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeRouterV2(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "removeRouterV2(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    simpleArbitrageV1(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "simpleArbitrageV1(address,address,address,address,uint256)"(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    simpleArbitrageV2(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "simpleArbitrageV2((address,address[],uint256),(address,address[]))"(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "uniswapV2Call(address,uint256,uint256,bytes)"(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdraw()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addBaseToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addBaseToken(address)"(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addRouterV2(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addRouterV2(address)"(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  baseTokensContains(
    token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "baseTokensContains(address)"(
    token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  flashArbitrage(
    pool0: string,
    pool1: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "flashArbitrage(address,address)"(
    pool0: string,
    pool1: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBaseTokens(overrides?: CallOverrides): Promise<string[]>;

  "getBaseTokens()"(overrides?: CallOverrides): Promise<string[]>;

  getProfit(
    pool0: string,
    pool1: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string] & { profit: BigNumber; baseToken: string }>;

  "getProfit(address,address)"(
    pool0: string,
    pool1: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string] & { profit: BigNumber; baseToken: string }>;

  getRouterV2s(overrides?: CallOverrides): Promise<string[]>;

  "getRouterV2s()"(overrides?: CallOverrides): Promise<string[]>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  removeBaseToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "removeBaseToken(address)"(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeRouterV2(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "removeRouterV2(address)"(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  simpleArbitrageV1(
    router: string,
    wbnb: string,
    busd: string,
    token: string,
    number: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "simpleArbitrageV1(address,address,address,address,uint256)"(
    router: string,
    wbnb: string,
    busd: string,
    token: string,
    number: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  simpleArbitrageV2(
    buy: { router: string; path: string[]; buyAmount: BigNumberish },
    sell: { router: string; path: string[] },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "simpleArbitrageV2((address,address[],uint256),(address,address[]))"(
    buy: { router: string; path: string[]; buyAmount: BigNumberish },
    sell: { router: string; path: string[] },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uniswapV2Call(
    sender: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "uniswapV2Call(address,uint256,uint256,bytes)"(
    sender: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdraw()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addBaseToken(token: string, overrides?: CallOverrides): Promise<void>;

    "addBaseToken(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addRouterV2(token: string, overrides?: CallOverrides): Promise<void>;

    "addRouterV2(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    baseTokensContains(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "baseTokensContains(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    flashArbitrage(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "flashArbitrage(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getBaseTokens(overrides?: CallOverrides): Promise<string[]>;

    "getBaseTokens()"(overrides?: CallOverrides): Promise<string[]>;

    getProfit(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { profit: BigNumber; baseToken: string }>;

    "getProfit(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { profit: BigNumber; baseToken: string }>;

    getRouterV2s(overrides?: CallOverrides): Promise<string[]>;

    "getRouterV2s()"(overrides?: CallOverrides): Promise<string[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    removeBaseToken(token: string, overrides?: CallOverrides): Promise<void>;

    "removeBaseToken(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeRouterV2(token: string, overrides?: CallOverrides): Promise<void>;

    "removeRouterV2(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    simpleArbitrageV1(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "simpleArbitrageV1(address,address,address,address,uint256)"(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    simpleArbitrageV2(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: CallOverrides
    ): Promise<void>;

    "simpleArbitrageV2((address,address[],uint256),(address,address[]))"(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "uniswapV2Call(address,uint256,uint256,bytes)"(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;

    "withdraw()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    BaseTokenAdded(
      token: string | null
    ): TypedEventFilter<[string], { token: string }>;

    BaseTokenRemoved(
      token: string | null
    ): TypedEventFilter<[string], { token: string }>;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    RouterV2Added(
      token: string | null
    ): TypedEventFilter<[string], { token: string }>;

    RouterV2Removed(
      token: string | null
    ): TypedEventFilter<[string], { token: string }>;

    Withdrawn(
      to: string | null,
      value: BigNumberish | null
    ): TypedEventFilter<[string, BigNumber], { to: string; value: BigNumber }>;
  };

  estimateGas: {
    addBaseToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addBaseToken(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addRouterV2(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addRouterV2(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    baseTokensContains(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "baseTokensContains(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    flashArbitrage(
      pool0: string,
      pool1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "flashArbitrage(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBaseTokens(overrides?: CallOverrides): Promise<BigNumber>;

    "getBaseTokens()"(overrides?: CallOverrides): Promise<BigNumber>;

    getProfit(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getProfit(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRouterV2s(overrides?: CallOverrides): Promise<BigNumber>;

    "getRouterV2s()"(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    removeBaseToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "removeBaseToken(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeRouterV2(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "removeRouterV2(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    simpleArbitrageV1(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "simpleArbitrageV1(address,address,address,address,uint256)"(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    simpleArbitrageV2(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "simpleArbitrageV2((address,address[],uint256),(address,address[]))"(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "uniswapV2Call(address,uint256,uint256,bytes)"(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdraw()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addBaseToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addBaseToken(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addRouterV2(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addRouterV2(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    baseTokensContains(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "baseTokensContains(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    flashArbitrage(
      pool0: string,
      pool1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "flashArbitrage(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBaseTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getBaseTokens()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProfit(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getProfit(address,address)"(
      pool0: string,
      pool1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRouterV2s(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getRouterV2s()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeBaseToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "removeBaseToken(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeRouterV2(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "removeRouterV2(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    simpleArbitrageV1(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "simpleArbitrageV1(address,address,address,address,uint256)"(
      router: string,
      wbnb: string,
      busd: string,
      token: string,
      number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    simpleArbitrageV2(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "simpleArbitrageV2((address,address[],uint256),(address,address[]))"(
      buy: { router: string; path: string[]; buyAmount: BigNumberish },
      sell: { router: string; path: string[] },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "uniswapV2Call(address,uint256,uint256,bytes)"(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
