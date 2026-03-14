export type CommentType =
    | 'XACT' // Accessibility text
    | 'XBUT' // Button
    | 'XCKL' // Checkbox label
    | 'XFLD' // Field label
    | 'XMIT' // Menu header or menu item
    | 'XMSG' // Message text
    | 'XRBL' // Radio button label
    | 'XSEL' // Values in a dropdown list
    | 'XTIT' // Title (or heading)
    | 'XTOL' // Explanatory text (tooltip)
    | 'XLNK' // Hyperlink
    | 'YINS' // Instruction for a user
    | 'NOTR'; // No translation

export interface I18nManageExecutorSchema {
    command: 'add' | 'rename' | 'remove' | 'search' | 'validate' | 'update' | 'sort';
    key?: string;
    value?: string;
    newKey?: string;
    searchTerm?: string;
    comment?: string;
    commentType?: CommentType;
    propertiesPath?: string;
    fdLanguagePath?: string;
}
