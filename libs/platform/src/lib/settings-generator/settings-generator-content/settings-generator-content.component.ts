import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { AsyncOrSyncPipe, Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { TabPanelComponent, TabsModule } from '@fundamental-ngx/core/tabs';
import { TitleComponent } from '@fundamental-ngx/core/title';
import {
    GroupedFormSettingsItem,
    GroupedTemplateSettingsItem,
    SettingsFormTab,
    SettingsItem,
    SettingsTemplateTab,
    TemplateSettingsItem
} from '../models/settings.model';
import { SettingsGeneratorSectionComponent } from './settings-generator-section/settings-generator-section.component';

@Component({
    selector: 'fdp-settings-generator-content',
    templateUrl: './settings-generator-content.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TitleComponent,
        NgIf,
        ButtonComponent,
        SkeletonComponent,
        TabsModule,
        NgFor,
        SettingsGeneratorSectionComponent,
        NgTemplateOutlet,
        AsyncOrSyncPipe
    ]
})
export class SettingsGeneratorContentComponent {
    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private _settings: Nullable<SettingsItem>;

    /** @hidden */
    _groups: (SettingsTemplateTab | SettingsFormTab)[] = [];

    /** @hidden */
    _index: number;

    /** @hidden */
    @Input()
    set settings(value: Nullable<SettingsItem>) {
        this._settings = value;

        this._renderer = this.isTemplateLayout(this._settings) ? 'template' : 'form';
        if (this.isGroupedSettings(this._settings)) {
            this._contentLayout = 'tabs';
            this._groups = this._settings.groups;
        } else {
            this._contentLayout = 'form';
        }
    }

    get settings(): Nullable<SettingsItem> {
        return this._settings;
    }

    /** Whether to render content component in mobile view. */
    @Input()
    mobile = false;

    /** Event emits when user needs to be moved back to navigation screen. */
    @Output()
    goBack = new EventEmitter<void>();

    /** @hidden */
    _id: Nullable<string>;

    /** @hidden */
    _renderer: 'form' | 'template' = 'form';

    /** @hidden */
    _contentLayout: 'form' | 'tabs' = 'form';

    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fdp-settings-generator__content-section';

    /** @hidden */
    @ViewChildren(TabPanelComponent)
    private readonly _tabPanels: QueryList<TabPanelComponent>;

    /** @hidden */
    isTemplateLayout(settings: Nullable<SettingsItem>): settings is TemplateSettingsItem {
        return !!settings?.template;
    }

    /** @hidden */
    isGroupedSettings(settings: any): settings is GroupedFormSettingsItem | GroupedTemplateSettingsItem {
        return settings?.groups?.length > 0;
    }

    /**
     * Activates tab by group ID.
     * @param id ID of the group.
     */
    setActiveTab(id: string): void {
        if (!this.isGroupedSettings(this._settings)) {
            return;
        }
        this._tabPanels?.forEach((tab, index) => {
            const group = this._groups[index];

            if (group.id === id) {
                tab.open(true);
                return false;
            }
        });
    }
}
