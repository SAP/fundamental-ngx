import { Message } from '../events/message-bus';
import { HttpErrorResponse } from '@angular/common/http';
import {
    Injectable,
    InjectionToken
} from '@angular/core';


export const ERROR_FORMATTER = new InjectionToken<ErrorFormatter>('ERROR_FORMATTER',
    { providedIn: 'root', factory: () => new DefaultFormatter() });


export interface ErrorFormatter {
    format(error: Message | string | Error | HttpErrorResponse): string;
}

@Injectable({ providedIn: 'root' })
export class DefaultFormatter implements ErrorFormatter {

    format(error: Message | string | Error | HttpErrorResponse): string {
        if (error instanceof Message || typeof error === 'string') {
            return error.toString();
        }

        if (error instanceof HttpErrorResponse || error.message) {
            return error.message;
        }

        return error.toString();
    }

}
