import { AfterContentInit, ContentChildren, Directive, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../../utils/directives/template/template.directive';
import { ButtonBarComponent } from '../../bar/button-bar/button-bar.component';
import { ButtonComponent } from '../../button/button.component';
import { startWith } from 'rxjs/operators';

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

    /** @hidden */
    protected _listenForButtonChanges(className: string): void {
        const addClassToButton = (button: ButtonComponent) => {
            if (button && !button.class.includes(className)) {
                button.class = button.class + className;
                button.buildComponentCssClass();
            }
        }

        this.buttons.changes.pipe(startWith(1)).subscribe(
            _ => this.buttons.forEach(button => {
                addClassToButton(button._buttonComponent)
            })
        );
    }
}
