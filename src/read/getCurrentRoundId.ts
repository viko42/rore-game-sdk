import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetCurrentRoundId() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'currentRoundId',
    args: [],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetCurrentRoundId(result: Hex) {
  const decoded = decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'currentRoundId',
    data: result,
  }) as bigint;
  return decoded;
}

export async function getCurrentRoundId(rpcUrl?: string) {
  const req = encodeGetCurrentRoundId();
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetCurrentRoundId(result);
}
