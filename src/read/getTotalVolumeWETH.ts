import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetTotalVolumeWETH() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'totalVolumeWETH',
    args: [],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetTotalVolumeWETH(result: Hex) {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'totalVolumeWETH',
    data: result,
  });
}

export async function getTotalVolumeWETH(rpcUrl?: string) {
  const req = encodeGetTotalVolumeWETH();
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetTotalVolumeWETH(result);
}

