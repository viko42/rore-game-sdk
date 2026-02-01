import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodePendingRefiningRewards(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'pendingRefiningRewards',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodePendingRefiningRewards(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'pendingRefiningRewards',
    data: result,
  });
}

export async function pendingRefiningRewards(
  user: string,
  rpcUrl?: string
) {
  const req = encodePendingRefiningRewards(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodePendingRefiningRewards(result);
}
