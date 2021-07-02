import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input, OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { IconTabBarBackground, IconTabBarItem, IconTabBarSize, TabDestinyMode, TabType } from './types';
import { ContentDensityService, IconFont, RtlService } from '@fundamental-ngx/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'fd-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrls: ['./icon-tab-bar.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconTabBarComponent implements OnInit, OnDestroy {

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

    cssClassForContainer: string[];
    _isRtl: boolean = null;

    private _onDestroy$ = new Subject();

    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _rtlService: RtlService,
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

        this._rtlService.rtl
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((isRtl: boolean) => {
                const shouldDetect = this._isRtl !== null;
                this._isRtl = isRtl;
                // if (shouldDetect) {
                //     setTimeout(() => this._cd.detectChanges(), 100);
                // }
        });

        // this.items.forEach((item, index) => {
        //     item.cssClasses = [];
        //     item.index = index;
        //     if (Array.isArray(item.subItems) && item.subItems.length) {
        //         this.generateId(item);
        //     }
        //     if (item.color) {
        //         item.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
        //     }
        // });

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

    // ToDo: поменять как-то айдишники
    // generateId(parent: IconTabBarItem): void {
    //     parent.subItems.forEach((item, index) => {
    //        item.index = parent.index === 0
    //            ? parent.index * 10 + index
    //            : 10 + index;
    //        if (Array.isArray(item.subItems) && item.subItems.length) {
    //            this.generateId(item);
    //        }
    //     });
    // }

    selectItem(selectedItem: IconTabBarItem): void {
        this.selected.emit(selectedItem.index)
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}
