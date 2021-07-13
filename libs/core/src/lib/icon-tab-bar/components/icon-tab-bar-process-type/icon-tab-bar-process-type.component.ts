import { Component } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';
import { IconTabBarItem } from '../../types';
import { cloneDeep } from '../../../utils/functions/clone-deep';

@Component({
    selector: 'fd-icon-tab-bar-process-type',
    templateUrl: './icon-tab-bar-process-type.component.html',
    styleUrls: ['./icon-tab-bar-process-type.component.scss']
})
export class IconTabBarProcessTypeComponent extends IconTabBarClass {

    _nextSteps: IconTabBarItem[] = [];

    _prevSteps: IconTabBarItem[] = [];

    firstVisibleTabIndex = 0;
    currentStepIndex = 0;
    offsetForOverflowDirective = 68;

    selectItem(selectedItem: IconTabBarItem): void {
        this.items.forEach((item, index) => {
            if (item.id === selectedItem.id) {
                this.currentStepIndex = index;
            }
        });
        super.selectItem(selectedItem);
    }

    selectExtraItem(selectedItem: IconTabBarItem): void {
        const fromPrevSteps = !!this._prevSteps.find(item => item.id === selectedItem.id);
        const indexToDelete = fromPrevSteps
            ? this.firstVisibleTabIndex
            : this.lastVisibleTabIndex;
        let arrToMan = fromPrevSteps
            ? this._prevSteps
            : this._nextSteps;


        const deletedItem = <IconTabBarItem>this.items.splice(indexToDelete, 1, selectedItem)[0];
        this.items.splice(selectedItem.id, 1, deletedItem);

        deletedItem.id = selectedItem.id;
        const itemToPopover = cloneDeep(deletedItem);
        deletedItem.hidden = true;
        deletedItem.cssClasses.push('fd-icon-tab-bar__item--hidden');

        let indexInExtraItems;
        arrToMan.forEach((item, index) => {
            if (item.id === selectedItem.id) {
                indexInExtraItems = index;
            }
        });

        selectedItem.id = indexToDelete;
        selectedItem.hidden = false;
        if (selectedItem.color) {
            selectedItem.cssClasses = [`fd-icon-tab-bar__item--${selectedItem.color}`];
        }
        arrToMan.splice(indexInExtraItems, 1, itemToPopover);
        arrToMan = [...arrToMan];


        this.selectItem(selectedItem);
    }

    onChangeSize(extraItems: number): void {
        if (this._prevSteps.length) {
            debugger;
            // Убрать кнопку которая сюда попала.
            extraItems = extraItems - 1;
        }
        console.log('extraItems', extraItems);
        this.clearExtraList();
        if (!extraItems) {
            return;
        }
        const amountOfPreviousSteps = this.currentStepIndex - 1;
        const visibleAmountOfItems = this.items.length - extraItems;
        for (let i = amountOfPreviousSteps; i >= 0; i--) {
            this._prevSteps.push(cloneDeep(this.items[i]));
            this.items[i].hidden = true;
            this.items[i].cssClasses.push('fd-icon-tab-bar__item--hidden');
        }

        // this.offsetForOverflowDirective = this._prevSteps.length ? 132 : 68;

        if ((this._prevSteps.length + visibleAmountOfItems) === this.items.length) {
            return;
        }

        let amountOfNextSteps = extraItems - this._prevSteps.length;
        let nextIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : visibleAmountOfItems;
        while (amountOfNextSteps > 0) {
            this._nextSteps.push(cloneDeep(this.items[nextIndex]));
            this.items[nextIndex].hidden = true;
            this.items[nextIndex].cssClasses.push('fd-icon-tab-bar__item--hidden');

            ++nextIndex;
            --amountOfNextSteps;
        }
        this.firstVisibleTabIndex = this._prevSteps.length;
        this.lastVisibleTabIndex = this._prevSteps.length + visibleAmountOfItems - 1;
        // Добавляю +1 для левой кнопки
        this.ancorIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : this._prevSteps.length + visibleAmountOfItems - 1;
        // this._cd.detectChanges();
    }

    private clearExtraList(): void {
        this._nextSteps = [];
        this._prevSteps = [];
        this.items.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== 'fd-icon-tab-bar__item--hidden');
        });
    }
}
