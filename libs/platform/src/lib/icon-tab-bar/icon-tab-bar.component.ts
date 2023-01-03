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
import { IconTabBarItem } from './interfaces/icon-tab-bar-item.interface';
import { TabConfig } from './interfaces/tab-config.interface';
import { IconTabBarBackground, IconTabBarSize, TabDestinyMode, TabType } from './types';
import { ContentDensityService, RtlService } from '@fundamental-ngx/cdk/utils';
import { IconFont } from '@fundamental-ngx/core/icon';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TabColorAssociations } from './interfaces/tab-color-associations.interface';

@Component({
    selector: 'fdp-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrls: ['./icon-tab-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class IconTabBarComponent implements OnInit, OnDestroy {
    /**
     * @description Type of tab bar view.
     */
    @Input()
    iconTabType: TabType = 'text';

    /**
     * @description A tab bar configuration that stores the state of each tab. Based on this configuration, a tab bar is representing.
     */
    @Input()
    tabsConfig: TabConfig[] = [];

    /**
     * @description Destiny mode.
     */
    @Input()
    densityMode: TabDestinyMode = 'inherit';

    /**
     * @description Icon font
     */
    @Input()
    iconTabFont: IconFont = 'SAP-icons';

    /**
     * @description Disable or enable reordering(drag and drop) feature. (supported by text type only)
     */
    @Input()
    enableTabReordering = false;

    /**
     * @description Boolean flag indicating to show total tab.(supported by filter type only)
     */
    @Input()
    showTotalTab = true;

    /**
     * @description Layout type for tab (supported by text type only)
     */
    @Input()
    layoutMode: 'row' | 'column' = 'row';

    /**
     * @description Icon tab bar background type.
     */
    @Input()
    iconTabBackground: IconTabBarBackground = 'solid';

    /**
     * @description Icon tab bar size.
     */
    @Input()
    iconTabSize: IconTabBarSize;

    /**
     * @description Associations for colors of the tabs.
     * If any of the color associations provided, they'll be read by screenreader instead of the actual color
     */
    @Input()
    colorAssociations: TabColorAssociations;

    /**
     * @description Emits when some tab is selected.
     */
    @Output()
    iconTabSelected: EventEmitter<IconTabBarItem> = new EventEmitter<IconTabBarItem>();

    /**
     * @description Emits when user drop tab.
     */
    @Output()
    iconTabReordered: EventEmitter<IconTabBarItem[]> = new EventEmitter<IconTabBarItem[]>();

    /** @hidden */
    _cssClassForContainer: string[];

    /** @hidden */
    _isRtl = false;

    /** @hidden */
    private _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._cssClassForContainer = this._generateContainerStyles();

        if (this.densityMode === 'inherit') {
            this._contentDensityService?._contentDensityListener
                .pipe(distinctUntilChanged(), takeUntil(this._onDestroy$))
                .subscribe((density) => {
                    this.densityMode = density;
                    if (density !== 'compact') {
                        this._cssClassForContainer = this._cssClassForContainer.filter(
                            (cssClass) => cssClass !== 'fd-icon-tab-bar--compact'
                        );
                    } else {
                        this._cssClassForContainer.push('fd-icon-tab-bar--compact');
                    }
                    this._cd.detectChanges();
                });
        }

        this._rtlService?.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl: boolean) => {
            if (isRtl !== this._isRtl) {
                this._isRtl = isRtl;
                this._cd.detectChanges();
            }
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @hidden
     * @returns array of css classes for icon-tab-bar container
     */
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

    /**
     * @hidden
     * @param event reordered array of IconTabBarItem
     */
    _onReorder(event: IconTabBarItem[]): void {
        this.iconTabReordered.emit(event);
    }

    /**
     * @hidden
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.iconTabSelected.emit(selectedItem);
    }
}
