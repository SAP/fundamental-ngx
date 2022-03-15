import { AfterViewInit, Component, ElementRef } from '@angular/core';
import hljs from 'highlight.js/lib';

@Component({
    selector: 'app-form-container-header',
    templateUrl: './platform-form-container-header.component.html'
})
export class PlatformFormContainerHeaderComponent implements AfterViewInit {
    constructor(private elementRef: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.querySelectorAll('.hljs').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
}
