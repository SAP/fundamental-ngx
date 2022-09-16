import {
    animate,
    animateChild,
    AnimationTriggerMetadata,
    group,
    query,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { SizeOptions } from './common';

export function height(options: SizeOptions = {}): AnimationTriggerMetadata {
    return trigger(options.trigger || 'height', [
        state(
            '0',
            style({
                height: options.start || 0,
                overflow: 'hidden'
            })
        ),
        state(
            '1',
            style({
                height: options.end || '*',
                overflow: 'hidden'
            })
        ),
        transition('0 <=> 1', [
            group([
                query('@*', animateChild(), { optional: true }),
                animate((options.time || 400) + 'ms ' + (options.stagger || 0) + 'ms ' + (options.ease || 'ease-in'))
            ])
        ])
    ]);
}
