import { TemplateRef } from '@angular/core';
import { FdkAsyncProperty } from '@fundamental-ngx/cdk/utils';
import type {
    AnyDynamicFormFieldItem,
    BaseDynamicFormFieldItem,
    DynamicFormItem
} from '@fundamental-ngx/platform/form';
import { ListAvatarConfig, ListIconConfig } from '@fundamental-ngx/platform/list';
import { Observable } from 'rxjs';

/**
 * Form generator control to render theme list.
 */
export interface ThemeSelectorDynamicFormItem extends BaseDynamicFormFieldItem {
    type: 'theme-list';
}

export type SettingsGeneratorDynamicFormItem<
    TAdditionalControlTypes extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem
> = DynamicFormItem<Record<string, any>, ThemeSelectorDynamicFormItem | TAdditionalControlTypes>;

export type SettingsModel<
    TAdditionalControlTypes extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem,
    TAdditionalLayoutType extends
        BaseSettingsModel<TAdditionalControlTypes> = BaseSettingsModel<TAdditionalControlTypes>
> = SidebarSettingsModel<TAdditionalControlTypes> | TAdditionalLayoutType;

export interface BaseSettingsModel<TAdditionalControlTypes extends BaseDynamicFormFieldItem> {
    /** Appearance type. */
    appearance: string;
    /** Settings items. */
    items: SettingsItem<TAdditionalControlTypes>[];
}

export interface SidebarSettingsModel<TAdditionalControlTypes extends BaseDynamicFormFieldItem>
    extends BaseSettingsModel<TAdditionalControlTypes> {
    appearance: 'sidebar';
    /**
     * Sidebar width configuration.
     */
    sidebarWidth: string | SidebarWidthConfiguration;
}

export interface SettingsFormTab<TAdditionalControlTypes extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem> {
    /** Title of the tab. */
    title: FdkAsyncProperty<string>;
    /** @hidden */
    template?: never;
    /** ID of the tab. Will be used as a key in resulting form object. */
    id: string;
    /** Items array. */
    items: SettingsGeneratorDynamicFormItem<TAdditionalControlTypes>[];
}

export interface SettingsTemplateTab {
    /** Title of the tab. */
    title: FdkAsyncProperty<string>;
    /** @hidden */
    items?: never;
    /** @hidden */
    id?: never;
    /** Template Reference for tab content. */
    template: TemplateRef<any>;
}

export interface BaseSettingsItem {
    /** Settings item title. */
    title: FdkAsyncProperty<string>;
    /** Settings item icon. */
    thumbnail?: ThumbnailSettingsItem;
    /** Settings item description. */
    description?: FdkAsyncProperty<string>;
    /** Settings section title. */
    sectionTitle?: FdkAsyncProperty<string>;
    /** Whether to wrap the title text in the main section content. By default, the text will be truncated. */
    wrapSectionTitle?: boolean;
}

export interface IconBaseSettingsItem {
    /** Settings item icon configuration. */
    icon: Partial<ListIconConfig> | string | Observable<Partial<ListIconConfig> | string>;
    /** @hidden */
    avatar?: never;
}

export interface AvatarBaseSettingsItem {
    /** Settings item avatar configuration. */
    avatar: Partial<ListAvatarConfig> | string | Observable<Partial<ListAvatarConfig> | string>;
    /** @hidden */
    icon?: never;
}

export type ThumbnailSettingsItem = AvatarBaseSettingsItem | IconBaseSettingsItem;

export type SettingsItem<TAdditionalControlTypes extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem> =
    | FormSettingsItem<TAdditionalControlTypes>
    | TemplateSettingsItem
    | GroupedFormSettingsItem<TAdditionalControlTypes>
    | GroupedTemplateSettingsItem;

export interface FormSettingsItem<TAdditionalControlTypes extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem>
    extends BaseSettingsItem {
    /** Settings item form controls. */
    items: SettingsGeneratorDynamicFormItem<TAdditionalControlTypes>[];
    /** @hidden */
    template?: never;
    /** ID Of the section. Will be used as a key in resulting form object. */
    id: string;
}

export interface GroupedFormSettingsItem<
    TAdditionalControlTypes extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem
> extends BaseSettingsItem {
    /** @hidden */
    items?: never;
    /** @hidden */
    template?: never;
    /** ID if the group. Will be used as a key in resulting form object. */
    id: string;
    /** Groups array. */
    groups: SettingsFormTab<TAdditionalControlTypes>[];
}

export interface TemplateSettingsItem extends BaseSettingsItem {
    /** @hidden */
    items?: never;
    /** @hidden */
    id?: string;
    /** Template reference to be rendered as section content. */
    template: TemplateRef<any>;
}

export interface GroupedTemplateSettingsItem extends BaseSettingsItem {
    /** @hidden */
    id?: string;
    /** @hidden */
    items?: never;
    /** @hidden */
    template?: never;
    /** Groups array. */
    groups: SettingsTemplateTab[];
}

export interface SidebarWidthConfiguration {
    /** Min width. */
    minWidth?: string;
    /** Max width. */
    maxWidth?: string;
    /** Width. */
    width?: string;
    /** Whether to wrap the title text in the sidebar. By default, the text will truncate. */
    wrapSidebarTitle?: boolean;
    /** Whether to wrap the description text in the sidebar. By default, the text will truncate. */
    wrapSidebarDescription?: boolean;
}
