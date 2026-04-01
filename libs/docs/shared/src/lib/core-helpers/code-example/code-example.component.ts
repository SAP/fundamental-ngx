import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageStripAlertService, MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { FDP_ICON_TAB_BAR } from '@fundamental-ngx/platform/icon-tab-bar';
import { isObservable, of, shareReplay, switchMap, zip } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { StackblitzService } from '../stackblitz/stackblitz.service';
import { ExampleFile } from './example-file';

enum ExampleEntityState {
    loading,
    success,
    error
}

@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        BusyIndicatorComponent,
        MessageStripComponent,
        FDP_ICON_TAB_BAR,
        CodeSnippetComponent,
        TitleCasePipe
    ],
    host: {
        '(keydown)': '_onKeydown($event)'
    }
})
export class CodeExampleComponent {
    /**
     * List of files to display in this code example.
     */
    readonly exampleFiles = input<ExampleFile[]>([]);

    // Expose enum for template
    protected readonly states = ExampleEntityState;

    // State signals
    protected readonly isOpen = signal(false);
    protected readonly activeIndex = signal(0);

    // Computed signals
    protected readonly expandIcon = computed(() => (this.isOpen() ? 'navigation-up-arrow' : 'navigation-down-arrow'));

    protected readonly canOpenStackBlitz = computed(() =>
        this.exampleFiles().some((f) => f.language === 'typescript' && f.component)
    );

    // Convert observable to signal for template
    protected readonly exampleFilesNetworkEntity = toSignal(
        toObservable(this.exampleFiles).pipe(
            switchMap((exampleFiles) => {
                if (!exampleFiles || exampleFiles.length === 0) {
                    return of({ state: ExampleEntityState.loading, exampleFiles: [] });
                }

                return zip(
                    exampleFiles.map((exampleFile) =>
                        zip([
                            isObservable(exampleFile.code) ? exampleFile.code : of(exampleFile.code),
                            isObservable(exampleFile.scssFileCode)
                                ? exampleFile.scssFileCode
                                : of(exampleFile.scssFileCode),
                            isObservable(exampleFile.typescriptFileCode)
                                ? exampleFile.typescriptFileCode
                                : of(exampleFile.typescriptFileCode)
                        ])
                    )
                ).pipe(
                    map((exampleFilesCodes: Array<[string, string | undefined, string | undefined]>) => {
                        const exampleFilesWithCode: ExampleFile<string, string, string>[] = exampleFiles.map(
                            (exampleFile, index) => {
                                const [code, scssFileCode, typescriptFileCode] = exampleFilesCodes[index];
                                return {
                                    ...exampleFile,
                                    code,
                                    scssFileCode,
                                    typescriptFileCode
                                };
                            }
                        );
                        return {
                            state: ExampleEntityState.success,
                            exampleFiles: exampleFilesWithCode
                        };
                    }),
                    startWith({
                        state: ExampleEntityState.loading,
                        exampleFiles: []
                    }),
                    catchError(() =>
                        of({
                            state: ExampleEntityState.error,
                            exampleFiles: []
                        })
                    )
                );
            }),
            shareReplay(1)
        ),
        { initialValue: { state: ExampleEntityState.loading, exampleFiles: [] } }
    );

    protected readonly isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.userAgent);

    // Services
    private readonly _messageStripAlertService = inject(MessageStripAlertService);
    private readonly _stackBlitzService = inject(StackblitzService);

    protected toggle(): void {
        const opening = !this.isOpen();
        this.isOpen.set(opening);
        if (!opening) {
            this.activeIndex.set(0);
        }
    }

    protected openStackBlitz(): void {
        const entity = this.exampleFilesNetworkEntity();
        if (entity?.exampleFiles) {
            this._stackBlitzService.openCode(entity.exampleFiles);
        }
    }

    protected copyText(): void {
        const entity = this.exampleFilesNetworkEntity();
        const index = this.activeIndex();
        if (entity?.exampleFiles?.[index]) {
            this._copyToClipboard(entity.exampleFiles[index].code);
        }
    }

    /** @hidden */
    protected _onKeydown(event: KeyboardEvent): void {
        if (!this.isOpen()) {
            return;
        }
        const isCopy = (event.ctrlKey || event.metaKey) && event.key === 'c';
        if (isCopy && !window.getSelection()?.toString()) {
            event.preventDefault();
            this.copyText();
        }
    }

    /** @hidden Track scroll position to show/hide bottom fade gradient. */
    protected _onSnippetScroll(event: Event): void {
        const el = event.target as HTMLElement;
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 2;
        el.classList.toggle('docs-code-snippet-wrapper--at-bottom', atBottom);
    }

    private _copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text).then(
            () => {
                this._messageStripAlertService.open({
                    content: 'Code copied!',
                    messageStrip: { type: 'success', duration: 5000, mousePersist: true }
                });
            },
            () => {
                this._messageStripAlertService.open({
                    content: 'Failed to copy code.',
                    messageStrip: { type: 'error', duration: 5000, mousePersist: true }
                });
            }
        );
    }
}
