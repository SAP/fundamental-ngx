import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    isDevMode,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ExampleFile } from '../code-example/example-file';
import hljs from 'highlight.js';

@Component({
    selector: 'fd-code-snippet',
    styles: ['.bordered { border: 1px solid beige } code.hljs { width: 100%; background: transparent; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <pre [class.bordered]="standAlone">
            <code #fileBasedElement class="hljs" [class]="file.language" *ngIf="file">{{ file.code }}</code>
            <code #contentBasedElement class="hljs" [class]="language" *ngIf="contentBased"><ng-content></ng-content></code>
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

    @ViewChild('fileBasedElement', { read: ElementRef })
    fileBasedElementRef: ElementRef;

    @ViewChild('contentBasedElement', { read: ElementRef })
    contentBasedElementRef: ElementRef;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.contentBased && this.contentBased && !this.language && isDevMode()) {
            console.warn('Provide language');
        }
    }

    ngAfterViewInit(): void {
        /** Highlight.js init */
        const elementRef = this.fileBasedElementRef || this.contentBasedElementRef;
        hljs.highlightElement(elementRef.nativeElement);
    }
}
