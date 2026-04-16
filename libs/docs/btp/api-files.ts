// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!

/**
 * Files to display in the API tab of each component.
 * Names should be without hyphens, and capitalized where hyphens occur normally.
 * Include the suffix i.e. Directive or Component.
 * Names are sorted in the ApiComponent so order does not matter.
 */
export const API_FILES = {
    button: ['NestedButtonDirective'],
    navigation: [
        'FdbNavigationContentContainer',
        'FdbNavigationListItem',
        'NavigationComponent',
        'NavigationContentEndComponent',
        'NavigationContentStartComponent',
        'NavigationDataSourceParser',
        'NavigationLinkComponent',
        'NavigationListComponent',
        'NavigationListItemComponent',
        'NavigationListItemDirective',
        'NavigationListItemRefDirective',
        'NavigationMenuItemComponent',
        'NavigationMoreButtonComponent'
    ],
    toolHeader: [
        'ToolHeaderComponent',
        'ToolHeaderAutoModeDirective',
        'ToolHeaderUserDirective',
        'ToolHeaderProductSwitchComponent',
        'ToolHeaderLogoDirective',
        'ToolHeaderButtonDirective'
    ],
    toolLayout: [
        'ToolLayoutComponent',
        'ToolLayoutContentContainerDirective',
        'ToolLayoutNavigationContainerDirective'
    ],
    splitter: [
        'SplitterComponent',
        'SplitterPaneContainerComponent',
        'SplitterSplitPaneComponent',
        'SplitterPaginationComponent',
        'SplitterResizerComponent'
    ],
    searchField: ['SearchFieldComponent']
} as const;
