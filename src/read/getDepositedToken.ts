import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetDepositedToken(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'depositedToken',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetDepositedToken(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'depositedToken',
    data: result,
  });
}

export async function getDepositedToken(
  user: string,
  rpcUrl?: string
) {
  const req = encodeGetDepositedToken(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetDepositedToken(result);
}

