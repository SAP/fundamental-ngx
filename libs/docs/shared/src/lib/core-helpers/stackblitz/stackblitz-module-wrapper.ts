import { StackblitzFile } from './interfaces/stackblitz-parameters';

export interface StackblitzFileObject {
    path: string;
    name: string;
}

export class StackblitzModuleWrapper {
    private static defaultModules: Array<StackblitzFileObject> = [
        { name: 'BrowserModule', path: '@angular/platform-browser' },
        { name: 'FormsModule', path: '@angular/forms' },
        { name: 'ReactiveFormsModule', path: '@angular/forms' },
        { name: 'BrowserAnimationsModule', path: '@angular/platform-browser/animations' },
        { name: 'FundamentalNgxCdkModule', path: '@fundamental-ngx/cdk' },
        { name: 'FundamentalNgxCoreModule, FdDatetimeModule', path: '@fundamental-ngx/core' },
        { name: 'FundamentalNgxPlatformModule', path: '@fundamental-ngx/platform' },
        { name: 'HttpClientModule', path: '@angular/common/http' },
        { name: 'CdkTableModule', path: '@angular/cdk/table' },
        { name: 'DragDropModule', path: '@angular/cdk/drag-drop' }
    ];

    static GetModule(tsFiles: StackblitzFile[]): string {
        const defaultImports: string = this.defaultModules.map(this.getImport).concat(['']).join(';\n');

        // Imports generated basing on passed ts files.
        const imports: string = tsFiles
            .map((file) => this.getImport({ name: file.componentName, path: './' + file.basis }))
            .concat(['']) // to generate ";\n" in the end as well
            .join(';\n');

        const moduleImports: string = this.defaultModules.map((module) => module.name).join(',\n        ');

        const declarations: string = tsFiles
            .filter((file) => !file.service)
            .map((file) => file.componentName)
            .join(',\n      ');
        const providers: string = tsFiles
            .filter((file) => file.service)
            .map((file) => file.componentName)
            .join(',\n      ');

        // Main component that will be added as a root, if there is no component with main flag, first is chosen
        let mainComponent: string;
        const _mainComponent = tsFiles.find((file) => file.main);
        if (_mainComponent) {
            mainComponent = _mainComponent.componentName;
        } else {
            mainComponent = tsFiles[0].componentName;
        }

        const entryComponents: string = tsFiles
            .filter((file) => file.entryComponent)
            .map((file) => file.componentName)
            .join(',\n      ');

        return `
import { NgModule } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
${defaultImports}
${imports}

@NgModule({
    declarations: [
        ${declarations}
    ],
    imports: [
        ${moduleImports}
    ],
    providers: [
        RtlService,
        ${providers}
    ],
    entryComponents: [
        ${entryComponents}
    ],
    bootstrap: [
        ${mainComponent}
    ]
})
export class AppModule {}
`;
    }

    private static getImport(file: StackblitzFileObject): string {
        return `import { ${file.name} } from '${file.path}'`;
    }
}
