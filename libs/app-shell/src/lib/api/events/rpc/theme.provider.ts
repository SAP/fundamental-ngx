import { rpcProvider } from './rpc.connector';

const ChangeThemeAction = 'changeTheme';
const GetCurrentThemeAction = 'getCurrentTheme';

interface ThemeValue {
    id: string;
    name: string;
    url: string;
}

let defaultTheme;
rpcProvider.registerRpcHandler(GetCurrentThemeAction, () => defaultTheme);

export class ThemeProvider {
    static setCurrentTheme(value: ThemeValue): void {
        defaultTheme = value;
    }

    static changeTheme(value: ThemeValue): void {
        defaultTheme = value;
        rpcProvider.rpc<ThemeValue>(ChangeThemeAction, value)
            .then(window.console.info.bind(console))
            .catch(window.console.error.bind(console));
    }
}
