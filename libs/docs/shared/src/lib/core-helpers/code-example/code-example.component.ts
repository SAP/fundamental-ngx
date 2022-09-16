import {
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
import { AlertConfig, AlertService } from '@fundamental-ngx/core/alert';
import { StackblitzService } from '../stackblitz/stackblitz.service';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';

@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [height({ time: 200 })]
})
export class CodeExampleComponent implements OnInit {
    @ViewChildren(CodeSnippetComponent)
    codeElements: QueryList<ElementRef>;

    /**
     * List of files to display in this code example.
     */
    @Input() set exampleFiles(files: ExampleFile[]) {
        (async () => {
            const exampleFiles: ExampleFile<string>[] = [];
            for (const file of files) {
                if (typeof file.code !== 'string') {
                    file.code = await file.code;
                }
                exampleFiles.push(file as ExampleFile<string>);
            }
            this._exampleFiles = exampleFiles;
            const scssExamples: ExampleFile<string>[] = [];
            for (const file of this._exampleFiles) {
                if (file.scssFileCode) {
                    scssExamples.push({
                        code: typeof file.scssFileCode === 'string' ? file.scssFileCode : await file.scssFileCode,
                        language: 'scss',
                        name: 'Scss'
                    });
                }
            }

            this._displayedFiles = this._exampleFiles.concat(scssExamples);
        })();
    }

    /**
     * @hidden
     */
    _displayedFiles: ExampleFile[] = [];
    _exampleFiles: ExampleFile<string>[];
    isOpen = false;

    smallScreen: boolean;

    activeIndex = 0;

    constructor(
        private element: ElementRef,
        private copyService: CopyService,
        private alertService: AlertService,
        private stackBlitzService: StackblitzService
    ) {}

    async openStackBlitz(): Promise<void> {
        await this.stackBlitzService.openCode(this._exampleFiles);
    }

    get expandIcon(): string {
        return this.isOpen ? 'navigation-up-arrow' : 'navigation-down-arrow';
    }

    copyText(): void {
        this.copyService.copyText(this._exampleFiles[this.activeIndex].code);
        this.alertService.open('Code copied!', { type: 'success', duration: 5000 } as AlertConfig);
    }

    ngOnInit(): void {
        this.smallScreen = window.innerWidth <= 768;
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.smallScreen = window.innerWidth <= 768;
    }
}
