import { Routes } from '@angular/router';

import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: PlatformHomeComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'button',
                loadChildren: () =>
                    import('./component-docs/platform-button/platform-button.module').then(
                        (m) => m.PlatformButtonDocsModule
                    )
            },
            {
                path: 'action-bar',
                loadChildren: () =>
                    import('./component-docs/platform-action-bar/platform-action-bar.module').then(
                        (m) => m.PlatformActionBarDocsModule
                    )
            },
            {
                path: 'checkbox',
                loadChildren: () =>
                    import('./component-docs/platform-forms/checkbox/platform-checkbox-docs.module').then(
                        (m) => m.CheckboxDocsModule
                    )
            },
            {
                path: 'checkbox-group',
                loadChildren: () =>
                    import(
                        './component-docs/platform-forms/platform-checkbox-group/platform-checkbox-group-docs.module'
                    ).then((m) => m.PlatformCheckboxGroupDocsModule)
            },
            {
                path: 'date-picker',
                loadChildren: () =>
                    import('./component-docs/platform-forms/platform-date-picker/platform-date-picker-docs.module').then(
                        (m) => m.PlatformDatePickerDocsModule)
            },
            {
                path: 'datetime-picker',
                loadChildren: () =>
                    import(
                        './component-docs/platform-forms/platform-datetime-picker/platform-datetime-picker-docs.module'
                    ).then((m) => m.PlatformDatetimePickerDocsModule)
            },
            {
                path: 'dynamic-page',
                loadChildren: () =>
                    import('./component-docs/platform-dynamic-page/platform-dynamic-page.module').then(
                        (m) => m.PlatformDynamicPageDocsModule
                    )
            },
            {
                path: 'form-container',
                loadChildren: () =>
                    import('./component-docs/platform-forms/platform-form-container/platform-form-container-docs.module').then(
                        (m) => m.PlatformFormContainerDocsModule
                    )
            },
            {
                path: 'link',
                loadChildren: () =>
                    import('./component-docs/platform-link/platform-link.module').then((m) => m.PlatformLinkDocsModule)
            },
            {
                path: 'menu',
                loadChildren: () =>
                    import('./component-docs/platform-menu/platform-menu.module').then((m) => m.PlatformMenuDocsModule)
            },
            {
                path: 'menu-button',
                loadChildren: () =>
                    import('./component-docs/platform-menu-button/platform-menu-button.module').then(
                        (m) => m.PlatformMenuButtonDocsModule
                    )
            },
            {
                path: 'search-field',
                loadChildren: () =>
                    import('./component-docs/platform-search-field/platform-search-field.module').then(
                        (m) => m.PlatformSearchFieldDocsModule
                    )
            },
            {
                path: 'select',
                loadChildren: () =>
                    import('./component-docs/platform-forms/platform-select/platform-select-docs.module').then(
                        (m) => m.PlatformSelectDocsModules
                    )
            },
            {
                path: 'radio-group',
                loadChildren: () =>
                    import('./component-docs/platform-forms/radio-group/platform-radio-group.module').then(
                        (m) => m.PlatformRadioGroupDocsModule
                    )
            },
            {
                path: 'split-menu-button',
                loadChildren: () =>
                    import('./component-docs/platform-split-menu-button/platform-split-menu-button.module').then(
                        (m) => m.PlatformSplitMenuButtonDocsModule
                    )
            },
            {
                path: 'info-label',
                loadChildren: () =>
                    import('./component-docs/platform-info-label/platform-info-label-docs-module').then(
                        (m) => m.PlatformInfoLabelDocsModule
                    )
            },
            {
                path: 'table',
                loadChildren: () =>
                    import('./component-docs/platform-table/platform-table.module').then(
                        (m) => m.PlatformTableDocsModule
                    )
            },
            {
                path: 'textarea',
                loadChildren: () =>
                    import('./component-docs/platform-forms/platform-textarea/platform-textarea-docs.module').then(
                        (m) => m.PlatformTextareaDocsModule
                    )
            },
            {
                path: 'panel',
                loadChildren: () =>
                    import('./component-docs/platform-panel/platform-panel.module').then(
                        (m) => m.PlatformPanelDocsModule
                    )
            },
            {
                path: 'switch',
                loadChildren: () =>
                    import('./component-docs/platform-forms/switch/platform-switch-docs.module').then(
                        (m) => m.PlatformSwitchDocsModule
                    )
            },
            {
                path: 'input',
                loadChildren: () =>
                    import('./component-docs/platform-forms/platform-input/platform-input-docs.module').then(
                        (m) => m.PlatformInputDocsModule
                    )
            },
            {
                path: 'step-input',
                loadChildren: () =>
                    import('./component-docs/platform-forms/step-input/platform-step-input.module').then(
                        (m) => m.PlatformStepInputDocsModule
                    )
            },
            {
                path: 'object-status',
                loadChildren: () =>
                    import('./component-docs/platform-object-status/platform-object-status-docs.module').then(
                        (m) => m.PlatformObjectStatusDocsModule
                    )
            },
            {
                path: 'object-marker',
                loadChildren: () =>
                    import('./component-docs/platform-object-marker/platform-object-marker.module').then(
                        (m) => m.PlatformObjectMarkerDocsModule
                    )
            },
            {
                path: 'object-attribute',
                loadChildren: () =>
                    import('./component-docs/platform-object-attribute/platform-object-attribute-docs.module').then(
                        (m) => m.PlatformObjectAttributeDocsModule
                    )
            },
            {
                path: 'input-group',
                loadChildren: () =>
                    import('./component-docs/platform-forms/input-group/platform-input-group-docs.module').then(
                        (m) => m.PlatformInputGroupDocsModule
                    )
            },
            {
                path: 'combobox',
                loadChildren: () =>
                    import('./component-docs/platform-combobox/platform-combobox-docs.module').then(
                        (m) => m.PlatformComboboxDocsModule
                    )
            },
            {
                path: 'list',
                loadChildren: () =>
                    import('./component-docs/platform-list/platform-list-docs.module').then(
                        (m) => m.PlatformListDocsModule
                    )
            },
            {
                path: 'standard-list-item',
                loadChildren: () =>
                    import('./component-docs/platform-standard-list-item/platform-standard-list-item-docs.module').then(
                        (m) => m.PlatformStandardListItemDocsModule
                    )
            },
            {
                path: 'thumbnail',
                loadChildren: () =>
                    import('./component-docs/platform-thumbnail/platform-thumbnail-docs.module').then(
                        (m) => m.PlatformThumbnailDocsModule
                    )
            },
            {
                path: 'time-picker',
                loadChildren: () =>
                    import('./component-docs/platform-forms/platform-time-picker/platform-time-picker-docs.module').then((m) =>
                        m.PlatformTimePickerDocsModule)
            },
            {
                path: 'action-list-item',
                loadChildren: () =>
                    import('./component-docs/platform-action-list-item/platform-action-list-item-docs.module').then(
                        (m) => m.PlatformActionListItemDocsModule
                    )
            },
            {
                path: 'display-list-item',
                loadChildren: () =>
                    import('./component-docs/platform-display-list-item/platform-display-list-item-docs.module').then(
                        (m) => m.PlatformDisplayListItemDocsModule
                    )
            },
            {
                path: 'object-list-item',
                loadChildren: () =>
                    import('./component-docs/platform-object-list-item/platform-object-list-item-docs.module').then((m) =>
                        m.PlatformObjectListItemDocsModule)
            },
            {
                path: 'value-help-dialog',
                loadChildren: () =>
                    import('./component-docs/platform-vhd/platform-vhd-docs.module').then((m) =>
                        m.PlatformVhdDocsModule)
            },
            {
                path: 'multi-input',
                loadChildren: () =>
                    import('./component-docs/platform-forms/multi-input/platform-multi-input-docs.module').then(
                        (m) => m.PlatformMultiInputDocsModule
                    )
            },
            {
                path: 'feed-input',
                loadChildren: () =>
                    import('./component-docs/platform-feed-input/platform-feed-input.module').then(
                        (m) => m.PlatformFeedInputDocsModule
                    )
            },
            {
                path: 'file-uploader',
                loadChildren: () =>
                    import('./component-docs/platform-file-uploader/platform-file-uploader-docs.module').then(
                        (m) => m.PlatformFileUploaderDocsModule
                    )
            },
            {
                path: 'upload-collection',
                loadChildren: () =>
                    import('./component-docs/platform-upload-collection/platform-upload-collection-docs.module').then(
                        (m) => m.PlatformUploadCollectionDocsModule
                    )
            },
            {
                path: 'approval-flow',
                loadChildren: () =>
                    import('./component-docs/platform-approval-flow/platform-approval-flow-docs.module').then((m) =>
                        m.PlatformApprovalFlowDocsModule)
            },
            {
                path: 'slider',
                loadChildren: () =>
                    import('./component-docs/platform-slider/slider-docs.module').then((m) =>
                        m.PlatformSliderDocsModule)
            }
        ]
    }
];
