import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    Input,
    OnInit,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { DialogRef } from '../utils/dialog-ref.class';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-dialog-full-screen-toggler-button]',
    standalone: true,
    imports: [IconComponent],
    template: `<fd-icon [glyph]="_fullscreen ? 'exitfullscreen' : 'full-screen'"></fd-icon>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-button]': 'true',
        '[class.is-compact]': '!mobile',
        '[class.fd-button--transparent]': 'true',
        '[attr.title]': 'title'
    }
})
export class DialogFullScreenTogglerButtonComponent implements OnInit {
    /** Displays dialog close button in mobile mode */
    @Input()
    mobile = false;

    /** add title dynamically to add a tooltip */
    @Input()
    title: string;

    /** @hidden */
    _fullscreen = false;

    /** @hidden */
    private readonly _ref = inject(DialogRef, {
        optional: true
    });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    ngOnInit(): void {
        this._ref?.fullScreen.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((isFullScreen) => {
            this._fullscreen = isFullScreen;
            this._cdr.detectChanges();
        });
    }
}
