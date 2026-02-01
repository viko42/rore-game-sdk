import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export function prepareClaimRefiningYieldTx() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'claimRefiningYield',
    args: [],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
