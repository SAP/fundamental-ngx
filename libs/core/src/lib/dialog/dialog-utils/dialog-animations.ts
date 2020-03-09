import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const dialogFadeNgIf: AnimationTriggerMetadata = trigger(
    'dialog-fade',
    [
        transition(
            ':enter', [
                style({opacity: 0}),
                animate('150ms ease-in-out', style({opacity: 1}))
            ]
        ),
        transition(
            ':leave', [
                style({opacity: 1}),
                animate('75ms ease-in-out', style({opacity: 0}))
            ]
        )
    ]
);
