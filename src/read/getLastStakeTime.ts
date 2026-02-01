import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetLastStakeTime(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'lastStakeTime',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetLastStakeTime(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'lastStakeTime',
    data: result,
  });
}

export async function getLastStakeTime(
  user: string,
  rpcUrl?: string
) {
  const req = encodeGetLastStakeTime(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetLastStakeTime(result);
}

