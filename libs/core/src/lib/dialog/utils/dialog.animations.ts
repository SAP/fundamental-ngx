import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const dialogFade: AnimationTriggerMetadata = trigger('state', [
    state(
        'void, hidden',
        style({
            opacity: 0
        })
    ),
    state(
        'visible',
        style({
            opacity: 1
        })
    ),
    transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
    transition(
        '* => void, * => hidden',
        animate(
            '75ms cubic-bezier(0.4, 0.0, 1, 1)',
            style({
                opacity: 0
            })
        )
    )
]);
