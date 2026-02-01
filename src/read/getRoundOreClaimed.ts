import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetRoundOreClaimed(user: string, roundId: bigint) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'roundOreClaimed',
    args: [user, roundId],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetRoundOreClaimed(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'roundOreClaimed',
    data: result,
  });
}

export async function getRoundOreClaimed(
  user: string,
  roundId: bigint,
  rpcUrl?: string
) {
  const req = encodeGetRoundOreClaimed(user, roundId);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetRoundOreClaimed(result);
}

