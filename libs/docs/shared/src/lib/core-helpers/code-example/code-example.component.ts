import { TitleCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    input,
    signal,
    viewChildren
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageStripAlertService, MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { FDP_ICON_TAB_BAR } from '@fundamental-ngx/platform/icon-tab-bar';
import { isObservable, of, shareReplay, switchMap, zip } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CopyService } from '../../services/copy.service';
import { height } from '../../utilities';
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
    animations: [height({ time: 200 })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        BusyIndicatorComponent,
        MessageStripComponent,
        FDP_ICON_TAB_BAR,
        CodeSnippetComponent,
        TitleCasePipe
    ]
})
export class CodeExampleComponent {
    // Modern viewChildren query with signals
    readonly codeElements = viewChildren(CodeSnippetComponent, { read: ElementRef });

    /**
     * List of files to display in this code example.
     */
    readonly exampleFiles = input<ExampleFile[]>([]);

    // State signals
    readonly states = ExampleEntityState;
    readonly isOpen = signal(false);
    readonly smallScreen = signal(false); // Initialize with false, will be set correctly in effect
    readonly activeIndex = signal(0);

    // Computed signals
    readonly expandIcon = computed(() => (this.isOpen() ? 'navigation-up-arrow' : 'navigation-down-arrow'));

    // Convert observable to signal for template
    readonly exampleFilesNetworkEntity = toSignal(
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

    // Services
    private readonly copyService = inject(CopyService);
    private readonly messageStripAlertService = inject(MessageStripAlertService);
    private readonly stackBlitzService = inject(StackblitzService);

    constructor() {
        // Listen to window resize with effect (zoneless-compatible)
        if (typeof window !== 'undefined') {
            effect((onCleanup): void => {
                const handleResize = (): void => this.smallScreen.set(window.innerWidth <= 768);

                // Set initial value on effect initialization
                handleResize();

                // Signal updates automatically trigger change detection in both zone and zoneless modes
                window.addEventListener('resize', handleResize);
                onCleanup(() => window.removeEventListener('resize', handleResize));
            });
        }
    }

    openStackBlitz(): void {
        const entity = this.exampleFilesNetworkEntity();
        if (entity?.exampleFiles) {
            this.stackBlitzService.openCode(entity.exampleFiles);
        }
    }

    copyText(): void {
        const entity = this.exampleFilesNetworkEntity();
        const index = this.activeIndex();
        if (entity?.exampleFiles?.[index]) {
            this.copyService.copyText(entity.exampleFiles[index].code);
            this.messageStripAlertService.open({
                content: 'Code copied!',
                messageStrip: { type: 'success', duration: 5000, mousePersist: true }
            });
        }
    }
}
