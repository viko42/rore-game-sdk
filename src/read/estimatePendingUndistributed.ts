import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeEstimatePendingUndistributed(user: string, roundIds: bigint[]) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'estimatePendingUndistributed',
    args: [user, roundIds],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeEstimatePendingUndistributed(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'estimatePendingUndistributed',
    data: result,
  });
}

export async function estimatePendingUndistributed(
  user: string,
  roundIds: bigint[],
  rpcUrl?: string
) {
  const req = encodeEstimatePendingUndistributed(user, roundIds);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeEstimatePendingUndistributed(result);
}

