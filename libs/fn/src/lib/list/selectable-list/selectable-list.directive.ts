import {
    AfterViewInit,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList
} from '@angular/core';
import { SelectableItemToken, SelectComponentRootToken, SelectionService } from '@fundamental-ngx/fn/cdk';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';

@Directive({
    selector: 'fn-list[selectable], [fn-list][selectable]',
    exportAs: 'fnListSelectable',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectableListDirective),
            multi: true
        },
        {
            provide: SelectComponentRootToken,
            useExisting: forwardRef(() => SelectableListDirective)
        },
        SelectionService
    ]
})
export class SelectableListDirective<ValueType>
    implements SelectComponentRootToken<ValueType>, ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
{
    @Input()
    set selectable(isSelectable: BooleanInput) {
        this.selectable$.next(coerceBooleanProperty(isSelectable));
    }

    @Input()
    @coerceBoolean
    multiple = true;

    @Input()
    @coerceBoolean
    toggle = true;

    @Input()
    selected?: ValueType | ValueType[];

    @Output()
    selectedChange = new EventEmitter<ValueType | ValueType[]>();

    disabled!: boolean;

    selectable$ = new BehaviorSubject<boolean>(false);
    viewInit$ = new BehaviorSubject<boolean>(false);
    @ContentChildren(SelectableItemToken) items!: QueryList<SelectableItemToken>;

    onTouched: any;
    private _destroy$ = new Subject<void>();

    constructor(private selectionService: SelectionService) {
        this.selectionService.registerRootComponent(this);
        combineLatest([this.selectable$, this.viewInit$])
            .pipe(
                tap(([selectable, viewInit]) => {
                    if (selectable && viewInit) {
                        this.selectionService.initialize(this.items);
                    } else {
                        this.selectionService.clear();
                    }
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    toggleSelection(item: SelectableItemToken): void {
        if (item.getSelected()) {
            this.selectionService.deselectItem(item);
        } else {
            this.selectionService.selectItem(item);
        }
    }

    writeValue(val: ValueType | ValueType[]): void {
        this.selectionService.setValue(val);
    }

    registerOnChange(fn: any): void {
        this.onChange = (value) => {
            this.onChange(value);
            fn(fn);
        };
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnDestroy(): void {
        this._destroy$.next();
    }

    onChange: (value: ValueType | ValueType[]) => void = (val) => {
        this.selectedChange.emit(val);
    };

    ngAfterViewInit(): void {
        this.viewInit$.next(true);
    }

    ngOnInit(): void {
        this.selectionService.setValue(this.selected);
    }
}
