import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentDensityMode } from '../types/content-density.mode';
import { ModuleDeprecation } from '@fundamental-ngx/cdk/utils';

/**
 * Directive decorator is only for allowing @Input
 */
@Directive()
export class DeprecatedCozyDirective
    extends BehaviorSubject<ContentDensityMode>
    implements OnDestroy, ModuleDeprecation
{
    /** @deprecated use fdCozy directive instead */
    @Input()
    set cozy(value: BooleanInput) {
        if (isDevMode()) {
            console.warn(`${this.message}. Use [fdCozy] directive instead.`);
        }
        this.next(coerceBooleanProperty(value) ? ContentDensityMode.COZY : ContentDensityMode.COMPACT);
    }

    /** @hidden */
    readonly message: string;

    /** @hidden */
    readonly alternative = {
        name: 'Use [fdCozy] directive instead',
        link: ['/core', 'content-density']
    };

    /** @hidden */
    constructor(selectorBase: string) {
        super(ContentDensityMode.COMPACT);
        this.message = `Usage of ${selectorBase}[cozy] is deprecated`;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
    }
}
