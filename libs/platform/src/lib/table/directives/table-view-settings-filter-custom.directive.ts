import { Directive, EventEmitter, TemplateRef } from '@angular/core';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

export interface FdpViewSettingsFilterCustomDefContext {
    $implicit: any;
    valueChangeEmitter: EventEmitter<unknown>;
    contentDensity: ContentDensityMode;
}

@Directive({ selector: '[fdpViewSettingsFilterCustomDef]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FdpViewSettingsFilterCustomDef {
    /** @hidden */
    static ngTemplateContextGuard(
        dir: FdpViewSettingsFilterCustomDef,
        ctx: FdpViewSettingsFilterCustomDefContext
    ): ctx is FdpViewSettingsFilterCustomDefContext {
        return true;
    }

    constructor(public templateRef: TemplateRef<FdpViewSettingsFilterCustomDefContext>) {}
}
