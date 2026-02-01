import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetTotalUnclaimedOre() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'totalUnclaimedOre',
    args: [],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetTotalUnclaimedOre(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'totalUnclaimedOre',
    data: result,
  });
}

export async function getTotalUnclaimedOre(rpcUrl?: string) {
  const req = encodeGetTotalUnclaimedOre();
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetTotalUnclaimedOre(result);
}

