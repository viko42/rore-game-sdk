import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetHasBetInRound(user: string, roundId: bigint) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'hasBetInRound',
    args: [user, roundId],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetHasBetInRound(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'hasBetInRound',
    data: result,
  });
}

export async function getHasBetInRound(
  user: string,
  roundId: bigint,
  rpcUrl?: string
) {
  const req = encodeGetHasBetInRound(user, roundId);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetHasBetInRound(result);
}

