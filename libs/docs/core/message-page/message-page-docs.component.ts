import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const messagePageFilterExample = 'message-page-filter-example.component.html';
const messagePageSearchExample = 'message-page-search-example.component.html';
const messagePageNoItemsExample = 'message-page-no-items-example.component.html';
const messagePageErrorExample = 'message-page-error-example.component.html';
const messagePageActionsExample = 'message-page-actions-example.component.html';
const messagePageCustomIconExample = 'message-page-custom-icon-example.component.html';
const messagePageNoIconExample = 'message-page-no-icon-example.component.html';

@Component({
    selector: 'app-message-page',
    templateUrl: './message-page-docs.component.html'
})
export class MessagePageDocsComponent {
    messagePageFilterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-filter-example',
            code: getAssetFromModuleAssets(messagePageFilterExample)
        }
    ];

    messagePageSearchExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-search-example',
            code: getAssetFromModuleAssets(messagePageSearchExample)
        }
    ];

    messagePageNoItemsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-no-items-example',
            code: getAssetFromModuleAssets(messagePageNoItemsExample)
        }
    ];

    messagePageErrorExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-error-example',
            code: getAssetFromModuleAssets(messagePageErrorExample)
        }
    ];

    messagePageActionsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-actions-example',
            code: getAssetFromModuleAssets(messagePageActionsExample)
        }
    ];

    messagePageCustomIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-custom-icon-example',
            code: getAssetFromModuleAssets(messagePageCustomIconExample)
        }
    ];

    messagePageNoIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-no-icon-example',
            code: getAssetFromModuleAssets(messagePageNoIconExample)
        }
    ];
}
