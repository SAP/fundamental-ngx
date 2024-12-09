import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    OnInit,
    ViewEncapsulation,
    inject,
    input,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { DialogRef } from '../utils/dialog-ref.class';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-dialog-full-screen-toggler-button]',
    imports: [IconComponent],
    template: `<fd-icon [glyph]="_fullscreen$() ? 'exitfullscreen' : 'full-screen'"></fd-icon>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-button]': 'true',
        '[class.is-compact]': '!mobile()',
        '[class.fd-button--transparent]': 'true',
        '[attr.title]': 'title()'
    }
})
export class DialogFullScreenTogglerButtonComponent implements OnInit {
    /** Displays dialog close button in mobile mode */
    mobile = input(false);

    /** DialogRef direct reference. Used with template-based dialogs. */
    dialogRef = input<Nullable<DialogRef>>();

    /** add title dynamically to add a tooltip */
    title = input<string>();

    /** @hidden */
    _fullscreen$ = signal(false);

    /** @hidden */
    private readonly _ref = inject(DialogRef, {
        optional: true
    });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    ngOnInit(): void {
        const ref = this._ref || this.dialogRef();
        ref?.fullScreen.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((isFullScreen) => {
            this._fullscreen$.set(isFullScreen);
        });
    }
}
