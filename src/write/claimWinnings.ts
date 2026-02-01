import { encodeFunctionData } from 'viem';
import { getContractAddress, getContractAbi } from '../config';

export type ClaimWinningsArgs = {
  amount: bigint;
};

export function prepareClaimWinningsTx({ amount }: ClaimWinningsArgs) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'claimWinnings',
    args: [amount],
  });

  return {
    to: getContractAddress(),
    data,
    value: 0n,
  };
}
