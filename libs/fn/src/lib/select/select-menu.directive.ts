import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ContentChildren,
    Directive,
    HostBinding,
    HostListener,
    Optional,
    QueryList
} from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';

@Directive({
    selector: '[fnSelectMenu]'
})
export class SelectMenuDirective implements AfterViewInit {
    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fn-select__menu';

    /** @hidden */
    @HostBinding('role')
    private readonly _role = 'listbox';

    /** @hidden */
    @ContentChildren(OptionComponent, { descendants: true })
    options: QueryList<OptionComponent>;

    /** @hidden */
    _focusKeyManager: FocusKeyManager<OptionComponent>;

    /** @hidden */
    constructor(@Optional() private readonly _selectComponent: SelectComponent) {
        this._selectComponent?._setMenu(this);
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            event.preventDefault();

            // passing the event to key manager so, we get a change fired
            this._focusKeyManager.onKeydown(event);
        } else if (KeyUtil.isKeyCode(event, TAB)) {
            this._selectComponent?._hideMenu();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._focusKeyManager = new FocusKeyManager<OptionComponent>(this._selectComponent.options)
            .withWrap()
            .withVerticalOrientation(true)
            .skipPredicate((item) => item.hidden);

        setTimeout(() => {
            this._focusKeyManager.setFirstItemActive();
        });
    }
}
