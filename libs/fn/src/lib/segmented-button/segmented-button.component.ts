/* eslint-disable @angular-eslint/no-host-metadata-property */
import { BooleanInput } from '@angular/cdk/coercion';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import {
    SelectableItemToken,
    SelectableListValueType,
    SelectComponentRootToken,
    SelectionService
} from '@fundamental-ngx/fn/cdk';

@Component({
    selector: 'fn-segmented-button',
    exportAs: 'fn-segmented-button',
    template: ` <ng-content></ng-content>`,
    styleUrls: ['./segmented-button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fn-segmented-button',
        role: 'group',
        '[attr.aria-label]': 'label'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SegmentedButtonComponent),
            multi: true
        },
        {
            provide: SelectComponentRootToken,
            useExisting: forwardRef(() => SegmentedButtonComponent)
        },
        SelectionService
    ]
})
export class SegmentedButtonComponent<T>
    implements SelectComponentRootToken<T>, ControlValueAccessor, AfterContentInit, OnDestroy
{
    /**
     * Allow multiple item selection
     */
    @Input()
    @coerceBoolean
    multiple!: BooleanInput;

    /**
     * Allow to unselect all elements
     */
    @Input()
    @coerceBoolean
    toggle!: BooleanInput;

    /**
     * Aria label for element
     */
    @Input()
    label!: string;

    /**
     * Describe initially selected elements
     */
    @Input()
    set selected(value: SelectableListValueType<T>) {
        this.selectionService.setValue(value);
    }

    /**
     * Input for disabling all child elements
     */
    @Input()
    @coerceBoolean
    disabled!: BooleanInput;

    /**
     * Event, notifying about selected elements change after data model has been updated
     */
    @Output()
    selectedChange = new EventEmitter<SelectableListValueType<T>>();

    /** @hidden */
    @ContentChildren(SelectableItemToken)
    buttons!: QueryList<SelectableItemToken<string>>;

    /** @hidden */
    destroy$: Subject<void> = new Subject();

    /** @hidden */
    onTouched: any;

    /** @hidden */
    onChange: (v: SelectableListValueType<T>) => void = (v) => {
        this.selectedChange.emit(v);
    };

    /** @hidden */
    constructor(private selectionService: SelectionService, private changeDetectorRef: ChangeDetectorRef) {
        this.selectionService.registerRootComponent(this);
    }

    /** @hidden */
    writeValue(value: string | string[]): void {
        this.selectionService.setValue(value);
    }

    /** @hidden */
    registerOnChange(fn: (v: SelectableListValueType<T>) => void): void {
        this.onChange = (value: SelectableListValueType<T>) => {
            fn(value);
            this.selectedChange.emit(value);
        };
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.selectionService.initialize(this.buttons);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
