import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetRound(roundId: bigint) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'getRound',
    args: [roundId],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetRound(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'getRound',
    data: result,
  });
}

export async function getRound(
  roundId: bigint,
  rpcUrl?: string
) {
  const req = encodeGetRound(roundId);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetRound(result);
}
