import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CvaControl, CvaDirective, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { BehaviorSubject, combineLatest, map, merge, of, switchMap, tap } from 'rxjs';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { FD_MENU_ITEM_COMPONENT } from '../../menu.tokens';
import { SegmentedButtonOptionDirective } from './segmented-button-option.directive';

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
        { provide: FD_FORM_FIELD_CONTROL, useExisting: SegmentedButtonHeaderDirective, multi: true }
    ]
})
export class SegmentedButtonHeaderDirective<T> implements AfterViewInit {
    /** @ignore */
    @Input()
    valueComparator: (a: T, b: T) => boolean = strictEquals;

    /** @ignore */
    readonly elementRef = inject(ElementRef);
    /** @ignore */
    readonly menuItem = inject<MenuItemComponent>(FD_MENU_ITEM_COMPONENT, { host: true });

    /** @ignore */
    private _cvaControl: CvaControl<T> = inject(CvaControl)!;
    /** @ignore */
    private _destroyRef = inject(DestroyRef)!;

    /** @ignore */
    private _options$ = new BehaviorSubject<SegmentedButtonOptionDirective<T>[]>([]);

    /** @ignore */
    constructor() {
        this.menuItem.hasSeparator = true;
    }

    /** @ignore */
    setOptions(options: SegmentedButtonOptionDirective<T>[]): void {
        this._options$.next(options);
    }

    /** @ignore */
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
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }
}
