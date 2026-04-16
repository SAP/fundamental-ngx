// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!

/**
 * Files to display in the API tab of each component.
 * Names should be without hyphens, and capitalized where hyphens occur normally.
 * Include the suffix i.e. Directive or Component.
 * Names are sorted in the ApiComponent so order does not matter.
 */
export const API_FILES = {
    breakpoint: ['BreakpointDirective'],
    forms: ['CvaDirective'],
    dataSource: ['DataSourceDirective', 'DataProvider'],
    utils: [
        'AsyncOrSyncPipe',
        'AttributeObserver',
        'AutoCompleteDirective',
        'DisplayFnPipe',
        'DynamicComponentInjector',
        'DynamicComponentService',
        'DynamicPortalComponent',
        'FilterStringsPipe',
        'FocusKeyManagerItemDirective',
        'FocusKeyManagerListDirective',
        'FocusTrapService',
        'FocusableObserver',
        'IgnoreClickOnSelectionDirective',
        'IntersectionSpyDirective',
        'IsCompactDensityPipe',
        'KeyUtil',
        'LocalStorageService',
        'MakeAsyncPipe',
        'OnlyDigitsDirective',
        'OverflowListDirective',
        'RangeSelector',
        'ReadonlyBehaviorDirective',
        'ReadonlyObserver',
        'RepeatDirective',
        'ResizeDirective',
        'ResizeObserverDirective',
        'ResizeObserverFactory',
        'ResizeObserverService',
        'SafePipe',
        'SearchHighlightPipe',
        'SelectableItemToken',
        'TabbableElementService',
        'TemplateDirective',
        'TruncateDirective',
        'TruncatePipe',
        'TwoDigitsPipe',
        'ValueByPathPipe'
    ],
    selectableList: ['SelectableListDirective', 'SelectableItemDirective', 'SelectionService'],
    focusableItem: [],
    tabbable: [''],
    focusableGrid: ['FocusableGridDirective', 'FocusableListDirective', 'FocusableItemDirective'],
    disabled: ['DisabledBehaviorDirective'],
    clicked: ['ClickedDirective'],
    focusableList: ['FocusableListDirective', 'FocusableItemDirective'],
    dnd: ['DndListDirective', 'DndItemDirective', 'DndKeyboardGroupDirective', 'DndKeyboardItemDirective'],
    initialFocus: ['InitialFocusDirective'],
    lineClamp: ['LineClampDirective', 'LineClampTargetDirective'],
    rtlService: ['RtlService']
} as const;
