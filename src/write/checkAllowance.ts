import { encodeFunctionData, decodeFunctionResult, type Address, type Hex } from 'viem';
import { getWethAddress, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export const ERC20_ABI = [
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
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
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export async function checkAllowance(
  owner: Address,
  spender: Address,
  tokenAddress?: Address,
  rpcUrl?: string
): Promise<bigint> {
  const token = tokenAddress ?? getWethAddress();
  const data = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [owner, spender],
  });

  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [
    {
      to: token,
      data,
    },
    'latest',
  ]);

  const decoded = decodeFunctionResult({
    abi: ERC20_ABI,
    functionName: 'allowance',
    data: result as Hex,
  }) as bigint;

  return decoded;
}
