export interface ShellbarMenuItem {
    /** Text written in dropdown option */
    name: string;

    /**
     *  Callback function that will be called on selecting this shellbar menu item from dropdown
     */
    callback?: (event: Event) => void;

    /**
     * The link, that user will be redirected to, after clicking item. When this value is set, element will become
     * anchor with href, otherwise it's basic text
     */
    link?: string;

    /**
    /* The icon to include in shellbar menu item See the icon page for the list of icons.
    */
    glyph?: string;

    /**
    /* If true open the link in a new tab.
    */
    newTab?: boolean;
}
