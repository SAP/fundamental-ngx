import { TemplateRef } from '@angular/core';
import {
    AnyDynamicFormFieldItem,
    BaseDynamicFormFieldItem,
    DynamicFormItem,
    FdpFormGeneratorAsyncProperty
} from '@fundamental-ngx/platform/form';

export interface ThemeSelectorDynamicFormItem extends BaseDynamicFormFieldItem {
    type: 'theme-list';
}

export type SettingsGeneratorDynamicFormItem<TAdditionalControlTypes> =
    | DynamicFormItem<Record<string, any>, ThemeSelectorDynamicFormItem>
    | TAdditionalControlTypes;

export interface SettingsModel<
    TAdditionalControlTypes extends BaseDynamicFormFieldItem<any> = AnyDynamicFormFieldItem
> {
    /** Appearance type. */
    appearance: 'sidebar' | 'tabs';
    /** Settings items. */
    items: SettingsItem<TAdditionalControlTypes>[];
}

export interface SettingsFormTab<
    TAdditionalControlTypes extends BaseDynamicFormFieldItem<any> = AnyDynamicFormFieldItem
> {
    title: FdpFormGeneratorAsyncProperty<string>;
    template?: never;
    id: string;
    items: SettingsGeneratorDynamicFormItem<TAdditionalControlTypes>[];
}

export interface SettingsTemplateTab {
    title: FdpFormGeneratorAsyncProperty<string>;
    items?: never;
    /** ID doesn't make sense for template-based item. */
    id?: never;
    template: TemplateRef<any>;
}

export interface BaseSettingsItem {
    /** Settings item title. */
    title: FdpFormGeneratorAsyncProperty<string>;
    /** Settings item icon. */
    thumbnail?: ThumbnailSettingsItem;
    /** Settings item description. */
    description?: FdpFormGeneratorAsyncProperty<string>;
    /** Settings section title. */
    sectionTitle?: FdpFormGeneratorAsyncProperty<string>;
}

export interface IconBaseSettingsItem {
    /** Settings item icon. */
    icon: string;
    avatar?: never;
}

export interface AvatarBaseSettingsItem {
    avatar: string;
    icon?: never;
}

export type ThumbnailSettingsItem = AvatarBaseSettingsItem | IconBaseSettingsItem;

export type SettingsItem<TAdditionalControlTypes extends BaseDynamicFormFieldItem<any> = AnyDynamicFormFieldItem> =
    | FormSettingsItem<TAdditionalControlTypes>
    | TemplateSettingsItem
    | GroupedFormSettingsItem<TAdditionalControlTypes>
    | GroupedTemplateSettingsItem;

export interface FormSettingsItem<
    TAdditionalControlTypes extends BaseDynamicFormFieldItem<any> = AnyDynamicFormFieldItem
> extends BaseSettingsItem {
    /** Settings item form controls. */
    items: SettingsGeneratorDynamicFormItem<TAdditionalControlTypes>[];
    template?: never;
    /** ID Of the section. Will be used as a key in resulting form object. */
    id: string;
}

export interface GroupedFormSettingsItem<
    TAdditionalControlTypes extends BaseDynamicFormFieldItem<any> = AnyDynamicFormFieldItem
> extends BaseSettingsItem {
    items?: never;
    template?: never;
    id: string;
    groups: SettingsFormTab<TAdditionalControlTypes>[];
}

export interface TemplateSettingsItem extends BaseSettingsItem {
    items?: never;
    /** ID doesn't make sense for template-based item. */
    id?: never;
    template: TemplateRef<any>;
}

export interface GroupedTemplateSettingsItem extends BaseSettingsItem {
    items?: never;
    template?: never;
    groups: SettingsTemplateTab[];
}
