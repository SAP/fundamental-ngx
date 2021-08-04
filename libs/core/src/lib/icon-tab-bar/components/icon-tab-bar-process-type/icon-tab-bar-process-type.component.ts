import { Component } from '@angular/core';
import { IconTabBarBase } from '../icon-tab-bar-base.class';
import { IconTabBarItem } from '../../types';
import { cloneDeep } from '../../../utils/functions/clone-deep';
import { ICON_TAB_HIDDEN_CSS } from '../../constants';
import { take } from 'rxjs/operators';

@Component({
    selector: 'fd-icon-tab-bar-process-type',
    templateUrl: './icon-tab-bar-process-type.component.html'
})
export class IconTabBarProcessTypeComponent extends IconTabBarBase {

    /** @hidden */
    _offsetOverflowDirective = 30;

    /**
     * @hidden
     * An array containing extra tabs for the next steps
     */
    _nextSteps: IconTabBarItem[] = [];

    /**
     * @hidden
     * An array containing extra tabs for the next steps
     */
    _prevSteps: IconTabBarItem[] = [];

    /** @hidden */
    _showLeftBtn = false;

    /** @hidden */
    _showRightBtn = false;

    /** @hidden */
    private _firstVisibleTabIndex = 0;

    /** @hidden */
    private _currentStepIndex = 0;

    /** @hidden */
    _anchorIndexForExtraBtnDirective: number;

    /**
     * @hidden
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this._currentStepIndex = selectedItem.index;
        super._selectItem(selectedItem);
    }

    /**
     * @hidden
     * @param selectedItem
     * @description select extra item inside popover
     */
    _selectExtraItem(selectedItem: IconTabBarItem): void {
        this._currentStepIndex = selectedItem.index;
        let amountOfPreviousSteps;
        let amountOfNextSteps;
        // We have to cases (strategy) for overflow extra tabs.
        // 1) When user click on step inside previous steps popover
        // 2) When user click on step inside next steps popover
        let isPreviousStepsStrategy: boolean;
        if (this._currentStepIndex > this._lastVisibleTabIndex) {
            amountOfNextSteps = this._nextSteps.length - (this._currentStepIndex - this._lastVisibleTabIndex);
            this._showRightBtn = amountOfNextSteps > 0;
            this._showLeftBtn = true;
            isPreviousStepsStrategy = false;
        } else {
            amountOfPreviousSteps = this._prevSteps.length - (this._firstVisibleTabIndex - this._currentStepIndex);
            this._showRightBtn = true;
            isPreviousStepsStrategy = true;
            this._showLeftBtn = amountOfPreviousSteps > 0;
        }
        this._selectItem(selectedItem);

        this._ngZone
            .onMicrotaskEmpty
            .pipe(take(1))
            .subscribe(_ => {
                if (this.overflowDirective) {
                    const extra = this.overflowDirective.getAmountOfExtraItems();
                    isPreviousStepsStrategy
                        ? this.recalculateItemsByPrevArr(extra, amountOfPreviousSteps)
                        : this.recalculateItemsByNextArr(extra, amountOfNextSteps);
                    this.extraBtnDirective?.calculatePosition();
                    this._cd.detectChanges();
                }
            });
    }

    /**
     * @hidden
     * @param extraItems
     * @description recalculate _nextSteps and _prevSteps array if we have extra items
     */
    _recalculateVisibleItems(extraItems: number): void {
        const amountOfPrevSteps = this._currentStepIndex > extraItems ? extraItems : this._currentStepIndex;
        this.recalculateItemsByPrevArr(extraItems, amountOfPrevSteps);
    }

    /** @hidden */
    private _clearExtraList(): void {
        this._nextSteps = [];
        this._prevSteps = [];
        this._tabs.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== ICON_TAB_HIDDEN_CSS);
        });
    }

    /**
     * @hidden
     * @param extraItems
     * @param amountOfNextSteps
     * @description We fill the array of the next steps to the selected tab,
     * based on this we generate the array of the previous steps if it is necessary
     */
    private recalculateItemsByNextArr(extraItems: number, amountOfNextSteps: number): void {
        this._clearExtraList();
        if (!extraItems) {
            return;
        }
        const visibleAmountOfItems = this._tabs.length - extraItems;
        for (let i = this._tabs.length - amountOfNextSteps; i < this._tabs.length; i++) {
            this._nextSteps.push(cloneDeep(this._tabs[i]));
            this._tabs[i].hidden = true;
            this._tabs[i].cssClasses.push(ICON_TAB_HIDDEN_CSS);
        }

        this._showRightBtn = !!this._nextSteps.length;
        this._firstVisibleTabIndex = this._tabs.length - visibleAmountOfItems - this._nextSteps.length;
        this._lastVisibleTabIndex = this._tabs.length - amountOfNextSteps - 1;

        if (this._nextSteps.length === extraItems) {
            return;
        }

        let amountOfPrevSteps = extraItems - this._nextSteps.length;
        let nextIndex = this._firstVisibleTabIndex - 1;
        while (amountOfPrevSteps > 0) {
            this._prevSteps.push(cloneDeep(this._tabs[nextIndex]));
            this._tabs[nextIndex].hidden = true;
            this._tabs[nextIndex].cssClasses.push(ICON_TAB_HIDDEN_CSS);

            --nextIndex;
            --amountOfPrevSteps;
        }
        // Added +1 for left button
        this._anchorIndexForExtraBtnDirective = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : this._prevSteps.length + visibleAmountOfItems - 1;

        this._showLeftBtn = !!this._prevSteps.length;
        this._cd.detectChanges();
    }

    /**
     * @hidden
     * @param extraItems
     * @param amountOfPreviousSteps
     * @description We fill the array of the previous steps to the selected tab,
     * based on this we generate the array of the next steps if it is necessary
     */
    private recalculateItemsByPrevArr(extraItems: number, amountOfPreviousSteps: number): void {
        this._clearExtraList();
        if (!extraItems) {
            return;
        }
        const visibleAmountOfItems = this._tabs.length - extraItems;
        for (let i = amountOfPreviousSteps - 1; i >= 0; i--) {
            this._prevSteps.push(cloneDeep(this._tabs[i]));
            this._tabs[i].hidden = true;
            this._tabs[i].cssClasses.push(ICON_TAB_HIDDEN_CSS);
        }

        this._firstVisibleTabIndex = this._prevSteps.length;
        this._lastVisibleTabIndex = this._prevSteps.length + visibleAmountOfItems - 1;
        this._showLeftBtn = !!this._prevSteps.length;

        if (this._prevSteps.length === extraItems) {
            this._showRightBtn = false;
            return;
        }

        let amountOfNextSteps = extraItems - this._prevSteps.length;
        let nextIndex = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : visibleAmountOfItems;
        while (amountOfNextSteps > 0) {
            this._nextSteps.push(cloneDeep(this._tabs[nextIndex]));
            this._tabs[nextIndex].hidden = true;
            this._tabs[nextIndex].cssClasses.push(ICON_TAB_HIDDEN_CSS);

            ++nextIndex;
            --amountOfNextSteps;
        }
        // Add +1 for left btn
        this._anchorIndexForExtraBtnDirective = this._prevSteps.length
            ? this._prevSteps.length + visibleAmountOfItems
            : this._prevSteps.length + visibleAmountOfItems - 1;

        this._showRightBtn = !!this._nextSteps.length;
        this._offsetOverflowDirective = this._nextSteps.length ? 30 : 0;
        this._cd.detectChanges();
    }
}
