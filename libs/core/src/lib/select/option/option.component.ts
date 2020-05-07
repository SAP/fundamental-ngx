import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { KeyUtil } from '../../utils/functions/key-util';
import { SelectProxy } from '../select-proxy.service';

let optionUniqueId: number = 0;

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
        '[attr.id]': 'id',
        '[tabindex]': 'disabled ? -1 : 0',
        role: 'option'
    },
    styles: [`
        .fd-list__item[aria-disabled="true"],
        .fd-list__item.is-disabled,
        .fd-list__item:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .fd-list__item:disabled:focus {
            outline: none;
        }
    `]

})
export class OptionComponent implements OnInit, OnDestroy {

    /** Option id attribute */
    @Input()
    id: string = `fd-option-${optionUniqueId++}`;

    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: any;

    /** Whether to disable this option specifically. */
    @Input()
    disabled: boolean = false;

    /** @hidden */
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    @HostListener('click')
    @HostListener('keydown', ['$event'])
    selectionHandler(event?: KeyboardEvent): void {
        if (!event || event && KeyUtil.isKey(event, [' ', 'Enter'])) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (!this.disabled) {
                this.setSelected(true, true);
            }
        }
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _selectProxy: SelectProxy,
        private _changeDetRef: ChangeDetectorRef
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
        return (this._elementRef.nativeElement.textContent || '').trim();
    }

    /** Set control selected state
     * @param value - whether is selected
     * @param controlChange - whether is a change initially coming from OptionComponent
     * */
    setSelected(value: boolean, controlChange: boolean): void {
        this.selected = value;

        if (value) {
            this._selectProxy.optionStateChange$.next({option: this, controlChange: controlChange})
        }
        this._changeDetRef.markForCheck();
    }

    /** Focuses the element. */
    focus(): void {
        (this._elementRef.nativeElement as HTMLElement).focus();
    }

    /** Returns HTMLElement representation of the component. */
    getHtmlElement(): HTMLElement {
        return this._elementRef.nativeElement as HTMLElement;
    }

    /** @hidden */
    private _observeValue(): void {
        this._subscriptions.add(
            this._selectProxy.value$.asObservable()
                .pipe(
                    filter(value => value !== undefined),
                    map(value => value === this.value)
                ).subscribe(isSelected => this.setSelected(isSelected, false))
        );
    }
}
