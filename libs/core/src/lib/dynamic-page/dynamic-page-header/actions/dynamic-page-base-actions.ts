import { Directive, ElementRef } from '@angular/core';

@Directive()
export class DynamicPageBaseActions {
    addClassToToolbar(_class: string, elementRef: ElementRef): void {

        // adds global actions classes to its toolbar
        const toolbarEl = elementRef.nativeElement.querySelector(
            '.fd-toolbar'
        );
        if (toolbarEl) {
            toolbarEl.classList.add(_class);
        }
    }
}
