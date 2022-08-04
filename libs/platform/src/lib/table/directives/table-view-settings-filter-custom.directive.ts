import { Directive, EventEmitter, TemplateRef } from '@angular/core';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Directive({ selector: '[fdpViewSettingsFilterCustomDef]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpViewSettingsFilterCustomDef {
    constructor(
        public templateRef: TemplateRef<{
            $implicit: any;
            valueChangeEmitter: EventEmitter<unknown>;
            contentDensity: ContentDensityMode;
        }>
    ) {}
}
