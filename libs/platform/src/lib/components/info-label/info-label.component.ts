import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { InfoLabelComponent, CssClassBuilder, applyCssClass } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-info-label',
    templateUrl: './info-label.component.html',
    encapsulation: ViewEncapsulation.None
})
export class InfoLabelPlatformComponent extends InfoLabelComponent implements CssClassBuilder {

    constructor(_elementRef: ElementRef) {
        super(_elementRef);
    }

    @applyCssClass
    buildComponentCssClass(): string {
        return [''].filter(x => x !== '').join();
    }

}
