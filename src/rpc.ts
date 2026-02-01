import axios from 'axios';

export async function jsonRpcCall(rpcUrl: string, method: string, params: any[]) {
  const response = await axios.post(rpcUrl, {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  });

  if (response.data.error) {
    throw new Error(response.data.error.message);
  }

  return response.data.result;
}

export type RpcRequest = {
  method: string;
  params: any[];
};

export async function jsonRpcCallBatch(rpcUrl: string, requests: RpcRequest[]) {
  const payload = requests.map((req, index) => ({
    jsonrpc: '2.0',
    id: index + 1,
    method: req.method,
    params: req.params,
  }));

  const response = await axios.post(rpcUrl, payload);
  
  if (!Array.isArray(response.data)) {
    throw new Error('Invalid batch response');
  }

  // Map results back to order, checking for errors
  return response.data.sort((a: any, b: any) => a.id - b.id).map((res: any) => {
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.result;
  });
}
