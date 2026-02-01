import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type StakeArgs = {
  amount: bigint;
};

export function prepareStakeTx({ amount }: StakeArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'stake',
    args: [amount],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
