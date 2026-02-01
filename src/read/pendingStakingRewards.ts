import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodePendingStakingRewards(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'pendingStakingRewards',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodePendingStakingRewards(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'pendingStakingRewards',
    data: result,
  });
}

export async function pendingStakingRewards(
  user: string,
  rpcUrl?: string
) {
  const req = encodePendingStakingRewards(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodePendingStakingRewards(result);
}
