import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { CopyService } from '../../services/copy.service';
import { ExampleFile } from './example-file';
import { height } from '../../utilities';
import { StackblitzService } from '../stackblitz/stackblitz.service';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { isObservable, Observable, of, ReplaySubject, shareReplay, switchMap, tap, zip } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { MessageStripAlertService } from '@fundamental-ngx/core/message-strip';

enum ExampleEntityState {
    loading,
    success,
    error
}

interface ExamplesEntity {
    state: ExampleEntityState;
    exampleFiles: ExampleFile<string>[];
}

@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [height({ time: 200 })],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeExampleComponent implements OnInit {
    @ViewChildren(CodeSnippetComponent)
    codeElements: QueryList<ElementRef>;

    /**
     * List of files to display in this code example.
     */
    @Input() set exampleFiles(files: ExampleFile[]) {
        this._displayedFiles.next(files);
    }

    exampleFilesNetworkEntity$: Observable<ExamplesEntity>;
    states = ExampleEntityState;
    /**
     * @hidden
     */
    _displayedFiles: ReplaySubject<ExampleFile[]> = new ReplaySubject<ExampleFile[]>(1);
    _exampleFiles: ExampleFile<string, string, string>[];
    isOpen = false;

    smallScreen: boolean;

    activeIndex = 0;

    constructor(
        private element: ElementRef,
        private copyService: CopyService,
        private messageStripAlertService: MessageStripAlertService,
        private stackBlitzService: StackblitzService
    ) {
        this.exampleFilesNetworkEntity$ = this._displayedFiles.pipe(
            switchMap((exampleFiles: ExampleFile[]) =>
                zip(
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
                    ),
                    tap(({ exampleFiles: loadedFiles }) => (this._exampleFiles = loadedFiles))
                )
            ),
            shareReplay(1)
        );
    }

    openStackBlitz(): void {
        this.stackBlitzService.openCode(this._exampleFiles);
    }

    get expandIcon(): string {
        return this.isOpen ? 'navigation-up-arrow' : 'navigation-down-arrow';
    }

    copyText(): void {
        this.copyService.copyText(this._exampleFiles[this.activeIndex].code);
        this.messageStripAlertService.open({
            content: 'Code copied!',
            messageStrip: { type: 'success', duration: 5000, mousePersist: true }
        });
    }

    ngOnInit(): void {
        this.smallScreen = window.innerWidth <= 768;
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.smallScreen = window.innerWidth <= 768;
    }

    // toggleCodeVisibility(): void {
    //     (async () => {
    //         const exampleFiles: ExampleFile<string>[] = [];
    //         for (const file of this._displayedFiles) {
    //             if (typeof file.code !== 'string') {
    //                 file.code = await file.code;
    //             }
    //             exampleFiles.push(file as ExampleFile<string>);
    //         }
    //         this._exampleFiles = exampleFiles;
    //         const scssExamples: ExampleFile<string>[] = [];
    //         for (const file of this._exampleFiles) {
    //             if (file.scssFileCode) {
    //                 scssExamples.push({
    //                     code: typeof file.scssFileCode === 'string' ? file.scssFileCode : await file.scssFileCode,
    //                     language: 'scss',
    //                     name: 'Scss'
    //                 });
    //             }
    //         }
    //
    //         this._displayedFiles = this._exampleFiles.concat(scssExamples);
    //         this.isOpen = !this.isOpen;
    //     })();
    // }
}
