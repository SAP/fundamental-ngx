import { BACKSPACE, DELETE, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    ViewChild,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';

import { TokenizerComponent, KeyUtil } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';
import { MultiInputOption } from '../../../domain/data-model';
import { ListComponent, SelectionType } from '../../list/list.component';

import { FormFieldControl } from '../form-control';
import { InputType } from '../input/input.component';
import { BaseMultiInput, MultiInputSelectionChangeEvent } from './base-multi-input';

@Component({
    selector: 'fdp-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrls: ['./multi-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FormFieldControl,
            useExisting: forwardRef(() => PlatformMultiInputComponent),
            multi: true
        }
    ]
})
export class PlatformMultiInputComponent extends BaseMultiInput {
    /** type Represent the type of input used for the multi Input */
    @Input()
    type: InputType;

    @ViewChild('listTemplateDD')
    listTemplateDD: ListComponent;

    /** Selected values from the list items. */
    @Input()
    selected: any[] = [];

    /**
     *
     */
    @Input()
    selectionMode: SelectionType = 'none';

    /** @hidden */
    selectedValue?: MultiInputOption;

    /** @hidden */
    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }

    /** listTemplate represent list tempate injected from the user end */
    @Input()
    listTemplate: ListComponent;

    /** Whether the input is disabled. */
    protected _disabled = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }

    /** Represents the  value injected from the selected list value*/
    @Input()
    set selectedListVariable(selectedValue) {
        this._selectedListVariable = selectedValue;
        if (this._selectedListVariable) {
            this.addToArray(this._selectedListVariable);
        }
    }
    get selectedListVariable(): any {
        return this._selectedListVariable;
    }

    /** @hidden */
    @ViewChild(TokenizerComponent)
    tokenizer: TokenizerComponent;

    /** @hidden Emits event when the menu is opened/closed */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public updateSelectedListVariables = [];
    private _dataSourceSubscription = Subscription.EMPTY;

    /**
     * Whether the popover is opened.
     */
    isOpen = false;

    private _selectedListVariable: any;

    addToArray($select: any): void {
        this.selected.push($select);
        this.popoverOpenChangeHandle(this.isOpen);
    }

    removeToken(token): void {
        this.selected.splice(this.selected.indexOf(token), 1);
    }

    /** @hidden */
    popoverOpenChangeHandle(isOpen: boolean): void {
        this.isOpen ? this.open() : this.close();
    }

    /** Opens the select popover body. */
    open(): void {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }
    /** Closes the select popover body. */
    close(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }
    /** @hidden */
    removeSelectedTokens(event: KeyboardEvent): void {
        let allSelected = true;
        if (KeyUtil.isKeyCode(event, [DELETE, BACKSPACE])) {
            this.tokenizer.tokenList.forEach((token) => {
                if (token.selected || token.tokenWrapperElement.nativeElement === document.activeElement) {
                    this.removeToken(token.elementRef.nativeElement.innerText);
                } else {
                    allSelected = false;
                }
            });
        }
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this.listTemplateDD.listItems.first.focus();
        }
        if (KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            this.tokenizer.focusTokenElement(this.tokenizer.tokenList.length - 1);
        }
    }
    /** @hidden
     * Method to emit change event
     */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new MultiInputSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
    }

    /** @hidden
     * Define is selected item selected
     */
    isSelectedOptionItem(selectedItem: any): boolean {
        return (
            (this.lookupKey && this.lookupValue(this.selected) === this.lookupValue(selectedItem)) ||
            this.displayValue(this.selected) === this.displayValue(selectedItem)
        );
    }

    /** @hidden
     * Method to set selected item
     */
    selectOptionItem(item: MultiInputOption): void {
        if (this.mobile) {
            this.selectedValue = item;
            this.inputText = item.label;
            this.cd.detectChanges();

            return;
        }

        this.inputText = item.label;
        this._checkAndUpdate(item);
        this.showList(false);
    }

    /** @hidden
     * Method to set as selected
     */
    setAsSelected(item: MultiInputOption[]): void {
        const selectedItem = item[0];

        if (this.isSelectedOptionItem(selectedItem)) {
            return;
        }

        this.selectedValue = this.isGroup
            ? selectedItem.children
                ? selectedItem.children[0]
                : selectedItem
            : selectedItem;
        this.inputText = this.displayValue(this.selected);
    }

    /** @hidden
     * if not selected update model
     */
    private _checkAndUpdate(modelValue: MultiInputOption): void {
        if (this.isSelectedOptionItem(modelValue)) {
            return;
        }

        const optionItem = this._getSelectedOptionItem(this.inputText);

        this._updateModel(optionItem ? optionItem.value : this.inputText);
    }

    /** @hidden */
    private _getSelectedOptionItem(text: string): MultiInputOption | undefined {
        if (!this.isGroup) {
            return this._suggestions.find((item) => item.label === text);
        }

        return this._suggestions
            .reduce((result: MultiInputOption[], item: MultiInputOption) => {
                result.push(...item.children);

                return result;
            }, [])
            .find((item) => item.label === text);
    }

    /** @hidden
     * Update model
     */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;

        this.emitChangeEvent(value ? value : null);
    }
}
