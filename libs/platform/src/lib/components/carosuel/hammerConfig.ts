import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import * as Hammer from 'hammerjs';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'pan': { direction: Hammer.DIRECTION_All },
        'swipe': { direction: Hammer.DIRECTION_VERTICAL },
    };

    buildHammer(element: HTMLElement) {
        const mc = new Hammer(element, {
            touchAction: 'auto',
            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
            recognizers: [
                [Hammer.Swipe, {
                    direction: Hammer.DIRECTION_HORIZONTAL
                }]
            ]
        });
        return mc;
    }
}
