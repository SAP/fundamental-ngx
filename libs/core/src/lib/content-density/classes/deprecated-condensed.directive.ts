import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentDensityMode } from '../content-density.types';
import { ModuleDeprecation } from '@fundamental-ngx/core/utils';

/**
 * Directive decorator is only for allowing @Input
 */
@Directive()
export class DeprecatedCondensedDirective
    extends BehaviorSubject<ContentDensityMode>
    implements OnDestroy, ModuleDeprecation
{
    @Input()
    set condensed(value: BooleanInput) {
        this.next(coerceBooleanProperty(value) ? ContentDensityMode.CONDENSED : ContentDensityMode.COZY);
    }

    readonly message: string;
    readonly alternative = {
        name: 'Use [fdCondensed] directive instead',
        link: ['/core', 'content-density-2']
    };

    constructor(selectorBase: string) {
        super(ContentDensityMode.COZY);
        this.message = `Usage of ${selectorBase}[condensed] is deprecated`;
        if (isDevMode()) {
            console.warn(`${this.message}. Use [fdCondensed] directive instead.`);
        }
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
