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
    dataSource: ['DataSourceDirective'],
    utils: ['UtilsComponent'],
    selectableList: ['SelectableListDirective', 'SelectableItemDirective', 'SelectionService'],
    focusableItem: ['FocusableItemComponent'],
    tabbable: [''],
    focusableGrid: ['FocusableGridDirective', 'FocusableListDirective', 'FocusableItemDirective'],
    disabled: ['DisabledBehaviorDirective'],
    clicked: ['ClickedDirective'],
    focusableList: ['FocusableListDirective', 'FocusableItemDirective'],
    dnd: ['DndListDirective', 'DndItemDirective', 'DndKeyboardGroupDirective', 'DndKeyboardItemDirective'],
    initialFocus: ['InitialFocusDirective']
};
