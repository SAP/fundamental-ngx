import { AfterViewInit, Directive, HostListener, inject } from '@angular/core';
import { CvaControl, CvaDirective, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { takeUntil, tap } from 'rxjs';
import { MenuInteractiveComponent } from '../menu-interactive.component';
import { TOGGLE_MENU_ITEM } from '../menu.tokens';

@Directive({
    selector: 'button[fd-menu-interactive][toggle]',
    standalone: true,
    hostDirectives: [
        {
            directive: CvaDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['id:inputId', 'stateMessage', 'disabled', 'readonly', 'name']
        }
    ],
    providers: [
        CvaControl,
        DestroyedService,
        { provide: FD_FORM_FIELD_CONTROL, useExisting: ToggleButtonDirective, multi: true },
        { provide: TOGGLE_MENU_ITEM, useExisting: ToggleButtonDirective }
    ]
})
export class ToggleButtonDirective implements AfterViewInit {
    /** @hidden */
    private _cvaControl: CvaControl<boolean> = inject(CvaControl)!;

    /** @hidden */
    private _destroy$ = inject(DestroyedService)!;

    /** @hidden */
    private _interactiveItemComponent = inject(MenuInteractiveComponent, { host: true });

    /**
     * Listen on interaction events that should cause the value update
     * */
    @HostListener('click', ['$event'])
    onClick(): void {
        this._cvaControl.cvaDirective?.setValue(!this._cvaControl.cvaDirective!.value);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._cvaControl.listenToChanges();
        this._cvaControl.cvaDirective?.ngControl?.valueChanges
            ?.pipe(
                tap((value: boolean) => {
                    this._interactiveItemComponent.startAddon._addonGlyph.glyph = value ? 'accept' : undefined;
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
