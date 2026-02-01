import { jsonRpcCallBatch, type RpcRequest } from './rpc';
import { getRpcUrl } from './config';
import type { Hex } from 'viem';

export type BatchCallItem<T> = {
  request: { to: string; data: Hex };
  decoder: (result: Hex) => T;
};

export async function executeBatch<T extends any[]>(
  calls: { [K in keyof T]: BatchCallItem<T[K]> },
  rpcUrl?: string
): Promise<T> {
  const rpcRequests: RpcRequest[] = calls.map((call) => ({
    method: 'eth_call',
    params: [call.request, 'latest'],
  }));

  const results = await jsonRpcCallBatch(rpcUrl ?? getRpcUrl(), rpcRequests);

  return results.map((result: Hex, index: number) => {
    return calls[index].decoder(result);
  }) as T;
}
