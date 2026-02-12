import { Directive, TemplateRef, computed, contentChildren } from '@angular/core';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { DEFAULT_TITLE_SIZE } from '@fundamental-ngx/core/title';

@Directive({
    providers: [
        {
            provide: DEFAULT_TITLE_SIZE,
            useValue: 5
        }
    ]
})
export abstract class DialogHeaderBase {
    /**
     * @hidden
     * Signal-based query for custom header/subheader templates.
     * Templates are identified by their fdkTemplate name attribute.
     */
    readonly customTemplates = contentChildren(TemplateDirective);

    /**
     * @hidden
     * Signal containing the custom header template, if provided.
     * Returns the TemplateRef when a template with name='header' is projected.
     */
    readonly headerTemplate = computed<TemplateRef<any> | undefined>(
        () => this.customTemplates().find((t) => t.name === 'header')?.templateRef
    );

    /**
     * @hidden
     * Signal containing the custom subheader template, if provided.
     * Returns the TemplateRef when a template with name='subheader' is projected.
     */
    readonly subHeaderTemplate = computed<TemplateRef<any> | undefined>(
        () => this.customTemplates().find((t) => t.name === 'subheader')?.templateRef
    );
}
