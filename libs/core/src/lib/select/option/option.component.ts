import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { SelectComponent } from '../select.component';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { isKey } from '../../utils/functions/is-key';

/**
 * Used to represent an option of the select component.
 */
@Component({
    selector: 'fd-option',
    templateUrl: './option.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'fd-list__item',
        '[attr.aria-disabled]': 'disabled',
        '[attr.aria-selected]': 'selected',
        '[tabindex]': 'disabled ? -1 : 0',
        role: 'option'
    }
})
export class OptionComponent implements OnInit, OnDestroy {

    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: any;

    /** Whether to disable this option specifically. */
    @Input()
    disabled: boolean = false;

    /** Override for the view value of the option. If none is provided, the text content is used. */
    @Input()
    viewValue: string;

    /** Emitted when the selected state changes. */
    @Output()
    readonly selectedChange: EventEmitter<OptionComponent> = new EventEmitter<OptionComponent>();

    /** @hidden */
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    @HostListener('click')
    @HostListener('keydown', ['$event'])
    selectionHandler(event?: KeyboardEvent): void {
        if (!event || event && (isKey(event, ' ') || isKey(event, 'Enter'))) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (!this.disabled) {
                this.setSelected(true, true);
                this._changeDetRef.markForCheck();
            }
        }
    }

    /** @hidden */
    constructor(
        private _elRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef,
        private _selectComponent: SelectComponent
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._observeValue();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Returns the view value text of the option, or the viewValue input if it exists. */
    get viewValueText(): string {
        return this.viewValue || this.value;
    }

    /** Set control selected state
     * @param value - whether is selected
     * @param controlChange - whether is a change initially coming from OptionComponent
     * */
    setSelected(value: boolean, controlChange: boolean): void {
        this.selected = value;
        this.selectedChange.emit(this);

        if (value) {
            this._selectComponent.setSelectedOption(this, controlChange);
        }
    }

    /** Focuses the element. */
    focus(): void {
        (this._elRef.nativeElement as HTMLElement).focus();
    }

    /** Returns HTMLElement representation of the component. */
    getHtmlElement(): HTMLElement {
        return this._elRef.nativeElement as HTMLElement;
    }

    /** @hidden */
    private _observeValue(): void {
        this._subscriptions.add(
            this._selectComponent.value$.asObservable()
                .pipe(
                    filter(value => value !== undefined),
                    map(value => value === this.value)
                ).subscribe(isSelected => this.setSelected(isSelected, false))
        );
    }
}
