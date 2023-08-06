import { Routes } from '@angular/router';
import { CoreDocumentationComponent } from './documentation/core-documentation.component';
import { HomeDocsComponent } from './component-docs/core-home/core-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/i18n').then((m) => m.PlatformI18nDocsModule)
            },
            {
                path: 'action-bar',
                loadChildren: () => import('@fundamental-ngx/docs/core/action-bar').then((m) => m.ActionBarDocsModule)
            },
            {
                path: 'action-sheet',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/action-sheet').then((m) => m.ActionSheetDocsModule)
            },
            {
                path: 'avatar',
                loadChildren: () => import('@fundamental-ngx/docs/core/avatar').then((m) => m.AvatarDocsModule)
            },
            {
                path: 'avatar-group',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/avatar-group').then((m) => m.AvatarGroupDocsModule)
            },
            {
                path: 'bar',
                loadChildren: () => import('@fundamental-ngx/docs/core/bar').then((m) => m.BarDocsModule)
            },
            {
                path: 'breadcrumb',
                loadChildren: () => import('@fundamental-ngx/docs/core/breadcrumb').then((m) => m.BreadcrumbDocsModule)
            },
            {
                path: 'busy-indicator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/busy-indicator').then((m) => m.BusyIndicatorDocsModule)
            },
            {
                path: 'button',
                loadChildren: () => import('@fundamental-ngx/docs/core/button').then((m) => m.ButtonDocsModule)
            },
            {
                path: 'card',
                loadChildren: () => import('@fundamental-ngx/docs/core/card').then((m) => m.CardDocsModule)
            },
            {
                path: 'segmented-button',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/segmented-button').then((m) => m.SegmentedButtonDocsModule)
            },
            {
                path: 'calendar',
                loadChildren: () => import('@fundamental-ngx/docs/core/calendar').then((m) => m.CalendarDocsModule)
            },
            {
                path: 'carousel',
                loadChildren: () => import('@fundamental-ngx/docs/core/carousel').then((m) => m.CarouselDocsModule)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('@fundamental-ngx/docs/core/checkbox').then((m) => m.CheckboxDocsModule)
            },
            {
                path: 'combobox',
                loadChildren: () => import('@fundamental-ngx/docs/core/combobox').then((m) => m.ComboboxDocsModule)
            },
            {
                path: 'date-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/date-picker').then((m) => m.DatePickerDocsModule)
            },
            {
                path: 'datetime-picker',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/datetime-picker').then((m) => m.DatetimePickerDocsModule)
            },
            {
                path: 'dialog',
                loadChildren: () => import('@fundamental-ngx/docs/core/dialog').then((m) => m.DialogDocsModule)
            },
            {
                path: 'dynamic-page',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/dynamic-page').then((m) => m.DynamicPageDocsModule)
            },
            {
                path: 'object-page',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-page').then((m) => m.ObjectPageDocsModule)
            },
            {
                path: 'facets',
                loadChildren: () => import('@fundamental-ngx/docs/core/facets').then((m) => m.FacetDocsModule)
            },
            {
                path: 'feed-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/feed-list-item').then((m) => m.FeedListItemDocsModule)
            },
            {
                path: 'dynamic-side-content',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/dynamic-side-content').then(
                        (m) => m.DynamicSideContentDocsModule
                    )
            },
            {
                path: 'feed-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/feed-input').then((m) => m.FeedInputDocsModule)
            },
            {
                path: 'file-uploader',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/file-uploader').then((m) => m.FileUploaderDocsModule)
            },
            {
                path: 'fixed-card-layout',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/fixed-card-layout').then((m) => m.FixedCardLayoutDocsModule)
            },
            {
                path: 'flexible-column-layout',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/flexible-column-layout').then(
                        (m) => m.FlexibleColumnLayoutDocsModule
                    )
            },
            {
                path: 'form-message',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/form-message').then((m) => m.FormMessageDocsModule)
            },
            {
                path: 'formatted-text',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/formatted-text').then((m) => m.FormattedTextDocsModule)
            },
            {
                path: 'global-config',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/global-config').then((m) => m.GlobalConfigDocsModule)
            },
            {
                path: 'content-density',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/content-density').then((m) => m.ContentDensityDocsModule)
            },
            {
                path: 'truncate',
                loadChildren: () => import('@fundamental-ngx/docs/core/truncate').then((m) => m.TruncateDocsModule)
            },
            {
                path: 'grid-list',
                loadChildren: () => import('@fundamental-ngx/docs/core/grid-list').then((m) => m.GridListDocsModule)
            },
            {
                path: 'icon',
                loadChildren: () => import('@fundamental-ngx/docs/core/icon').then((m) => m.IconDocsModule)
            },
            {
                path: 'illustrated-message',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/illustrated-message').then((m) => m.IllustratedMessageDocsModule)
            },
            {
                path: 'info-label',
                loadChildren: () => import('@fundamental-ngx/docs/core/info-label').then((m) => m.InfoLabelDocsModule)
            },
            {
                path: 'infinite-scroll',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/infinite-scroll').then((m) => m.InfiniteScrollDocsModule)
            },
            {
                path: 'inline-help',
                loadChildren: () => import('@fundamental-ngx/docs/core/inline-help').then((m) => m.InlineHelpDocsModule)
            },
            {
                path: 'input',
                loadChildren: () => import('@fundamental-ngx/docs/core/input').then((m) => m.InputDocsModule)
            },
            {
                path: 'input-group',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/input-group').then((m) => m.InputGroupDocsModules)
            },
            {
                path: 'layout-grid',
                loadChildren: () => import('@fundamental-ngx/docs/core/layout-grid').then((m) => m.LayoutGridDocsModule)
            },
            {
                path: 'layout-panel',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/layout-panel').then((m) => m.LayoutPanelDocsModule)
            },
            {
                path: 'link',
                loadChildren: () => import('@fundamental-ngx/docs/core/link').then((m) => m.LinkDocsModule)
            },
            {
                path: 'list',
                loadChildren: () => import('@fundamental-ngx/docs/core/list').then((m) => m.ListDocsModule)
            },
            {
                path: 'list-byline',
                loadChildren: () => import('@fundamental-ngx/docs/core/list-byline').then((m) => m.ListDocsModule)
            },
            {
                path: 'menu',
                loadChildren: () => import('@fundamental-ngx/docs/core/menu').then((m) => m.MenuDocsModule)
            },
            {
                path: 'message-strip',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/message-strip').then((m) => m.MessageStripDocsModule)
            },
            {
                path: 'message-box',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-box').then((m) => m.MessageBoxDocsModule)
            },
            {
                path: 'message-page',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/message-page').then((m) => m.MessagePageDocsModule)
            },
            {
                path: 'message-toast',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/message-toast').then((m) => m.MessageToastDocsModule)
            },
            {
                path: 'micro-process-flow',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/micro-process-flow').then((m) => m.MicroProcessFlowDocsModule)
            },
            {
                path: 'multi-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/multi-input').then((m) => m.MultiInputDocsModule)
            },
            {
                path: 'notification',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/notification').then((m) => m.NotificationDocsModule)
            },
            {
                path: 'object-identifier',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/object-identifier').then((m) => m.ObjectIdentifierDocsModule)
            },
            {
                path: 'object-marker',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/object-marker').then((m) => m.ObjectMarkerDocsModule)
            },
            {
                path: 'object-number',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/object-number').then((m) => m.ObjectNumberDocsModule)
            },
            {
                path: 'object-status',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/object-status').then((m) => m.ObjectStatusDocsModule)
            },
            {
                path: 'pagination',
                loadChildren: () => import('@fundamental-ngx/docs/core/pagination').then((m) => m.PaginationDocsModule)
            },
            {
                path: 'panel',
                loadChildren: () => import('@fundamental-ngx/docs/core/panel').then((m) => m.PanelDocsModule)
            },
            {
                path: 'popover',
                loadChildren: () => import('@fundamental-ngx/docs/core/popover').then((m) => m.PopoverDocsModule)
            },
            {
                path: 'product-switch',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/product-switch').then((m) => m.ProductSwitchDocsModule)
            },
            {
                path: 'progress-indicator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/progress-indicator').then((m) => m.ProgressIndicatorDocsModule)
            },
            {
                path: 'quick-view',
                loadChildren: () => import('@fundamental-ngx/docs/core/quick-view').then((m) => m.QuickViewDocsModule)
            },
            {
                path: 'radio',
                loadChildren: () => import('@fundamental-ngx/docs/core/radio').then((m) => m.RadioDocsModule)
            },
            {
                path: 'rating-indicator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/rating-indicator').then((m) => m.RatingIndicatorDocsModule)
            },
            {
                path: 'resizable-card-layout',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/resizable-card-layout').then(
                        (m) => m.ResizableCardLayoutDocsModule
                    )
            },
            {
                path: 'scroll-spy',
                loadChildren: () => import('@fundamental-ngx/docs/core/scroll-spy').then((m) => m.ScrollSpyDocsModules)
            },
            {
                path: 'shellbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/shellbar').then((m) => m.ShellbarDocsModule)
            },
            {
                path: 'side-navigation',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/side-navigation').then((m) => m.SideNavigationDocsModule)
            },
            {
                path: 'select',
                loadChildren: () => import('@fundamental-ngx/docs/core/select').then((m) => m.SelectDocsModules)
            },
            {
                path: 'slider',
                loadChildren: () => import('@fundamental-ngx/docs/core/slider').then((m) => m.SliderDocsModule)
            },
            {
                path: 'split-button',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/split-button').then((m) => m.SplitButtonDocsModule)
            },
            {
                path: 'splitter',
                loadChildren: () => import('@fundamental-ngx/docs/core/splitter').then((m) => m.SplitterDocsModule)
            },
            {
                path: 'status-indicator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/status-indicator').then((m) => m.StatusIndicatorDocsModule)
            },
            {
                path: 'step-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/step-input').then((m) => m.StepInputDocsModule)
            },
            {
                path: 'switch',
                loadChildren: () => import('@fundamental-ngx/docs/core/switch').then((m) => m.SwitchDocsModule)
            },
            {
                path: 'table',
                loadChildren: () => import('@fundamental-ngx/docs/core/table').then((m) => m.TableDocsModule)
            },
            {
                path: 'tabs',
                loadChildren: () => import('@fundamental-ngx/docs/core/tabs').then((m) => m.TabsDocsModule)
            },
            {
                path: 'text',
                loadChildren: () => import('@fundamental-ngx/docs/core/text').then((m) => m.TextDocsModule)
            },
            {
                path: 'textarea',
                loadChildren: () => import('@fundamental-ngx/docs/core/textarea').then((m) => m.TextareaDocsModule)
            },
            {
                path: 'theme-switcher',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/theme-switcher').then((m) => m.ThemeSwitcherDocsModule)
            },
            {
                path: 'theming',
                loadChildren: () => import('@fundamental-ngx/docs/core/theming').then((m) => m.ThemingDocsModule)
            },
            {
                path: 'tile',
                loadChildren: () => import('@fundamental-ngx/docs/core/tile').then((m) => m.TileDocsModule)
            },
            {
                path: 'time',
                loadChildren: () => import('@fundamental-ngx/docs/core/time').then((m) => m.TimeDocsModule)
            },
            {
                path: 'time-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/time-picker').then((m) => m.TimePickerDocsModule)
            },
            {
                path: 'title',
                loadChildren: () => import('@fundamental-ngx/docs/core/title').then((m) => m.TitleDocsModule)
            },
            {
                path: 'token',
                loadChildren: () => import('@fundamental-ngx/docs/core/token').then((m) => m.TokenDocsModule)
            },
            {
                path: 'toolbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/toolbar').then((m) => m.ToolbarDocsModule)
            },
            {
                path: 'tree',
                loadChildren: () => import('@fundamental-ngx/docs/core/tree').then((m) => m.TreeDocsModule)
            },
            {
                path: 'vertical-navigation',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/vertical-navigation').then((m) => m.VerticalNavigationDocsModule)
            },
            {
                path: 'upload-collection',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/upload-collection').then((m) => m.UploadCollectionDocsModule)
            },
            {
                path: 'wizard',
                loadChildren: () => import('@fundamental-ngx/docs/core/wizard').then((m) => m.WizardDocsModule)
            },
            {
                path: 'moment-datetime-adapter',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/moment-datetime-adapter').then(
                        (m) => m.MomentDatetimeAdapterDocsModule
                    )
            },
            {
                path: 'dayjs-datetime-adapter',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/dayjs-datetime-adapter').then(
                        (m) => m.DayjsDatetimeAdapterDocsModule
                    )
            },
            {
                path: 'timeline',
                loadChildren: () => import('@fundamental-ngx/docs/core/timeline').then((m) => m.TimelineDocsModule)
            },
            {
                path: 'scrollbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/scrollbar').then((m) => m.ScrollbarDocsModule)
            },
            {
                path: 'overflow-layout',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/overflow-layout').then((m) => m.OverflowLayoutDocsModule)
            },
            {
                path: 'skeleton',
                loadChildren: () => import('@fundamental-ngx/docs/core/skeleton').then((m) => m.SkeletonDocsModule)
            },
            {
                path: 'multi-combobox',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/multi-combobox').then((m) => m.MultiComboboxDocsModule)
            }
        ]
    }
];
