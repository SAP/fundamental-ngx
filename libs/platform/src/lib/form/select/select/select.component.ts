import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Host,
    Input,
    isDevMode,
    Optional,
    Self,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { SelectComponent as CoreSelect } from '@fundamental-ngx/core/select';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { FormStates } from '@fundamental-ngx/core/shared';
import { FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';
import { BaseSelect } from '../commons/base-select';
import { SelectConfig } from '../select.config';

@Component({
    selector: 'fdp-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: SelectComponent, multi: true }]
})
export class SelectComponent extends BaseSelect implements AfterViewInit, AfterViewChecked {
    /**
     * @deprecated
     * Holds the control state of select
     */
    @Input()
    set selectState(state: FormStates) {
        if (isDevMode()) {
            console.warn('"selectState" is deprecated. Use "state" instead');
        }
        super.state = state;
    }
    get selectState(): FormStates {
        if (isDevMode()) {
            console.warn('"selectState" is deprecated. Use "state" instead');
        }
        return super.state;
    }

    /**
     * Directly sets value to the component that at the ends up at writeValue as well fires
     * change detections
     */
    @Input()
    set value(newValue: any) {
        this.setValue(newValue);
    }
    get value(): any {
        return this._value;
    }

    /** Should select be inlined. */
    @Input()
    inline = true;

    /** @hidden */
    @ViewChild(CoreSelect, { static: true })
    select: CoreSelect;

    /** @hidden */
    constructor(
        readonly cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        readonly _dynamicComponentService: DynamicComponentService,
        readonly _selectConfig: SelectConfig,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, _selectConfig, formField, formControl);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        // set columns ratio for 2
        if (this.firstColumnRatio && this.secondColumnRatio) {
            this._setColumnsRatio(this.firstColumnRatio, this.secondColumnRatio);
        }

        // set width to avoid resize
        if (this.width) {
            const controlItem = this.elementRef.nativeElement.querySelector('.fd-select__text-content') as HTMLElement;
            controlItem.style.width = this.width;
        }

        // setting option items
        this.select._options.forEach((option) => {
            const optionItem = option._getHtmlElement();
            // set maxWidth default is 40rem
            if (this.maxWidth) {
                optionItem.setAttribute('style', 'max-width: ' + this.maxWidth + 'px');
            }
            // by default text will be overlapped, below it will help to truncate
            if (this.noWrapText) {
                const listTitle = optionItem.querySelector('.fd-list__title');
                if (listTitle) {
                    const listTitleInnerHTML = listTitle.innerHTML;
                    listTitle.setAttribute('title', listTitleInnerHTML);
                    listTitle.setAttribute('aria-label', listTitleInnerHTML);
                    listTitle.classList.add('fd-list__title--no-wrap');
                }
            }
        });
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        this._cd.detectChanges();
    }

    /**
     * Define is selected item selected
     * @hidden
     */
    _isSelectedOptionItem(selectedItem: any): boolean {
        return this.value === this.lookupValue(selectedItem);
    }

    /** @hidden */
    _onSelection(value: any): void {
        this.setValue(value);
    }

    /** @hidden */
    private _setColumnsRatio(firstColumnRatio: number, secondColumnRatio: number): void {
        const totalProportions = firstColumnRatio + secondColumnRatio;
        const firstColumnProportion = Math.round((firstColumnRatio / totalProportions) * 100);
        const secondColumnProportion = 100 - firstColumnProportion;

        // setting option items
        this.select._options.forEach((option) => {
            const optionItem = option._getHtmlElement();
            const titleElement = <HTMLElement>optionItem.querySelector('.fd-list__title');
            this._setOptionAttribute(titleElement, firstColumnProportion);

            const secondaryElement = <HTMLElement>optionItem.querySelector('.fd-list__secondary');
            this._setOptionAttribute(secondaryElement, secondColumnProportion);
        });
    }

    /** @hidden */
    private _setOptionAttribute(element: HTMLElement, proportion: number): void {
        element.setAttribute('style', 'width: ' + proportion + '%; max-width: ' + proportion + '%');
    }
}
