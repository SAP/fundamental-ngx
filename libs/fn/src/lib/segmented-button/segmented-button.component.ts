/* eslint-disable @angular-eslint/no-host-metadata-property */
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
import { BehaviorSubject, Subject } from 'rxjs';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import { SelectableItemToken, SelectComponentRootToken, SelectionService } from '@fundamental-ngx/fn/cdk';

@Component({
    selector: 'fn-segmented-button',
    exportAs: 'fn-segmented-button',
    templateUrl: './segmented-button.component.html',
    styleUrls: ['./segmented-button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        ['class']: 'fn-segmented-button',
        'attr.role': 'group',
        'attr.aria-label': 'label'
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
export class SegmentedButtonComponent
    implements SelectComponentRootToken<string | string[]>, ControlValueAccessor, AfterContentInit, OnDestroy
{
    @Input()
    @coerceBoolean
    multiple!: boolean;

    @Input()
    set selected(value: string | string[]) {
        this.selectionService.setValue(value);
    }

    @Input()
    @coerceBoolean
    disabled!: boolean;

    @Output()
    selectedChange = new EventEmitter<string | string[]>();

    @ContentChildren(SelectableItemToken)
    buttons!: QueryList<SelectableItemToken<string>>;

    disabled$ = new BehaviorSubject<boolean>(false);
    destroy$: Subject<void> = new Subject();

    onTouched: any;
    onChange: (v: string | string[]) => void = (v) => {
        this.selectedChange.emit(v);
    };

    constructor(private selectionService: SelectionService, private changeDetectorRef: ChangeDetectorRef) {
        this.selectionService.registerRootComponent(this);
    }

    writeValue(value: string | string[]): void {
        this.selectionService.setValue(value);
    }

    registerOnChange(fn: (v: string | string[]) => void): void {
        this.onChange = (value: string | string[]) => {
            fn(value);
            this.selectedChange.emit(value);
        };
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }

    ngAfterContentInit(): void {
        this.selectionService.initialize(this.buttons);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
