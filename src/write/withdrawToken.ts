import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type WithdrawTokenArgs = {
  amount: bigint;
};

export function prepareWithdrawTokenTx({ amount }: WithdrawTokenArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'withdrawToken',
    args: [amount],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
