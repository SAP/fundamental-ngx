import { Routes } from '@angular/router';
import { DocumentationComponent } from './core-helpers/documentation/documentation.component';
import { ActionBarHeaderComponent } from './component-docs/action-bar/action-bar-header/action-bar-header.component';
import { ActionBarDocsComponent } from './component-docs/action-bar/action-bar-docs.component';
import { ApiComponent } from './core-helpers/api/api.component';
import { API_FILES } from './utilities/api-files';
import { AlertHeaderComponent } from './component-docs/alert/alert-header/alert-header.component';
import { AlertDocsComponent } from './component-docs/alert/alert-docs.component';
import { BadgeLabelDocsComponent } from './component-docs/badge-label/badge-label-docs.component';
import { BreadcrumbDocsComponent } from './component-docs/breadcrumb/breadcrumb-docs.component';
import { ButtonDocsComponent } from './component-docs/button/button-docs.component';
import { ButtonGroupDocsComponent } from './component-docs/button-group/button-group-docs.component';
import { CalendarDocsComponent } from './component-docs/calendar/calendar-docs.component';
import { ComboboxInputDocsComponent } from './component-docs/combobox-input/combobox-input-docs.component';
import { DatePickerDocsComponent } from './component-docs/date-picker/date-picker-docs.component';
import { DatetimePickerDocsComponent } from './component-docs/datetime-picker/datetime-picker-docs.component';
import { DropdownDocsComponent } from './component-docs/dropdown/dropdown-docs.component';
import { FileInputDocsComponent } from './component-docs/file-input/file-input-docs.component';
import { FormDocsComponent } from './component-docs/form/form-docs.component';
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
import { SearchInputDocsComponent } from './component-docs/search-input/search-input-docs.component';
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
import { HomeDocsComponent } from './component-docs/home/home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { BadgeLabelHeaderComponent } from './component-docs/badge-label/badge-label-header/badge-label-header.component';
import { BreadcrumbHeaderComponent } from './component-docs/breadcrumb/breadcrumb-header/breadcrumb-header.component';
import { ButtonHeaderComponent } from './component-docs/button/button-header/button-header.component';
import { ButtonGroupHeaderComponent } from './component-docs/button-group/button-group-header/button-group-header.component';
import { CalendarHeaderComponent } from './component-docs/calendar/calendar-header/calendar-header.component';
import { ComboboxInputHeaderComponent } from './component-docs/combobox-input/combobox-input-header/combobox-input-header.component';
import { DatePickerHeaderComponent } from './component-docs/date-picker/date-picker-header/date-picker-header.component';
import { DatetimePickerHeaderComponent } from './component-docs/datetime-picker/datetime-picker-header/datetime-picker-header.component';
import { DropdownHeaderComponent } from './component-docs/dropdown/dropdown-header/dropdown-header.component';
import { FileInputHeaderComponent } from './component-docs/file-input/file-input-header/file-input-header.component';
import { FormHeaderComponent } from './component-docs/form/form-header/form-header.component';
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
import { SearchInputHeaderComponent } from './component-docs/search-input/search-input-header/search-input-header.component';
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
import {
    TabNavigationExampleChildFirst,
    TabNavigationExampleChildSecond, TabNavigationExampleChildThird
} from './component-docs/tabs/examples/tab-navigation-children/tab-navigation-children';

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
                    { path: '', component: TabsDocsComponent,
                        children: [
                            {path: 'tab1', component: TabNavigationExampleChildFirst},
                            {path: 'tab2', component: TabNavigationExampleChildSecond},
                            {path: 'tab3', component: TabNavigationExampleChildThird},
                        ]
                    },
                    { path: 'api', component: ApiComponent, data: {content: API_FILES.tabs }}
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
