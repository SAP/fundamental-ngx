import {
    ChangeDetectionStrategy,
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { DynamicFormItem, FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import {
    FormSettingsItem,
    SettingsFormTab,
    SettingsItem,
    SettingsTemplateTab,
    TemplateSettingsItem
} from '../../models/settings.model';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SettingsGeneratorService } from '../../settings-generator.service';

export type SettingsSectionItemsModel = SettingsTemplateTab | SettingsFormTab | SettingsItem;

@Component({
    selector: 'fdp-settings-generator-section',
    templateUrl: './settings-generator-section.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsGeneratorSectionComponent {
    /**
     * Group name. Used to define full path of the inner form.
     */
    @Input()
    groupName: Nullable<string>;

    /**
     * Section items.
     * @param value {Nullable<SettingsSectionItemsModel>} Can be either a template Ref, or Form generator items.
     */
    @Input()
    set items(value: Nullable<SettingsSectionItemsModel>) {
        this._items = value;

        if (this._isTemplateLayout(value)) {
            this._renderer = 'template';
            this._templateRef = value.template;
        } else {
            this._renderer = 'form';
            this._formItems = value?.items || [];
        }
    }

    get items(): Nullable<SettingsSectionItemsModel> {
        return this._items;
    }

    /** @hidden */
    private readonly _settingsGeneratorService = inject(SettingsGeneratorService);

    /** @hidden */
    private _items: Nullable<SettingsSectionItemsModel>;

    /** @hidden */
    @ViewChild(FormGeneratorComponent)
    private set _formGeneratorCmp(component: FormGeneratorComponent | undefined) {
        this._formGenerator = component;

        if (!this.items) {
            return;
        }

        const config = this.items as SettingsFormTab | FormSettingsItem;

        const path = [this.groupName, config.id].filter((v) => !!v) as string[];

        if (component) {
            this._settingsGeneratorService._addFormGenerator(path, component);
        } else {
            this._settingsGeneratorService._removeFormGenerator(path);
        }
    }

    /** @hidden */
    private _formGenerator: FormGeneratorComponent | undefined;

    /** @hidden */
    _renderer: 'form' | 'template' = 'form';

    /** @hidden */
    _templateRef: TemplateRef<any> | null = null;

    /** @hidden */
    _formItems: DynamicFormItem[] = [];

    /** @hidden */
    _isTemplateLayout(settings: any): settings is TemplateSettingsItem {
        return !!settings?.template;
    }
}
