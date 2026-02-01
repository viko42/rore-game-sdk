import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type DepositTokenArgs = {
  amount: bigint;
};

export function prepareDepositTokenTx({ amount }: DepositTokenArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'depositToken',
    args: [amount],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
