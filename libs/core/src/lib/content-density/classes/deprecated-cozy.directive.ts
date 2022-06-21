import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentDensityMode } from '../content-density.types';
import { ModuleDeprecation } from '@fundamental-ngx/core/utils';

/**
 * Directive decorator is only for allowing @Input
 */
@Directive()
export class DeprecatedCozyDirective
    extends BehaviorSubject<ContentDensityMode>
    implements OnDestroy, ModuleDeprecation
{
    @Input()
    set cozy(value: BooleanInput) {
        this.next(coerceBooleanProperty(value) ? ContentDensityMode.COZY : ContentDensityMode.COMPACT);
    }

    readonly message: string;
    readonly alternative = {
        name: 'Use [fdCozy] directive instead',
        link: ['/core', 'content-density']
    };

    constructor(selectorBase: string) {
        super(ContentDensityMode.COMPACT);
        this.message = `Usage of ${selectorBase}[cozy] is deprecated`;
        if (isDevMode()) {
            console.warn(`${this.message}. Use [fdCozy] directive instead.`);
        }
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
