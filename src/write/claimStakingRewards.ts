import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export function prepareClaimStakingRewardsTx() {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'claimStakingRewards',
    args: [],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
