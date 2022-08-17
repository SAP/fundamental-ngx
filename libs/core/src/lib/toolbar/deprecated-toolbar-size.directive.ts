import { Directive, forwardRef, Input, isDevMode, OnDestroy } from '@angular/core';
import {
    CONTENT_DENSITY_DIRECTIVE,
    ContentDensityMode,
    LocalContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { BehaviorSubject } from 'rxjs';
import { ModuleDeprecation } from '@fundamental-ngx/core/utils';

type ToolbarSize = 'cozy' | 'compact' | 'condensed' | null;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-toolbar[size]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedToolbarSizeDirective)
        }
    ]
})
export class DeprecatedToolbarSizeDirective
    extends BehaviorSubject<LocalContentDensityMode>
    implements OnDestroy, ModuleDeprecation
{
    @Input()
    set size(value: ToolbarSize) {
        switch (value) {
            case 'cozy':
                this.next(ContentDensityMode.COZY);
                break;
            case 'compact':
                this.next(ContentDensityMode.COMPACT);
                break;
            case 'condensed':
                this.next(ContentDensityMode.CONDENSED);
                break;
            default:
                this.next(ContentDensityMode.COMPACT);
        }
    }

    readonly message: string;
    readonly alternative = {
        name: 'Use [fdContentDensity] directive instead',
        link: ['/core', 'content-density']
    };

    constructor() {
        super(ContentDensityMode.COMPACT);
        this.message = `Usage of fd-toolbar[size] is deprecated`;
        if (isDevMode()) {
            console.warn(`${this.message}. Use [fdContentDensity] directive instead.`);
        }
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
