import { Routes } from '@angular/router';

import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: PlatformHomeComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/shared').then((m) => m.PlatformI18nDocsModule)
            },
            {
                path: 'button',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/button').then((m) => m.PlatformButtonDocsModule)
            },
            {
                path: 'action-bar',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/action-bar').then((m) => m.PlatformActionBarDocsModule)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('@fundamental-ngx/docs/platform/checkbox').then((m) => m.CheckboxDocsModule)
            },
            {
                path: 'checkbox-group',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/checkbox-group').then(
                        (m) => m.PlatformCheckboxGroupDocsModule
                    )
            },
            {
                path: 'date-picker',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/date-picker').then((m) => m.PlatformDatePickerDocsModule)
            },
            {
                path: 'datetime-picker',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/datetime-picker').then(
                        (m) => m.PlatformDatetimePickerDocsModule
                    )
            },
            {
                path: 'dynamic-page',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/dynamic-page').then((m) => m.PlatformDynamicPageDocsModule)
            },
            {
                path: 'page-footer',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/page-footer').then((m) => m.PlatformDocPageFooterModule)
            },
            {
                path: 'form-generator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/form-generator').then(
                        (m) => m.PlatformFormGeneratorDocsModule
                    )
            },
            {
                path: 'form-container',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/form-container').then(
                        (m) => m.PlatformFormContainerDocsModule
                    )
            },
            {
                path: 'link',
                loadChildren: () => import('@fundamental-ngx/docs/platform/link').then((m) => m.PlatformLinkDocsModule)
            },
            {
                path: 'menu',
                loadChildren: () => import('@fundamental-ngx/docs/platform/menu').then((m) => m.PlatformMenuDocsModule)
            },
            {
                path: 'menu-button',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/menu-button').then((m) => m.PlatformMenuButtonDocsModule)
            },
            {
                path: 'search-field',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/search-field').then((m) => m.PlatformSearchFieldDocsModule)
            },
            {
                path: 'select',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/select').then((m) => m.PlatformSelectDocsModules)
            },
            {
                path: 'radio-group',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/radio-group').then((m) => m.PlatformRadioGroupDocsModule)
            },
            {
                path: 'split-menu-button',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/split-menu-button').then(
                        (m) => m.PlatformSplitMenuButtonDocsModule
                    )
            },
            {
                path: 'info-label',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/info-label').then((m) => m.PlatformInfoLabelDocsModule)
            },
            {
                path: 'table',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/table').then((m) => m.PlatformTableDocsModule)
            },
            {
                path: 'textarea',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/textarea').then((m) => m.PlatformTextareaDocsModule)
            },
            {
                path: 'panel',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/panel').then((m) => m.PlatformPanelDocsModule)
            },
            {
                path: 'switch',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/switch').then((m) => m.PlatformSwitchDocsModule)
            },
            {
                path: 'input',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/input').then((m) => m.PlatformInputDocsModule)
            },
            {
                path: 'step-input',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/step-input').then((m) => m.PlatformStepInputDocsModule)
            },
            {
                path: 'object-status',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/object-status').then((m) => m.PlatformObjectStatusDocsModule)
            },
            {
                path: 'object-marker',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/object-marker').then((m) => m.PlatformObjectMarkerDocsModule)
            },
            {
                path: 'object-attribute',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/object-attribute').then(
                        (m) => m.PlatformObjectAttributeDocsModule
                    )
            },
            {
                path: 'input-group',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/input-group').then((m) => m.PlatformInputGroupDocsModule)
            },
            {
                path: 'combobox',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/combobox').then((m) => m.PlatformComboboxDocsModule)
            },
            {
                path: 'list',
                loadChildren: () => import('@fundamental-ngx/docs/platform/list').then((m) => m.PlatformListDocsModule)
            },
            {
                path: 'standard-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/standard-list-item').then(
                        (m) => m.PlatformStandardListItemDocsModule
                    )
            },
            {
                path: 'thumbnail',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/thumbnail').then((m) => m.PlatformThumbnailDocsModule)
            },
            {
                path: 'time-picker',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/time-picker').then((m) => m.PlatformTimePickerDocsModule)
            },
            {
                path: 'action-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/action-list-item').then(
                        (m) => m.PlatformActionListItemDocsModule
                    )
            },
            {
                path: 'display-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/display-list-item').then(
                        (m) => m.PlatformDisplayListItemDocsModule
                    )
            },
            {
                path: 'object-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/object-list-item').then(
                        (m) => m.PlatformObjectListItemDocsModule
                    )
            },
            {
                path: 'value-help-dialog',
                loadChildren: () => import('@fundamental-ngx/docs/platform/vhd').then((m) => m.PlatformVhdDocsModule)
            },
            {
                path: 'multi-combobox',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/multi-combobox').then(
                        (m) => m.PlatformMultiComboboxDocsModule
                    )
            },
            {
                path: 'multi-input',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/multi-input').then((m) => m.PlatformMultiInputDocsModule)
            },
            {
                path: 'feed-input',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/feed-input').then((m) => m.PlatformFeedInputDocsModule)
            },
            {
                path: 'file-uploader',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/file-uploader').then((m) => m.PlatformFileUploaderDocsModule)
            },
            {
                path: 'upload-collection',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/upload-collection').then(
                        (m) => m.PlatformUploadCollectionDocsModule
                    )
            },
            {
                path: 'approval-flow',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/approval-flow').then((m) => m.PlatformApprovalFlowDocsModule)
            },
            {
                path: 'slider',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/slider').then((m) => m.PlatformSliderDocsModule)
            },
            {
                path: 'wizard-generator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/wizard-generator').then(
                        (m) => m.PlatformWizardGeneratorDocsModule
                    )
            },
            {
                path: 'icon-tab-bar',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/icon-tab-bar').then((m) => m.PlatformIconTabBarDocsModule)
            },
            {
                path: 'smart-filter-bar',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/smart-filter-bar').then(
                        (m) => m.PlatformSmartFilterBarDocsModule
                    )
            },
            {
                path: 'message-popover',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/message-popover').then((m) => m.MessagePopoverDocsModule)
            }
        ]
    }
];
