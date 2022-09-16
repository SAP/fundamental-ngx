import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AlertComponent } from '@fundamental-ngx/core/alert';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import { ExampleFile, getAssetFromModuleAssets, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-alert',
    templateUrl: './alert-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDocsComponent implements AfterViewInit {
    shouldShow = true;

    data: any = {
        properties: {
            dismissible: true,
            width: '100%',
            message: 'This is an alert message.',
            duration: 10000,
            mousePersist: true
        },
        modifier: {
            type: 'default'
        }
    };

    alertBasicExample: ExampleFile[] = [
        getExampleFile('alert-example.component.html', {
            scssFileCode: getAssetFromModuleAssets('alert-example.component.scss')
        })
    ];

    alertComponentContentExample: ExampleFile[] = [
        getExampleFile('alert-component-as-content-example.component.html', {
            scssFileCode: getAssetFromModuleAssets('alert-component-as-content-example.component.scss')
        }),
        getExampleFile('alert-component-as-content-example.component.ts', {
            component: 'AlertComponentAsContentExampleComponent',
            entryComponent: true,
            name: 'Main Component',
            main: true
        }),
        getExampleFile('alert-content.component.ts', {
            component: 'AlertContentComponent',
            name: 'Content Component',
            entryComponent: true
        })
    ];

    alertInlineExample: ExampleFile[] = [
        getExampleFile('alert-inline-example.component.html', {
            scssFileCode: getAssetFromModuleAssets('alert-inline-example.component.scss')
        }),
        getExampleFile('alert-inline-example.component.ts', {
            component: 'AlertInlineExampleComponent'
        })
    ];

    alertWidthExample: ExampleFile[] = [
        getExampleFile('alert-width-example.component.html', {
            scssFileCode: getAssetFromModuleAssets('alert-width-example.component.scss')
        }),
        getExampleFile('alert-width-example.component.ts', {
            component: 'AlertWidthExampleComponent'
        })
    ];

    schema: Schema;

    @ViewChild('alert')
    alertComponent: AlertComponent;

    constructor(private _changeDetectorRef: ChangeDetectorRef, private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('alert');
    }

    onSchemaValues(data): void {
        this.data = data;
    }

    /** opens alert */
    openDynamicAlert(): void {
        this.shouldShow = true;
        this._changeDetectorRef.detectChanges();
        this.alertComponent.open();
    }

    onAlertDismiss(): void {
        this.shouldShow = false;
    }

    ngAfterViewInit(): void {
        this.openDynamicAlert();
    }
}
