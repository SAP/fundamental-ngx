// todo: move to app-shell
import * as bus from 'framebus';
import {RpcProvider} from 'worker-rpc';

const rpcChannel = 'rpc-action';
export const rpcProvider = new RpcProvider(
  (message, transfer) => bus.emit(rpcChannel, message, transfer)
);
bus.on(rpcChannel, (event) => rpcProvider.dispatch(event));

