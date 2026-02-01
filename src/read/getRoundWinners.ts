import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetRoundWinners(roundId: bigint) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'getRoundWinners',
    args: [roundId],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetRoundWinners(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'getRoundWinners',
    data: result,
  });
}

export async function getRoundWinners(
  roundId: bigint,
  rpcUrl?: string
) {
  const req = encodeGetRoundWinners(roundId);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetRoundWinners(result);
}
