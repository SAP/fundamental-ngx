import { Component } from '@angular/core';

import * as loadingSpinnerHtml from '!raw-loader!./examples/loading-spinner-example.component.html';
import * as loadingSpinnerContainerHtml from '!raw-loader!./examples/loading-spinner-container-example.component.html';

@Component({
  selector: 'app-loading-spinner-docs',
  templateUrl: './loading-spinner-docs.component.html',
  styleUrls: ['./loading-spinner-docs.component.scss']
})
export class LoadingSpinnerDocsComponent {

    loadingSpinnerExampleHtml = loadingSpinnerHtml;

    loadingSpinnerContainerExampleHtml = loadingSpinnerContainerHtml;

}
