import {
    Injectable,
    InjectionToken
} from '@angular/core';

export const ERROR_NOTIFIERS = new InjectionToken<ErrorNotifier>('ERROR_NOTIFIERS');

export interface ErrorNotifier {
    notify(message: string): void;
}

@Injectable({ providedIn: 'root' })
export class ConsoleErrorNotifier implements ErrorNotifier {
    notify = window.console.error.bind(window.console);
}


