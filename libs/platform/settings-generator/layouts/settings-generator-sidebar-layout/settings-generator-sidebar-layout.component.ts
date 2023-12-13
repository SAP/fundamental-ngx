import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    HostBinding,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncOrSyncPipe, Nullable, resizeObservable } from '@fundamental-ngx/cdk/utils';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { SidebarSettingsGeneratorConfig } from '../../models/settings-config.model';
import {
    FormSettingsItem,
    GroupedFormSettingsItem,
    SettingsItem,
    SidebarSettingsModel,
    SidebarWidthConfiguration
} from '../../models/settings.model';
import { SettingsGeneratorContentComponent } from '../../settings-generator-content/settings-generator-content.component';
import { FDP_SETTINGS_GENERATOR_CONFIG } from '../../tokens';
import { BaseSettingsGeneratorLayout } from '../base-settings-generator-layout';
import { SettingsGeneratorSidebarIconComponent } from './settings-generator-sidebar-icon/settings-generator-sidebar-icon.component';

@Component({
    selector: 'fdp-settings-generator-sidebar-layout',
    templateUrl: './settings-generator-sidebar-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        ListModule,
        SettingsGeneratorSidebarIconComponent,
        SkeletonComponent,
        SettingsGeneratorContentComponent,
        AsyncOrSyncPipe
    ]
})
export class SettingsGeneratorSidebarLayoutComponent
    extends BaseSettingsGeneratorLayout
    implements OnInit, AfterViewInit
{
    /** @ignore */
    @HostBinding('class.fdp-settings-generator__sidebar-layout--mobile')
    _isMobile: boolean;

    /** @ignore */
    @HostBinding('class')
    private readonly _initialClass = 'fdp-settings-generator__sidebar-layout';

    /** @ignore */
    @ViewChild('settingsGeneratorContent')
    private readonly _settingsGeneratorContent: SettingsGeneratorContentComponent;

    /**
     * Selected settings section.
     */
    _selectedIndex = -1;
    /** @ignore */
    _sidebarWidth: SidebarWidthConfiguration;

    /** @ignore */
    protected _destroyRef = inject(DestroyRef);

    /** @ignore */
    private readonly _config = inject<SidebarSettingsGeneratorConfig>(FDP_SETTINGS_GENERATOR_CONFIG);

    /** @ignore */
    private _sidebarVisible = true;

    /** @ignore */
    private _initialSelectedItemSet = false;

    /** @ignore */
    get _mobileSidebarVisible(): boolean {
        return this._isMobile && this._sidebarVisible;
    }

    /** @ignore */
    constructor() {
        super();
        this._sidebarWidth = this._getNormalizedSidebarWidth(this._config.sidebar?.width);
    }

    /** @ignore */
    ngOnInit(): void {
        super.ngOnInit();
        this._settingsGeneratorService.settings.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((settings) => {
            if (this._isSidebarSettings(settings) && settings.sidebarWidth) {
                this._sidebarWidth = this._getNormalizedSidebarWidth(settings.sidebarWidth);
                this._cdr.detectChanges();
            }
        });
    }

    /** @ignore */
    focusElementByPath(path: string, element: ElementRef<HTMLElement>): void {
        const pathArray = path.split('.');
        // We are interested only in sections with ID.
        const sectionIndex =
            this.settings?.items.findIndex((section) => {
                if (!this._isFormGeneratorSection(section)) {
                    return;
                }
                return section.id === pathArray[0];
            }) ?? -1;

        // Focus on section.
        if (sectionIndex > -1) {
            this._setSelectedIndex(sectionIndex);
        }

        // Currently we support only 2 level nesting of form groups.
        if (pathArray.length > 0) {
            this._settingsGeneratorContent.setActiveTab(pathArray[1]);
        }

        setTimeout(() => {
            element.nativeElement.focus();
        });
    }

    /** @ignore */
    ngAfterViewInit(): void {
        if (this._settingsGenerator.elementRef.nativeElement && this._config.sidebar?.mobileBreakpoint) {
            resizeObservable(this._settingsGenerator.elementRef.nativeElement)
                .pipe(startWith(null), debounceTime(30), distinctUntilChanged(), takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    const { width } = this._settingsGenerator.elementRef.nativeElement.getBoundingClientRect();
                    const isMobile = width <= this._config.sidebar.mobileBreakpoint;
                    if (this._isMobile === isMobile) {
                        return;
                    }
                    this._settingsGeneratorService.setMobileState(isMobile);
                    this._isMobile = isMobile;

                    // User opened section previously, so focus on that section
                    if (this._isMobile && this._selectedIndex >= 0) {
                        this._sidebarVisible = false;
                    }

                    // In mobile view, we don't need to set initial index, since the section won't be visible to the end user.
                    if (!this._initialSelectedItemSet && !this._isMobile) {
                        this._setSelectedIndex(this._selectedIndex > -1 ? this._selectedIndex : 0);
                        this._initialSelectedItemSet = true;
                    }
                    this._cdr.detectChanges();
                });
        }
    }

    /** @ignore */
    _setSelectedIndex(index: number): void {
        this._selectedIndex = index;
        this._sidebarVisible = index === -1;
        this._cdr.detectChanges();
    }

    /** @ignore */
    _goBack(): void {
        this._setSelectedIndex(-1);
    }

    /** @ignore */
    private _getNormalizedSidebarWidth(width: string | SidebarWidthConfiguration): SidebarWidthConfiguration {
        return typeof width === 'string' ? { minWidth: width, maxWidth: width, width } : width;
    }

    /** @ignore */
    private _isSidebarSettings(settings: Nullable<any>): settings is SidebarSettingsModel<any> {
        return settings?.appearance === 'sidebar';
    }

    /** @ignore */
    private _isFormGeneratorSection(section: SettingsItem): section is FormSettingsItem | GroupedFormSettingsItem {
        return !!(section as any).id;
    }
}
