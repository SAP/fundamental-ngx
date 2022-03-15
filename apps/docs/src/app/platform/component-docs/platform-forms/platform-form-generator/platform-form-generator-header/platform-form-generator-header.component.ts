import { AfterViewInit, Component, ElementRef } from '@angular/core';
import hljs from 'highlight.js/lib';

@Component({
    selector: 'fd-platform-form-generator-header',
    templateUrl: './platform-form-generator-header.component.html'
})
export class PlatformFormGeneratorHeaderComponent implements AfterViewInit {
    constructor(private elementRef: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.querySelectorAll('.hljs').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
}
