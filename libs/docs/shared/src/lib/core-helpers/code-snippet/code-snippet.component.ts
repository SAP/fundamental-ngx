import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    effect,
    ElementRef,
    inject,
    input,
    isDevMode,
    signal,
    viewChild
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { isObservable } from 'rxjs';
import { ExampleFile } from '../code-example/example-file';

@Component({
    selector: 'fd-code-snippet',
    styles: [
        'pre { border: 1px solid var(--sapList_BorderColor); } code.hljs { width: 100%; background: transparent; }'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <pre>
  @if (file(); as currentFile) {
    <code class="hljs" [class]="currentFile.language" [innerHTML]="highlightedCode()"></code>
  } @else {
    <code #contentBasedElement class="hljs" [class]="language()"><ng-content></ng-content></code>
  }
</pre>
    `
})
export class CodeSnippetComponent {
    readonly file = input<ExampleFile>();
    readonly language = input<string>('');

    protected readonly contentBasedElementRef = viewChild<ElementRef<HTMLElement>>('contentBasedElement');
    protected readonly highlightedCode = signal<SafeHtml | null>(null);

    private readonly _sanitizer = inject(DomSanitizer);

    constructor() {
        // Warn if content-based mode is used without language (dev mode only)
        if (isDevMode()) {
            effect(() => {
                if (!this.file() && !this.language()) {
                    console.warn('[CodeSnippetComponent] Language is required when using content-based mode');
                }
            });
        }

        // React to file changes and update highlighted code
        effect(
            (onCleanup) => {
                const file = this.file();
                if (!file) {
                    this.highlightedCode.set(null);
                    return;
                }

                if (isObservable(file.code)) {
                    // Handle observable code with proper cleanup
                    const subscription = file.code.subscribe((code) => {
                        this.highlightedCode.set(this._highlight(code, file.language));
                    });
                    onCleanup(() => subscription.unsubscribe());
                } else {
                    // Handle static code directly
                    this.highlightedCode.set(this._highlight(file.code, file.language));
                }
            },
            { allowSignalWrites: true }
        );

        // Handle content-based highlighting after view is ready
        afterNextRender(() => {
            const elementRef = this.contentBasedElementRef();
            if (!this.file() && elementRef?.nativeElement) {
                hljs.highlightElement(elementRef.nativeElement);
            }
        });
    }

    private _highlight(code: string, language: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(hljs.highlight(code, { language }).value);
    }
}
