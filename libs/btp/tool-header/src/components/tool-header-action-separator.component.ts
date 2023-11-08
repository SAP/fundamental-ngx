import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToolHeaderActionClass } from '../tool-header-action.class';

@Component({
    selector: 'fdb-tool-header-action-separator',
    template: `
        <ng-template>
            <div class="fd-tool-header__separator"></div>
        </ng-template>
    `,
    providers: [
        {
            provide: ToolHeaderActionClass,
            useExisting: ToolHeaderActionSeparatorComponent
        }
    ],
    standalone: true
})
export class ToolHeaderActionSeparatorComponent extends ToolHeaderActionClass {
    /** @hidden */
    @ViewChild(TemplateRef)
    templateRef: TemplateRef<void>;

    /** @hidden */
    readonly isSeparator = true;
}
