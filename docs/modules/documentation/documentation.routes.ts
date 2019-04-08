import { Routes } from '@angular/router';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ActionBarHeaderComponent } from './containers/action-bar/action-bar-header/action-bar-header.component';
import { ActionBarDocsComponent } from './containers/action-bar/action-bar-docs.component';
import { ApiComponent } from './components/api/api.component';
import { API_FILES } from './utilities/api-files';
import { AlertHeaderComponent } from './containers/alert/alert-header/alert-header.component';
import { AlertDocsComponent } from './containers/alert/alert-docs.component';
import { BadgeLabelDocsComponent } from './containers/badge-label/badge-label-docs.component';
import { BreadcrumbDocsComponent } from './containers/breadcrumb/breadcrumb-docs.component';
import { ButtonDocsComponent } from './containers/button/button-docs.component';
import { ButtonGroupDocsComponent } from './containers/button-group/button-group-docs.component';
import { CalendarDocsComponent } from './containers/calendar/calendar-docs.component';
import { ComboboxInputDocsComponent } from './containers/combobox-input/combobox-input-docs.component';
import { DatePickerDocsComponent } from './containers/date-picker/date-picker-docs.component';
import { DatetimePickerDocsComponent } from './containers/datetime-picker/datetime-picker-docs.component';
import { DropdownDocsComponent } from './containers/dropdown/dropdown-docs.component';
import { FileInputDocsComponent } from './containers/file-input/file-input-docs.component';
import { FormDocsComponent } from './containers/form/form-docs.component';
import { IconDocsComponent } from './containers/icon/icon-docs.component';
import { IdentifierDocsComponent } from './containers/identifier/identifier-docs.component';
import { ImageDocsComponent } from './containers/image/image-docs.component';
import { InfiniteScrollDocsComponent } from './containers/infinite-scroll/infinite-scroll-docs.component';
import { InlineHelpDocsComponent } from './containers/inline-help/inline-help-docs.component';
import { InputGroupDocsComponent } from './containers/input-group/input-group-docs.component';
import { ListDocsComponent } from './containers/list/list-docs.component';
import { LoadingSpinnerDocsComponent } from './containers/loading-spinner-docs/loading-spinner-docs.component';
import { MenuDocsComponent } from './containers/menu/menu-docs.component';
import { ModalDocsComponent } from './containers/modal/modal-docs.component';
import { MultiInputDocsComponent } from './containers/multi-input/multi-input-docs.component';
import { PaginationDocsComponent } from './containers/pagination/pagination-docs.component';
import { PanelDocsComponent } from './containers/panel/panel-docs.component';
import { PopoverDocsComponent } from './containers/popover/popover-docs.component';
import { PopoverDirectiveDocsComponent } from './containers/popover-directive/popover-directive-docs.component';
import { ScrollSpyDocsComponent } from './containers/scroll-spy/scroll-spy-docs.component';
import { SearchInputDocsComponent } from './containers/search-input/search-input-docs.component';
import { ShellbarDocsComponent } from './containers/shellbar/shellbar-docs.component';
import { SideNavigationDocsComponent } from './containers/side-navigation/side-navigation-docs.component';
import { TableDocsComponent } from './containers/table/table-docs.component';
import { TabsDocsComponent } from './containers/tabs/tabs-docs.component';
import { TileDocsComponent } from './containers/tile/tile-docs.component';
import { TimeDocsComponent } from './containers/time/time-docs.component';
import { TimePickerDocsComponent } from './containers/time-picker/time-picker-docs.component';
import { TreeDocsComponent } from './containers/tree/tree-docs.component';
import { ToggleDocsComponent } from './containers/toggle/toggle-docs.component';
import { TokenDocsComponent } from './containers/token/token-docs.component';
import { HomeDocsComponent } from './containers/home/home.component';
import { NewComponentComponent } from './containers/new-component/new-component.component';
import { BadgeLabelHeaderComponent } from './containers/badge-label/badge-label-header/badge-label-header.component';
import { BreadcrumbHeaderComponent } from './containers/breadcrumb/breadcrumb-header/breadcrumb-header.component';
import { ButtonHeaderComponent } from './containers/button/button-header/button-header.component';
import { ButtonGroupHeaderComponent } from './containers/button-group/button-group-header/button-group-header.component';
import { CalendarHeaderComponent } from './containers/calendar/calendar-header/calendar-header.component';
import { ComboboxInputHeaderComponent } from './containers/combobox-input/combobox-input-header/combobox-input-header.component';
import { DatePickerHeaderComponent } from './containers/date-picker/date-picker-header/date-picker-header.component';
import { DatetimePickerHeaderComponent } from './containers/datetime-picker/datetime-picker-header/datetime-picker-header.component';
import { DropdownHeaderComponent } from './containers/dropdown/dropdown-header/dropdown-header.component';
import { FileInputHeaderComponent } from './containers/file-input/file-input-header/file-input-header.component';
import { FormHeaderComponent } from './containers/form/form-header/form-header.component';
import { IconHeaderComponent } from './containers/icon/icon-header/icon-header.component';
import { IdentifierHeaderComponent } from './containers/identifier/identifier-header/identifier-header.component';
import { ImageHeaderComponent } from './containers/image/image-header/image-header.component';
import { InfiniteScrollHeaderComponent } from './containers/infinite-scroll/infinite-scroll-header/infinite-scroll-header.component';
import { InlineHelpHeaderComponent } from './containers/inline-help/inline-help-header/inline-help-header.component';
import { InputGroupHeaderComponent } from './containers/input-group/input-group-header/input-group-header.component';
import { ListHeaderComponent } from './containers/list/list-header/list-header.component';
import { LoadingSpinnerHeaderComponent } from './containers/loading-spinner-docs/loading-spinner-header/loading-spinner-header.component';
import { MenuHeaderComponent } from './containers/menu/menu-header/menu-header.component';
import { ModalDocsHeaderComponent } from './containers/modal/modal-docs-header/modal-docs-header.component';
import { MultiInputHeaderComponent } from './containers/multi-input/multi-input-header/multi-input-header.component';
import { PaginationHeaderComponent } from './containers/pagination/pagination-header/pagination-header.component';
import { PanelDocsHeaderComponent } from './containers/panel/panel-docs-header/panel-docs-header.component';
import { PopoverHeaderComponent } from './containers/popover/popover-header/popover-header.component';
import { PopoverDirectiveHeaderComponent } from './containers/popover-directive/popover-directive-header/popover-directive-header.component';
import { ScrollSpyHeaderComponent } from './containers/scroll-spy/scroll-spy-header/scroll-spy-header.component';
import { SearchInputHeaderComponent } from './containers/search-input/search-input-header/search-input-header.component';
import { ShellbarDocsHeaderComponent } from './containers/shellbar/shellbar-docs-header/shellbar-docs-header.component';
import { SideNavigationHeaderComponent } from './containers/side-navigation/side-navigation-header/side-navigation-header.component';
import { TableDocsHeaderComponent } from './containers/table/table-docs-header/table-docs-header.component';
import { TabsHeaderComponent } from './containers/tabs/tabs-header/tabs-header.component';
import { TileDocsHeaderComponent } from './containers/tile/tile-docs-header/tile-docs-header.component';
import { TimeHeaderComponent } from './containers/time/time-header/time-header.component';
import { TimePickerHeaderComponent } from './containers/time-picker/time-picker-header/time-picker-header.component';
import { TreeHeaderComponent } from './containers/tree/tree-header/tree-header.component';
import { ToggleHeaderComponent } from './containers/toggle/toggle-header/toggle-header.component';
import { TokenHeaderComponent } from './containers/token/token-header/token-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'action-bar', component: ActionBarHeaderComponent, children: [
                    { path: '', component: ActionBarDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.actionBar}}
                ]
            },
            { path: 'alert', component: AlertHeaderComponent, children: [
                    { path: '', component: AlertDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.alert}}
                ]
            },
            { path: 'badgeLabel', component: BadgeLabelHeaderComponent, children: [
                    { path: '', component: BadgeLabelDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.badgeLabel}}
                ]
            },
            { path: 'breadcrumb', component: BreadcrumbHeaderComponent, children: [
                    { path: '', component: BreadcrumbDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.breadcrumb}}
                ]
            },
            { path: 'button', component: ButtonHeaderComponent, children: [
                    { path: '', component: ButtonDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.button}}
                ]
            },
            { path: 'buttonGroup', component: ButtonGroupHeaderComponent, children: [
                    { path: '', component: ButtonGroupDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.buttonGroup}}
                ]
            },
            { path: 'calendar', component: CalendarHeaderComponent, children: [
                    { path: '', component: CalendarDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.calendar}}
                ]
            },
            { path: 'comboboxInput', component: ComboboxInputHeaderComponent, children: [
                    { path: '', component: ComboboxInputDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.comboboxInput}}
                ]
            },
            { path: 'datePicker', component: DatePickerHeaderComponent, children: [
                    { path: '', component: DatePickerDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.datePicker}}
                ]
            },
            { path: 'datetime-picker', component: DatetimePickerHeaderComponent, children: [
                    { path: '', component: DatetimePickerDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.datetimePicker}}
                ]
            },
            { path: 'dropdown', component: DropdownHeaderComponent, children: [
                    { path: '', component: DropdownDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: []}}
                ]
            },
            { path: 'file-input', component: FileInputHeaderComponent, children: [
                    { path: '', component: FileInputDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.fileInput}}
                ]
            },
            { path: 'form', component: FormHeaderComponent, children: [
                    { path: '', component: FormDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.form}}
                ]
            },
            { path: 'icon', component: IconHeaderComponent, children: [
                    { path: '', component: IconDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.icon}}
                ]
            },
            { path: 'identifier', component: IdentifierHeaderComponent, children: [
                    { path: '', component: IdentifierDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.identifier}}
                ]
            },
            { path: 'image', component: ImageHeaderComponent, children: [
                    { path: '', component: ImageDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.image}}
                ]
            },
            { path: 'infiniteScroll', component: InfiniteScrollHeaderComponent, children: [
                    { path: '', component: InfiniteScrollDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.infiniteScroll}}
                ]
            },
            { path: 'inlineHelp', component: InlineHelpHeaderComponent, children: [
                    { path: '', component: InlineHelpDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.inlineHelp}}
                ]
            },
            { path: 'inputGroup', component: InputGroupHeaderComponent, children: [
                    { path: '', component: InputGroupDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.inputGroup}}
                ]
            },
            { path: 'list', component: ListHeaderComponent, children: [
                    { path: '', component: ListDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.list}}
                ]
            },
            { path: 'loadingSpinner', component: LoadingSpinnerHeaderComponent, children: [
                    { path: '', component: LoadingSpinnerDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.loadingSpinner}}
                ]
            },
            { path: 'menu', component: MenuHeaderComponent, children: [
                    { path: '', component: MenuDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.menu}}
                ]
            },
            { path: 'modal', component: ModalDocsHeaderComponent, children: [
                    { path: '', component: ModalDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.modal}}
                ]
            },
            { path: 'multi-input', component: MultiInputHeaderComponent, children: [
                    { path: '', component: MultiInputDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.multiInput}}
                ]
            },
            { path: 'pagination', component: PaginationHeaderComponent, children: [
                    { path: '', component: PaginationDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.pagination}}
                ]
            },
            { path: 'panel', component: PanelDocsHeaderComponent, children: [
                    { path: '', component: PanelDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.panel}}
                ]
            },
            { path: 'popover', component: PopoverHeaderComponent, children: [
                    { path: '', component: PopoverDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.popover}}
                ]
            },
            { path: 'popover-directive', component: PopoverDirectiveHeaderComponent, children: [
                    { path: '', component: PopoverDirectiveDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.popoverDirective}}
                ]
            },
            { path: 'scroll-spy', component: ScrollSpyHeaderComponent, children: [
                    { path: '', component: ScrollSpyDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.scrollSpy}}
                ]
            },
            { path: 'searchInput', component: SearchInputHeaderComponent, children: [
                    { path: '', component: SearchInputDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.searchInput}}
                ]
            },
            { path: 'shellbar', component: ShellbarDocsHeaderComponent, children: [
                    { path: '', component: ShellbarDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.shellbar}}
                ]
            },
            { path: 'sideNavigation', component: SideNavigationHeaderComponent, children: [
                    { path: '', component: SideNavigationDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.sideNavigation}}
                ]
            },
            { path: 'table', component: TableDocsHeaderComponent, children: [
                    { path: '', component: TableDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.table}}
                ]
            },
            { path: 'tabs', component: TabsHeaderComponent, children: [
                    { path: '', component: TabsDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.tabs}}
                ]
            },
            { path: 'tile', component: TileDocsHeaderComponent, children: [
                    { path: '', component: TileDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.tile}}
                ]
            },
            { path: 'time', component: TimeHeaderComponent, children: [
                    { path: '', component: TimeDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.time}}
                ]
            },
            { path: 'timePicker', component: TimePickerHeaderComponent, children: [
                    { path: '', component: TimePickerDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.timePicker}}
                ]
            },
            { path: 'tree', component: TreeHeaderComponent, children: [
                    { path: '', component: TreeDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.tree}}
                ]
            },
            { path: 'toggle', component: ToggleHeaderComponent, children: [
                    { path: '', component: ToggleDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.toggle}}
                ]
            },
            { path: 'token', component: TokenHeaderComponent, children: [
                    { path: '', component: TokenDocsComponent},
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.token}}
                ]
            },
            { path: 'home', component: HomeDocsComponent },
            { path: 'new-component', component: NewComponentComponent }
        ]
    }
];
