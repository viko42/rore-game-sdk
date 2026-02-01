import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetFeeAutominerPerTx() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'feeAutominerPerTx',
    args: [],
  });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetFeeAutominerPerTx(result: Hex): bigint {
  return decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'feeAutominerPerTx',
    data: result,
  }) as bigint;
}

export async function getFeeAutominerPerTx(rpcUrl?: string): Promise<bigint> {
  const req = encodeGetFeeAutominerPerTx();
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  return decodeGetFeeAutominerPerTx(result);
}
