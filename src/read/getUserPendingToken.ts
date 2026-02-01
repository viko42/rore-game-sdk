import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetUserPendingToken(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'userPendingToken',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetUserPendingToken(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'userPendingToken',
    data: result,
  });
}

export async function getUserPendingToken(
  user: string,
  rpcUrl?: string
) {
  const req = encodeGetUserPendingToken(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetUserPendingToken(result);
}

