import { Directive, Input, isDevMode, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDensityMode } from '../types/content-density.mode';
import { ModuleDeprecation } from '@fundamental-ngx/cdk/utils';

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

    /** Deprecation message */
    get message(): string {
        return `Usage of ${this.selectorBase}[contentDensity] is deprecated`;
    }

    /** Alternative usage description with a link to the docs */
    get alternative(): any {
        return {
            name: `Use [${this._manuallySet ? `fd${capitalize(this.value)}` : 'fdContentDensity'}] directive instead`,
            link: ['/core', 'content-density']
        };
    }

    /** @hidden */
    selectorBase: string;

    /** @hidden */
    private _manuallySet = false;

    /** @hidden */
    constructor() {
        super(ContentDensityMode.COZY);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
    }
}

const capitalize = (str: string): string => str?.charAt(0).toUpperCase() + str?.slice(1);
