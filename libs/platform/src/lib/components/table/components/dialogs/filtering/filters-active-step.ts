import { InjectionToken, TemplateRef } from '@angular/core';

export interface FiltersViewStep {
    titleTemplateRef: TemplateRef<any>;
    bodyTemplateRef: TemplateRef<any>;
}

export const FILTERS_VIEW_STEP_TOKEN = new InjectionToken<FiltersViewStep>('FiltersViewStep');
