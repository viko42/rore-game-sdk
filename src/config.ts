import type { Address } from 'viem';
import { GAME_ABI } from './abi';

let contractAddress: Address | null = null;
let wethAddress: Address | null = null;
let rpcUrl: string | null = null;

export type OreGameConfig = {
  contractAddress: Address;
  wethAddress: Address;
  rpcUrl: string;
};

export function init(config: OreGameConfig): void {
  contractAddress = config.contractAddress;
  wethAddress = config.wethAddress;
  rpcUrl = config.rpcUrl;
}

export function getContractAddress(): Address {
  if (!contractAddress) {
    throw new Error('ore-game-sdk not initialized. Call init() first.');
  }
  return contractAddress;
}

export function getWethAddress(): Address {
  if (!wethAddress) {
    throw new Error('ore-game-sdk not initialized. Call init() first.');
  }
  return wethAddress;
}

export function getRpcUrl(): string {
  if (!rpcUrl) {
    throw new Error('ore-game-sdk not initialized. Call init() first.');
  }
  return rpcUrl;
}

export function getContractAbi() {
  return GAME_ABI;
}

export { GAME_ABI as CONTRACT_ABI };
