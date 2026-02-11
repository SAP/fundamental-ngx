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
    customFooterTemplate: TemplateRef<any> | undefined;

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden */
    protected _listenForButtonChanges(className: string): void {
        const addClassToButton = (buttonBar: ButtonBarComponent): void => {
            const button = buttonBar.buttonComponent();
            if (button) {
                const buttonElement = button.elementRef.nativeElement;
                if (!buttonElement.classList.contains(className)) {
                    buttonElement.classList.add(className);
                }
            }
        };

        this.buttons.changes.pipe(startWith(1)).subscribe(() => {
            this.buttons.forEach((buttonBar) => {
                addClassToButton(buttonBar);
            });
        });
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        const footerTemplate = this.customTemplates.find((template) => template.name === 'footer');
        this.footerTemplate = footerTemplate ? footerTemplate.templateRef : undefined;

        // Custom template that doesn't use predefined Bar. The user has to set everything
        const customFooterTemplate = this.customTemplates.find((template) => template.name === 'customFooter');
        this.customFooterTemplate = customFooterTemplate ? customFooterTemplate.templateRef : undefined;

        this._cdr.detectChanges();
    }
}
