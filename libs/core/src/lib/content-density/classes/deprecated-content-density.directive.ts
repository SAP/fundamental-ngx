import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDensityMode } from '../content-density.types';
import { ModuleDeprecation } from '@fundamental-ngx/core/utils';

const warnedSelectorBases = new Set<string>();

/**
 * Directive decorator is only for allowing @Input
 */
@Directive()
export class DeprecatedContentDensityDirective
    extends BehaviorSubject<ContentDensityMode>
    implements OnDestroy, ModuleDeprecation
{
    /** @deprecated use fdCompact directive instead */
    @Input()
    set contentDensity(value: any) {
        if (isDevMode() && !warnedSelectorBases.has(this.selectorBase)) {
            console.warn(`${this.message}. Use [fd${capitalize(value)}] or [fdContentDensity] directives instead.`);
            warnedSelectorBases.add(this.selectorBase);
        }
        this.next(value);
    }

    get message(): string {
        return `Usage of ${this.selectorBase}[contentDensity] is deprecated`;
    }

    readonly alternative = {
        name: 'Use [fdCompact] directive instead',
        link: ['/core', 'content-density']
    };

    selectorBase: string;

    constructor() {
        super(ContentDensityMode.COZY);
    }

    ngOnDestroy(): void {
        this.complete();
    }
}

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
