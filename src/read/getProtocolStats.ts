import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export interface ProtocolStats {
  maxSupply: bigint;
  circulatingSupply: bigint;
  buriedOre: bigint;
  protocolRevenue: bigint;
  volumeWETH: bigint;
  motherlode: bigint;
}

export function encodeGetProtocolStats() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'getProtocolStats',
    args: [],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetProtocolStats(result: Hex): ProtocolStats {
  const decoded = decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'getProtocolStats',
    data: result,
  }) as [bigint, bigint, bigint, bigint, bigint, bigint];
  
  return {
    maxSupply: decoded[0],
    circulatingSupply: decoded[1],
    buriedOre: decoded[2],
    protocolRevenue: decoded[3],
    volumeWETH: decoded[4],
    motherlode: decoded[5],
  };
}

export async function getProtocolStats(rpcUrl?: string): Promise<ProtocolStats> {
  const req = encodeGetProtocolStats();
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetProtocolStats(result);
}
