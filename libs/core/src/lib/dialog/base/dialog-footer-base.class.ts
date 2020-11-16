import { AfterContentInit, ContentChildren, Directive, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../../utils/directives/template/template.directive';

@Directive()
export abstract class DialogFooterBase implements AfterContentInit {

    /** @hidden */
    _footerTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    private _customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        const footerTemplate = this._customTemplates.find((template) => template.getName() === 'footer');
        this._footerTemplate = footerTemplate ? footerTemplate.templateRef : undefined;
    }
}
