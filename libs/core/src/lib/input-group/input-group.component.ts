import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    ViewEncapsulation,
    ContentChild,
    TemplateRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    OnDestroy,
    OnInit, Optional
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { InputGroupAddOnDirective, InputGroupInputDirective } from './input-group-directives';
import { FormStates } from '../form/form-control/form-states';
import { ContentDensityService } from '../utils/public_api';

export type InputGroupPlacement = 'before' | 'after';

/**
 * The component that represents an input group.
 * The input group includes form inputs with add-ons that allow the user to better understand the information being entered.
 *
 * ```html
 * <fd-input-group [placement]="'after'" [addOnText]="'$'" [placeholder]="'Amount'">
 * </fd-input-group>
 * ```
 */
@Component({
    selector: 'fd-input-group',
    templateUrl: './input-group.component.html',
    styleUrls: ['./input-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {

    /** Input template */
    @Input()
    inputTemplate: TemplateRef<any>;

    /**
     * The placement of the add-on.
     * Options include *before* and *after*
     */
    @Input()
    placement: InputGroupPlacement = 'after';

    /** Whether the input group is in compact mode. */
    @Input()
    compact: boolean = null;

    /** Whether the input group is inline. */
    @Input()
    inline = false;

    /** Placeholder for the input group. */
    @Input()
    placeholder: string;

    /** The text for the add-on. */
    @Input()
    addOnText: string;

    /** Whether AddOn Button should be focusable */
    @Input()
    buttonFocusable = true;

    /** The type of the input, used in Input Group. By default value is set to 'text' */
    @Input()
    type = 'text';

    /** The icon value for the add-on. */
    @Input()
    glyph: string;

    /** Whether the icon add-on or the text add-on is a button. */
    @Input()
    button: boolean;

    /** Whether the input group is disabled. */
    @Input()
    disabled: boolean;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether the input group is a popover control
     */
    @Input()
    isControl = false;

    /** @hidden */
    @Input()
    isExpanded = false;

    /** Label applied to button with glyph element. */
    @Input()
    glyphAriaLabel: string;

    /** Event emitted when the add-on button is clicked. */
    @Output()
    addOnButtonClicked: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden Focus state */
    get isFocused(): boolean {
        return this._isFocused;
    };

    /** @hidden */
    private _isFocused = false;

    /** An RxJS Subject that will kill the stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    @ContentChild(InputGroupInputDirective)
    inputElement: InputGroupInputDirective;

    /** @hidden */
    @ContentChild(InputGroupAddOnDirective)
    addOnElement: InputGroupAddOnDirective;

    /** @hidden */
    constructor (
        private readonly elementRef: ElementRef,
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    inputTextValue: string;

    /**
     * Whether or not the input coup is in the shellbar. Only for internal use by combobox component
     * @hidden
     */
    inShellbar = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** Get the value of the text input. */
    get inputText(): string {
        return this.inputTextValue;
    }

    /** Set the value of the text input. */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenElementEvents();
        if (this.compact === null && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService.contentDensity.subscribe(density => {
                this.compact = density === 'compact';
                this.changeDetectorRef.detectChanges();
            }));
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.inputTextValue = value;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.detectChanges();
    }

    /** @hidden */
    setInShellbar(value: boolean): void {
        this.inShellbar = value;
        this.changeDetectorRef.detectChanges();
    }

    /** @hidden */
    buttonClicked($event): void {
        this.addOnButtonClicked.emit($event);
    }

    /** @hidden */
    preventFocus(event: MouseEvent): void {
        if (!this.buttonFocusable) {
            event.preventDefault();
        }
    }
    /** @hidden */
    private _listenElementEvents(): void {
        fromEvent(this.elementRef.nativeElement, 'focus', { capture: true }).pipe(
            filter(event => event['target']?.tagName !== 'BUTTON'),
            tap(() => {
                this._isFocused = true;
                this.changeDetectorRef.markForCheck();
            }),
            takeUntil(this._onDestroy$)
        ).subscribe();
        fromEvent(this.elementRef.nativeElement, 'blur', { capture: true }).pipe(
            tap(() => {
                this._isFocused = false;
                this.changeDetectorRef.markForCheck();
            }),
            takeUntil(this._onDestroy$)
        ).subscribe();
    }
}
