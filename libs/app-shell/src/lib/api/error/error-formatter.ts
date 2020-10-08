import { Message } from '../events/message-bus';
import { HttpErrorResponse } from '@angular/common/http';
import {
    Injectable,
    InjectionToken
} from '@angular/core';


export const ERROR_FORMATTER = new InjectionToken('ERROR_FORMATTER');


export interface ErrorFormatter {
    format(error: Message | string | Error | HttpErrorResponse): string;
}

@Injectable()
export class DefaultFormatter implements ErrorFormatter {

    format(error: Message | string | Error | HttpErrorResponse): string {
        if (error instanceof Message || typeof error === 'string') {
            return error.toString();

        } else if (error instanceof HttpErrorResponse || error.message) {
            return error.message;
        }
        return error.toString();
    }

}
