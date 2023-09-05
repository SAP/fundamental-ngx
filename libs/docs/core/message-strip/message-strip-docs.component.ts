import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    PlayGroundComponent,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { MessageStripAlertExampleComponent } from './examples/message-strip-alert-example.component';
import { MessageStripAutoDismissExampleComponent } from './examples/message-strip-auto-dismiss-example.component';
import { MessageStripCustomIconExampleComponent } from './examples/message-strip-custom-icon-example.component';
import { MessageStripExampleComponent } from './examples/message-strip-example.component';
import { MessageStripIndicationColorsExampleComponent } from './examples/message-strip-indication-colors-example.component';
import { MessageStripNoIconExampleComponent } from './examples/message-strip-noicon-example.component';
import { MessageStripWidthExampleComponent } from './examples/message-strip-width-example.component';

const messageStripExampleScs = 'message-strip-example.component.scss';

const messageStripExampleHtml = 'message-strip-example.component.html';
const messageStripNoIconExampleHtml = 'message-strip-noicon-example.component.html';
const messageStripWidthExampleHtml = 'message-strip-width-example.component.html';

@Component({
    selector: 'app-message-strip',
    templateUrl: './message-strip-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        MessageStripExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        MessageStripCustomIconExampleComponent,
        MessageStripNoIconExampleComponent,
        MessageStripWidthExampleComponent,
        MessageStripIndicationColorsExampleComponent,
        MessageStripAlertExampleComponent,
        MessageStripAutoDismissExampleComponent,
        PlayGroundComponent,
        NgIf,
        MessageStripComponent
    ]
})
export class MessageStripDocsComponent {
    data: any = {
        properties: {
            dismissible: true,
            noIcon: false,
            width: '100%',
            message: 'This is a message strip message.'
        },
        modifier: {
            type: 'default'
        }
    };

    messageStripBasicExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: getAssetFromModuleAssets(messageStripExampleScs),
            fileName: 'message-strip-example',
            code: getAssetFromModuleAssets(messageStripExampleHtml)
        }
    ];

    messageStripNoIconExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: getAssetFromModuleAssets(messageStripExampleScs),
            fileName: 'message-strip-noicon-example',
            code: getAssetFromModuleAssets(messageStripNoIconExampleHtml)
        }
    ];

    messageStripWidthExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: getAssetFromModuleAssets(messageStripExampleScs),
            fileName: 'message-strip-width-example',
            code: getAssetFromModuleAssets(messageStripWidthExampleHtml)
        }
    ];

    messageStripCustomIconExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-strip-custom-icon-example',
            code: getAssetFromModuleAssets('message-strip-custom-icon-example.component.ts')
        }
    ];

    messageStripIndicationColorsExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-strip-indication-colors-example',
            code: getAssetFromModuleAssets('message-strip-indication-colors-example.component.ts')
        }
    ];

    messageStripAlertExampleFiles: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-strip-alert-example',
            code: getAssetFromModuleAssets('message-strip-alert-example.component.ts')
        }
    ];

    messageStripAutoDismissExampleFiles: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-strip-auto-dismiss-example',
            code: getAssetFromModuleAssets('message-strip-auto-dismiss-example.component.ts')
        }
    ];

    schema: Schema;

    /**
     * Should show message strip component in playground.
     */
    shouldShow = true;
    /**
     * @hidden
     */
    private _originalSchemaValues = Object.assign({}, this.data);

    constructor(private schemaFactory: SchemaFactoryService, private readonly _cdr: ChangeDetectorRef) {
        this.schema = this.schemaFactory.getComponent('messageStrip');
    }

    onSchemaValues(data): void {
        this.data = data;
    }

    /**
     * Resets message strip playground component and it's configuration
     */
    reset(): void {
        this.shouldShow = false;
        setTimeout(() => {
            this.data = Object.assign({}, this._originalSchemaValues);
            this.shouldShow = true;
            this._cdr.detectChanges();
        });
    }
}
