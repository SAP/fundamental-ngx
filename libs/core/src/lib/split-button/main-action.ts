import { TemplateRef } from '@angular/core';

export interface MainAction {
    // The title that will be the default text in the button.
    mainActionTitle: string | TemplateRef<any>;
    // Whether or not the mainAction text and click behavior will change to that of the newly selected option.
    keepMainAction?: boolean;
    // Function to be called when the main action button is clicked.
    callback?: Function;
}
