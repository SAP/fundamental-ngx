import { Component, ViewChild } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';
import { IconTabBarItem } from '../../types';
import { cloneDeep } from '../../../utils/functions/clone-deep';
import { ChangedOverflowItemsEvent, OverflowItemsDirective } from '../../../utils/directives/overflow-items/overflow-items.directive';
import { ExtraButtonDirective } from '../../directives/extra-button.directive';

@Component({
    selector: 'fd-icon-tab-bar-process-type',
    templateUrl: './icon-tab-bar-process-type.component.html',
    styleUrls: ['./icon-tab-bar-process-type.component.scss']
})
export class IconTabBarProcessTypeComponent extends IconTabBarClass {

    @ViewChild(OverflowItemsDirective)
    overflowDirective: OverflowItemsDirective;

    @ViewChild(ExtraButtonDirective)
    extraBtnDirective: ExtraButtonDirective;

    _nextSteps: IconTabBarItem[] = [];

    _prevSteps: IconTabBarItem[] = [];

    firstVisibleTabIndex = 0;
    currentStepIndex = 0;
    offsetForOverflowDirective = 30;
    showLeftBtn = false;
    showRightBtn = false;

    selectItem(selectedItem: IconTabBarItem): void {
        this.currentStepIndex = selectedItem.index;
        super.selectItem(selectedItem);
    }

    selectExtraItem(selectedItem: IconTabBarItem): void {
        this.currentStepIndex = selectedItem.index;
        let amountOfPreviousSteps;
        let amountOfNextSteps;
        let isLeftStrategy: boolean;
        if (this.currentStepIndex > this.lastVisibleTabIndex) {
            amountOfNextSteps = this._nextSteps.length - (this.currentStepIndex - this.lastVisibleTabIndex);
            this.showRightBtn = !!amountOfNextSteps;
            this.showLeftBtn = true;
            isLeftStrategy = false;
        } else {
            amountOfPreviousSteps = this._prevSteps.length - (this.firstVisibleTabIndex - this.currentStepIndex);
            this.showRightBtn = true;
            isLeftStrategy = true;
            this.showLeftBtn = amountOfPreviousSteps;
        }
        this.selectItem(selectedItem);
        setTimeout(() => {
            const extra = this.overflowDirective.getAmountOfExtraItems();
            isLeftStrategy
                ? this.recalculateItemsByPrevArr(extra, amountOfPreviousSteps)
                : this.recalculateItemsByNextArr(extra, amountOfNextSteps);
        }, 100);
        setTimeout(_ => this.extraBtnDirective._calculatePosition(), 200)
        // this._recalculateExtraItems(extraItems, amountOfPreviousSteps);
    }

    onChangeSize(data: {amount: number, event: ChangedOverflowItemsEvent}): void {
        // let extraItems = data.amount;
        // if (this._prevSteps.length) {
        //     // Убрать кнопку которая сюда попала.
        //     extraItems = data.amount - 1;
        // }
        const amountOfPrevSteps = this.currentStepIndex > data.amount ? data.amount : this.currentStepIndex;
        this.recalculateItemsByPrevArr(data.amount, amountOfPrevSteps);
    }
    private clearExtraList(): void {
        this._nextSteps = [];
        this._prevSteps = [];
        this.tabs.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== 'fd-icon-tab-bar__item--hidden');
        });
    }

    private recalculateItemsByNextArr(extraItems: number, amountOfNextSteps): void {
        this.clearExtraList();
        if (!extraItems) {
            return;
        }
        // const amountOfPreviousSteps = this.currentStepIndex - 1;
        const visibleAmountOfItems = this.tabs.length - extraItems;
        for (let i = this.tabs.length - amountOfNextSteps; i < this.tabs.length; i++) {
            this._nextSteps.push(cloneDeep(this.tabs[i]));
            this.tabs[i].hidden = true;
            this.tabs[i].cssClasses.push('fd-icon-tab-bar__item--hidden');
        }

        // this.offsetForOverflowDirective = this._prevSteps.length ? 132 : 68;
        this.showRightBtn = !!this._nextSteps.length;
        this.firstVisibleTabIndex = this.tabs.length - visibleAmountOfItems - this._nextSteps.length;
        this.lastVisibleTabIndex = this.tabs.length - amountOfNextSteps - 1;

        if (this._nextSteps.length === extraItems) {
            return;
        }

        let amountOfPrevSteps = extraItems - this._nextSteps.length;
        let nextIndex = this.firstVisibleTabIndex - 1;
        while (amountOfPrevSteps > 0) {
            this._prevSteps.push(cloneDeep(this.tabs[nextIndex]));
            this.tabs[nextIndex].hidden = true;
            this.tabs[nextIndex].cssClasses.push('fd-icon-tab-bar__item--hidden');

            --nextIndex;
            --amountOfPrevSteps;
        }
        // Добавляю +1 для левой кнопки
        this.anchorIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : this._prevSteps.length + visibleAmountOfItems - 1;

        this.showLeftBtn = !!this._prevSteps.length;
        // this._cd.detectChanges();
    }

    private recalculateItemsByPrevArr(extraItems: number, amountOfPreviousSteps): void {
        this.clearExtraList();
        if (!extraItems) {
            return;
        }
        // const amountOfPreviousSteps = this.currentStepIndex - 1;
        const visibleAmountOfItems = this.tabs.length - extraItems;
        for (let i = amountOfPreviousSteps - 1; i >= 0; i--) {
            this._prevSteps.push(cloneDeep(this.tabs[i]));
            this.tabs[i].hidden = true;
            this.tabs[i].cssClasses.push('fd-icon-tab-bar__item--hidden');
        }

        // this.offsetForOverflowDirective = this._prevSteps.length ? 132 : 68;
        this.firstVisibleTabIndex = this._prevSteps.length;
        this.lastVisibleTabIndex = this._prevSteps.length + visibleAmountOfItems - 1;
        this.showLeftBtn = !!this._prevSteps.length;

        if (this._prevSteps.length === extraItems) {
            this.showRightBtn = false;
            return;
        }

        let amountOfNextSteps = extraItems - this._prevSteps.length;
        let nextIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : visibleAmountOfItems;
        while (amountOfNextSteps > 0) {
            this._nextSteps.push(cloneDeep(this.tabs[nextIndex]));
            this.tabs[nextIndex].hidden = true;
            this.tabs[nextIndex].cssClasses.push('fd-icon-tab-bar__item--hidden');

            ++nextIndex;
            --amountOfNextSteps;
        }
        // Добавляю +1 для левой кнопки
        this.anchorIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : this._prevSteps.length + visibleAmountOfItems - 1;

        this.showRightBtn = !!this._nextSteps.length;
        // this._cd.detectChanges();
        this.offsetForOverflowDirective = this._nextSteps.length ? 30 : 0;
    }
/*
    private _recalculateExtraItems(extraItems: number, amountOfPreviousSteps: number): void {
        this.clearExtraList();
        if (!extraItems) {
            return;
        }
        // const amountOfPreviousSteps = this.currentStepIndex - 1;
        const visibleAmountOfItems = this.tabs.length - extraItems;
        for (let i = amountOfPreviousSteps - 1; i >= 0; i--) {
            this._prevSteps.push(cloneDeep(this.tabs[i]));
            this.tabs[i].hidden = true;
            this.tabs[i].cssClasses.push('fd-icon-tab-bar__item--hidden');
        }

        // this.offsetForOverflowDirective = this._prevSteps.length ? 132 : 68;
        this.firstVisibleTabIndex = this._prevSteps.length;
        this.lastVisibleTabIndex = this._prevSteps.length + visibleAmountOfItems - 1;
        this.showLeftBtn = !!this._prevSteps.length;
        debugger;
        if ((this._prevSteps.length + visibleAmountOfItems) === this.tabs.length) {
            return;
        }

        let amountOfNextSteps = extraItems - this._prevSteps.length;
        let nextIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : visibleAmountOfItems;
        while (amountOfNextSteps > 0) {
            this._nextSteps.push(cloneDeep(this.tabs[nextIndex]));
            this.tabs[nextIndex].hidden = true;
            this.tabs[nextIndex].cssClasses.push('fd-icon-tab-bar__item--hidden');

            ++nextIndex;
            --amountOfNextSteps;
        }
        // Добавляю +1 для левой кнопки
        this.anchorIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : this._prevSteps.length + visibleAmountOfItems - 1;

        this.showRightBtn = !!this._nextSteps.length;
        // this._cd.detectChanges();
    }
*/

}
