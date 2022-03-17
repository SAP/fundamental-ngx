import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    isDevMode,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ExampleFile } from '../code-example/example-file';
import hljs from 'highlight.js/lib';

@Component({
    selector: 'fd-code-snippet',
    styles: ['.bordered { border: 1px solid beige }'],
    template: `
        <pre [class.bordered]="standAlone">
            <code #code class="hljs" [class]="file?.language || language">
                <ng-container *ngIf="contentBased; else fileBased">
                    <ng-content></ng-content>
                </ng-container>
                <ng-template #fileBased>
                    {{ file.code }}
                </ng-template>
            </code>
        </pre>
    `
})
export class CodeSnippetComponent implements AfterViewInit, OnChanges {
    @Input()
    file: ExampleFile;

    @Input()
    standAlone: boolean;

    @Input()
    contentBased: boolean;

    @Input()
    language: string;

    @ViewChild('code', { read: ElementRef })
    codeContainerRef: ElementRef;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.contentBased && this.contentBased && !this.language && isDevMode()) {
            console.warn('Provide language');
        }
    }

    ngAfterViewInit(): void {
        /** Highlight.js init */
        hljs.highlightBlock(this.codeContainerRef.nativeElement);
    }
}
