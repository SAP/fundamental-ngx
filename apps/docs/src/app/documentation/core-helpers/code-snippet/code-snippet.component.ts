import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ExampleFile } from '../code-example/example-file';
import hljs from 'highlight.js/lib';

@Component({
    selector: 'fd-code-snippet',
    styles: ['.bordered { border: 1px solid beige }'],
    template: `
        <pre [class.bordered]="standAlone">
            <code #code [ngClass]="file.language" class="hljs">{{file.code?.default}}</code>
        </pre>
    `
})
export class CodeSnippetComponent implements AfterViewInit {
    @Input()
    file: ExampleFile;

    @Input()
    standAlone: boolean;

    @ViewChild('code', { read: ElementRef })
    codeContainerRef: ElementRef;

    ngAfterViewInit(): void {
        /** Highlight.js init */
        hljs.highlightBlock(this.codeContainerRef.nativeElement);
    }
}
