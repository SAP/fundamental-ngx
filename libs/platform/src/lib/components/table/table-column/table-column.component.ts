import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core';
import { ColumnAlign } from '../enums';
import { FdpCellDef } from '../directives/table-cell.directive';
import { FdpHeaderCellDef } from '../directives/table-header.directive';

enum ColumnAlignEnum {
    Start = 'left',
    Center = 'center',
    End = 'right'
}

/**
 * The component that represents a table column.
 * ```html
 * <fdp-column
 *  name="name"
 *  key="name"
 *  label="Name"
 *  align="start">
 * </fdp-column>
 *
 * <fdp-column
 *  name="price"
 *  key="price.value">
 *  <fdp-table-header *fdpHeaderCellDef>Price</fdp-table-header>
 *  <fdp-table-cell *fdpCellDef="let item">
 *   {{item.price.value}} {{item.price.currency}}
 *  </fdp-table-cell>
 * </fdp-column>
 * ```
 * */
@Component({
    selector: 'fdp-column',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnComponent implements OnInit, OnDestroy {
    /** Column unique identifier. */
    @Input()
    name: string;

    /** Column data accessor. */
    @Input()
    key: string;

    /** Column header label. */
    @Input()
    label: string;

    /** Cell text alignment. */
    /** @ts-ignore */
    @Input() set align(align: ColumnAlign) {
        let _align;
        switch (align) {
            case ColumnAlign.CENTER:
                _align = ColumnAlignEnum.Center;
                break;
            case ColumnAlign.END:
                _align = ColumnAlignEnum.End;
                break;
            case ColumnAlign.START:
            default:
                _align = ColumnAlignEnum.Start;
        }

        this._align$.next(_align);
    }

    /** @ts-ignore */
    get align(): string {
        return this._align;
    }

    @ContentChild(FdpCellDef)
    fdpCellDef: FdpCellDef;

    @ContentChild(FdpHeaderCellDef)
    fdpHeaderCellDef: FdpHeaderCellDef;

    /** @hidden */
    private _align$: BehaviorSubject<ColumnAlignEnum> = new BehaviorSubject<ColumnAlignEnum>(null);

    /** @hidden */
    private _align: ColumnAlignEnum;

    /** @hidden */
    private _destroyed = new Subject<void>();

    /** @hidden */
    constructor(private readonly _rtlService: RtlService,
        private readonly _cd: ChangeDetectorRef) { }

    /** @hidden */
    ngOnInit(): void {
        this._listenToAlign();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    /** @hidden */
    private _listenToAlign(): void {
        this._align$
            .asObservable()
            .pipe(
                switchMap((align) =>
                    this._rtlService.rtl.pipe(
                        map(
                            (isRtl): ColumnAlignEnum => {
                                if (isRtl && align === ColumnAlignEnum.Start) {
                                    return ColumnAlignEnum.End;
                                }
                                if (isRtl && align === ColumnAlignEnum.End) {
                                    return ColumnAlignEnum.Start;
                                }

                                return align;
                            }
                        )
                    )
                ),
                takeUntil(this._destroyed)
            )
            .subscribe((align) => {
                this._align = align;
                this._cd.markForCheck();
            });
    }
}
