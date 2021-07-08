import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { IconTabBarBackground, IconTabBarItem, IconTabBarSize, TabDestinyMode, TabType } from './types';
import { ContentDensityService, IconFont } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrls: ['./icon-tab-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconTabBarComponent implements OnInit {

    @Input()
    type: TabType = 'text';

    @Input()
    items: IconTabBarItem[];

    @Input()
    maxNestingLevel = 0;

    @Input()
    densityMode: TabDestinyMode = 'cozy';

    @Input() font: IconFont = 'SAP-icons';

    @Input()
    enableTabReordering = false;

    @Input()
    showTabAll = true;

    @Input()
    background: IconTabBarBackground = 'solid';

    @Input()
    size: IconTabBarSize;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    selectedItemId: string|number;
    cssClassForContainer: string[];

    constructor(
        @Optional() private _contentDensityService: ContentDensityService,
    ) {
    }

    ngOnInit(): void {
        // if (this.densityMode === 'inherit') {
        //     this._contentDensityService._contentDensityListener
        //         .subscribe((density) => {
        //             debugger;
        //             this.densityMode = density;
        //             if (density !== 'compact') {
        //                 this.cssClassForContainer = this.cssClassForContainer.filter(cssClass => cssClass !== 'fd-icon-tab-bar--compact')
        //             }
        //     })
        // }
        const selectedItem = this.items.find(item => item.active);
        this.selectedItemId = selectedItem?.id;
        this.items.forEach((item, index) => {
            item.cssClasses = [];
            item.id = index;
            if (item.color) {
                item.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
            }
        });

        this.cssClassForContainer = [`fd-icon-tab-bar--${this.type}`];
        if (this.type === 'process' && this.items[0].icon) {
            this.cssClassForContainer.push('fd-icon-tab-bar--icon');
        }
        if (this.background !== 'solid') {
            this.cssClassForContainer.push(`fd-icon-tab-bar--${this.background}`)
        }
        if (this.size) {
            this.cssClassForContainer.push(`fd-icon-tab-bar--${this.size}`)
        }
        if (this.densityMode === 'compact') {
            this.cssClassForContainer.push('fd-icon-tab-bar--compact');
        }
    }

    selectItem(selectedItem: IconTabBarItem): void {
        this.selectedItemId = selectedItem.id;
        selectedItem.badge = false;
        this.selected.emit(selectedItem.id)
    }

}
