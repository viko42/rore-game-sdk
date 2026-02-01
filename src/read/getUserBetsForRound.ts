import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetUserBetsForRound(user: string, roundId: bigint) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'getUserBetsForRound',
    args: [user, roundId],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetUserBetsForRound(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'getUserBetsForRound',
    data: result,
  });
}

export async function getUserBetsForRound(
  user: string,
  roundId: bigint,
  rpcUrl?: string
) {
  const req = encodeGetUserBetsForRound(user, roundId);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetUserBetsForRound(result);
}
