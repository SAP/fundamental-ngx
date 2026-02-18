import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Directive()
export class DynamicPageBaseActions implements HasElementRef {
    /** Element reference to the host element. */
    readonly elementRef = inject(ElementRef);

    /**
     * Adds a CSS class to the toolbar element within this component.
     * @param _class The CSS class name to add to the toolbar.
     */
    addClassToToolbar(_class: string): void {
        const toolbarEl = this.elementRef.nativeElement.querySelector('.fd-toolbar');
        if (toolbarEl) {
            toolbarEl.classList.add(_class);
        }
    }
}
