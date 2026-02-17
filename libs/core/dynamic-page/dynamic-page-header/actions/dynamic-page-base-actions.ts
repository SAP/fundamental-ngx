import { Directive, ElementRef, inject } from '@angular/core';

@Directive()
export class DynamicPageBaseActions {
    /** @hidden */
    protected readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected addClassToToolbar(_class: string): void {
        // adds global actions classes to its toolbar
        const toolbarEl = this.elementRef.nativeElement.querySelector('.fd-toolbar');
        if (toolbarEl) {
            toolbarEl.classList.add(_class);
        }
    }
}
