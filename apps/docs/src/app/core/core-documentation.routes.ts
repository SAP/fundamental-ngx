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
                loadChildren: () =>
                    import('./component-docs/action-bar/action-bar-docs.module').then((m) => m.ActionBarDocsModule)
            },
            {
                path: 'action-sheet',
                loadChildren: () =>
                    import('./component-docs/action-sheet/action-sheet-docs.module').then((m) => m.ActionSheetDocsModule)
            },
            {
                path: 'alert',
                loadChildren: () => import('./component-docs/alert/alert-docs.module').then((m) => m.AlertDocsModule)
            },
            {
                path: 'avatar',
                loadChildren: () => import('./component-docs/avatar/avatar-docs.module').then((m) => m.AvatarDocsModule)
            },
            {
                path: 'bar',
                loadChildren: () => import('./component-docs/bar/bar-docs.module').then((m) => m.BarDocsModule)
            },
            {
                path: 'breadcrumb',
                loadChildren: () =>
                    import('./component-docs/breadcrumb/breadcrumb-docs.module').then((m) => m.BreadcrumbDocsModule)
            },
            {
                path: 'busyIndicator',
                loadChildren: () =>
                    import('./component-docs/busy-indicator/busy-indicator-docs.module').then(
                        (m) => m.BusyIndicatorDocsModule
                    )
            },
            {
                path: 'button',
                loadChildren: () => import('./component-docs/button/button-docs.module').then((m) => m.ButtonDocsModule)
            },
            {
                path: 'card',
                loadChildren: () => import('./component-docs/card/card-docs.module').then((m) => m.CardDocsModule)
            },
            {
                path: 'segmentedButton',
                loadChildren: () =>
                    import('./component-docs/segmented-button/segmented-button-docs.module').then(
                        (m) => m.SegmentedButtonDocsModule
                    )
            },
            {
                path: 'calendar',
                loadChildren: () =>
                    import('./component-docs/calendar/calendar-docs.module').then((m) => m.CalendarDocsModule)
            },
            {
                path: 'carousel',
                loadChildren: () =>
                    import('./component-docs/carousel/carousel-docs.module').then((m) => m.CarouselDocsModule)
            },
            {
                path: 'checkbox',
                loadChildren: () =>
                    import('./component-docs/checkbox/checkbox-docs.module').then((m) => m.CheckboxDocsModule)
            },
            {
                path: 'combobox',
                loadChildren: () =>
                    import('./component-docs/combobox/combobox-docs.module').then((m) => m.ComboboxDocsModule)
            },
            {
                path: 'datePicker',
                loadChildren: () =>
                    import('./component-docs/date-picker/date-picker-docs.module').then((m) => m.DatePickerDocsModule)
            },
            {
                path: 'datetime-picker',
                loadChildren: () =>
                    import('./component-docs/datetime-picker/datetime-picker-docs.module').then(
                        (m) => m.DatetimePickerDocsModule
                    )
            },
            {
                path: 'dialog',
                loadChildren: () => import('./component-docs/dialog/dialog-docs.module').then((m) => m.DialogDocsModule)
            },
            {
                path: 'dynamic-page',
                loadChildren: () => import('./component-docs/dynamic-page/dynamic-page-docs.module').then((m) => m.DynamicPageDocsModule)
            },
            {
              path: 'feed-list-item',
                loadChildren: () =>
                    import('./component-docs/feed-list-item/feed-list-item-docs.module').then((m) => m.FeedListItemDocsModule)
            },
            {
                path: 'dynamic-side-content',
                loadChildren: () =>
                    import('./component-docs/dynamic-side-content/dynamic-side-content-docs.module').then(
                        (m) => m.DynamicSideContentDocsModule
                    )
            },
            {
                path: 'feed-input',
                loadChildren: () =>
                    import('./component-docs/feed-input/feed-input-docs.module').then(
                        (m) => m.FeedInputDocsModule
                    )
            },
            {
                path: 'file-uploader',
                loadChildren: () =>
                    import('./component-docs/file-uploader/file-uploader-docs.module').then(
                        (m) => m.FileUploaderDocsModule
                    )
            },
            {
                path: 'fixed-card-layout',
                loadChildren: () =>
                    import('./component-docs/fixed-card-layout/fixed-card-layout-docs.module').then(
                        (m) => m.FixedCardLayoutDocsModule
                    )
            },
            {
                path: 'flexible-column-layout',
                loadChildren: () =>
                    import('./component-docs/flexible-column-layout/flexible-column-layout-docs.module').then(
                        (m) => m.FlexibleColumnLayoutDocsModule
                    )
            },
            {
                path: 'form-message',
                loadChildren: () =>
                    import('./component-docs/form-message/form-message-docs.module').then(
                        (m) => m.FormMessageDocsModule
                    )
            },
            {
                path: 'formatted-text',
                loadChildren: () =>
                    import('./component-docs/formatted-text/formatted-text-docs.module').then(
                        (m) => m.FormattedTextDocsModule
                    )
            },
            {
                path: 'global-config',
                loadChildren: () =>
                    import('./component-docs/global-config/global-config-docs.module').then(
                        (m) => m.GlobalConfigDocsModule
                    )
            },
            {
                path: 'icon',
                loadChildren: () => import('./component-docs/icon/icon-docs.module').then((m) => m.IconDocsModule)
            },
            {
                path: 'illustrated-message',
                loadChildren: () => import('./component-docs/illustrated-message/illustrated-message-docs.module').then((m) => m.IllustratedMessageDocsModule)
            },
            {
                path: 'info-label',
                loadChildren: () =>
                    import('./component-docs/info-label/info-label-docs.module').then((m) => m.InfoLabelDocsModule)
            },
            {
                path: 'infiniteScroll',
                loadChildren: () =>
                    import('./component-docs/infinite-scroll/infinite-scroll-docs.module').then(
                        (m) => m.InfiniteScrollDocsModule
                    )
            },
            {
                path: 'inlineHelp',
                loadChildren: () =>
                    import('./component-docs/inline-help/inline-help-docs.module').then((m) => m.InlineHelpDocsModule)
            },
            {
                path: 'input',
                loadChildren: () => import('./component-docs/input/input-docs.module').then((m) => m.InputDocsModule)
            },
            {
                path: 'inputGroup',
                loadChildren: () =>
                    import('./component-docs/input-group/input-group-docs.module').then((m) => m.InputGroupDocsModules)
            },
            {
                path: 'layoutGrid',
                loadChildren: () =>
                    import('./component-docs/layout-grid/layout-grid-docs.module').then((m) => m.LayoutGridDocsModule)
            },
            {
                path: 'layoutPanel',
                loadChildren: () =>
                    import('./component-docs/layout-panel/layout-panel-docs.module').then(
                        (m) => m.LayoutPanelDocsModule
                    )
            },
            {
                path: 'link',
                loadChildren: () => import('./component-docs/link/link-docs.module').then((m) => m.LinkDocsModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./component-docs/list/list-docs.module').then((m) => m.ListDocsModule)
            },
            {
                path: 'list-byline',
                loadChildren: () => import('./component-docs/list-byline/list-byline-docs.module').then((m) => m.ListDocsModule)
            },
            {
                path: 'menu',
                loadChildren: () => import('./component-docs/menu/menu-docs.module').then((m) => m.MenuDocsModule)
            },
            {
                path: 'message-strip',
                loadChildren: () =>
                    import('./component-docs/message-strip/message-strip-docs.module').then(
                        (m) => m.MessageStripDocsModule
                    )
            },
            {
                path: 'message-box',
                loadChildren: () =>
                    import('./component-docs/message-box/message-box-docs.module').then(
                        (m) => m.MessageBoxDocsModule
                    )
            },
            {
                path: 'message-toast',
                loadChildren: () =>
                    import('./component-docs/message-toast/message-toast-docs.module').then(
                        (m) => m.MessageToastDocsModule
                    )
            },
            {
                path: 'multi-input',
                loadChildren: () =>
                    import('./component-docs/multi-input/multi-input-docs.module').then((m) => m.MultiInputDocsModule)
            },
            {
                path: 'notification',
                loadChildren: () =>
                    import('./component-docs/notification/notification-docs.module').then(
                        (m) => m.NotificationDocsModule
                    )
            },
            {
                path: 'object-identifier',
                loadChildren: () =>
                    import('./component-docs/object-identifier/object-identifier-docs.module').then(
                        (m) => m.ObjectIdentifierDocsModule
                    )
            },
            {
                path: 'object-marker',
                loadChildren: () =>
                    import('./component-docs/object-marker/object-marker-docs.module').then(
                        (m) => m.ObjectMarkerDocsModule
                    )
            },
            {
                path: 'object-status',
                loadChildren: () =>
                    import('./component-docs/object-status/object-status-docs.module').then(
                        (m) => m.ObjectStatusDocsModule
                    )
            },
            {
                path: 'pagination',
                loadChildren: () =>
                    import('./component-docs/pagination/pagination-docs.module').then((m) => m.PaginationDocsModule)
            },
            {
                path: 'panel',
                loadChildren: () => import('./component-docs/panel/panel-docs.module').then((m) => m.PanelDocsModule)
            },
            {
                path: 'popover',
                loadChildren: () =>
                    import('./component-docs/popover/popover-docs.module').then((m) => m.PopoverDocsModule)
            },
            {
                path: 'product-switch',
                loadChildren: () =>
                    import('./component-docs/product-switch/product-switch-docs.module').then(
                        (m) => m.ProductSwitchDocsModule
                    )
            },
            {
                path: 'quick-view',
                loadChildren: () =>
                    import('./component-docs/quick-view/quick-view-docs.module').then(
                        (m) => m.QuickViewDocsModule
                    )
            },
            {
                path: 'radio',
                loadChildren: () => import('./component-docs/radio/radio-docs.module').then((m) => m.RadioDocsModule)
            },
            {
                path: 'rating-indicator',
                loadChildren: () =>
                    import('./component-docs/rating-indicator/rating-indicator-docs.module').then(
                        (m) => m.RatingIndicatorDocsModule
                    )
            },
            {
                path: 'scroll-spy',
                loadChildren: () =>
                    import('./component-docs/scroll-spy/scroll-spy-docs.module').then((m) => m.ScrollSpyDocsModules)
            },
            {
                path: 'shellbar',
                loadChildren: () =>
                    import('./component-docs/shellbar/shellbar-docs.module').then((m) => m.ShellbarDocsModule)
            },
            {
                path: 'sideNavigation',
                loadChildren: () =>
                    import('./component-docs/side-navigation/side-navigation-docs.module').then(
                        (m) => m.SideNavigationDocsModule
                    )
            },
            {
                path: 'select',
                loadChildren: () =>
                    import('./component-docs/select/select-docs.module').then((m) => m.SelectDocsModules)
            },
            {
                path: 'splitButton',
                loadChildren: () =>
                    import('./component-docs/split-button/split-button-docs.module').then(
                        (m) => m.SplitButtonDocsModule
                    )
            },
            {
                path: 'status-indicator',
                loadChildren: () =>
                    import('./component-docs/status-indicator/status-indicator-docs.module').then((m) => m.StatusIndicatorDocsModule)
            },
            {
                path: 'step-input',
                loadChildren: () =>
                    import('./component-docs/step-input/step-input-docs.module').then((m) => m.StepInputDocsModule)
            },
            {
                path: 'switch',
                loadChildren: () => import('./component-docs/switch/switch-docs.module').then((m) => m.SwitchDocsModule)
            },
            {
                path: 'table',
                loadChildren: () => import('./component-docs/table/table-docs.module').then((m) => m.TableDocsModule)
            },
            {
                path: 'tabs',
                loadChildren: () => import('./component-docs/tabs/tabs-docs.module').then((m) => m.TabsDocsModule)
            },
            {
                path: 'text',
                loadChildren: () => import('./component-docs/text/text-docs.module').then((m) => m.TextDocsModule)
            },
            {
                path: 'textarea',
                loadChildren: () =>
                    import('./component-docs/textarea/textarea-docs.module').then((m) => m.TextareaDocsModule)
            },
            {
                path: 'theme-switcher',
                loadChildren: () =>
                    import('./component-docs/theme-switcher/theme-switcher-docs.module').then(
                        (m) => m.ThemeSwitcherDocsModule
                    )
            },
            {
                path: 'tile',
                loadChildren: () => import('./component-docs/tile/tile-docs.module').then((m) => m.TileDocsModule)
            },
            {
                path: 'time',
                loadChildren: () => import('./component-docs/time/time-docs.module').then((m) => m.TimeDocsModule)
            },
            {
                path: 'timePicker',
                loadChildren: () =>
                    import('./component-docs/time-picker/time-picker-docs.module').then((m) => m.TimePickerDocsModule)
            },
            {
                path: 'title',
                loadChildren: () => import('./component-docs/title/title-docs.module').then((m) => m.TitleDocsModule)
            },
            {
                path: 'token',
                loadChildren: () => import('./component-docs/token/token-docs.module').then((m) => m.TokenDocsModule)
            },
            {
                path: 'toolbar',
                loadChildren: () =>
                    import('./component-docs/toolbar/toolbar-docs.module').then((m) => m.ToolbarDocsModule)
            },
            {
                path: 'tree',
                loadChildren: () => import('./component-docs/tree/tree-docs.module').then((m) => m.TreeDocsModule)
            },
            {
                path: 'object-number',
                loadChildren: () => import('./component-docs/object-number/object-number-docs.module').then((m) => m.ObjectNumberDocsModule)
            },
            {
                path: 'wizard',
                loadChildren: () => import('./component-docs/wizard/wizard-docs.module').then((m) => m.WizardDocsModule)
            },
            {
                path: 'grid-list',
                loadChildren: () => import('./component-docs/grid-list/grid-list-docs.module').then((m) => m.GridListDocsModule)
            },
            {
                path: 'slider',
                loadChildren: () => import('./component-docs/slider/slider-docs.module').then((m) => m.SliderDocsModule)
            }
        ]
    }
];
