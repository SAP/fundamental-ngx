import { CONTENT_DENSITY_DIRECTIVE, DeprecatedContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: `
        fdp-action-bar[contentDensity],
        fdp-button[contentDensity],
        fdp-object-list-item[contentDensity],
        fdp-menu[contentDensity],
        fdp-menu-button[contentDensity],
        fdp-panel[contentDensity],
        fdp-search-field[contentDensity],
        fdp-split-menu-button[contentDensity],
        fdp-file-uploader[contentDensity],
        fdp-upload-collection[contentDensity],
    `,
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => PlatformContentDensityDeprecationDirective)
        }
    ]
})
export class PlatformContentDensityDeprecationDirective extends DeprecatedContentDensityDirective {

}
