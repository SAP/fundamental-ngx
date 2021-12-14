import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[fdpViewSettingsFilterCustomDef]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpViewSettingsFilterCustomDef {
    constructor(public templateRef: TemplateRef<any>) {}
}
