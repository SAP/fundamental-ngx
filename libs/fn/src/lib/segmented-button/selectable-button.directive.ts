import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Inject,
    Input,
    Optional,
    Output
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DisabledBehavior, FN_DISABLED, SelectableItemToken, SelectComponentRootToken } from '@fundamental-ngx/fn/cdk';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fn-button][value]',
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[class.fn-button--selected]': 'selected',
        '[attr.aria-selected]': 'selected'
    },
    providers: [{ provide: SelectableItemToken, useExisting: SelectableButtonDirective }]
})
export class SelectableButtonDirective implements SelectableItemToken<string> {
    /**
     * Set selected state of the button
     */
    @Input()
    set selected(value: BooleanInput) {
        this.setSelected(coerceBooleanProperty(value));
    }

    get selected(): boolean {
        return this._selected;
    }

    /**
     * Native disabled attribute of button element
     */
    @HostBinding('disabled')
    @HostBinding('class.is-disabled')
    @HostBinding('attr.aria-disabled')
    get disabled(): boolean {
        return this._disabled$?.fnDisabled;
        // return this._disabled || (this.selectComponent !== null && this.selectComponent.disabled);
    }

    /**
     * Value of the button
     */
    @Input()
    value!: string;

    @Output()
    clicked = new EventEmitter();

    /** @hidden */
    _selected = false;

    constructor(
        @Optional() @Inject(SelectComponentRootToken) private selectComponent: SelectComponentRootToken,
        @Optional() @Inject(FN_DISABLED) private _disabled$: DisabledBehavior,
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    onClick($event: Event): void {
        $event.preventDefault();
        this.clicked.emit();
    }

    /** @hidden */
    setSelected(selected: boolean): void {
        if (selected !== this._selected) {
            this._selected = selected;
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    getSelected(): boolean {
        return this._selected;
    }

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
