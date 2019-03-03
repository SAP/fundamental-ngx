import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const alertFadeNgIf: AnimationTriggerMetadata = trigger(
    'fadeAlertNgIf',
    [
        transition(
            ':enter', [
                style({opacity: 0}),
                animate('250ms ease-in-out', style({opacity: 1}))
            ]
        ),
        transition(
            ':leave', [
                style({opacity: 1}),
                animate('400ms ease-in-out', style({opacity: 0}))
            ]
        )
    ]
);

export const alertContainerNgIf: AnimationTriggerMetadata = trigger(
    'alertContainerNgIf',
    [
        transition(
            ':leave', [
                style({opacity: 1}),
                animate('400ms ease-in-out', style({opacity: 0}))
            ]
        )
    ]
);
