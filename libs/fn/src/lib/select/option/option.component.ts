import { FocusableOption } from '@angular/cdk/a11y';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { FnClickedProvider } from '@fundamental-ngx/fn/cdk';
import { Subject, takeUntil } from 'rxjs';
import { Select } from '../select.interface';
import { FN_SELECT_PROVIDER } from '../select.token';

/**
 * Used to represent an option of the select component.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fn-option]',
    templateUrl: './option.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FnClickedProvider],
    host: {
        role: 'option',
        class: 'fn-select__item',
        '[attr.tabindex]': 'tabindex'
    }
})
export class OptionComponent implements OnDestroy, FocusableOption {
    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: string | any;

    /** Whether this option is selected. */
    @HostBinding('class.fn-select__item--selected')
    @Input()
    selected = false;

    /** The tabindex of the option. Default is 0. */
    @Input()
    tabindex = '0';

    /** Event emitted when an option is clicked. Emits an OptionComponent */
    @Output()
    optionClicked: EventEmitter<OptionComponent> = new EventEmitter<OptionComponent>();

    /** Whether this option is hidden */
    hidden = false;

    /** @hidden */
    private readonly _destroyed$ = new Subject<void>();

    /** @hidden */
    @HostListener('focusout')
    _onBlur(): void {
        this._elRef.nativeElement.classList.remove('focus-visible');
    }

    constructor(
        private _elRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        @Optional() @Inject(FN_SELECT_PROVIDER) private _selectComponent: Select | null,
        private _clicked: FnClickedProvider
    ) {
        this._clicked.pipe(takeUntil(this._destroyed$)).subscribe(() => {
            this.optionClicked.emit(this);
            this._selectComponent?.optionClicked(this);
        });
    }

    /** @hidden */
    get elementRef(): ElementRef {
        return this._elRef;
    }

    /** @hidden */
    focus(): void {
        setTimeout(() => {
            this._elRef.nativeElement.focus();
            this._elRef.nativeElement.classList.add('focus-visible');
        });
    }

    /** @hidden */
    _hide(): void {
        this._elRef.nativeElement.style.display = 'none';
        this.hidden = true;
    }

    /** @hidden */
    _show(): void {
        this._elRef.nativeElement.style.display = 'list-item';
        this.hidden = false;
    }

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
