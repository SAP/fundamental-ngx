export interface ShellbarUserMenu {
    /** Text written in dropdown option */
    text: string;

    /** Optional icon that will be placed beside the text in dropdown option */
    glyph?: string;

    /**
     *  Callback function that will be called on selecting this shellbar menu item from dropdown
     */
    callback?: (event: MouseEvent) => void;
}
