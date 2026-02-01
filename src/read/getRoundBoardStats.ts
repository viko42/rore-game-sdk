import { decodeFunctionResult, encodeFunctionData, type Hex } from 'viem';
import { getContractAddress, getContractAbi, getRpcUrl } from '../config';
import { jsonRpcCall } from '../rpc';

export function encodeGetRoundBoardStats(roundId: bigint, user: string) {
  const data = encodeFunctionData({
    abi: getContractAbi(),
    functionName: 'getRoundBoardStats',
    args: [roundId, user],
  });
  console.log({ roundId, user });
  return {
    to: getContractAddress(),
    data,
  };
}

export function decodeGetRoundBoardStats(result: Hex) {
  const decoded = decodeFunctionResult({
    abi: getContractAbi(),
    functionName: 'getRoundBoardStats',
    data: result,
  }) as [number, number, bigint[], bigint[], bigint[]];

  return {
    status: decoded[0],
    winningBlock: decoded[1],
    blockTotalBets: decoded[2],
    blockUserBets: decoded[3],
    blockBettorsCount: decoded[4],
  };
}

export async function getRoundBoardStats(
  roundId: bigint,
  user: string,
  rpcUrl?: string
) {
  const req = encodeGetRoundBoardStats(roundId, user);
  console.log({req});
  const result = await jsonRpcCall(rpcUrl ?? getRpcUrl(), 'eth_call', [req, 'latest']);
  console.log({ result });
  return decodeGetRoundBoardStats(result);
}
