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
    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    @ContentChildren(FD_BUTTON_BAR_COMPONENT)
    buttons: QueryList<ButtonBarComponent>;

    /** @hidden */
    footerTemplate: TemplateRef<any> | undefined;

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden */
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

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        const footerTemplate = this.customTemplates.find((template) => template.name === 'footer');
        this.footerTemplate = footerTemplate ? footerTemplate.templateRef : undefined;
        this._cdr.detectChanges();
    }
}
