import { Component } from '@angular/core';

import * as standardH from '!raw-loader!./examples/scroll-spy-example/scroll-spy-example.component.html';
import * as standardT from '!raw-loader!./examples/scroll-spy-example/scroll-spy-example.component.ts';

@Component({
    selector: 'app-scroll-spy-docs',
    templateUrl: './scroll-spy-docs.component.html',
    styleUrls: ['./scroll-spy-docs.component.scss']
})
export class ScrollSpyDocsComponent {

    scrollSpyHtml = standardH;
    scrollSpyTs = standardT;
}
