import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetTotalStakedOre() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'totalStakedOre',
    args: [],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetTotalStakedOre(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'totalStakedOre',
    data: result,
  });
}

export async function getTotalStakedOre(rpcUrl?: string) {
  const req = encodeGetTotalStakedOre();
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetTotalStakedOre(result);
}
