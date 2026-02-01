import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export interface AutomineConfig {
  blocksPerRound: number;
  amountPerBlock: bigint;
  remainingRounds: bigint;
}

export function encodeGetAutomineConfig(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'automineConfigs',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetAutomineConfig(result: Hex): AutomineConfig {
  const decoded = decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'automineConfigs',
    data: result,
  }) as [number, bigint, bigint];
  
  return {
    blocksPerRound: decoded[0],
    amountPerBlock: decoded[1],
    remainingRounds: decoded[2],
  };
}

export async function getAutomineConfig(
  user: string,
  rpcUrl?: string
): Promise<AutomineConfig> {
  const req = encodeGetAutomineConfig(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetAutomineConfig(result);
}
