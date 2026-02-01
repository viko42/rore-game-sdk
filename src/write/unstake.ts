import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type UnstakeArgs = {
  amount: bigint;
};

export function prepareUnstakeTx({ amount }: UnstakeArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'unstake',
    args: [amount],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
