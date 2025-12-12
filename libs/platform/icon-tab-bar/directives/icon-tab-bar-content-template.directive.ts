import { Directive, inject, input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { IconTabBarTemplateService } from '../services/icon-tab-bar-template.service';

/**
 * Directive to mark a template as a content template for icon tab bar.
 * This allows you to define templates with IDs that can be referenced in tab configurations.
 * Use this directive when you want to define tab content using templates with IDs instead of
 * projecting content directly into fdp-icon-tab-bar-tab components.
 *
 */
@Directive({
    selector: '[fdpIconTabBarContentTemplate]',
    standalone: true
})
export class IconTabBarContentTemplateDirective implements OnInit, OnDestroy {
    /**
     * The unique ID for this template. Used to reference the template in tab configurations.
     * This ID should be used in the `contentTemplateId` property of the `TabConfig`.
     */
    templateId = input.required<string>();

    /** Reference to the template element. @hidden */
    readonly templateRef = inject(TemplateRef);

    /** Service to manage templates. @hidden */
    private readonly templateService = inject(IconTabBarTemplateService);

    ngOnInit(): void {
        this.templateService.registerTemplate(this.templateId(), this.templateRef);
    }

    ngOnDestroy(): void {
        this.templateService.unregisterTemplate(this.templateId());
    }
}
