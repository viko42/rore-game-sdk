import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetBalanceOf(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'balanceOf',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetBalanceOf(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'balanceOf',
    data: result,
  });
}

export async function getBalanceOf(user: string, rpcUrl?: string) {
  const req = encodeGetBalanceOf(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetBalanceOf(result);
}
