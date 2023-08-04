import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { warnOnce } from '@fundamental-ngx/core/utils';

export type footerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * @deprecated
 * PlatformFooter component is deprecated since version 0.40.0
 */
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

    /** defines the padding and size of the footer based on screen */
    size: footerSize = 'xl';

    /** @hidden */
    public screenWidth: any;
    /** @hidden */
    public screenHeight: any;

    /** @hidden */
    constructor(private _elRef: ElementRef, private readonly _cdRef: ChangeDetectorRef) {
        warnOnce('PlatformFooterComponent component is deprecated since version 0.40.0');
    }

    /** @hidden */
    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth > 0 && this.screenWidth <= 360) {
            this.size = 'sm';
        } else if (this.screenWidth > 361 && this.screenWidth <= 768) {
            this.size = 'md';
        } else if (this.screenWidth > 769 && this.screenWidth <= 1024) {
            this.size = 'lg';
        } else {
            this.size = 'xl';
        }
    }
}
