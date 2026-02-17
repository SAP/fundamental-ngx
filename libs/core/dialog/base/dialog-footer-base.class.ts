import { Directive, Injector, TemplateRef, computed, contentChildren, effect, inject } from '@angular/core';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent, FD_BUTTON_BAR_COMPONENT } from '@fundamental-ngx/core/bar';

@Directive()
export abstract class DialogFooterBase {
    /**
     * @hidden
     * Signal-based query for custom footer templates.
     * Templates are identified by their fdkTemplate name attribute.
     */
    readonly customTemplates = contentChildren(TemplateDirective);

    /**
     * @hidden
     * Signal-based query for button bar components.
     */
    readonly buttons = contentChildren(FD_BUTTON_BAR_COMPONENT, { read: ButtonBarComponent });

    /**
     * @hidden
     * Signal containing the custom footer template, if provided.
     * Returns the TemplateRef when a template with name='footer' is projected.
     * This template uses the predefined Bar layout.
     */
    readonly footerTemplate = computed<TemplateRef<any> | undefined>(
        () => this.customTemplates().find((t) => t.name === 'footer')?.templateRef
    );

    /**
     * @hidden
     * Signal containing the custom footer template without predefined Bar, if provided.
     * Returns the TemplateRef when a template with name='customFooter' is projected.
     * This template gives full control to the user without any predefined layout.
     */
    readonly customFooterTemplate = computed<TemplateRef<any> | undefined>(
        () => this.customTemplates().find((t) => t.name === 'customFooter')?.templateRef
    );

    /** @hidden */
    protected readonly injector = inject(Injector);

    /**
     * @hidden
     * Sets up an effect to add a CSS class to button elements when buttons change.
     * Must be called within an injection context or will use runInInjectionContext.
     * @param className - The CSS class name to add to each button element
     */
    protected _listenForButtonChanges(className: string): void {
        effect(
            () => {
                const buttonBars = this.buttons();
                buttonBars.forEach((buttonBar) => {
                    const button = buttonBar.buttonComponent();
                    if (button) {
                        const buttonElement = button.elementRef.nativeElement;
                        if (!buttonElement.classList.contains(className)) {
                            buttonElement.classList.add(className);
                        }
                    }
                });
            },
            { injector: this.injector }
        );
    }
}
