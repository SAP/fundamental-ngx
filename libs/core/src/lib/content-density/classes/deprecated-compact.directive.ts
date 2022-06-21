import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentDensityMode } from '../content-density.types';
import { ModuleDeprecation } from '@fundamental-ngx/core/utils';

/**
 * Directive decorator is only for allowing @Input
 */
@Directive()
export class DeprecatedCompactDirective
    extends BehaviorSubject<ContentDensityMode>
    implements OnDestroy, ModuleDeprecation
{
    /** @deprecated use fdCompact directive instead */
    @Input()
    set compact(value: BooleanInput) {
        this.next(coerceBooleanProperty(value) ? ContentDensityMode.COMPACT : ContentDensityMode.COZY);
    }

    readonly message: string;
    readonly alternative = {
        name: 'Use [fdCompact] directive instead',
        link: ['/core', 'content-density-2']
    };

    constructor(selectorBase: string) {
        super(ContentDensityMode.COZY);
        this.message = `Usage of ${selectorBase}[compact] is deprecated`;
        if (isDevMode()) {
            console.warn(`${this.message}. Use [fdCompact] directive instead.`);
        }
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
