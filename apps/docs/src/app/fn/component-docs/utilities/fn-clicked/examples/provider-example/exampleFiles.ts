import { ExampleFile } from '../../../../../../documentation/core-helpers/code-example/example-file';
import providerExampleHtml from '!./provider-example.component.html?raw';
import providerExampleTs from '!./provider-example.component.ts?raw';
import providerExampleDirectiveTs from '!./usage-with-provider.directive.ts?raw';

export default [
    {
        code: providerExampleHtml,
        language: 'html',
        fileName: 'fn-clicked-provider-example',
        component: 'FnClickedProviderExample'
    },
    {
        code: providerExampleTs,
        language: 'ts',
        fileName: 'fn-clicked-provider-example',
        component: 'FnClickedProviderExample'
    },
    {
        code: providerExampleDirectiveTs,
        language: 'ts',
        fileName: 'fn-clicked-provider-directive-example',
        component: 'FnClickedProviderDirectiveExample'
    }
] as ExampleFile[];
