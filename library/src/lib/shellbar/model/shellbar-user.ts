export interface ShellbarUser {

    /** Initials of user name */
    initials: string,

    /** Url of user image (optional) */
    image?: string,

    /** User full name used only on aria-label*/
    fullName?: string,

    /**
     * Color Accent of user (optional), for more information about colors accent,
     * please visit: https://sap.github.io/fundamental/components/identifier.html
     */
    colorAccent?: string
}
