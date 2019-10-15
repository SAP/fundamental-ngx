export interface ShellbarMenuItem {

    /** Text written in dropdown option */
    text: string;

    /**
     *  Callback function that will be called on selecting this shellbar menu item from dropdown
     */
    callback: Function;
}
