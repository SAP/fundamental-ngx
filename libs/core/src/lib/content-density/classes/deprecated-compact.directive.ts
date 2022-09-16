import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentDensityMode } from '../types/content-density.mode';
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
        if (isDevMode()) {
            console.warn(`${this.message}. Use [fdCompact] directive instead.`);
        }
        this.next(coerceBooleanProperty(value) ? ContentDensityMode.COMPACT : ContentDensityMode.COZY);
    }

    readonly message: string;
    readonly alternative = {
        name: 'Use [fdCompact] directive instead',
        link: ['/core', 'content-density']
    };

    constructor(selectorBase: string) {
        super(ContentDensityMode.COZY);
        this.message = `Usage of ${selectorBase}[compact] is deprecated`;
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
