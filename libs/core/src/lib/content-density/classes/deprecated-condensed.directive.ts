import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentDensityMode } from '../types/content-density.mode';
import { ModuleDeprecation } from '@fundamental-ngx/core/utils';

/**
 * Directive decorator is only for allowing @Input
 */
@Directive()
export class DeprecatedCondensedDirective
    extends BehaviorSubject<ContentDensityMode>
    implements OnDestroy, ModuleDeprecation
{
    /** @deprecated use fdCondensed directive instead */
    @Input()
    set condensed(value: BooleanInput) {
        if (isDevMode()) {
            console.warn(`${this.message}. Use [fdCondensed] directive instead.`);
        }
        this.next(coerceBooleanProperty(value) ? ContentDensityMode.CONDENSED : ContentDensityMode.COZY);
    }

    /** @hidden */
    readonly message: string;

    /** @hidden */
    readonly alternative = {
        name: 'Use [fdCondensed] directive instead',
        link: ['/core', 'content-density']
    };

    /** @hidden */
    constructor(selectorBase: string) {
        super(ContentDensityMode.COZY);
        this.message = `Usage of ${selectorBase}[condensed] is deprecated`;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
    }
}
