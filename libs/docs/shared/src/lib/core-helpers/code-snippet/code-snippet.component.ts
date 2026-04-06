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
        `
            :host {
                display: block;
            }
            .docs-code-snippet {
                display: flex;
                overflow-x: auto;
            }
            .docs-code-gutter {
                flex-shrink: 0;
                padding: 1rem 0;
                text-align: right;
                user-select: none;
                color: var(--sapNeutralTextColor, #6a6d70);
                opacity: 0.5;
                font-size: 0.8125rem;
                line-height: 1.42857143;
                border-right: 0.0625rem solid var(--sapGroup_ContentBorderColor);
            }
            .docs-code-gutter span {
                display: block;
                padding: 0 0.75rem;
                min-height: 1.25em;
            }
            pre {
                margin: 0;
                flex: 1;
                min-width: 0;
            }
            code.hljs {
                width: 100%;
                background: transparent;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="docs-code-snippet">
            @if (lineCount() > 0) {
                <div class="docs-code-gutter" aria-hidden="true">
                    @for (n of lineNumbers(); track n) {
                        <span>{{ n }}</span>
                    }
                </div>
            }
            <pre>
@if (file(); as currentFile) {<code class="hljs" [class]="currentFile.language" [innerHTML]="highlightedCode()"></code>} @else {<code #contentBasedElement class="hljs" [class]="language()"><ng-content></ng-content></code>}
</pre>
        </div>
    `
})
export class CodeSnippetComponent {
    readonly file = input<ExampleFile>();
    readonly language = input<string>('');

    protected readonly contentBasedElementRef = viewChild<ElementRef<HTMLElement>>('contentBasedElement');
    protected readonly highlightedCode = signal<SafeHtml | null>(null);
    protected readonly lineCount = signal(0);
    protected readonly lineNumbers = signal<number[]>([]);

    private readonly _sanitizer = inject(DomSanitizer);

    constructor() {
        if (isDevMode()) {
            effect(() => {
                if (!this.file() && !this.language()) {
                    console.warn('[CodeSnippetComponent] Language is required when using content-based mode');
                }
            });
        }

        effect((onCleanup) => {
            const file = this.file();
            if (!file) {
                this.highlightedCode.set(null);
                this.lineCount.set(0);
                this.lineNumbers.set([]);
                return;
            }

            if (isObservable(file.code)) {
                const subscription = file.code.subscribe((code) => {
                    this._setHighlighted(code, file.language);
                });
                onCleanup(() => subscription.unsubscribe());
            } else {
                this._setHighlighted(file.code, file.language);
            }
        });

        afterNextRender(() => {
            const elementRef = this.contentBasedElementRef();
            if (!this.file() && elementRef?.nativeElement) {
                hljs.highlightElement(elementRef.nativeElement);
            }
        });
    }

    private _setHighlighted(code: string, language: string): void {
        const highlighted = hljs.highlight(code, { language }).value;
        this.highlightedCode.set(this._sanitizer.bypassSecurityTrustHtml(highlighted));
        const count = code.split('\n').length;
        this.lineCount.set(count);
        this.lineNumbers.set(Array.from({ length: count }, (_, i) => i + 1));
    }
}
