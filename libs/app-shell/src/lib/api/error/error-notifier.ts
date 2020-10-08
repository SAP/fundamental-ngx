import {
    Injectable,
    InjectionToken
} from '@angular/core';


export const ERROR_NOTIFIERS = new InjectionToken('ERROR_NOTIFIERS');


export interface ErrorNotifier {
    notify(message: string): void;
}


@Injectable()
export class ConsoleErrorNotifier implements ErrorNotifier {
    private _console: Console = console;

    notify(message: string): void {
        this._console.error(message);
    }
}


