import { ChangeDetectionStrategy, Component, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface Resettable {
    reset: () => void;
    isResetAvailable$: Observable<boolean>;
}

export const RESETTABLE_TOKEN = new InjectionToken<Resettable>('Resettable');

@Component({
    selector: `fdp-view-settings-reset-button`,
    template: `<button
        fd-button
        fdType="transparent"
        compact="true"
        label="Reset"
        i18n-label="@@platformTableDialogButtonReset"
        (click)="resettable.reset()"
        [disabled]="!(resettable.isResetAvailable$ | async)"
    ></button>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSettingsResetButtonComponent {
    constructor(@Inject(RESETTABLE_TOKEN) public resettable: Resettable) {}
}
