import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Signal, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

/**
 * Reset button.
 *
 * Used to reset resettable state by click.
 *
 */

export interface Resettable {
    reset: () => void;
    isResetAvailable$: Signal<boolean>;
}

export const RESETTABLE_TOKEN = new InjectionToken<Resettable>('Resettable');

@Component({
    selector: `fdp-table-reset-button`,
    template: `<button
        fd-button
        fdType="transparent"
        [label]="'platformTable.resetChangesButtonLabel' | fdTranslate"
        (click)="resettable.reset()"
        [disabled]="!resettable.isResetAvailable$()"
    ></button>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonComponent, FdTranslatePipe]
})
export class ResetButtonComponent {
    /** @hidden */
    constructor(@Inject(RESETTABLE_TOKEN) public resettable: Resettable) {}
}
