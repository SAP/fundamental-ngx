import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    Input,
    isDevMode,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ExampleFile } from '../code-example/example-file';
import hljs from 'highlight.js';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, isObservable, merge, of, Subject, takeUntil } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'fd-code-snippet',
    styles: ['.bordered { border: 1px solid beige } code.hljs { width: 100%; background: transparent; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService],
    template: `
        <pre [class.bordered]="standAlone">
            <code class="hljs" [class]="file.language" *ngIf="file" [innerHTML]="_highlightedCode | async"></code>
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

    @ViewChild('contentBasedElement', { read: ElementRef })
    contentBasedElementRef: ElementRef;

    _highlightedCode = new BehaviorSubject<SafeHtml | null>(null);

    private _refresh$ = new Subject<void>();

    private readonly _destroy$ = inject(DestroyedService);

    private readonly _sanitizer = inject(DomSanitizer);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.contentBased && this.contentBased && !this.language && isDevMode()) {
            console.warn('Provide language');
        }

        if ('file' in changes) {
            this._listenToFileCode();
        }
    }

    ngAfterViewInit(): void {
        if (!this.contentBased) {
            return;
        }
        /** Highlight.js init */
        hljs.highlightElement(this.contentBasedElementRef.nativeElement);
    }

    private _listenToFileCode(): void {
        this._refresh$.next();
        this._refresh$.complete();

        this._refresh$ = new Subject<void>();

        const code$ = isObservable(this.file.code) ? this.file.code : of(this.file.code);

        code$.pipe(takeUntil(merge(this._refresh$, this._destroy$))).subscribe((code) => {
            this._highlightedCode.next(
                this._sanitizer.bypassSecurityTrustHtml(
                    hljs.highlight(code, {
                        language: this.file.language
                    }).value
                )
            );
        });
    }
}
