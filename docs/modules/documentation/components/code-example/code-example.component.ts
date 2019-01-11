import { Component, ElementRef, Input } from '@angular/core';
import { CopyService } from '../../services/copy.service';

@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent {
    @Input() code: string;
    @Input() language: string;

    constructor(private element: ElementRef, private copyService: CopyService) {}

    copyText(): void {
        this.copyService.copyText(this.code);
    }
}
