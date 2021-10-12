import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContentDensityService } from '@fundamental-ngx/core/utils';

let searchUniqueId = 0;

/**
 * The Search component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the search.
 */
@Component({
    selector: 'fn-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ExperimentalSearchComponent),
            multi: true
        }
    ],
    host: {
        class: 'fn-search',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalSearchComponent implements ControlValueAccessor, OnInit, OnDestroy {
    /** @hidden */
    @ViewChild('searchInput')
    inputElement: ElementRef<HTMLInputElement>;

    @Input()
    placeholder = '';

    @Input()
    /** return the value in the text box */
    @Input()
    get value(): string {
        return this._getValue();
    }

    set value(value: string) {
        this._setValue(value);
    }

    /** Optional text for the active state of the search. */
    @Input()
    activeText = '';

    /** Optional text for the inactive state of the search. */
    @Input()
    inactiveText = '';

    /** Whether the search is disabled. */
    @Input()
    disabled = false;

    /** Id for the search component. If omitted, a unique one is generated. */
    @Input()
    id = `fn-search-${searchUniqueId++}`;

    /** Sets input name attribute. */
    @Input()
    name: string;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the search is checked. */
    @Input()
    checked = false;

    /** Whether the search is semantic */
    @Input()
    semantic = false;

    /** Whether the search is compact */
    @Input()
    compact?: boolean;

    /** aria-label attribute of the inner input element. */
    @Input()
    ariaLabel: string = null;

    /** aria-labelledby attribute of the inner input element. */
    @Input()
    ariaLabelledby: string = null;

    /** Semantic Label Accept set for Accessibility */
    @Input()
    semanticAcceptLabel = 'Accept';

    /** Semantic Label Decline set for Accessibility */
    @Input()
    semanticDeclineLabel = 'Decline';

    /**
     * Event fired when the state of the search changes.
     * *$event* can be used to retrieve the new state of the search.
     */
    @Output()
    readonly search: EventEmitter<string> = new EventEmitter<string>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    private _value = '';

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    this.compact = density !== 'cozy';
                    this._changeDetectorRef.markForCheck();
                })
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Set focus on the input element. */
    focus(): void {
        this.inputElement.nativeElement.focus();
    }

    /** Get the id of the inner input element of the search. */
    get innerInputId(): string {
        return `${this.id}-input`;
    }

    /** Get the id of the semantic label element of the search. */
    get _semanticLabelId(): string {
        return `${this.id}-semantic-label`;
    }

    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the search.
     */
    writeValue(value: any): void {
        this._value = value;
        this.onChange(value);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the search.
     */
    registerOnChange(fn: Function): void {
        this.onChange = fn;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the search.
     */
    registerOnTouched(fn: Function): void {
        this.onTouched = fn;
    }

    resetValue(): void {
        this._setValue('');
        this.inputElement.nativeElement.focus();
        this.emitSearch();
    }

    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the search.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetectorRef.detectChanges();
    }

    emitSearch(): void {
        this.search.emit(this.value);
    }

    private _setValue(value: any): void {
        if (value !== this._value) {
            this.writeValue(value);
            this._changeDetectorRef.markForCheck();
        }
    }

    private _getValue(): any {
        return this._value;
    }
}
