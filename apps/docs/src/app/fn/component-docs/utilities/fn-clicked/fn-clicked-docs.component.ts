import { Component } from '@angular/core';
import basicExampleFiles from './examples/basic-example/exampleFiles';
import providerExampleFiles from './examples/provider-example/exampleFiles';

@Component({
    templateUrl: './fn-clicked-docs.component.html'
})
export class FnClickedDocsComponent {
    basicExample = basicExampleFiles;
    providerExample = providerExampleFiles;
}
