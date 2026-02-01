import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetStakedOre(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'stakedOre',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetStakedOre(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'stakedOre',
    data: result,
  });
}

export async function getStakedOre(user: string, rpcUrl?: string) {
  const req = encodeGetStakedOre(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetStakedOre(result);
}
