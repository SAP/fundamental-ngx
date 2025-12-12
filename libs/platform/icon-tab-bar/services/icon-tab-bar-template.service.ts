import { Injectable, signal, Signal, TemplateRef } from '@angular/core';

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
