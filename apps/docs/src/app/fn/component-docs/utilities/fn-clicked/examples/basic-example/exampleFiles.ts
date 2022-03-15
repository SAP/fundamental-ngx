import { ExampleFile } from '../../../../../../documentation/core-helpers/code-example/example-file';
import defaultExampleHtml from '!./basic-example.component.html?raw';
import defaultExampleTs from '!./basic-example.component.ts?raw';

export default [
    {
        code: defaultExampleHtml,
        language: 'html',
        fileName: 'fn-clicked-basic-example',
        component: 'FnClickedBasicExample'
    },
    {
        code: defaultExampleTs,
        language: 'ts',
        fileName: 'fn-clicked-basic-example',
        component: 'FnClickedBasicExample'
    }
] as ExampleFile[];
