import { Routes } from '@angular/router';
import { CoreDocumentationComponent } from './documentation/core-documentation.component';
import { HomeDocsComponent } from './component-docs/core-home/core-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'action-bar',
                loadChildren: () => import('./component-docs/action-bar/action-bar-docs.module').then(m => m.ActionBarDocsModule)
            },
            {
                path: 'alert',
                loadChildren: () => import('./component-docs/alert/alert-docs.module').then(m => m.AlertDocsModule)
            },
            {
                path: 'badgeLabel',
                loadChildren: () => import('./component-docs/badge-label/badge-label-docs.module').then(m => m.BadgeLabelDocsModule)
            },
            {
                path: 'bar',
                loadChildren: () => import('./component-docs/bar/bar-docs.module').then(m => m.BarDocsModule)
            },
            {
                path: 'breadcrumb',
                loadChildren: () => import('./component-docs/breadcrumb/breadcrumb-docs.module').then(m => m.BreadcrumbDocsModule)
            },
            {
                path: 'busyIndicator',
                loadChildren: () => import('./component-docs/busy-indicator/busy-indicator-docs.module').then(m => m.BusyIndicatorDocsModule)
            },
            {
                path: 'button',
                loadChildren: () => import('./component-docs/button/button-docs.module').then(m => m.ButtonDocsModule)
            },
            {
                path: 'segmentedButton',
                loadChildren: () => import('./component-docs/segmented-button/segmented-button-docs.module').then(m => m.SegmentedButtonDocsModule)
            },
            {
                path: 'calendar',
                loadChildren: () => import('./component-docs/calendar/calendar-docs.module').then(m => m.CalendarDocsModule)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('./component-docs/checkbox/checkbox-docs.module').then(m => m.CheckboxDocsModule)
            },
            {
                path: 'combobox',
                loadChildren: () => import('./component-docs/combobox/combobox-docs.module').then(m => m.ComboboxDocsModule)
            },
            {
                path: 'datePicker',
                loadChildren: () => import('./component-docs/date-picker/date-picker-docs.module').then(m => m.DatePickerDocsModule)
            },
            {
                path: 'datetime-picker',
                loadChildren: () => import('./component-docs/datetime-picker/datetime-picker-docs.module').then(m => m.DatetimePickerDocsModule)
            },
            {
                path: 'dialog',
                loadChildren: () => import('./component-docs/dialog/dialog-docs.module').then(m => m.DialogDocsModule)
            },
            {
                path: 'dropdown',
                loadChildren: () => import('./component-docs/dropdown/dropdown-docs.module').then(m => m.DropdownDocsModule)
            },
            {
                path: 'file-input',
                loadChildren: () => import('./component-docs/file-input/file-input-docs.module').then(m => m.FileInputDocsModule)
            },
            {
                path: 'icon',
                loadChildren: () => import('./component-docs/icon/icon-docs.module').then(m => m.IconDocsModule)
            },
            {
                path: 'identifier',
                loadChildren: () => import('./component-docs/identifier/identifier-docs.module').then(m => m.IdentifierDocsModule)
            },
            {
                path: 'image',
                loadChildren: () => import('./component-docs/image/image-docs.module').then(m => m.ImageDocsModule)
            },
            {
                path: 'info-label',
                loadChildren: () => import('./component-docs/info-label/info-label-docs.module').then(m => m.InfoLabelDocsModule)
            },
            {
                path: 'infiniteScroll',
                loadChildren: () => import('./component-docs/infinite-scroll/infinite-scroll-docs.module').then(m => m.InfiniteScrollDocsModule)
            },
            {
                path: 'inlineHelp',
                loadChildren: () => import('./component-docs/inline-help/inline-help-docs.module').then(m => m.InlineHelpDocsModule)
            },
            {
                path: 'input',
                loadChildren: () => import('./component-docs/input/input-docs.module').then(m => m.InputDocsModule)
            },
            {
                path: 'inputGroup',
                loadChildren: () => import('./component-docs/input-group/input-group-docs.module').then(m => m.InputGroupDocsModules)
            },
            {
                path: 'layoutGrid',
                loadChildren: () => import('./component-docs/layout-grid/layout-grid-docs.module').then(m => m.LayoutGridDocsModule)
            },
            {
                path: 'link',
                loadChildren: () => import('./component-docs/link/link-docs.module').then(m => m.LinkDocsModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./component-docs/list/list-docs.module').then(m => m.ListDocsModule)
            },
            {
                path: 'loadingSpinner',
                loadChildren: () => import('./component-docs/loading-spinner-docs/loading-spinner-docs.module').then(m => m.LoadingSpinnerDocsModule)
            },
            {
                path: 'localizationEditor',
                loadChildren: () => import('./component-docs/localization-editor/localization-editor-docs.module').then(m => m.LocalizationEditorDocsModule)
            },
            {
                path: 'mega-menu',
                loadChildren: () => import('./component-docs/mega-menu/mega-menu-docs.module').then(m => m.MegaMenuDocsModule)
            },
            {
                path: 'menu',
                loadChildren: () => import('./component-docs/menu/menu-docs.module').then(m => m.MenuDocsModule)
            },
            {
                path: 'multi-input',
                loadChildren: () => import('./component-docs/multi-input/multi-input-docs.module').then(m => m.MultiInputDocsModule)
            },
            {
                path: 'notification',
                loadChildren: () => import('./component-docs/notification/notification-docs.module').then(m => m.NotificationDocsModule)
            },
            {
                path: 'pagination',
                loadChildren: () => import('./component-docs/pagination/pagination-docs.module').then(m => m.PaginationDocsModule)
            },
            {
                path: 'panel',
                loadChildren: () => import('./component-docs/panel/panel-docs.module').then(m => m.PanelDocsModule)
            },
            {
                path: 'popover',
                loadChildren: () => import('./component-docs/popover/popover-docs.module').then(m => m.PopoverDocsModule)
            },
            {
                path: 'popover-directive',
                loadChildren: () => import('./component-docs/popover-directive/popover-directive-docs.module').then(m => m.PopoverDirectiveDocsModule)
            },
            {
                path: 'product-switch',
                loadChildren: () => import('./component-docs/product-switch/product-switch-docs.module').then(m => m.ProductSwitchDocsModule)
            },
            {
                path: 'radio',
                loadChildren: () => import('./component-docs/radio/radio-docs.module').then(m => m.RadioDocsModule)
            },
            {
                path: 'select-native',
                loadChildren: () => import('./component-docs/select-native/select-native-docs.module').then(m => m.SelectNativeDocsModule)
            },
            {
                path: 'scroll-spy',
                loadChildren: () => import('./component-docs/scroll-spy/scroll-spy-docs.module').then(m => m.ScrollSpyDocsModules)
            },
            {
                path: 'shellbar',
                loadChildren: () => import('./component-docs/shellbar/shellbar-docs.module').then(m => m.ShellbarDocsModule)
            },
            {
                path: 'sideNavigation',
                loadChildren: () => import('./component-docs/side-navigation/side-navigation-docs.module').then(m => m.SideNavigationDocsModule)
            },
            {
                path: 'select',
                loadChildren: () => import('./component-docs/select/select-docs.module').then(m => m.SelectDocsModules)
            },
            {
                path: 'splitButton',
                loadChildren: () => import('./component-docs/split-button/split-button-docs.module').then(m => m.SplitButtonDocsModule)
            },
            {
                path: 'switch',
                loadChildren: () => import('./component-docs/switch/switch-docs.module').then(m => m.SwitchDocsModule)
            },
            {
                path: 'table',
                loadChildren: () => import('./component-docs/table/table-docs.module').then(m => m.TableDocsModule)
            },
            {
                path: 'tabs',
                loadChildren: () => import('./component-docs/tabs/tabs-docs.module').then(m => m.TabsDocsModule)
            },
            {
                path: 'textarea',
                loadChildren: () => import('./component-docs/textarea/textarea-docs.module').then(m => m.TextareaDocsModule)
            },
            {
                path: 'tile',
                loadChildren: () => import('./component-docs/tile/tile-docs.module').then(m => m.TileDocsModule)
            },
            {
                path: 'time',
                loadChildren: () => import('./component-docs/time/time-docs.module').then(m => m.TimeDocsModule)
            },
            {
                path: 'timePicker',
                loadChildren: () => import('./component-docs/time-picker/time-picker-docs.module').then(m => m.TimePickerDocsModule)
            },
            {
                path: 'token',
                loadChildren: () => import('./component-docs/token/token-docs.module').then(m => m.TokenDocsModule)
            },
            {
                path: 'tree',
                loadChildren: () => import('./component-docs/tree/tree-docs.module').then(m => m.TreeDocsModule)
            }
        ]
    }
];
