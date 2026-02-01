import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export function prepareDeleteAutomineConfigTx() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'deleteAutomineConfig',
    args: [],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
