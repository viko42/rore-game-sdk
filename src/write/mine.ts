import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type MineArgs = {
  blockIndex: number;
  amount: bigint;
};

export function prepareMineTx({ blockIndex, amount }: MineArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'mineBatch',
    args: [[blockIndex], amount],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
