import { AfterContentInit, ContentChildren, Directive, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../../utils/directives/template/template.directive';

@Directive()
export abstract class DialogHeaderBase implements AfterContentInit {
    /** @hidden */
    _headerTemplate: TemplateRef<any>;

    /** @hidden */
    _subHeaderTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    private _customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        this._customTemplates.forEach(template => {
            switch (template.getName()) {
                case 'header':
                    this._headerTemplate = template.templateRef;
                    break;
                case 'subheader':
                    this._subHeaderTemplate = template.templateRef;
                    break;
            }
        });
    }
}
