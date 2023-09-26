import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, InjectionToken, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
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
        [label]="'platformTable.resetChangesButtonLabel' | fdTranslate"
        (click)="resettable.reset()"
        [disabled]="(resettable.isResetAvailable$ | async) === false"
    ></button>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonComponent, AsyncPipe, FdTranslatePipe]
})
export class ResetButtonComponent {
    /** @hidden */
    constructor(@Inject(RESETTABLE_TOKEN) public resettable: Resettable) {}
}
