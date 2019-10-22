import { Routes } from '@angular/router';
import { CoreDocumentationComponent } from './documentation/core-documentation.component';
import { ActionBarHeaderComponent } from './component-docs/action-bar/action-bar-header/action-bar-header.component';
import { ActionBarDocsComponent } from './component-docs/action-bar/action-bar-docs.component';
import { ApiComponent } from './../documentation/core-helpers/api/api.component';
import { API_FILES } from './api-files';
import { AlertHeaderComponent } from './component-docs/alert/alert-header/alert-header.component';
import { AlertDocsComponent } from './component-docs/alert/alert-docs.component';
import { BadgeLabelDocsComponent } from './component-docs/badge-label/badge-label-docs.component';
import { BreadcrumbDocsComponent } from './component-docs/breadcrumb/breadcrumb-docs.component';
import { ButtonDocsComponent } from './component-docs/button/button-docs.component';
import { ButtonGroupDocsComponent } from './component-docs/button-group/button-group-docs.component';
import { CalendarDocsComponent } from './component-docs/calendar/calendar-docs.component';
import { ComboboxDocsComponent } from './component-docs/combobox/combobox-docs.component';
import { DatePickerDocsComponent } from './component-docs/date-picker/date-picker-docs.component';
import { DatetimePickerDocsComponent } from './component-docs/datetime-picker/datetime-picker-docs.component';
import { DropdownDocsComponent } from './component-docs/dropdown/dropdown-docs.component';
import { FileInputDocsComponent } from './component-docs/file-input/file-input-docs.component';
import { IconDocsComponent } from './component-docs/icon/icon-docs.component';
import { IdentifierDocsComponent } from './component-docs/identifier/identifier-docs.component';
import { ImageDocsComponent } from './component-docs/image/image-docs.component';
import { InfiniteScrollDocsComponent } from './component-docs/infinite-scroll/infinite-scroll-docs.component';
import { InlineHelpDocsComponent } from './component-docs/inline-help/inline-help-docs.component';
import { InputGroupDocsComponent } from './component-docs/input-group/input-group-docs.component';
import { ListDocsComponent } from './component-docs/list/list-docs.component';
import { LoadingSpinnerDocsComponent } from './component-docs/loading-spinner-docs/loading-spinner-docs.component';
import { MenuDocsComponent } from './component-docs/menu/menu-docs.component';
import { ModalDocsComponent } from './component-docs/modal/modal-docs.component';
import { MultiInputDocsComponent } from './component-docs/multi-input/multi-input-docs.component';
import { PaginationDocsComponent } from './component-docs/pagination/pagination-docs.component';
import { PanelDocsComponent } from './component-docs/panel/panel-docs.component';
import { PopoverDocsComponent } from './component-docs/popover/popover-docs.component';
import { PopoverDirectiveDocsComponent } from './component-docs/popover-directive/popover-directive-docs.component';
import { ScrollSpyDocsComponent } from './component-docs/scroll-spy/scroll-spy-docs.component';
import { ShellbarDocsComponent } from './component-docs/shellbar/shellbar-docs.component';
import { SideNavigationDocsComponent } from './component-docs/side-navigation/side-navigation-docs.component';
import { TableDocsComponent } from './component-docs/table/table-docs.component';
import { TabsDocsComponent } from './component-docs/tabs/tabs-docs.component';
import { TileDocsComponent } from './component-docs/tile/tile-docs.component';
import { TimeDocsComponent } from './component-docs/time/time-docs.component';
import { TimePickerDocsComponent } from './component-docs/time-picker/time-picker-docs.component';
import { TreeDocsComponent } from './component-docs/tree/tree-docs.component';
import { ToggleDocsComponent } from './component-docs/toggle/toggle-docs.component';
import { TokenDocsComponent } from './component-docs/token/token-docs.component';
import { HomeDocsComponent } from './component-docs/core-home/core-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { BadgeLabelHeaderComponent } from './component-docs/badge-label/badge-label-header/badge-label-header.component';
import { BreadcrumbHeaderComponent } from './component-docs/breadcrumb/breadcrumb-header/breadcrumb-header.component';
import { ButtonHeaderComponent } from './component-docs/button/button-header/button-header.component';
import { ButtonGroupHeaderComponent } from './component-docs/button-group/button-group-header/button-group-header.component';
import { CalendarHeaderComponent } from './component-docs/calendar/calendar-header/calendar-header.component';
import { ComboboxHeaderComponent } from './component-docs/combobox/combobox-header/combobox-header.component';
import { DatePickerHeaderComponent } from './component-docs/date-picker/date-picker-header/date-picker-header.component';
import { DatetimePickerHeaderComponent } from './component-docs/datetime-picker/datetime-picker-header/datetime-picker-header.component';
import { DropdownHeaderComponent } from './component-docs/dropdown/dropdown-header/dropdown-header.component';
import { FileInputHeaderComponent } from './component-docs/file-input/file-input-header/file-input-header.component';
import { IconHeaderComponent } from './component-docs/icon/icon-header/icon-header.component';
import { IdentifierHeaderComponent } from './component-docs/identifier/identifier-header/identifier-header.component';
import { ImageHeaderComponent } from './component-docs/image/image-header/image-header.component';
import { InfiniteScrollHeaderComponent } from './component-docs/infinite-scroll/infinite-scroll-header/infinite-scroll-header.component';
import { InlineHelpHeaderComponent } from './component-docs/inline-help/inline-help-header/inline-help-header.component';
import { InputGroupHeaderComponent } from './component-docs/input-group/input-group-header/input-group-header.component';
import { ListHeaderComponent } from './component-docs/list/list-header/list-header.component';
import { LoadingSpinnerHeaderComponent } from './component-docs/loading-spinner-docs/loading-spinner-header/loading-spinner-header.component';
import { MenuHeaderComponent } from './component-docs/menu/menu-header/menu-header.component';
import { ModalDocsHeaderComponent } from './component-docs/modal/modal-docs-header/modal-docs-header.component';
import { MultiInputHeaderComponent } from './component-docs/multi-input/multi-input-header/multi-input-header.component';
import { PaginationHeaderComponent } from './component-docs/pagination/pagination-header/pagination-header.component';
import { PanelDocsHeaderComponent } from './component-docs/panel/panel-docs-header/panel-docs-header.component';
import { PopoverHeaderComponent } from './component-docs/popover/popover-header/popover-header.component';
import { PopoverDirectiveHeaderComponent } from './component-docs/popover-directive/popover-directive-header/popover-directive-header.component';
import { ScrollSpyHeaderComponent } from './component-docs/scroll-spy/scroll-spy-header/scroll-spy-header.component';
import { ShellbarDocsHeaderComponent } from './component-docs/shellbar/shellbar-docs-header/shellbar-docs-header.component';
import { SideNavigationHeaderComponent } from './component-docs/side-navigation/side-navigation-header/side-navigation-header.component';
import { TableDocsHeaderComponent } from './component-docs/table/table-docs-header/table-docs-header.component';
import { TabsHeaderComponent } from './component-docs/tabs/tabs-header/tabs-header.component';
import { TileDocsHeaderComponent } from './component-docs/tile/tile-docs-header/tile-docs-header.component';
import { TimeHeaderComponent } from './component-docs/time/time-header/time-header.component';
import { TimePickerHeaderComponent } from './component-docs/time-picker/time-picker-header/time-picker-header.component';
import { TreeHeaderComponent } from './component-docs/tree/tree-header/tree-header.component';
import { ToggleHeaderComponent } from './component-docs/toggle/toggle-header/toggle-header.component';
import { TokenHeaderComponent } from './component-docs/token/token-header/token-header.component';
import { LocalizationEditorHeaderComponent } from './component-docs/localization-editor/localization-editor-header/localization-editor-header.component';
import { LocalizationEditorDocsComponent } from './component-docs/localization-editor/localization-editor-docs.component';
import { SplitButtonHeaderComponent } from './component-docs/split-button/split-button-header/split-button-header.component';
import { SplitButtonDocsComponent } from './component-docs/split-button/split-button-docs.component';
import {
    TabNavigationExampleChildFirst,
    TabNavigationExampleChildSecond,
    TabNavigationExampleChildThird
} from './component-docs/tabs/examples/tab-navigation-children/tab-navigation-children';
import { InputHeaderComponent } from './component-docs/input/input-header/input-header.component';
import { InputDocsComponent } from './component-docs/input/input-docs.component';
import { SelectNativeHeaderComponent } from './component-docs/select-native/select-native-header/select-native-header.component';
import { SelectNativeDocsComponent } from './component-docs/select-native/select-native-docs.component';
import { TextareaHeaderComponent } from './component-docs/textarea/textarea-header/textarea-header.component';
import { TextareaDocsComponent } from './component-docs/textarea/textarea-docs.component';
import { CheckboxHeaderComponent } from './component-docs/checkbox/checkbox-header/checkbox-header.component';
import { CheckboxDocsComponent } from './component-docs/checkbox/checkbox-docs.component';
import { RadioHeaderComponent } from './component-docs/radio/radio-header/radio-header.component';
import { RadioDocsComponent } from './component-docs/radio/radio-docs.component';
import { SelectHeaderComponent } from './component-docs/select/select-header/select-header.component';
import { SelectDocsComponent } from './component-docs/select/select-docs.component';
import { MegaMenuHeaderComponent } from './component-docs/mega-menu/mega-menu-header/mega-menu-header.component';
import { MegaMenuDocsComponent } from './component-docs/mega-menu/mega-menu-docs.component';
import { LayoutGridDocsHeaderComponent } from './component-docs/layout-grid/layout-grid-docs-header/layout-grid-docs-header.component';
import { LayoutGridDocsComponent } from './component-docs/layout-grid/layout-grid-docs.component';
import { NotificationDocsComponent } from './component-docs/notification/notification-docs.component';
import { NotificationDocsHeaderComponent } from './component-docs/notification/notification-docs-header/notification-docs-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'action-bar',
                component: ActionBarHeaderComponent,
                children: [
                    { path: '', component: ActionBarDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.actionBar } }
                ]
            },
            {
                path: 'alert',
                component: AlertHeaderComponent,
                children: [
                    { path: '', component: AlertDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.alert } }
                ]
            },
            {
                path: 'badgeLabel',
                component: BadgeLabelHeaderComponent,
                children: [
                    { path: '', component: BadgeLabelDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.badgeLabel } }
                ]
            },
            {
                path: 'breadcrumb',
                component: BreadcrumbHeaderComponent,
                children: [
                    { path: '', component: BreadcrumbDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.breadcrumb } }
                ]
            },
            {
                path: 'button',
                component: ButtonHeaderComponent,
                children: [
                    { path: '', component: ButtonDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
                ]
            },
            {
                path: 'buttonGroup',
                component: ButtonGroupHeaderComponent,
                children: [
                    { path: '', component: ButtonGroupDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.buttonGroup } }
                ]
            },
            {
                path: 'calendar',
                component: CalendarHeaderComponent,
                children: [
                    { path: '', component: CalendarDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.calendar } }
                ]
            },
            {
                path: 'checkbox',
                component: CheckboxHeaderComponent,
                children: [
                    { path: '', component: CheckboxDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
                ]
            },
            {
                path: 'combobox',
                component: ComboboxHeaderComponent,
                children: [
                    { path: '', component: ComboboxDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.combobox } }
                ]
            },
            {
                path: 'datePicker',
                component: DatePickerHeaderComponent,
                children: [
                    { path: '', component: DatePickerDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.datePicker } }
                ]
            },
            {
                path: 'datetime-picker',
                component: DatetimePickerHeaderComponent,
                children: [
                    { path: '', component: DatetimePickerDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.datetimePicker } }
                ]
            },
            {
                path: 'dropdown',
                component: DropdownHeaderComponent,
                children: [
                    { path: '', component: DropdownDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: [] } }
                ]
            },
            {
                path: 'file-input',
                component: FileInputHeaderComponent,
                children: [
                    { path: '', component: FileInputDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.fileInput } }
                ]
            },
            {
                path: 'icon',
                component: IconHeaderComponent,
                children: [
                    { path: '', component: IconDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.icon } }
                ]
            },
            {
                path: 'identifier',
                component: IdentifierHeaderComponent,
                children: [
                    { path: '', component: IdentifierDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.identifier } }
                ]
            },
            {
                path: 'image',
                component: ImageHeaderComponent,
                children: [
                    { path: '', component: ImageDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.image } }
                ]
            },
            {
                path: 'infiniteScroll',
                component: InfiniteScrollHeaderComponent,
                children: [
                    { path: '', component: InfiniteScrollDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.infiniteScroll } }
                ]
            },
            {
                path: 'inlineHelp',
                component: InlineHelpHeaderComponent,
                children: [
                    { path: '', component: InlineHelpDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.inlineHelp } }
                ]
            },
            {
                path: 'input',
                component: InputHeaderComponent,
                children: [
                    { path: '', component: InputDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
                ]
            },
            {
                path: 'inputGroup',
                component: InputGroupHeaderComponent,
                children: [
                    { path: '', component: InputGroupDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
                ]
            },
            {
                path: 'layoutGrid',
                component: LayoutGridDocsHeaderComponent,
                children: [
                    { path: '', component: LayoutGridDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.layoutGrid } }
                ]
            },
            {
                path: 'list',
                component: ListHeaderComponent,
                children: [
                    { path: '', component: ListDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
                ]
            },
            {
                path: 'loadingSpinner',
                component: LoadingSpinnerHeaderComponent,
                children: [
                    { path: '', component: LoadingSpinnerDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.loadingSpinner } }
                ]
            },
            {
                path: 'localizationEditor',
                component: LocalizationEditorHeaderComponent,
                children: [
                    { path: '', component: LocalizationEditorDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.localizationEditor } }
                ]
            },
            {
                path: 'mega-menu',
                component: MegaMenuHeaderComponent,
                children: [
                    { path: '', component: MegaMenuDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.megaMenu } }
                ]
            },
            {
                path: 'menu',
                component: MenuHeaderComponent,
                children: [
                    { path: '', component: MenuDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
                ]
            },
            {
                path: 'modal',
                component: ModalDocsHeaderComponent,
                children: [
                    { path: '', component: ModalDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.modal } }
                ]
            },
            {
                path: 'multi-input',
                component: MultiInputHeaderComponent,
                children: [
                    { path: '', component: MultiInputDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.multiInput } }
                ]
            },
            { path: 'notification', component: NotificationDocsHeaderComponent, children: [
                    { path: '', component: NotificationDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.multiInput}}
                ]
            },
            {
                path: 'pagination',
                component: PaginationHeaderComponent,
                children: [
                    { path: '', component: PaginationDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.pagination } }
                ]
            },
            {
                path: 'panel',
                component: PanelDocsHeaderComponent,
                children: [
                    { path: '', component: PanelDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.panel } }
                ]
            },
            {
                path: 'popover',
                component: PopoverHeaderComponent,
                children: [
                    { path: '', component: PopoverDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.popover } }
                ]
            },
            {
                path: 'popover-directive',
                component: PopoverDirectiveHeaderComponent,
                children: [
                    { path: '', component: PopoverDirectiveDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.popoverDirective } }
                ]
            },
            {
                path: 'radio',
                component: RadioHeaderComponent,
                children: [
                    { path: '', component: RadioDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
                ]
            },
            {
                path: 'select-native',
                component: SelectNativeHeaderComponent,
                children: [
                    { path: '', component: SelectNativeDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
                ]
            },
            {
                path: 'scroll-spy',
                component: ScrollSpyHeaderComponent,
                children: [
                    { path: '', component: ScrollSpyDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.scrollSpy } }
                ]
            },
            {
                path: 'shellbar',
                component: ShellbarDocsHeaderComponent,
                children: [
                    { path: '', component: ShellbarDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.shellbar } }
                ]
            },
            {
                path: 'sideNavigation',
                component: SideNavigationHeaderComponent,
                children: [
                    { path: '', component: SideNavigationDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.sideNavigation } }
                ]
            },
            {
                path: 'select',
                component: SelectHeaderComponent,
                children: [
                    { path: '', component: SelectDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
                ]
            },
            {
                path: 'splitButton',
                component: SplitButtonHeaderComponent,
                children: [
                    { path: '', component: SplitButtonDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.splitButton } }
                ]
            },
            {
                path: 'table',
                component: TableDocsHeaderComponent,
                children: [
                    { path: '', component: TableDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.table } }
                ]
            },
            {
                path: 'tabs',
                component: TabsHeaderComponent,
                children: [
                    {
                        path: '',
                        component: TabsDocsComponent,
                        children: [
                            { path: 'tab1', component: TabNavigationExampleChildFirst },
                            { path: 'tab2', component: TabNavigationExampleChildSecond },
                            { path: 'tab3', component: TabNavigationExampleChildThird }
                        ]
                    },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
                ]
            },
            {
                path: 'textarea',
                component: TextareaHeaderComponent,
                children: [
                    { path: '', component: TextareaDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
                ]
            },
            {
                path: 'tile',
                component: TileDocsHeaderComponent,
                children: [
                    { path: '', component: TileDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.tile } }
                ]
            },
            {
                path: 'time',
                component: TimeHeaderComponent,
                children: [
                    { path: '', component: TimeDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.time } }
                ]
            },
            {
                path: 'timePicker',
                component: TimePickerHeaderComponent,
                children: [
                    { path: '', component: TimePickerDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.timePicker } }
                ]
            },
            {
                path: 'tree',
                component: TreeHeaderComponent,
                children: [
                    { path: '', component: TreeDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.tree } }
                ]
            },
            {
                path: 'toggle',
                component: ToggleHeaderComponent,
                children: [
                    { path: '', component: ToggleDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.toggle } }
                ]
            },
            {
                path: 'token',
                component: TokenHeaderComponent,
                children: [
                    { path: '', component: TokenDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.token } }
                ]
            },
            { path: 'home', component: HomeDocsComponent },
            { path: 'new-component', component: NewComponentComponent }
        ]
    }
];
