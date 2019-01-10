import { Component, ElementRef, Input } from '@angular/core';
import { CopyService } from '../../services/copy.service';

@Component({
    selector: 'html-example',
    templateUrl: './html-example.component.html',
    styleUrls: ['./html-example.component.scss']
})
export class HtmlExampleComponent {
    @Input() html: string;

    constructor(private element: ElementRef, private copyService: CopyService) {}

    copyText(): void {
        this.copyService.copyText(this.html);
    }
}
