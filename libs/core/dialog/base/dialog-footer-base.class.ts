import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    QueryList,
    TemplateRef,
    inject
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent, FD_BUTTON_BAR_COMPONENT } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Directive()
export abstract class DialogFooterBase implements AfterContentInit {
    /** @ignore */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @ignore */
    @ContentChildren(FD_BUTTON_BAR_COMPONENT)
    buttons: QueryList<ButtonBarComponent>;

    /** @ignore */
    footerTemplate: TemplateRef<any> | undefined;

    /** @ignore */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @ignore */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @ignore */
    protected _listenForButtonChanges(className: string): void {
        const addClassToButton = (button: ButtonComponent): void => {
            if (button && !button.class.includes(className)) {
                button.class = button.class + className;
                button.buildComponentCssClass();
            }
        };

        this.buttons.changes.pipe(startWith(1)).subscribe(() =>
            this.buttons.forEach((button) => {
                addClassToButton(button._buttonComponent);
            })
        );
    }

    /** @ignore Assign custom templates */
    private _assignCustomTemplates(): void {
        const footerTemplate = this.customTemplates.find((template) => template.name === 'footer');
        this.footerTemplate = footerTemplate ? footerTemplate.templateRef : undefined;
        this._cdr.detectChanges();
    }
}
