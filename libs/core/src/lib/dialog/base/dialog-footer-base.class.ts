import { AfterContentInit, ContentChildren, Directive, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../../utils/directives/template/template.directive';
import { ButtonBarComponent } from '../../bar/button-bar/button-bar.component';

@Directive()
export abstract class DialogFooterBase implements AfterContentInit {

    /** @hidden */
    footerTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    @ContentChildren(ButtonBarComponent)
    buttons: QueryList<ButtonBarComponent>;

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        const footerTemplate = this.customTemplates.find(template => template.getName() === 'footer');
        this.footerTemplate = footerTemplate ? footerTemplate.templateRef : undefined;
    }

    /** TODO */
    
}
