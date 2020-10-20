// todo: move to app-shell
import { EventSubject } from './event.subject';
import { rpcProvider } from './rpc.connector';

const ChangeThemeActionName = 'changeTheme';
const GetCurrentThemeAction = 'getCurrentTheme';

export interface ThemeValue {
  id: string;
  name: string;
  url: string;
}

const subs = new EventSubject<ThemeValue>();
export class ThemeConsumer {
  static themeChanged(callback: (value: ThemeValue) => void): void {
    subs.subscribe(callback);
  }

  static getCurrentTheme(callback: (value: ThemeValue) => void): void  {
    rpcProvider.rpc<void, ThemeValue>(GetCurrentThemeAction).then(callback);
  }
}
rpcProvider.registerRpcHandler(ChangeThemeActionName, (payload: ThemeValue) => subs.emit(payload));
