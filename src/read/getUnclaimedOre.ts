import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetUnclaimedOre(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'unclaimedOre',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetUnclaimedOre(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'unclaimedOre',
    data: result,
  });
}

export async function getUnclaimedOre(
  user: string,
  rpcUrl?: string
) {
  const req = encodeGetUnclaimedOre(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetUnclaimedOre(result);
}
