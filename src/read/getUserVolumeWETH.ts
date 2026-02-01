import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetUserVolumeWETH(user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'userVolumeWETH',
    args: [user],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetUserVolumeWETH(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'userVolumeWETH',
    data: result,
  });
}

export async function getUserVolumeWETH(
  user: string,
  rpcUrl?: string
) {
  const req = encodeGetUserVolumeWETH(user);
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetUserVolumeWETH(result);
}

