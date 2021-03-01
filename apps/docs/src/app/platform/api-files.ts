/**
 * Files to display in the API tab of each component.
 * Names should be without hyphens, and capitalized where hyphens occur normally.
 * Include the suffix i.e. Directive or Component.
 * Names are sorted in the ApiComponent so order does not matter.
 */
export const API_FILES = {
    actionbar: ['actionbarcomponent'],
    button: ['ButtonComponent'],
    checkbox: ['CheckboxComponent'],
    checkboxGroup: ['CheckboxGroupComponent'],
    datePicker: ['PlatformDatetimePickerComponent'],
    datetimePicker: ['PlatformDatetimePickerComponent'],
    dynamicPage: [
        'DynamicPageComponent',
        'DynamicPageTitleComponent',
        'DynamicPageKeyInfoComponent',
        'DynamicPageHeaderComponent',
        'DynamicPageContentComponent'
    ],
    formContainer: ['FormGroupComponent', 'FormFieldComponent', 'FormFieldGroupComponent'],
    infoLabel: ['InfoLabelComponent'],
    input: ['InputComponent'],
    link: ['LinkComponent'],
    menu: ['MenuComponent', 'MenuItemComponent', 'MenuTriggerDirective'],
    menuButton: ['MenuButtonComponent'],
    objectStatus: ['ObjectStatusComponent'],
    objectMarker: ['PlatformObjectMarkerComponent'],
    radioGroup: ['RadioGroupComponent'],
    searchField: ['SearchFieldComponent'],
    select: ['SelectComponent', 'BaseSelect', 'SelectConfig'],
    splitMenuButton: ['SplitMenuButtonComponent'],
    table: [
        'TableComponent',
        'TableColumnComponent',
        'TableToolbarComponent',
        'TableToolbarActionsComponent',
        'FdpTableCell',
        'FdpCellDef',
        'FdpTableHeader',
        'FdpHeaderCellDef',
        'TableViewSettingsDialogComponent',
        'TableViewSettingsFilterComponent',
        'FdpViewSettingsFilterCustomDef',
        'TableP13DialogComponent',
        'TableP13SortComponent',
        'TableP13FilterComponent',
        'TableP13GroupComponent',
        'TableP13ColumnsComponent',
        'TableDataSource',
        'TableDataProvider'
    ],
    textarea: ['TextAreaComponent'],
    timePicker: ['PlatformTimePickerComponent'],
    panel: [
        'PlatformPanelComponent',
        'PlatformPanelContentComponent',
        'PlatformPanelActionsComponent',
        'PlatformPanelConfig'
    ],
    switch: ['SwitchComponent'],
    stepInput: ['NumberStepInputComponent', 'StepInputComponent', 'StepInputConfig'],
    inputGroup: ['InputGroupConfig', 'InputGroupComponent', 'InputGroupAddonComponent', 'InputGroupInputComponent'],
    combobox: ['ComboboxComponent', 'BaseCombobox', 'ComboboxConfig'],
    list: ['ListComponent', 'StandardListItemComponent', 'ListFooter', 'ListGroupHeader', 'ListConfig'],
    standardlistitem: ['ListComponent', 'StandardListItemComponent', 'ListFooter', 'ListGroupHeader', 'ListConfig'],
    thumbnail: ['ThumbnailComponent'],
    objectAttribute: ['ObjectAttributeComponent'],
    actionlistitem: ['ActionListItemComponent', 'ListComponent', 'ListConfig'],
    displaylistitem: [
        'DisplayListItemComponent',
        'ListComponent',
        'ListFooter',
        'ListGroupHeader',
        'ListHeader',
        'ListConfig'
    ],
    objectlistitem: [
        'ObjectListItemComponent',
        'ListComponent',
        'ListFooter',
        'ListGroupHeader',
        'ListHeader',
        'ListConfig'
    ],
    multiInput: ['PlatformMultiInputComponent'],
    valueHelpDialog: ['PlatformValueHelpDialogComponent', 'VhdFilterComponent', 'VhdSearchComponent'],
    feedInput: ['FeedInputComponent'],
    fileUploader: ['PlatformFileUploaderComponent'],
    uploadCollection: ['UploadCollectionComponent', 'UploadCollectionDataProvider', 'UploadCollectionDataSource'],
    approvalFlow: ['ApprovalFlowComponent', 'ApprovalFlowNodeComponent'],
    slider: ['SliderComponent']
};
