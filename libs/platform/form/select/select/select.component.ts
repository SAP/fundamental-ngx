import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { SelectComponent as CoreSelect, SelectModule } from '@fundamental-ngx/core/select';
import { BaseSelect } from '../commons/base-select';

@Component({
    selector: 'fdp-select',
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DynamicComponentService, { provide: FD_FORM_FIELD_CONTROL, useExisting: SelectComponent, multi: true }],
    imports: [SelectModule, FormsModule, IconComponent, NgTemplateOutlet, NgClass, ListSecondaryDirective]
})
export class SelectComponent extends BaseSelect implements AfterViewInit, AfterViewChecked {
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
        this.detectChanges();
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
    _onOpenChange(isOpen: boolean): void {
        if (isOpen) {
            this.formMessage?._popover?.close();
        }
        this.formMessage?._popover?.setIgnoreTriggers(isOpen);
    }

    /** @hidden */
    private _setColumnsRatio(firstColumnRatio: number, secondColumnRatio: number): void {
        const totalProportions = firstColumnRatio + secondColumnRatio;
        const firstColumnProportion = Math.round((firstColumnRatio / totalProportions) * 100);
        const secondColumnProportion = 100 - firstColumnProportion;

        // setting option items
        this.select._options.forEach((option) => {
            const optionItem = option._getHtmlElement();
            const titleElement = <HTMLElement>optionItem.querySelector('[fd-list-title]');
            this._setOptionAttribute(titleElement, firstColumnProportion);

            const secondaryElement = <HTMLElement>optionItem.querySelector('[fd-list-secondary]');
            this._setOptionAttribute(secondaryElement, secondColumnProportion);
        });
    }

    /** @hidden */
    private _setOptionAttribute(element: HTMLElement, proportion: number): void {
        element.setAttribute('style', 'width: ' + proportion + '%; max-width: ' + proportion + '%');
    }
}
