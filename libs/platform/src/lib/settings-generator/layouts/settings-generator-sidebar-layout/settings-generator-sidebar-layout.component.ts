import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DestroyedService, Nullable } from '@fundamental-ngx/cdk/utils';
import { takeUntil } from 'rxjs';
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

@Component({
    selector: 'fdp-settings-generator-sidebar-layout',
    templateUrl: './settings-generator-sidebar-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DestroyedService]
})
export class SettingsGeneratorSidebarLayoutComponent
    extends BaseSettingsGeneratorLayout
    implements OnInit, AfterViewInit
{
    /** @hidden */
    @ViewChild('settingsGeneratorContent')
    private readonly settingsGeneratorContent: SettingsGeneratorContentComponent;
    /** @hidden */
    protected _destroy$ = inject(DestroyedService);

    /** @hidden */
    private readonly _config = inject(FDP_SETTINGS_GENERATOR_CONFIG);

    /**
     * Selected settings section.
     */
    _selectedIndex: number;

    /** @hidden */
    _sidebarWidth: SidebarWidthConfiguration;

    /** @hidden */
    constructor() {
        super();
        this._sidebarWidth = this._getNormalizedSidebarWidth(this._config.sidebarWidth);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        this._settingsGeneratorService.settings.pipe(takeUntil(this._destroy$)).subscribe((settings) => {
            if (this._isSidebarSettings(settings) && settings.sidebarWidth) {
                this._sidebarWidth = this._getNormalizedSidebarWidth(settings.sidebarWidth);
                this._cdr.detectChanges();
            }
        });
    }

    /** @hidden */
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
            this.settingsGeneratorContent.setActiveTab(pathArray[1]);
        }

        setTimeout(() => {
            element.nativeElement.focus();
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setSelectedIndex(0);
    }

    /** @hidden */
    _setSelectedIndex(index: number): void {
        this._selectedIndex = index;
        this._cdr.markForCheck();
    }

    /** @hidden */
    private _getNormalizedSidebarWidth(width: string | SidebarWidthConfiguration): SidebarWidthConfiguration {
        return typeof width === 'string' ? { minWidth: width, maxWidth: width, width } : width;
    }

    /** @hidden */
    private _isSidebarSettings(settings: Nullable<any>): settings is SidebarSettingsModel<any> {
        return settings?.appearance === 'sidebar';
    }

    /** @hidden */
    private _isFormGeneratorSection(section: SettingsItem): section is FormSettingsItem | GroupedFormSettingsItem {
        return !!(section as any).id;
    }
}
