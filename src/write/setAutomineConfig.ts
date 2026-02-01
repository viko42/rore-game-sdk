import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type SetAutomineConfigArgs = {
  blocksPerRound: number;
  amountPerBlock: bigint;
  remainingRounds: bigint;
};

export function prepareSetAutomineConfigTx({ 
  blocksPerRound, 
  amountPerBlock, 
  remainingRounds 
}: SetAutomineConfigArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'setAutomineConfig',
    args: [blocksPerRound, amountPerBlock, remainingRounds],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
