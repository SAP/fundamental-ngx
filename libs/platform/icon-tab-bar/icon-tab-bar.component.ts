import { NgTemplateOutlet } from '@angular/common';
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
import { ContentDensityService, RtlService } from '@fundamental-ngx/cdk/utils';
import { IconFont } from '@fundamental-ngx/core/icon';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { IconTabBarFilterTypeComponent } from './components/icon-tab-bar-filter-type/icon-tab-bar-filter-type.component';
import { IconTabBarIconTypeComponent } from './components/icon-tab-bar-icon-type/icon-tab-bar-icon-type.component';
import { IconTabBarProcessTypeComponent } from './components/icon-tab-bar-process-type/icon-tab-bar-process-type.component';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { IconTabBarItem } from './interfaces/icon-tab-bar-item.interface';
import { TabColorAssociations } from './interfaces/tab-color-associations.interface';
import { TabConfig } from './interfaces/tab-config.interface';
import { IconTabBarBackground, IconTabBarSize, TabDestinyMode, TabType } from './types';

@Component({
    selector: 'fdp-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrl: './icon-tab-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgTemplateOutlet,
        IconTabBarProcessTypeComponent,
        IconTabBarFilterTypeComponent,
        IconTabBarIconTypeComponent,
        IconTabBarTextTypeComponent
    ]
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
    iconTabSelected = new EventEmitter<IconTabBarItem>();

    /**
     * @description Emits when user drop tab.
     */
    @Output()
    iconTabReordered = new EventEmitter<IconTabBarItem[]>();

    /** Event emitted when user clicks on x icon in tab. */
    @Output()
    closeTab = new EventEmitter<IconTabBarItem>();

    /** @ignore */
    _cssClassForContainer: string[];

    /** @ignore */
    _isRtl = false;

    /** @ignore */
    private _onDestroy$ = new Subject<void>();

    /** @ignore */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _rtlService: RtlService
    ) {}

    /** @ignore */
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

    /** @ignore */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @ignore
     * @param event reordered array of IconTabBarItem
     */
    _onReorder(event: IconTabBarItem[]): void {
        this.iconTabReordered.emit(event);
    }

    /**
     * @ignore
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.iconTabSelected.emit(selectedItem);
    }

    /** @ignore */
    _closeTab(item: IconTabBarItem): void {
        this.closeTab.emit(item);
    }

    /**
     * @ignore
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
}
