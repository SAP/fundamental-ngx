import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IconTabBarClass } from '../../icon-tab-bar.class';
import { IconTabBarItem } from '../../types';

@Component({
    selector: 'fd-icon-tab-bar-text-type',
    templateUrl: './icon-tab-bar-text-type.component.html',
    styleUrls: ['./icon-tab-bar-text-type.component.scss']
})
export class IconTabBarTextTypeComponent extends IconTabBarClass implements OnInit {

    @Input()
    maxNestingLevel = 0;

    @Input()
    enableTabReordering = false;

    extraItems: IconTabBarItem[] = [];

    constructor(
        private _cd: ChangeDetectorRef,
    ) {
        super();
    }

    onChangeSize(extraItems: number): void {
        console.log('extraItems', extraItems);
        this.items.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== 'fd-icon-tab-bar__item--hidden')
        });
        this.extraItems = [];
        const lastVisibleIndex = this.items.length - extraItems - 1;

        for (let i = this.items.length - 1; i > lastVisibleIndex; i--) {
            this.items[i].hidden = true;
            this.items[i].cssClasses.push('fd-icon-tab-bar__item--hidden')
            this.extraItems.push(this.items[i]);
        }
        this._cd.detectChanges();
    }
}
