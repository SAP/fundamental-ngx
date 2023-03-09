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
    styleUrls: ['./settings-generator-section.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsGeneratorSectionComponent {
    /** @hidden */
    @Input()
    groupName: Nullable<string>;
    /** @hidden */
    @Input()
    set items(value: SettingsSectionItemsModel) {
        this._items = value;

        if (this._isTemplateLayout(value)) {
            this._renderer = 'template';
            this._templateRef = value.template;
        } else {
            this._renderer = 'form';
            this._formItems = value.items || [];
        }
    }

    get items(): SettingsSectionItemsModel {
        return this._items;
    }

    /** @hidden */
    private readonly _settingsGeneratorService = inject(SettingsGeneratorService);

    /** @hidden */
    private _items: SettingsSectionItemsModel;

    /** @hidden */
    @ViewChild(FormGeneratorComponent)
    private set _formGeneratorCmp(component: FormGeneratorComponent | undefined) {
        this._formGenerator = component;

        const config = this.items as SettingsFormTab | FormSettingsItem;

        const path = [this.groupName, config.id].filter((v) => !!v) as string[];

        if (component) {
            this._settingsGeneratorService.addFormGenerator(path, component);
        } else {
            this._settingsGeneratorService.removeFormGenerator(path);
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
    _isTemplateLayout(settings: SettingsSectionItemsModel): settings is TemplateSettingsItem {
        return !!settings?.template;
    }
}
