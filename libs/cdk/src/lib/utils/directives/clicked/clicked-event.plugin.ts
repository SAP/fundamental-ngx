import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { ClickedDirective } from './clicked.directive';

type EventHandlerFunction = ($event: Event) => void;
type HandlerRemoveFunction = () => void;

@Injectable()
export class ClickedEventPlugin {
    /** @hidden */
    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any) {}

    /** @hidden */
    addEventListener(element: HTMLElement, eventName: string, handler: EventHandlerFunction): ($event: Event) => void {
        return this._setupEventBinding(element, handler);
    }

    /** @hidden */
    addGlobalEventListener(
        higherOrderElement: string,
        eventName: string,
        handler: EventHandlerFunction
    ): HandlerRemoveFunction {
        const target = this._parseHigherOrderElement(higherOrderElement);
        return this._setupEventBinding(target, handler);
    }

    /** @hidden */
    supports(eventName: string): boolean {
        return eventName === ClickedDirective.eventName;
    }

    /** @hidden */
    private _parseHigherOrderElement(selector: string): EventTarget {
        if (this.platformId !== 'browser') {
            return this.document;
        }
        switch (selector) {
            case 'window':
                return window;
            case 'document':
                return document;
            case 'body':
                return document.body;
            default:
                throw new Error(`Element selector [${selector}] not supported.`);
        }
    }

    /** @hidden */
    private _setupEventBinding(target: EventTarget, handler: EventHandlerFunction): HandlerRemoveFunction {
        const addProxyFunction = (): void => {
            target.addEventListener('click', proxyFunction, false);
            target.addEventListener('keydown', proxyFunction, false);
        };

        const removeProxyFunction = (): void => {
            target.removeEventListener('click', proxyFunction, false);
            target.removeEventListener('keydown', proxyFunction, false);
        };

        const proxyFunction = (event: Event | MouseEvent | KeyboardEvent): void => {
            if (event instanceof KeyboardEvent) {
                if (event.keyCode !== ENTER && event.keyCode !== SPACE) {
                    return;
                }
            }
            handler(event);
        };

        addProxyFunction();

        return removeProxyFunction;
    }
}
