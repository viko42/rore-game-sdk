import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type MineBatchArgs = {
  blocks: number[];
  amountPerBlock: bigint;
};

export function prepareMineBatchTx({ blocks, amountPerBlock }: MineBatchArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'mineBatch',
    args: [blocks, amountPerBlock],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
