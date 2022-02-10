/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
    AfterContentInit,
    ChangeDetectionStrategy,
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
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, fromEvent, merge, Observable, Subject } from 'rxjs';
import { coerceArray } from '@angular/cdk/coercion';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import { SelectableItemToken } from '@fundamental-ngx/fn/cdk';

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
        }
    ]
})
export class SegmentedButtonComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {
    @Input()
    @coerceBoolean
    multiple!: boolean;

    @Input()
    set selected(value: string | string[]) {
        this.value$.next(value);
    }

    @Output()
    selectedChange = new EventEmitter<string | string[]>();

    @ContentChildren(SelectableItemToken)
    buttons!: QueryList<SelectableItemToken<string>>;

    value$ = new BehaviorSubject<string | string[]>('');
    disabled$ = new BehaviorSubject<boolean>(false);
    buttons$!: Observable<SelectableItemToken<string>[]>;
    refresh$: Subject<void> = new Subject();
    destroy$: Subject<void> = new Subject();
    normalizedValue$!: Observable<string[]>;

    onTouched: any;
    onChange: (v: string | string[]) => void = (v) => {
        this.selectedChange.emit(v);
    };

    constructor() {
        this.normalizedValue$ = this.value$.pipe(
            map((value) => {
                const coerced = coerceArray(value);
                return coerced.filter(Boolean);
            })
        );
    }

    writeValue(value: string | string[]): void {
        this.value$.next(value);
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

    ngAfterContentInit(): void {
        this.buttons$ = this.buttons.changes.pipe(
            startWith(this.buttons),
            map((queryList) => queryList.toArray())
        );
        this.initialize();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    private buttonClicked(button: SelectableItemToken<string>): void {
        const currentValue = coerceArray(this.value$.value).filter(Boolean);
        const wasSelected = currentValue.includes(button.value);
        let val: string[];
        if (wasSelected) {
            val = currentValue.filter((v) => v !== button.value);
        } else {
            val = [button.value, ...currentValue];
        }
        const properValues = this.getProperValues(val);
        this.value$.next(properValues);
        this.onChange(properValues);
    }

    private initialize(): void {
        this.buttons$
            .pipe(
                tap(() => this.refresh$.next()),
                tap((buttons) => this.listenToButtons(buttons)),
                takeUntil(this.destroy$)
            )
            .subscribe();
        combineLatest([this.normalizedValue$, this.buttons$])
            .pipe(
                tap(([value, buttons]) => {
                    if (value.length === 0 && buttons.some((btn) => btn.getSelected())) {
                        const selectedValues = this.getSelectedValues(buttons);
                        this.onChange(selectedValues);
                        return this.value$.next(selectedValues);
                    }
                    buttons.forEach((button) => {
                        button.setSelected(value.includes(button.value));
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    private listenToButtons(buttons: SelectableItemToken<string>[]): void {
        const unsubscribe$ = merge(this.refresh$, this.destroy$);
        for (const button of buttons) {
            const htmlElement = button.elementRef().nativeElement;
            const events = merge(
                fromEvent(htmlElement, 'click'),
                fromEvent<KeyboardEvent>(htmlElement, 'keydown').pipe(
                    filter((event) => KeyUtil.isKeyCode(event, [ENTER, SPACE])),
                    tap((event) => event.preventDefault())
                )
            );
            events
                .pipe(
                    tap(() => this.buttonClicked(button)),
                    takeUntil(unsubscribe$)
                )
                .subscribe();
        }
    }

    private getSelectedValues(buttons: SelectableItemToken<string>[]): string | string[] {
        const selectedValues = buttons.filter((btn) => btn.getSelected()).map((btn) => btn.value);
        return this.getProperValues(selectedValues);
    }

    private getProperValues(values: string[]): string | string[] {
        if (this.multiple) {
            return values;
        }
        return values[0];
    }
}
