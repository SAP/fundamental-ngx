import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    Optional,
    Renderer2,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormFieldControl } from '../form-control';
import { NgControl, NgForm } from '@angular/forms';
import { ComboboxComponent as FdComboBoxComponent } from '@fundamental-ngx/core';
import { ComboBoxDataSource, DATA_PROVIDERS, DataProvider, isDataSource } from '../../../domain/data-source';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArrayComboBoxDataSource } from '../../../domain/array-data-source';
import { isJsObject } from '../../../utils/lang';
import { CollectionBaseInput } from '../collection-base.input';

type FdpComboBoxDataSource<T> = ComboBoxDataSource<T> | T[];


/**
 * Basic ComboBox implementation including datasource based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Data-Components-Standard-for-Enterprise-scale
 * documents.
 *
 *
 *
 */
@Component({
    selector: 'fdp-combo-box',
    templateUrl: 'combo-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: FormFieldControl, useExisting: ComboBoxComponent, multi: true }
    ]
})
export class ComboBoxComponent extends CollectionBaseInput {

    @Input()
    maxHeight: string = '250px';

    @Input()
    inShellbar: boolean = false;


    @Input()
    get dataSource(): FdpComboBoxDataSource<any> {
        return this._dataSource;
    }

    set dataSource(value: FdpComboBoxDataSource<any>) {
        if (value) {
            this.initializeDS(value);
        }
    }

    @Input()
    get value(): any {
        return super.getValue();
    }

    set value(value: any) {
        super.setValue(value);
    }

    /**
     * Todo: Name of the entity for which DataProvider will be loaded. You can either pass list of
     * items or use this entityClass and internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     *
     *
     */
    @Input()
    entityClass: string;

    @ViewChild(FdComboBoxComponent, { static: true, read: ElementRef })
    protected _elementRef: ElementRef;

    @ViewChild(FdComboBoxComponent, { static: true })
    protected _comboBox: FdComboBoxComponent;

    /**
     * Fill in popover values.
     */
    _suggestions: Array<any>;

    /**
     * Sets if we deal with primitive string or object
     */
    elementTypeIsObject = false;

    protected _dataSource: FdpComboBoxDataSource<any>;
    private _dsSubscription: Subscription | null;


    constructor(protected _cd: ChangeDetectorRef,
                /**
                 * This data providers is initial implementation, but in the future we expect actual Service to
                 * handle the registry of data providers
                 */
                @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
                private _renderer: Renderer2,
                @Optional() @Self() public ngControl: NgControl,
                @Optional() @Self() public ngForm: NgForm) {

        super(_cd, ngControl, ngForm);
    }


    ngOnInit(): void {
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && this.providers.has(this.entityClass)) {
            this.dataSource = new ComboBoxDataSource(this.providers.get(this.entityClass));
        }
    }


    /**
     * FD combo is missing ID and name therefore we need to use render to set it manually
     */
    ngAfterViewInit(): void {
        if (this._elementRef && this.id) {
            this._renderer.setAttribute(this.input(), 'id', this.id);
            this._renderer.setAttribute(this.input(), 'name', this.name);
            this._renderer.setAttribute(this.input(), 'tabindex', '0');
        }

        this.patchQueryMethod();
        super.ngAfterViewInit();
    }


    // writeValue(value: any): void {
    //     super.writeValue(value);
    //
    //     // Hack: force child to refresh to child since they dont use onPush, cna be removed in new
    //     // fd version as they call internally markForCheck
    //     setTimeout(() => {
    //         this._cd.markForCheck();
    //     }, 200);
    // }

    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
        }
        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }


    onContainerClick(event: MouseEvent): void {
        if (this._elementRef && !this.focused) {
            this.input().focus();
        }
    }

    protected input(): HTMLInputElement {
        return this._comboBox.searchInputElement.nativeElement;
    }


    private initializeDS(ds: FdpComboBoxDataSource<any>): void {
        this._suggestions = [];

        if (isDataSource(this.dataSource)) {
            this.dataSource.close();

            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = null;
            }
        }
        // Convert ComboBoxDataSource<T> | T[] as DataSource
        this._dataSource = this.openDataStream(ds);
    }

    private openDataStream(ds: FdpComboBoxDataSource<any>): ComboBoxDataSource<any> {
        const initDataSource = this.toDataStream(ds);

        if (initDataSource === undefined) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }
        /**
         * This is single point of data entry to the component. We dont want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = initDataSource.open().pipe(
            takeUntil(this._destroyed)
        ).subscribe(data => {
            this._suggestions = data || [];

            this.elementTypeIsObject = isJsObject(this._suggestions[0]);
            this.stateChanges.next('initDataSource.open().');
            this._cd.markForCheck();
        });
        initDataSource.dataProvider.setLookupKey(this.lookupKey);

        // initial data fetch
        initDataSource.match('*');
        return initDataSource;
    }

    private toDataStream(ds: FdpComboBoxDataSource<any>): ComboBoxDataSource<any> {
        if (isDataSource(ds)) {
            return ds;
        } else if (Array.isArray(ds)) {
            // default implementation to work on top of arrays
            return new ArrayComboBoxDataSource<any>(ds);
        }
        return undefined;
    }

    /**
     * Patching query with our custom lookup logic
     */
    private patchQueryMethod() {
        if (this._comboBox) {
            this._comboBox.handleSearchTermChange = () => {
                this.ds.match(this._comboBox.inputTextValue);

                if (this._comboBox.popoverComponent) {
                    this._comboBox.popoverComponent.updatePopover();
                }
            };
        }
    }

    protected get ds(): ComboBoxDataSource<any> {
        return (<ComboBoxDataSource<any>>this.dataSource);
    }

    // bindings as functions
    // @formatter:off
    displayFn = (value: any) => {
        return this.displayValue(value);
    };
    // @formatter:off

}

