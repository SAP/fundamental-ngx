import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';
import { CvaControl, CvaDirective, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { SegmentedButtonOptionDirective } from './segmented-button-option.directive';
import { BehaviorSubject, combineLatest, map, merge, of, switchMap, tap } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { takeUntil } from 'rxjs/operators';
import { FD_MENU_ITEM_COMPONENT } from '../../menu.tokens';

const strictEquals = (a: unknown, b: unknown): boolean => a === b;

@Directive({
    selector: 'li[fd-menu-item][fdMenuSegmentedButtonHeader]',
    standalone: true,
    hostDirectives: [
        {
            directive: CvaDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['id:inputId', 'stateMessage', 'disabled', 'readonly', 'name']
        }
    ],
    providers: [
        CvaControl,
        DestroyedService,
        { provide: FD_FORM_FIELD_CONTROL, useExisting: SegmentedButtonHeaderDirective, multi: true }
    ]
})
export class SegmentedButtonHeaderDirective<T> implements AfterViewInit {
    /** @hidden */
    @Input()
    valueComparator: (a: T, b: T) => boolean = strictEquals;

    /** @hidden */
    readonly elementRef = inject(ElementRef);
    /** @hidden */
    readonly menuItem = inject<MenuItemComponent>(FD_MENU_ITEM_COMPONENT, { host: true });

    /** @hidden */
    private _cvaControl: CvaControl<T> = inject(CvaControl)!;
    /** @hidden */
    private _destroy$ = inject(DestroyedService)!;

    /** @hidden */
    private _options$ = new BehaviorSubject<SegmentedButtonOptionDirective<T>[]>([]);

    /** @hidden */
    constructor() {
        this.menuItem.hasSeparator = true;
    }

    /** @hidden */
    setOptions(options: SegmentedButtonOptionDirective<T>[]): void {
        this._options$.next(options);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._cvaControl.listenToChanges();
        combineLatest([this._options$, this._cvaControl.cvaDirective?.ngControl?.valueChanges || of(undefined)])
            .pipe(
                tap(([options, value]) => {
                    options.forEach((option, index) => {
                        option.menuItem.hasSeparator = index === options.length - 1;
                        option.selected = this.valueComparator(option.value, value);
                    });
                }),
                switchMap(([options]) =>
                    merge(...options.map((option) => option.clicked.pipe(map(() => option.value))))
                ),
                tap((val) => this._cvaControl.cvaDirective?.setValue(val)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
