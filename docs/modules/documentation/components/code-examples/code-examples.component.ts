import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CopyService } from '../../services/copy.service';

@Component({
    selector: 'code-examples',
    templateUrl: './code-examples.component.html',
    styleUrls: ['./code-examples.component.scss']
})
export class CodeExamplesComponent implements OnInit {
    smallScreen: boolean;
    ngOnInit() {
        this.smallScreen = window.innerWidth <= 768;
    }
}
