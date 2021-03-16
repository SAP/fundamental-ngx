import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-page-footer',
    templateUrl: './page-footer.component.html',
    styleUrls: ['./page-footer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformFooterComponent {
    /** logo template accpets the generic html */
    @Input()
    logo: TemplateRef<any>;
    /** content template accpets the generic html */
    @Input()
    content: TemplateRef<any>;
    /** copyright template accpets the generic html */
    @Input()
    copyright: TemplateRef<any>;
}
