import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { IconTabBarBackground, IconTabBarItem, IconTabBarSize, TabDestinyMode, TabType } from './types';
import { ContentDensityService, IconFont, RtlService } from '@fundamental-ngx/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'fd-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrls: ['./icon-tab-bar.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class IconTabBarComponent implements OnInit, OnDestroy {

    @Input()
    iconTabType: TabType = 'text';

    @Input()
    iconTabItems: IconTabBarItem[];

    @Input()
    densityMode: TabDestinyMode = 'cozy';

    @Input()
    iconTabFont: IconFont = 'SAP-icons';

    @Input()
    enableTabReordering = false;

    @Input()
    showTabAll = true;

    @Input()
    iconTabBackground: IconTabBarBackground = 'solid';

    @Input()
    iconTabSize: IconTabBarSize;

    @Output()
    iconTabSelected: EventEmitter<any> = new EventEmitter<any>();

    _cssClassForContainer: string[];
    _isRtl: boolean = null;

    private _onDestroy$ = new Subject();

    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _rtlService: RtlService
    ) {
    }

    ngOnInit(): void {
        this._cssClassForContainer = this._generateContainerStyles();

        // ToDo: Implement destiny subscription.
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
                if (shouldDetect) {
                    setTimeout(() => this._cd.detectChanges(), 100);
                }
            });
    }
    
    private _generateContainerStyles(): string[] {
        const styles = [`fd-icon-tab-bar--${this.iconTabType}`];
        if (this.iconTabType === 'process' && this.iconTabItems[0].icon) {
            styles.push('fd-icon-tab-bar--icon');
        }
        if (this.iconTabBackground !== 'solid') {
            styles.push(`fd-icon-tab-bar--${this.iconTabBackground}`);
        }
        if (this.iconTabSize) {
            styles.push(`fd-icon-tab-bar--${this.iconTabSize}`);
        }
        if (this.densityMode === 'compact') {
            styles.push('fd-icon-tab-bar--compact');
        }
            return styles;

    }

    /** @hidden  */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.iconTabSelected.emit(selectedItem.index);
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}
