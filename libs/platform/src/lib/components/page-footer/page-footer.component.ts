import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

export type footerSize = 'sm' | 'md' | 'lg' | 'xl';

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

    public screenWidth: any;
    public screenHeight: any;

    constructor(private _elRef: ElementRef, private readonly _cdRef: ChangeDetectorRef) {}

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
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
