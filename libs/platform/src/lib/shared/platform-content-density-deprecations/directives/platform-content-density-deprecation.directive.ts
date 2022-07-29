import { Directive, ElementRef, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedContentDensityDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: `
        fdp-action-bar[contentDensity],
        fdp-button[contentDensity],
        fdp-object-list-item[contentDensity],
        fdp-standard-list-item[contentDensity],
        fdp-menu[contentDensity],
        fdp-menu-button[contentDensity],
        fdp-panel[contentDensity],
        fdp-search-field[contentDensity],
        fdp-split-menu-button[contentDensity],
        fdp-file-uploader[contentDensity],
        fdp-upload-collection[contentDensity],
        fdp-table[contentDensity],
        fdp-multi-input[contentDensity],
        fdp-list[contentDensity],
        fdp-slider[contentDensity],
        fdp-time-picker[contentDensity],
        fdp-textarea[contentDensity],
        fdp-switch[contentDensity],
        fdp-number-step-input[contentDensity],
        fdp-select[contentDensity],
        fdp-date-picker[contentDensity],
        fdp-checkbox[contentDensity],
        fdp-checkbox-group[contentDensity],
        fdp-combobox[contentDensity],
        fdp-datetime-picker[contentDensity],
        fdp-input[contentDensity],
        fdp-radio-group[contentDensity],
        fdp-radio-button[contentDensity],
        fdp-multi-combobox[contentDensity],
        fdp-input-group-addon-body[contentDensity],
        fdp-input-group[contentDensity],
    `,
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => PlatformContentDensityDeprecationDirective)
        }
    ]
})
export class PlatformContentDensityDeprecationDirective extends DeprecatedContentDensityDirective {
    constructor(private elementRef: ElementRef) {
        super();
        this.selectorBase = elementRef.nativeElement.tagName.toLowerCase();
    }
}
