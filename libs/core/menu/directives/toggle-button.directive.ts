import { AfterViewInit, DestroyRef, Directive, HostListener, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CvaControl, CvaDirective, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { tap } from 'rxjs';
import { MenuInteractiveComponent } from '../menu-interactive.component';
import { TOGGLE_MENU_ITEM } from '../menu.tokens';

@Directive({
    selector: 'button[fd-menu-interactive][toggle]',
    standalone: true,
    hostDirectives: [
        {
            directive: CvaDirective,
            inputs: ['id:inputId', 'stateMessage', 'disabled', 'readonly', 'name']
        }
    ],
    providers: [
        CvaControl,
        { provide: FD_FORM_FIELD_CONTROL, useExisting: ToggleButtonDirective, multi: true },
        { provide: TOGGLE_MENU_ITEM, useExisting: ToggleButtonDirective }
    ]
})
export class ToggleButtonDirective implements AfterViewInit {
    /** @hidden */
    private _cvaControl = inject<CvaControl<boolean>>(CvaControl);

    /** @hidden */
    private _destroyRef = inject(DestroyRef)!;

    /** @hidden */
    private _interactiveItemComponent = inject(MenuInteractiveComponent, { host: true });

    /**
     * Listen on interaction events that should cause the value update
     * */
    @HostListener('click')
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
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }
}
