import { ChangeDetectionStrategy, Component, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Reset button.
 *
 * Used to reset resettable state by click.
 *
 */

export interface Resettable {
    reset: () => void;
    isResetAvailable$: Observable<boolean>;
}

export const RESETTABLE_TOKEN = new InjectionToken<Resettable>('Resettable');

@Component({
    selector: `fdp-table-reset-button`,
    template: `<button
        fd-button
        fdType="transparent"
        compact="true"
        label="Reset"
        i18n-label="@@platformTableDialogResetChangesButton"
        (click)="resettable.reset()"
        [disabled]="!(resettable.isResetAvailable$ | async)"
    ></button>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetButtonComponent {
    constructor(@Inject(RESETTABLE_TOKEN) public resettable: Resettable) {}
}
