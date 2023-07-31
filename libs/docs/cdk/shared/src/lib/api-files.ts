// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
import {
    DndItemDirective,
    DndKeyboardGroupDirective,
    DndKeyboardItemDirective,
    DndListDirective
} from "@fundamental-ngx/cdk";

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
    focusableItem: ['FocusableItemComponent'],
    tabbable: [''],
    focusableGrid: ['FocusableGridDirective', 'FocusableItemDirective'],
    disabled: ['DisabledBehaviorDirective'],
    clicked: ['ClickedDirective'],
    focusableList: ['FocusableListDirective', 'FocusableItemDirective'],
    dnd: ['DndItemDirective', 'DndListDirective', 'DndKeyboardGroupDirective', 'DndKeyboardItemDirective'],
    initialFocus: ['InitialFocusDirective'],
    selectableList: ['SelectableListDirective']
};
