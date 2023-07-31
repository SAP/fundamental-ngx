import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

/**
 * @deprecated
 * Alert component is deprecated since version 0.16.0
 * Message Strip component should be used instead.
 */
export const alertFadeNgIf: AnimationTriggerMetadata = trigger('fadeAlertNgIf', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(
            '250ms ease-in-out',
            style({
                opacity: 1
            })
        )
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            marginTop: '*',
            paddingTop: '*',
            paddingBottom: '*',
            height: '*',
            overflow: 'hidden'
        }),
        animate(
            '400ms ease-in-out',
            style({
                opacity: 0,
                marginTop: 0,
                paddingTop: 0,
                paddingBottom: 0,
                height: 0,
                overflow: 'hidden'
            })
        )
    ])
]);

export const alertContainerNgIf: AnimationTriggerMetadata = trigger('alertContainerNgIf', [
    transition(':leave', [style({ opacity: 1 }), animate('400ms ease-in-out', style({ opacity: 0 }))])
]);
