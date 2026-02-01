import { encodeFunctionData, type Address } from 'viem';
import { getWethAddress } from '../config';

const ERC20_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export function prepareApproveTx(spender: Address, amount: bigint, tokenAddress?: Address) {
  const data = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [spender, amount],
  });

  return {
    to: tokenAddress ?? getWethAddress(),
    data,
    value: 0n,
  };
}
