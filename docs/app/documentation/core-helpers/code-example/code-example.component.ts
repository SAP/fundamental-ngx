import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CopyService } from '../../services/copy.service';
import { ExampleFile } from './example-file';

@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements OnInit {

    /**
     * List of files to display in this code example.
     */
    @Input()
    exampleFiles: ExampleFile[] = [];

    smallScreen: boolean;

    selectedFileIndex: number = 0;

    constructor(private element: ElementRef, private copyService: CopyService) {}

    copyText(): void {
        this.copyService.copyText(this.exampleFiles[this.selectedFileIndex].code);
    }

    ngOnInit(): void {
        this.smallScreen = window.innerWidth <= 768;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.smallScreen = window.innerWidth <= 768;
    }
}
