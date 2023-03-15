import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    inject,
    Input,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { TabPanelComponent } from '@fundamental-ngx/core/tabs';
import {
    GroupedFormSettingsItem,
    GroupedTemplateSettingsItem,
    SettingsFormTab,
    SettingsItem,
    SettingsTemplateTab,
    TemplateSettingsItem
} from '../models/settings.model';

@Component({
    selector: 'fdp-settings-generator-content',
    templateUrl: './settings-generator-content.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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
