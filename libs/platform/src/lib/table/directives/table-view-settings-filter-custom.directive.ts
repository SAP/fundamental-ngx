import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[fdpViewSettingsFilterCustomDef]' })
export class FdpViewSettingsFilterCustomDef {
    constructor(public templateRef: TemplateRef<any>) {}
}
