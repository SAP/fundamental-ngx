import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { IconTabBarBackground, IconTabBarItem, IconTabBarSize, TabConfig, TabDestinyMode, TabType } from './types';
import { ContentDensityService, RtlService } from '@fundamental-ngx/core/utils';
import { IconFont, } from '@fundamental-ngx/core/icon';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'fd-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrls: ['./icon-tab-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class IconTabBarComponent implements OnInit, OnDestroy {

    @Input()
    iconTabType: TabType = 'text';

    @Input()
    tabsConfig: TabConfig[] = [];

    @Input()
    densityMode: TabDestinyMode = 'cozy';

    @Input()
    iconTabFont: IconFont = 'SAP-icons';

    @Input()
    enableTabReordering = false;

    @Input()
    showTotalTab = true;

    @Input()
    layoutMode: 'row'|'column' = 'row';

    @Input()
    iconTabBackground: IconTabBarBackground = 'solid';

    @Input()
    iconTabSize: IconTabBarSize;

    @Output()
    iconTabSelected: EventEmitter<IconTabBarItem> = new EventEmitter<IconTabBarItem>();

    @Output()
    iconTabReordered: EventEmitter<IconTabBarItem[]> = new EventEmitter<IconTabBarItem[]>();

    _cssClassForContainer: string[];
    _isRtl = false;

    private _onDestroy$ = new Subject();

    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _rtlService: RtlService,
    ) {
    }

    ngOnInit(): void {
        this._cssClassForContainer = this._generateContainerStyles();

        if (this.densityMode === 'inherit') {
            this._contentDensityService._contentDensityListener
                .pipe(
                    distinctUntilChanged(),
                    takeUntil(this._onDestroy$),
                    )
                .subscribe((density) => {
                    this.densityMode = density;
                    if (density !== 'compact') {
                        this._cssClassForContainer = this._cssClassForContainer.filter(cssClass => cssClass !== 'fd-icon-tab-bar--compact')
                    } else {
                        this._cssClassForContainer.push('fd-icon-tab-bar--compact');
                    }
            })
        }

        this._rtlService.rtl
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((isRtl: boolean) => {
                if (isRtl !== this._isRtl) {
                    this._isRtl = isRtl;
                    this._cd.detectChanges();
                }
            });
    }


    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
    
    private _generateContainerStyles(): string[] {
        const styles = [`fd-icon-tab-bar--${this.iconTabType}`];
        if (this.iconTabType === 'process' && this.tabsConfig[0].icon) {
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
        if (this.layoutMode === 'column') {
            styles.push('fd-icon-tab-bar--counters');
        }
            return styles;

    }

    /** @hidden  */
    _onReorder(event: IconTabBarItem[]): void {
        this.iconTabReordered.emit(event);
    }

    /** @hidden  */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.iconTabSelected.emit(selectedItem);
    }
}
