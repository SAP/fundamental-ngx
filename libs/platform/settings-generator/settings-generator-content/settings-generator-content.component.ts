import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    Signal,
    ViewChildren,
    ViewEncapsulation,
    computed,
    input,
    signal
} from '@angular/core';
import { AsyncOrSyncPipe, Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { TabPanelComponent } from '@fundamental-ngx/core/tabs';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { IconTabBarComponent, IconTabBarItem, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
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
    imports: [
        TitleComponent,
        ButtonComponent,
        SkeletonComponent,
        SettingsGeneratorSectionComponent,
        NgTemplateOutlet,
        AsyncOrSyncPipe,
        IconTabBarComponent,
        FdTranslatePipe
    ]
})
export class SettingsGeneratorContentComponent {
    /** @hidden */
    @Input()
    set settings(value: Nullable<SettingsItem>) {
        this._settings$.set(value);
    }

    get settings(): Nullable<SettingsItem> {
        return this._settings$();
    }

    /** Whether to render content component in mobile view. */
    @Input()
    mobile = false;

    /** Event emits when user needs to be moved back to navigation screen. */
    @Output()
    goBack = new EventEmitter<void>();

    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fdp-settings-generator__content-section';

    /** @hidden */
    @ViewChildren(TabPanelComponent)
    private readonly _tabPanels: QueryList<TabPanelComponent>;

    /** Optional alternative text for the settings generator dialog back button. */
    backButtonLabel = input<string>();

    /** @hidden */
    _id: Nullable<string>;

    /** @hidden */
    _renderer$ = computed<'form' | 'template'>(() => (this.isTemplateLayout(this._settings$()) ? 'template' : 'form'));

    /** @hidden */
    _contentLayout$ = computed<'form' | 'tabs'>(() => (this.isGroupedSettings(this._settings$()) ? 'tabs' : 'form'));

    /** @hidden */
    _groups$: Signal<(SettingsTemplateTab | SettingsFormTab)[]> = computed(() => {
        const settings = this._settings$();
        return this.isGroupedSettings(settings) ? settings.groups : [];
    });

    /** @hidden */
    _tabs$: Signal<TabConfig[]> = computed(() =>
        this._groups$().map<TabConfig>((group, index) => ({
            label: group.title,
            active: index === this._activeTab$()
        }))
    );

    /** @hidden */
    _index: number;

    /** @hidden */
    readonly _activeTab$ = signal(0);

    /** @hidden */
    readonly _settings$ = signal<Nullable<SettingsItem>>(null);

    /** @hidden */
    private _settings: Nullable<SettingsItem>;

    /** @hidden */
    isTemplateLayout(settings: Nullable<SettingsItem>): settings is TemplateSettingsItem {
        return !!settings?.template;
    }

    /** @hidden */
    isGroupedSettings(settings: any): settings is GroupedFormSettingsItem | GroupedTemplateSettingsItem {
        return settings?.groups?.length > 0;
    }

    /** @hidden */
    changeTab(item: IconTabBarItem): void {
        this._activeTab$.set(item.index);
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
            const group = this._groups$()[index];

            if (group.id === id) {
                tab.open(true);
                return false;
            }
        });
    }
}
