import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDensityMode } from '../types/content-density.mode';
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
        this._manuallySet = true;
        this.next(value);
    }

    get message(): string {
        return `Usage of ${this.selectorBase}[contentDensity] is deprecated`;
    }

    get alternative(): any {
        return {
            name: `Use [${this._manuallySet ? `fd${capitalize(this.value)}` : 'fdContentDensity'}] directive instead`,
            link: ['/core', 'content-density']
        };
    }

    selectorBase: string;

    private _manuallySet = false;

    constructor() {
        super(ContentDensityMode.COZY);
    }

    ngOnDestroy(): void {
        this.complete();
    }
}

const capitalize = (str: string): string => str?.charAt(0).toUpperCase() + str?.slice(1);
