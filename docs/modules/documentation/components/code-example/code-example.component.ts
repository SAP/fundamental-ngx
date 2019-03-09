import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CopyService } from '../../services/copy.service';

@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements OnInit {
    @Input() code: string;
    @Input() language: string;
    @Input() showCode: boolean = false;

    smallScreen: boolean;

    constructor(private element: ElementRef, private copyService: CopyService) {}

    copyText(): void {
        this.copyService.copyText(this.code);
    }

    toggleCode() {
        this.showCode = !this.showCode;
    }

    ngOnInit() {
        this.smallScreen = window.innerWidth <= 768;
    }
}
