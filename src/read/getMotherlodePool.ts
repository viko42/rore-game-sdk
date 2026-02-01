import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetMotherlodePool() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'motherlodePool',
    args: [],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetMotherlodePool(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'motherlodePool',
    data: result,
  });
}

export async function getMotherlodePool(rpcUrl?: string) {
  const req = encodeGetMotherlodePool();
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetMotherlodePool(result);
}

