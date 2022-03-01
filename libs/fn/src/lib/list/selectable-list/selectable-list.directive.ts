import {
    AfterViewInit,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    QueryList
} from '@angular/core';
import {
    DestroyedBehavior,
    FocusableListService,
    selectableItemToFocusableItem,
    SelectableItemToken,
    SelectComponentRootToken,
    SelectionService
} from '@fundamental-ngx/fn/cdk';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, combineLatest, filter, map, startWith, switchMap } from 'rxjs';
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
        SelectionService,
        FocusableListService,
        DestroyedBehavior
    ]
})
export class SelectableListDirective<ValueType>
    implements SelectComponentRootToken<ValueType>, ControlValueAccessor, OnInit, AfterViewInit
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

    selectable$ = new BehaviorSubject<boolean>(false);
    viewInit$ = new BehaviorSubject<boolean>(false);
    @ContentChildren(SelectableItemToken) items!: QueryList<SelectableItemToken>;

    onTouched: any;

    constructor(
        private selectionService: SelectionService,
        private focusableListService: FocusableListService,
        private _destroy$: DestroyedBehavior
    ) {
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
        this.viewInit$
            .pipe(
                filter((init) => init),
                switchMap(() => this.items.changes.pipe(startWith(this.items))),
                map((itemsQuery) => itemsQuery.toArray()),
                map((items: SelectableItemToken[]) => items.map(selectableItemToFocusableItem)),
                tap((items) => this.focusableListService.initialize(items)),
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
