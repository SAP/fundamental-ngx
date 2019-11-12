import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { RouterModule } from '@angular/router';
import { SchemaModule } from '../schema/schema.module';

// containers
import { BadgeLabelDocsComponent } from '../core/component-docs/badge-label/badge-label-docs.component';
import { BreadcrumbDocsComponent } from '../core/component-docs/breadcrumb/breadcrumb-docs.component';
import { ButtonDocsComponent } from '../core/component-docs/button/button-docs.component';
import { ButtonGroupDocsComponent } from '../core/component-docs/button-group/button-group-docs.component';
import { AlertDocsComponent } from '../core/component-docs/alert/alert-docs.component';
import { IconDocsComponent } from '../core/component-docs/icon/icon-docs.component';
import { IdentifierDocsComponent } from '../core/component-docs/identifier/identifier-docs.component';
import { InlineHelpDocsComponent } from '../core/component-docs/inline-help/inline-help-docs.component';
import { InputGroupDocsComponent } from '../core/component-docs/input-group/input-group-docs.component';
import { ComboboxDocsComponent } from '../core/component-docs/combobox/combobox-docs.component';
import { ImageDocsComponent } from '../core/component-docs/image/image-docs.component';
import { DropdownDocsComponent } from '../core/component-docs/dropdown/dropdown-docs.component';
import { PaginationDocsComponent } from '../core/component-docs/pagination/pagination-docs.component';
import { ListDocsComponent } from '../core/component-docs/list/list-docs.component';
import { LoadingSpinnerDocsComponent } from '../core/component-docs/loading-spinner-docs/loading-spinner-docs.component';
import { TabsDocsComponent } from '../core/component-docs/tabs/tabs-docs.component';
import { TreeDocsComponent } from '../core/component-docs/tree/tree-docs.component';
import { ModalDocsComponent } from '../core/component-docs/modal/modal-docs.component';
import { TableDocsComponent } from '../core/component-docs/table/table-docs.component';
import { ActionBarDocsComponent } from '../core/component-docs/action-bar/action-bar-docs.component';
import { PanelDocsComponent } from '../core/component-docs/panel/panel-docs.component';
import { MenuDocsComponent } from '../core/component-docs/menu/menu-docs.component';
import { TileDocsComponent } from '../core/component-docs/tile/tile-docs.component';
import { SideNavigationDocsComponent } from '../core/component-docs/side-navigation/side-navigation-docs.component';
import { PopoverDocsComponent } from '../core/component-docs/popover/popover-docs.component';
import { CalendarDocsComponent } from '../core/component-docs/calendar/calendar-docs.component';
import { DatePickerDocsComponent } from '../core/component-docs/date-picker/date-picker-docs.component';
import { TimeDocsComponent } from '../core/component-docs/time/time-docs.component';
import { TimePickerDocsComponent } from '../core/component-docs/time-picker/time-picker-docs.component';
import { ShellbarDocsComponent } from '../core/component-docs/shellbar/shellbar-docs.component';

// examples
import {
    ActionBarBackExampleComponent,
    ActionBarLongStringTitleTruncationExampleComponent,
    ActionBarContextualMenuExampleComponent,
    ActionBarNoBackExampleComponent,
    ActionBarMobileExampleComponent
} from '../core/component-docs/action-bar/examples/action-bar-examples.component';
import { AlertExampleComponent } from '../core/component-docs/alert/examples/alert-example.component';
import { AlertInlineExampleComponent } from '../core/component-docs/alert/examples/alert-inline-example.component';
import { AlertWidthExampleComponent } from '../core/component-docs/alert/examples/alert-width-example.component';
import { AlertComponentAsContentExampleComponent } from '../core/component-docs/alert/examples/alert-component-as-content-example.component';
import { AlertContentComponent } from '../core/component-docs/alert/examples/alert-content.component';
import {
    BadgeDefaultExampleComponent,
    BadgeFilledExampleComponent,
    BadgePillExampleComponent,
    LabelBuildStatusExampleComponent,
    LabelDefaultExampleComponent,
    LabelIconStatusExampleComponent,
    LabelStatusColorsExampleComponent
} from '../core/component-docs/badge-label/examples/badge-label-examples.component';
import {
    BreadcrumbHrefExampleComponent,
    BreadcrumbRouterLinkExampleComponent
} from '../core/component-docs/breadcrumb/examples/breadcrumb-examples.component';
import {
    ButtonIconsExampleComponent,
    ButtonOptionsExampleComponent,
    ButtonSizesExampleComponent,
    ButtonStateExampleComponent,
    ButtonTypesExampleComponent
} from '../core/component-docs/button/examples/button-examples.component';
import {
    ButtonGroupXsExampleComponent,
    ButtonGroupSmallExampleComponent,
    ButtonGroupCompactExampleComponent,
    ButtonGroupDefaultExampleComponent
} from '../core/component-docs/button-group/examples/button-group-examples.component';
import { CalendarRangeExampleComponent } from '../core/component-docs/calendar/examples/calendar-range-example.component';
import { CalendarSingleExampleComponent } from '../core/component-docs/calendar/examples/calendar-single-example.component';
import { CalendarMondayStartExampleComponent } from '../core/component-docs/calendar/examples/calendar-monday-start-example.component';
import { ComboboxExampleComponent } from '../core/component-docs/combobox/examples/combobox-example.component';
import { DatePickerRangeExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-range-example.component';
import { DatePickerSingleExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-single-example.component';
import {
    DropdownContextualMenuExampleComponent,
    DropdownDefaultExampleComponent,
    DropdownIconsExampleComponent,
    DropdownStateExampleComponent,
    DropdownToolbarExampleComponent
} from '../core/component-docs/dropdown/examples/dropdown-examples.component';
import { IconExampleComponent } from '../core/component-docs/icon/examples/icon-example.component';
import {
    CircleIdentifierExampleComponent,
    ColorsIdentifierExampleComponent,
    IconIdentifierExampleComponent,
    InitialsIdentifierExampleComponent,
    TransparentIdentifierExampleComponent
} from '../core/component-docs/identifier/examples/identifier-examples.component';
import {
    ImageShapesExampleComponent,
    ImageSizesExampleComponent
} from '../core/component-docs/image/examples/image-examples.component';
import {
    InlineHelpExampleComponent, InlineHelpStyledExampleComponent,
    InlineHelpTriggerExampleComponent
} from '../core/component-docs/inline-help/examples/inline-help-examples.component';
import {
    InputGroupButtonExampleComponent,
    InputGroupIconExampleComponent,
    InputGroupNumberExampleComponent,
    InputGroupSearchExampleComponent,
    InputGroupTextExampleComponent,
    InputGroupTextCompactExampleComponent, InputGroupComplexExampleComponent
} from '../core/component-docs/input-group/examples/input-group-examples.component';
import {
    ListActionsExampleComponent,
    ListCheckboxExampleComponent,
    ListExampleComponent
} from '../core/component-docs/list/examples/list-examples.component';
import { LoadingSpinnerExampleComponent } from '../core/component-docs/loading-spinner-docs/examples/loading-spinner-example.component';
import { LoadingSpinnerContainerExampleComponent } from '../core/component-docs/loading-spinner-docs/examples/loading-spinner-container-example.component';
import {
    MenuExampleComponent,
    MenuGroupExampleComponent,
    MenuSeparatorExampleComponent
} from '../core/component-docs/menu/examples/menu-examples.component';
import { MenuAddonExampleComponent } from '../core/component-docs/menu/examples/menu-addon-examples.component';
import { ModalOpenTemplateExampleComponent } from '../core/component-docs/modal/examples/template-as-content/modal-open-template-example.component';
import { ModalContentComponent } from '../core/component-docs/modal/examples/component-as-content/modal-content.component';
import { ModalComponentAsContentExampleComponent } from '../core/component-docs/modal/examples/component-as-content/modal-component-as-content-example.component';
import {
    PanelExampleComponent
} from '../core/component-docs/panel/examples/panel-examples.component';
import { PanelEdgeBleedExampleComponent } from '../core/component-docs/panel/examples/panel-edge-bleed-example.component'

import { PaginationExampleComponent } from '../core/component-docs/pagination/examples/pagination-example.component';
import { PopoverExampleComponent } from '../core/component-docs/popover/examples/popover-simple/popover-example.component';
import { PopoverModalExampleComponent } from '../core/component-docs/popover/examples/popover-modal/popover-modal-example.component';
import { PopoverProgrammaticOpenExampleComponent } from '../core/component-docs/popover/examples/popover-programmatic/popover-programmatic-open-example.component';
import { ShellbarBasicExampleComponent } from '../core/component-docs/shellbar/examples/shellbar-basic-example.component';
import { ShellbarCollapsibleExampleComponent } from '../core/component-docs/shellbar/examples/shellbar-collapsible-example.component';
import {
    SideNavigationCollapsedExampleComponent,
    SideNavigationExampleComponent,
    SideNavigationIconsExampleComponent,
    SideNavigationLevelsExampleComponent,
    SideNavigationTitlesExampleComponent
} from '../core/component-docs/side-navigation/examples/side-navigation-examples.component';
import { TableExampleComponent } from '../core/component-docs/table/examples/table-example.component';
import {
    TabsExampleComponent,
    TabSelectionExampleComponent,

} from '../core/component-docs/tabs/examples/tabs-examples-component';
import { TabsNavigationModeExampleComponent } from '../core/component-docs/tabs/examples/tab-navigation-mode-example-component';
import {
    TileActionsExampleComponent,
    TileDisabledExampleComponent,
    TileExampleComponent,
    TileMediaExampleComponent,
    TileProductExampleComponent,
    TileButtonExampleComponent
} from '../core/component-docs/tile/examples/tile-examples.component';
import { Time12ExampleComponent } from '../core/component-docs/time/examples/time-12-example.component';
import { TimeExampleComponent } from '../core/component-docs/time/examples/time-example.component';
import { TimeDisabledExampleComponent } from '../core/component-docs/time/examples/time-disabled-example.component';
import { TimeNoSecondsExampleComponent } from '../core/component-docs/time/examples/time-no-seconds-example.component';
import { TimeNoSpinnersExampleComponent } from '../core/component-docs/time/examples/time-no-spinners-example.component';
import { TimeOnlyHoursExampleComponent } from '../core/component-docs/time/examples/time-only-hours-example.component';
import { TimePickerExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-example.component';
import { TimePicker12ExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-12-example.component';
import { TimePickerDisabledExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-disabled-example.component';
import { TimePickerNoSecondsExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-no-seconds-example.component';
import { TimePickerCompactExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-compact-example.component';
import { TimePickerAllowNullExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-allow-null-example.component';
import { TimePickerOnlyHoursExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-only-hours-example.component';


import { TimePickerFormExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-form-example.component';
import { ToggleDocsComponent } from '../core/component-docs/toggle/toggle-docs.component';
import { ToggleSizesExampleComponent } from '../core/component-docs/toggle/examples/toggle-sizes-example/toggle-sizes-example.component';
import { DisabledToggleExampleComponent } from '../core/component-docs/toggle/examples/disabled-toggle-example/disabled-toggle-example.component';
import { ToggleBindingExampleComponent } from '../core/component-docs/toggle/examples/toggle-binding-example/toggle-binding-example.component';
import { ToggleFormsExampleComponent } from '../core/component-docs/toggle/examples/toggle-form-example/toggle-forms-example.component';
import { ListInfiniteScrollExampleComponent } from '../core/component-docs/list/examples/list-infinite-scroll-example.component';
import { ListCheckboxFormExampleComponent } from '../core/component-docs/list/examples/list-checkbox-form-example.component';
import { DropdownInfiniteScrollExampleComponent } from '../core/component-docs/dropdown/examples/dropdown-infinite-scroll-example.component';
import { ModalInModalComponent } from '../core/component-docs/modal/examples/stackable-modals/modal-in-modal-stacked-example.component';
import { ModalInModalSecondComponent } from '../core/component-docs/modal/examples/stackable-modals/modal-in-modal-second-example.component';
import { ModalInModalFirstComponent } from '../core/component-docs/modal/examples/stackable-modals/modal-in-modal-first-example.component';
import { ModalFullscreenExampleComponent } from '../core/component-docs/modal/examples/fullscreen-modal/modal-fullscreen-example.component';
import { InfiniteScrollDocsComponent } from '../core/component-docs/infinite-scroll/infinite-scroll-docs.component';
import { InfiniteScrollBasicExampleComponent } from '../core/component-docs/infinite-scroll/examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component';
import { TableCheckboxesExampleComponent } from '../core/component-docs/table/examples/table-checkboxes-example.component';
import { ListSingleSelectExampleComponent } from '../core/component-docs/list/examples/list-single-select-example.component';
import { FileInputDocsComponent } from '../core/component-docs/file-input/file-input-docs.component';
import { FileInputExampleComponent } from '../core/component-docs/file-input/examples/file-input-example/file-input-example.component';
import { FileInputCustomExampleComponent } from '../core/component-docs/file-input/examples/file-input-custom-example/file-input-custom-example.component';
import { FileInputDragDisabledExampleComponent } from '../core/component-docs/file-input/examples/file-input-drag-disabled-example/file-input-drag-disabled-example.component';
import { FileInputMaxExampleComponent } from '../core/component-docs/file-input/examples/file-input-max-example/file-input-max-example.component';
import { TokenDocsComponent } from '../core/component-docs/token/token-docs.component';
import { TokenExampleComponent } from '../core/component-docs/token/examples/token-example/token-example.component';
import { DatetimePickerDocsComponent } from '../core/component-docs/datetime-picker/datetime-picker-docs.component';
import { DatetimeExampleComponent } from '../core/component-docs/datetime-picker/examples/datetime-example/datetime-example.component';
import { DatetimeNonMeridianExampleComponent } from '../core/component-docs/datetime-picker/examples/datetime-non-meridian-example/datetime-non-meridian-example.component';
import { DatetimeProgramExampleComponent } from '../core/component-docs/datetime-picker/examples/datetime-program-example/datetime-program-example.component';
import { ScrollSpyDocsComponent } from '../core/component-docs/scroll-spy/scroll-spy-docs.component';
import { ScrollSpyExampleComponent } from '../core/component-docs/scroll-spy/examples/scroll-spy-example/scroll-spy-example.component';
import { ScrollSpyCustomExampleComponent } from '../core/component-docs/scroll-spy/examples/scroll-spy-custom-example/scroll-spy-custom-example.component';
import { MultiInputFilterExampleComponent } from '../core/component-docs/multi-input/examples/multi-input-filter-example/multi-input-filter-example.component';
import { MultiInputDisplaywithExampleComponent } from '../core/component-docs/multi-input/examples/multi-input-displaywith-example/multi-input-displaywith-example.component';
import { MultiInputFormExampleComponent } from '../core/component-docs/multi-input/examples/multi-input-form-example/multi-input-form-example.component';
import { MultiInputDocsComponent } from '../core/component-docs/multi-input/multi-input-docs.component';
import { MultiInputExampleComponent } from '../core/component-docs/multi-input/examples/multi-input-example/multi-input-example.component';
import { MultiInputAsyncExampleComponent } from '../core/component-docs/multi-input/examples/multi-input-async-example/multi-input-async-example.component';
import { PopoverDirectiveDocsComponent } from '../core/component-docs/popover-directive/popover-directive-docs.component';
import { PopoverDirectiveExampleComponent } from '../core/component-docs/popover-directive/examples/popover-directive-example/popover-directive-example.component';
import { PopoverTriggersComponent } from '../core/component-docs/popover-directive/examples/popover-triggers/popover-triggers.component';
import { PopoverProgrammaticComponent } from '../core/component-docs/popover-directive/examples/popover-programmatic/popover-programmatic.component';
import { PopoverFillComponent } from '../core/component-docs/popover-directive/examples/popover-fill/popover-fill.component';
import { PopoverCFillComponent } from '../core/component-docs/popover/examples/popover-c-fill/popover-c-fill.component';

import { HomeDocsComponent } from './component-docs/core-home/core-home.component';
import { NewComponentComponent } from '../core/component-docs/new-component/new-component.component';

import { BackdropExamplesComponent } from '../core/component-docs/modal/examples/backdrop-examples/backdrop-examples.component';
import { PopoverPlacementExampleComponent } from '../core/component-docs/popover/examples/popover-placement/popover-placement-example.component';
import { AlertHeaderComponent } from '../core/component-docs/alert/alert-header/alert-header.component';
import { ActionBarHeaderComponent } from '../core/component-docs/action-bar/action-bar-header/action-bar-header.component';
import { BadgeLabelHeaderComponent } from '../core/component-docs/badge-label/badge-label-header/badge-label-header.component';
import { BreadcrumbHeaderComponent } from '../core/component-docs/breadcrumb/breadcrumb-header/breadcrumb-header.component';
import { ButtonHeaderComponent } from '../core/component-docs/button/button-header/button-header.component';
import { ButtonGroupHeaderComponent } from '../core/component-docs/button-group/button-group-header/button-group-header.component';
import { CalendarHeaderComponent } from '../core/component-docs/calendar/calendar-header/calendar-header.component';
import { ComboboxHeaderComponent } from '../core/component-docs/combobox/combobox-header/combobox-header.component';
import { DatePickerHeaderComponent } from '../core/component-docs/date-picker/date-picker-header/date-picker-header.component';
import { DatetimePickerHeaderComponent } from '../core/component-docs/datetime-picker/datetime-picker-header/datetime-picker-header.component';
import { DropdownHeaderComponent } from '../core/component-docs/dropdown/dropdown-header/dropdown-header.component';
import { FileInputHeaderComponent } from '../core/component-docs/file-input/file-input-header/file-input-header.component';
import { IconHeaderComponent } from '../core/component-docs/icon/icon-header/icon-header.component';
import { IdentifierHeaderComponent } from '../core/component-docs/identifier/identifier-header/identifier-header.component';
import { ImageHeaderComponent } from '../core/component-docs/image/image-header/image-header.component';
import { InfiniteScrollHeaderComponent } from '../core/component-docs/infinite-scroll/infinite-scroll-header/infinite-scroll-header.component';
import { InlineHelpHeaderComponent } from '../core/component-docs/inline-help/inline-help-header/inline-help-header.component';
import { InputGroupHeaderComponent } from '../core/component-docs/input-group/input-group-header/input-group-header.component';
import { InputGroupFormExampleComponent } from '../core/component-docs/input-group/examples/input-group-form-example.component';
import { ListHeaderComponent } from '../core/component-docs/list/list-header/list-header.component';
import { LoadingSpinnerHeaderComponent } from '../core/component-docs/loading-spinner-docs/loading-spinner-header/loading-spinner-header.component';
import { MenuHeaderComponent } from '../core/component-docs/menu/menu-header/menu-header.component';
import { ModalDocsHeaderComponent } from '../core/component-docs/modal/modal-docs-header/modal-docs-header.component';
import { MultiInputHeaderComponent } from '../core/component-docs/multi-input/multi-input-header/multi-input-header.component';
import { PaginationHeaderComponent } from '../core/component-docs/pagination/pagination-header/pagination-header.component';
import { PanelDocsHeaderComponent } from '../core/component-docs/panel/panel-docs-header/panel-docs-header.component';
import { PopoverHeaderComponent } from '../core/component-docs/popover/popover-header/popover-header.component';
import { PopoverDirectiveHeaderComponent } from '../core/component-docs/popover-directive/popover-directive-header/popover-directive-header.component';
import { ScrollSpyHeaderComponent } from '../core/component-docs/scroll-spy/scroll-spy-header/scroll-spy-header.component';
import { ShellbarDocsHeaderComponent } from '../core/component-docs/shellbar/shellbar-docs-header/shellbar-docs-header.component';
import { SideNavigationHeaderComponent } from '../core/component-docs/side-navigation/side-navigation-header/side-navigation-header.component';
import { TableDocsHeaderComponent } from '../core/component-docs/table/table-docs-header/table-docs-header.component';
import { TabsHeaderComponent } from '../core/component-docs/tabs/tabs-header/tabs-header.component';
import { TileDocsHeaderComponent } from '../core/component-docs/tile/tile-docs-header/tile-docs-header.component';
import { TimeHeaderComponent } from '../core/component-docs/time/time-header/time-header.component';
import { TimePickerHeaderComponent } from '../core/component-docs/time-picker/time-picker-header/time-picker-header.component';
import { ToggleHeaderComponent } from '../core/component-docs/toggle/toggle-header/toggle-header.component';
import { TokenHeaderComponent } from '../core/component-docs/token/token-header/token-header.component';
import { TreeHeaderComponent } from '../core/component-docs/tree/tree-header/tree-header.component';
import { ROUTES } from './core-documentation.routes';
import { ComplexTitleExampleComponent } from '../core/component-docs/tabs/examples/complex-title-example/complex-title-example.component';
import { AddingTabExampleComponent } from '../core/component-docs/tabs/examples/adding-tab-example/adding-tab-example.component';
import { CalendarI18nExampleComponent } from '../core/component-docs/calendar/examples/calendar-i18n-example.component';
import { DatePickerI18nExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-i18n-example.component';
import { TimeI18nExampleComponent } from '../core/component-docs/time/examples/time-i18n-example.component';
import { DatePickerFormatExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-format-example.component';
import { SelectDocsComponent } from '../core/component-docs/select/select-docs.component';
import { SelectHeaderComponent } from '../core/component-docs/select/select-header/select-header.component';
import { SelectBasicExampleComponent } from '../core/component-docs/select/examples/select-basic-example/select-basic-example.component';
import { SelectProgrammaticExampleComponent } from '../core/component-docs/select/examples/select-programmatic-example/select-programmatic-example.component';
import { SelectNestedOptionsComponent } from '../core/component-docs/select/examples/select-nested-options/select-nested-options.component';
import { SelectCustomTriggerComponent } from '../core/component-docs/select/examples/select-custom-trigger/select-custom-trigger.component';
import { SelectAddingExampleComponent } from '../core/component-docs/select/examples/select-adding-example/select-adding-example.component';
import { SelectFormsComponent } from '../core/component-docs/select/examples/select-forms/select-forms.component';
import { TableCdkExampleComponent } from './component-docs/table/examples/table-cdk-example.component';
import { DatetimePickerAllowNullExampleComponent } from '../core/component-docs/datetime-picker/examples/datetime-allow-null-example/datetime-allow-null-example.component';
import { DatePickerAllowNullExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-allow-null-example.component';
import { DatePickerFormExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-form-example.component';
import { TimeFormExampleComponent } from '../core/component-docs/time/examples/time-form-example.component';
import { TableResponsiveExampleComponent } from '../core/component-docs/table/examples/table-responsive-example.component';
import { DatePickerPositionExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-position-example.component';
import { TimePickerOtherDelimiterExampleComponent } from '../core/component-docs/time-picker/examples/time-picker-other-delimiter-example.component';
import { DatetimeFormatExampleComponent } from '../core/component-docs/datetime-picker/examples/datetime-format-example/datetime-format-example.component';
import { DatePickerDisabledExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-disabled-example.component';
import {
    DatetimeDisabledExampleComponent
} from '../core/component-docs/datetime-picker/examples/datetime-disabled-example/datetime-disabled-example.component';

import { SplitButtonHeaderComponent } from '../core/component-docs/split-button/split-button-header/split-button-header.component';
import { ButtonSplitOptionsExampleComponent } from '../core/component-docs/split-button/examples/split-button-options-example.component';
import { ButtonSplitProgrammaticalExampleComponent } from '../core/component-docs/split-button/examples/split-button-programmatical-example.component';
import { ButtonSplitTemplateExampleComponent } from '../core/component-docs/split-button/examples/split-button-template-example.component';
import { ButtonSplitTypesExampleComponent } from '../core/component-docs/split-button/examples/split-button-types-example.component';
import { ButtonSplitTypesIconsComponent } from '../core/component-docs/split-button/examples/split-button-icons-example.component';
import {
    TabNavigationExampleChildFirst,
    TabNavigationExampleChildSecond,
    TabNavigationExampleChildThird
} from '../core/component-docs/tabs/examples/tab-navigation-children/tab-navigation-children';
import { DatePickerFormRangeExampleComponent } from '../core/component-docs/date-picker/examples/date-picker-form-range-example.component';
import { DatetimeFormExampleComponent } from '../core/component-docs/datetime-picker/examples/datetime-form-example/datetime-form-example.component';
import { LocalizationEditorHeaderComponent } from '../core/component-docs/localization-editor/localization-editor-header/localization-editor-header.component';
import { LocalizationEditorDocsComponent } from '../core/component-docs/localization-editor/localization-editor-docs.component';
import { LocalizationEditorExampleComponent } from '../core/component-docs/localization-editor/examples/localization-editor-example.component';
import { LocalizationEditorFormsExampleComponent } from '../core/component-docs/localization-editor/examples/localization-editor-forms-example.component';
import { LocalizationEditorTemplateExampleComponent } from '../core/component-docs/localization-editor/examples/localization-editor-template-example.component';
import { LocalizationEditorTextareaExampleComponent } from '../core/component-docs/localization-editor/examples/localization-editor-textarea-example.component';
import { SplitButtonDocsComponent } from '../core/component-docs/split-button/split-button-docs.component';
import { ModalPositionExampleComponent } from '../core/component-docs/modal/examples/modal-position/modal-position-example.component';

import { CalendarFormExamplesComponent } from '../core/component-docs/calendar/examples/calendar-form-example.component';

import { MenuKeyboardSupportExampleComponent } from '../core/component-docs/menu/examples/menu-keyboard-support-example.component';
import { ContainerComponent } from '../core/component-docs/modal/examples/container/container.component';
import { ComboboxAsyncExampleComponent } from '../core/component-docs/combobox/examples/combobox-async-example.component';
import { ComboboxDisplaywithExampleComponent } from '../core/component-docs/combobox/examples/combobox-displaywith-example.component';
import { ComboboxDynamicExampleComponent } from '../core/component-docs/combobox/examples/combobox-dynamic-example.component';
import { ComboboxTemplateExampleComponent } from '../core/component-docs/combobox/examples/combobox-template-example.component';
import { ComboboxHeightExampleComponent } from '../core/component-docs/combobox/examples/combobox-height-example.component';
import { ComboboxDisabledExampleComponent } from '../core/component-docs/combobox/examples/combobox-disabled-example.component';
import { CalendarProgrammaticallyChangeExampleComponent } from '../core/component-docs/calendar/examples/calendar-programmatically-change-example.component';
import { SelectViewValueExampleComponent } from '../core/component-docs/select/examples/select-view-value-example/select-view-value-example.component';
import { ComboboxFormsExampleComponent } from '../core/component-docs/combobox/examples/combobox-forms-example.component';
import { InputFormGroupExampleComponent } from '../core/component-docs/input/examples/input-form-group-example.component';
import {
    InputExampleComponent,
    InputInlineHelpExampleComponent,
    InputStateExampleComponent
} from '../core/component-docs/input/examples/input-examples.component';
import { InputHeaderComponent } from '../core/component-docs/input/input-header/input-header.component';
import { InputDocsComponent } from '../core/component-docs/input/input-docs.component';
import { SelectNativeDocsComponent } from '../core/component-docs/select-native/select-native-docs.component';
import {
    SelectNativeExampleComponent,
    SelectNativeInlineHelpExampleComponent,
    SelectNativeStateExampleComponent
} from '../core/component-docs/select-native/examples/select-native-examples.component';
import { SelectNativeFormGroupExampleComponent } from '../core/component-docs/select-native/examples/select-native-form-group-example.component';
import { SelectNativeHeaderComponent } from '../core/component-docs/select-native/select-native-header/select-native-header.component';
import { TextareaDocsComponent } from '../core/component-docs/textarea/textarea-docs.component';
import {
    TextareaExampleComponent,
    TextareaInlineHelpExampleComponent,
    TextareaStateExampleComponent
} from '../core/component-docs/textarea/examples/textarea-examples.component';
import { TextareaFormGroupExampleComponent } from '../core/component-docs/textarea/examples/textarea-form-group-example.component';
import { TextareaHeaderComponent } from '../core/component-docs/textarea/textarea-header/textarea-header.component';
import { CheckboxHeaderComponent } from '../core/component-docs/checkbox/checkbox-header/checkbox-header.component';
import { CheckboxExamplesComponent } from '../core/component-docs/checkbox/examples/checkbox-examples.component';
import { CheckboxFormGroupExampleComponent } from '../core/component-docs/checkbox/examples/checkbox-form-group-example.component';
import { CheckboxDocsComponent } from '../core/component-docs/checkbox/checkbox-docs.component';
import { RadioFormGroupExampleComponent } from '../core/component-docs/radio/examples/radio-form-group-example.component';
import { RadioExamplesComponent } from '../core/component-docs/radio/examples/radio-examples.component';
import { RadioDocsComponent } from '../core/component-docs/radio/radio-docs.component';
import { RadioHeaderComponent } from '../core/component-docs/radio/radio-header/radio-header.component';
import { MegaMenuDocsComponent } from '../core/component-docs/mega-menu/mega-menu-docs.component';
import { MegaMenuHeaderComponent } from '../core/component-docs/mega-menu/mega-menu-header/mega-menu-header.component';
import {
    MegaMenuExampleComponent,
    MegaMenuGroupExampleComponent,
    MegaMenuPositionExampleComponent
} from '../core/component-docs/mega-menu/examples/mega-menu-examples.component';
import { ComboboxSearchFunctionExampleComponent } from '../core/component-docs/combobox/examples/combobox-search-function-example.component';
import { CalendarI18nMomentExampleComponent } from '../core/component-docs/calendar/examples/calendar--i18n-moment-example.component';
import { SelectMaxHeightExampleComponent } from '../core/component-docs/select/examples/select-height/select-max-height-example.component';
import { PopoverDynamicExampleComponent } from '../core/component-docs/popover/examples/popover-dynamic/popover-dynamic-example.component';
import {
    LayoutColumnsExampleComponent, LayoutGridColumnSpanExampleComponent,
    LayoutGridGapSizeExample, LayoutGridExampleComponent,
    LayoutGridNoGapExampleComponent
} from '../core/component-docs/layout-grid/examples/layout-grid-examples.component';
import { LayoutGridDocsHeaderComponent } from '../core/component-docs/layout-grid/layout-grid-docs-header/layout-grid-docs-header.component';
import { LayoutGridDocsComponent } from '../core/component-docs/layout-grid/layout-grid-docs.component';
import { SimpleTreeExampleComponent } from '../core/component-docs/tree/examples/simple-tree-example.component';
import { ShellbarAdvancedExampleComponent } from '../core/component-docs/shellbar/examples/shellbar-advanced/shellbar-advanced-example.component';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { CoreDocumentationComponent } from './documentation/core-documentation.component';
import { ProductSwitchListComponent } from './component-docs/product-switch/examples/product-switch-list/product-switch-list-example.component';
import { ProductSwitchSmallExampleComponent } from './component-docs/product-switch/examples/product-switch-small-example.component';
import { ProductSwitchDndExampleComponent } from './component-docs/product-switch/examples/product-switch-dnd-example.component';
import { ProductSwitchDocsComponent } from './component-docs/product-switch/product-switch-docs.component';
import { ProductSwitchDocsHeaderComponent } from './component-docs/product-switch/product-switch-docs-header/product-switch-docs-header.component';
import { NotificationDocsComponent } from './component-docs/notification/notification-docs.component';
import { NotificationDocsHeaderComponent } from './component-docs/notification/notification-docs-header/notification-docs-header.component';
import { NotificationGroupTemplateExampleComponent } from './component-docs/notification/examples/group-notification/notification-group-template-example.component';
import { NotificationOpenTemplateExampleComponent } from './component-docs/notification/examples/template-as-content/notification-open-template-example.component';
import { NotificationComponentAsContentExampleComponent } from './component-docs/notification/examples/component-as-content/notification-component-as-content-example.component';
import { NotificationAsObjectExampleComponent } from './component-docs/notification/examples/notification-as-object.component';
import { NotificationOptionsExampleComponent } from './component-docs/notification/examples/notification-options/notification-options-example.component';
import { NotificationContentComponent } from './component-docs/notification/examples/component-as-content/notification-content.component';
import { ScrollSpyOffsetExampleComponent } from './component-docs/scroll-spy/examples/scroll-spy-custom-offset/scroll-spy-offset-example.component';
import { ComboboxOpenControlExampleComponent } from './component-docs/combobox/examples/combobox-open-control-example.component';


@NgModule({
    declarations: [
        ActionBarDocsComponent,
        AlertDocsComponent,
        BadgeLabelDocsComponent,
        BreadcrumbDocsComponent,
        ButtonDocsComponent,
        ButtonGroupDocsComponent,
        CheckboxDocsComponent,
        SplitButtonDocsComponent,
        DropdownDocsComponent,
        DatetimePickerDocsComponent,
        FileInputDocsComponent,
        IconDocsComponent,
        IdentifierDocsComponent,
        InlineHelpDocsComponent,
        InputDocsComponent,
        InputGroupDocsComponent,
        ImageDocsComponent,
        ListDocsComponent,
        MenuDocsComponent,
        MegaMenuDocsComponent,
        ModalDocsComponent,
        SelectNativeDocsComponent,
        TabsDocsComponent,
        TableDocsComponent,
        TextareaDocsComponent,
        TileDocsComponent,
        TreeDocsComponent,
        PaginationDocsComponent,
        PanelDocsComponent,
        PopoverDocsComponent,
        RadioDocsComponent,
        CalendarDocsComponent,
        DatePickerDocsComponent,
        ShellbarDocsComponent,
        SideNavigationDocsComponent,
        TileDocsComponent,
        TimeDocsComponent,
        TimePickerDocsComponent,
        CoreDocumentationComponent,
        ToggleDocsComponent,
        HomeDocsComponent,
        NewComponentComponent,
        ActionBarBackExampleComponent,
        ActionBarLongStringTitleTruncationExampleComponent,
        ActionBarContextualMenuExampleComponent,
        ActionBarMobileExampleComponent,
        ActionBarNoBackExampleComponent,
        AlertExampleComponent,
        AlertComponentAsContentExampleComponent,
        AlertContentComponent,
        AlertInlineExampleComponent,
        AlertWidthExampleComponent,
        BadgeDefaultExampleComponent,
        BadgeFilledExampleComponent,
        BadgePillExampleComponent,
        LabelBuildStatusExampleComponent,
        LabelDefaultExampleComponent,
        LabelIconStatusExampleComponent,
        LabelStatusColorsExampleComponent,
        BreadcrumbHrefExampleComponent,
        BreadcrumbRouterLinkExampleComponent,
        ButtonIconsExampleComponent,
        ButtonOptionsExampleComponent,
        ButtonSizesExampleComponent,
        ButtonTypesExampleComponent,
        ButtonStateExampleComponent,
        ButtonSplitTypesExampleComponent,
        ButtonSplitTypesIconsComponent,
        ButtonSplitProgrammaticalExampleComponent,
        ButtonSplitOptionsExampleComponent,
        ButtonSplitTemplateExampleComponent,
        ButtonGroupXsExampleComponent,
        ButtonGroupSmallExampleComponent,
        ButtonGroupCompactExampleComponent,
        ButtonGroupDefaultExampleComponent,
        CalendarRangeExampleComponent,
        CalendarSingleExampleComponent,
        CalendarMondayStartExampleComponent,
        CalendarFormExamplesComponent,
        CalendarProgrammaticallyChangeExampleComponent,
        CheckboxExamplesComponent,
        CheckboxFormGroupExampleComponent,
        DatePickerRangeExampleComponent,
        DatePickerSingleExampleComponent,
        DatePickerAllowNullExampleComponent,
        DatePickerDisabledExampleComponent,
        DatePickerFormExampleComponent,
        DatePickerFormRangeExampleComponent,
        DatetimeExampleComponent,
        DatetimeNonMeridianExampleComponent,
        DatetimeProgramExampleComponent,
        DatetimeFormatExampleComponent,
        DatetimeFormExampleComponent,
        DatetimePickerAllowNullExampleComponent,
        DatetimeDisabledExampleComponent,
        DropdownContextualMenuExampleComponent,
        DropdownDefaultExampleComponent,
        DropdownIconsExampleComponent,
        DropdownStateExampleComponent,
        DropdownInfiniteScrollExampleComponent,
        DropdownToolbarExampleComponent,
        FileInputExampleComponent,
        FileInputCustomExampleComponent,
        FileInputDragDisabledExampleComponent,
        FileInputMaxExampleComponent,
        IconExampleComponent,
        CircleIdentifierExampleComponent,
        ColorsIdentifierExampleComponent,
        IconIdentifierExampleComponent,
        InitialsIdentifierExampleComponent,
        TransparentIdentifierExampleComponent,
        ImageShapesExampleComponent,
        ImageSizesExampleComponent,
        InfiniteScrollDocsComponent,
        InfiniteScrollBasicExampleComponent,
        InlineHelpExampleComponent,
        InlineHelpTriggerExampleComponent,
        InlineHelpStyledExampleComponent,
        InputGroupButtonExampleComponent,
        InputGroupIconExampleComponent,
        InputGroupNumberExampleComponent,
        InputGroupSearchExampleComponent,
        InputGroupTextExampleComponent,
        InputGroupTextCompactExampleComponent,
        InputGroupFormExampleComponent,
        InputGroupComplexExampleComponent,
        InputFormGroupExampleComponent,
        InputInlineHelpExampleComponent,
        InputStateExampleComponent,
        InputExampleComponent,
        LayoutGridGapSizeExample,
        LayoutGridExampleComponent,
        LayoutGridNoGapExampleComponent,
        LayoutColumnsExampleComponent,
        LayoutGridColumnSpanExampleComponent,
        ListActionsExampleComponent,
        ListCheckboxExampleComponent,
        ListExampleComponent,
        ListInfiniteScrollExampleComponent,
        ListCheckboxFormExampleComponent,
        ListSingleSelectExampleComponent,
        MenuExampleComponent,
        MegaMenuExampleComponent,
        MegaMenuGroupExampleComponent,
        MegaMenuPositionExampleComponent,
        MenuAddonExampleComponent,
        MenuGroupExampleComponent,
        MenuSeparatorExampleComponent,
        MenuKeyboardSupportExampleComponent,
        ModalOpenTemplateExampleComponent,
        ModalContentComponent,
        ModalComponentAsContentExampleComponent,
        ModalInModalComponent,
        ModalInModalSecondComponent,
        ModalInModalFirstComponent,
        MultiInputDocsComponent,
        MultiInputExampleComponent,
        ModalFullscreenExampleComponent,
        PanelEdgeBleedExampleComponent,
        PanelExampleComponent,
        PaginationExampleComponent,
        PopoverExampleComponent,
        PopoverDynamicExampleComponent,
        PopoverPlacementExampleComponent,
        PopoverProgrammaticOpenExampleComponent,
        PopoverModalExampleComponent,
        PopoverDirectiveDocsComponent,
        PopoverDirectiveExampleComponent,
        PopoverTriggersComponent,
        PopoverProgrammaticComponent,
        PopoverFillComponent,
        PopoverCFillComponent,
        ProductSwitchDocsHeaderComponent,
        ProductSwitchDocsComponent,
        ProductSwitchDndExampleComponent,
        ProductSwitchSmallExampleComponent,
        ProductSwitchListComponent,
        RadioFormGroupExampleComponent,
        RadioExamplesComponent,
        ScrollSpyDocsComponent,
        ScrollSpyExampleComponent,
        ScrollSpyCustomExampleComponent,
        ScrollSpyOffsetExampleComponent,
        SelectNativeExampleComponent,
        SelectNativeFormGroupExampleComponent,
        SelectNativeInlineHelpExampleComponent,
        SelectNativeStateExampleComponent,
        ShellbarBasicExampleComponent,
        ShellbarAdvancedExampleComponent,
        ShellbarCollapsibleExampleComponent,
        SideNavigationCollapsedExampleComponent,
        SideNavigationExampleComponent,
        SideNavigationIconsExampleComponent,
        SideNavigationLevelsExampleComponent,
        SideNavigationTitlesExampleComponent,
        TableExampleComponent,
        TableCdkExampleComponent,
        TableCheckboxesExampleComponent,
        TableResponsiveExampleComponent,
        TabsExampleComponent,
        TabSelectionExampleComponent,
        TabsNavigationModeExampleComponent,
        TabNavigationExampleChildFirst,
        TabNavigationExampleChildSecond,
        TabNavigationExampleChildThird,
        TextareaExampleComponent,
        TextareaFormGroupExampleComponent,
        TextareaInlineHelpExampleComponent,
        TextareaStateExampleComponent,
        TileActionsExampleComponent,
        TileDisabledExampleComponent,
        TileExampleComponent,
        TileMediaExampleComponent,
        TileProductExampleComponent,
        TileButtonExampleComponent,
        TimeExampleComponent,
        Time12ExampleComponent,
        TimeDisabledExampleComponent,
        TimeNoSecondsExampleComponent,
        TimeOnlyHoursExampleComponent,
        TimeNoSpinnersExampleComponent,
        TimeI18nExampleComponent,
        TimeFormExampleComponent,
        TimePickerExampleComponent,
        TimePicker12ExampleComponent,
        TimePickerDisabledExampleComponent,
        TimePickerNoSecondsExampleComponent,
        TimePickerOnlyHoursExampleComponent,
        TimePickerCompactExampleComponent,
        TimePickerOtherDelimiterExampleComponent,
        TimePickerAllowNullExampleComponent,
        TimePickerFormExampleComponent,
        SimpleTreeExampleComponent,
        ComboboxDocsComponent,
        ComboboxAsyncExampleComponent,
        ComboboxDisplaywithExampleComponent,
        ComboboxDynamicExampleComponent,
        ComboboxSearchFunctionExampleComponent,
        ComboboxExampleComponent,
        ComboboxTemplateExampleComponent,
        ComboboxFormsExampleComponent,
        ComboboxDisabledExampleComponent,
        ComboboxHeightExampleComponent,
        ComboboxOpenControlExampleComponent,
        LoadingSpinnerDocsComponent,
        LoadingSpinnerExampleComponent,
        LoadingSpinnerContainerExampleComponent,
        LocalizationEditorHeaderComponent,
        LocalizationEditorDocsComponent,
        LocalizationEditorExampleComponent,
        LocalizationEditorTemplateExampleComponent,
        LocalizationEditorTextareaExampleComponent,
        LocalizationEditorFormsExampleComponent,
        ToggleSizesExampleComponent,
        DisabledToggleExampleComponent,
        ToggleBindingExampleComponent,
        ToggleFormsExampleComponent,
        TokenDocsComponent,
        TokenExampleComponent,
        MultiInputAsyncExampleComponent,
        MultiInputFilterExampleComponent,
        MultiInputDisplaywithExampleComponent,
        MultiInputFormExampleComponent,
        BackdropExamplesComponent,
        AlertHeaderComponent,
        ActionBarHeaderComponent,
        BadgeLabelHeaderComponent,
        BreadcrumbHeaderComponent,
        ButtonHeaderComponent,
        ButtonGroupHeaderComponent,
        SplitButtonHeaderComponent,
        CalendarHeaderComponent,
        CheckboxHeaderComponent,
        ComboboxHeaderComponent,
        DatePickerHeaderComponent,
        DatetimePickerHeaderComponent,
        DropdownHeaderComponent,
        FileInputHeaderComponent,
        IconHeaderComponent,
        IdentifierHeaderComponent,
        ImageHeaderComponent,
        InfiniteScrollHeaderComponent,
        InlineHelpHeaderComponent,
        InputGroupHeaderComponent,
        InputHeaderComponent,
        LayoutGridDocsHeaderComponent,
        LayoutGridDocsComponent,
        ListHeaderComponent,
        LoadingSpinnerHeaderComponent,
        MenuHeaderComponent,
        MegaMenuHeaderComponent,
        ModalDocsHeaderComponent,
        MultiInputHeaderComponent,
        PaginationHeaderComponent,
        PanelDocsHeaderComponent,
        PopoverHeaderComponent,
        PopoverDirectiveHeaderComponent,
        RadioHeaderComponent,
        ScrollSpyHeaderComponent,
        SelectNativeHeaderComponent,
        ShellbarDocsHeaderComponent,
        SideNavigationHeaderComponent,
        TableDocsHeaderComponent,
        TabsHeaderComponent,
        TextareaHeaderComponent,
        TileDocsHeaderComponent,
        TimeHeaderComponent,
        TimePickerHeaderComponent,
        ToggleHeaderComponent,
        TokenHeaderComponent,
        TreeHeaderComponent,
        ComplexTitleExampleComponent,
        AddingTabExampleComponent,
        CalendarI18nExampleComponent,
        DatePickerI18nExampleComponent,
        DatePickerPositionExampleComponent,
        DatePickerFormatExampleComponent,
        ModalPositionExampleComponent,
        ContainerComponent,
        SelectDocsComponent,
        SelectHeaderComponent,
        SelectBasicExampleComponent,
        SelectProgrammaticExampleComponent,
        SelectNestedOptionsComponent,
        SelectCustomTriggerComponent,
        SelectAddingExampleComponent,
        SelectFormsComponent,
        SelectViewValueExampleComponent,
        SelectMaxHeightExampleComponent,
        CalendarI18nMomentExampleComponent,
        SelectMaxHeightExampleComponent,
        NotificationDocsComponent,
        NotificationDocsHeaderComponent,
        NotificationGroupTemplateExampleComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent,
        NotificationAsObjectExampleComponent,
        NotificationOptionsExampleComponent,
        NotificationContentComponent
    ],

    entryComponents: [
        ModalContentComponent,
        ModalInModalComponent,
        ModalInModalSecondComponent,
        AlertContentComponent,
        NotificationContentComponent
    ],
    imports: [
        SharedDocumentationModule,
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES)
    ],
    providers: [
        { provide: 'CURRENT_LIB', useValue: 'core' }
    ]
})
export class CoreDocumentationModule {
}
