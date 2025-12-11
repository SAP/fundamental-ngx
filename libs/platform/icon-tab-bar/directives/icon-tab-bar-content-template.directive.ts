import { Directive, inject, Injectable, input, OnDestroy, OnInit, signal, Signal, TemplateRef } from '@angular/core';

/**
 * Service to manage template registration across components
 */
@Injectable({ providedIn: 'root' })
export class IconTabBarTemplateService {
    private templates = new Map<string, TemplateRef<any>>();
    private templatesSignal = signal<Map<string, TemplateRef<any>>>(new Map());

    registerTemplate(id: string, template: TemplateRef<any>): void {
        this.templates.set(id, template);
        // Create a new map to trigger signal update
        this.templatesSignal.set(new Map(this.templates));
    }

    unregisterTemplate(id: string): void {
        this.templates.delete(id);
        // Create a new map to trigger signal update
        this.templatesSignal.set(new Map(this.templates));
    }

    getTemplate(id: string): TemplateRef<any> | undefined {
        return this.templates.get(id);
    }

    getAllTemplates(): Map<string, TemplateRef<any>> {
        return new Map(this.templates);
    }

    getAllTemplatesSignal(): Signal<Map<string, TemplateRef<any>>> {
        return this.templatesSignal.asReadonly();
    }
}

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
