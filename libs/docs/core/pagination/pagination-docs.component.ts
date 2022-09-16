import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const paginationSrc = 'pagination-example.component.ts';

const paginationShowingSrc = 'pagination-showing-example.component.ts';

const paginationPerPageHtml = 'pagination-per-page/pagination-per-page-example.component.html';
const paginationPerPageTs = 'pagination-per-page/pagination-per-page-example.component.ts';

const paginationMobileHtml = 'pagination-mobile/pagination-mobile-example.component.html';
const paginationMobileTs = 'pagination-mobile/pagination-mobile-example.component.ts';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination-docs.component.html'
})
export class PaginationDocsComponent {
    schema: Schema;

    data: any = {
        properties: {
            totalItems: 70,
            itemsPerPage: 2,
            currentPage: 5,
            mobile: false
        }
    };

    paginationBasic: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(paginationSrc),
            fileName: 'pagination-example',
            component: 'PaginationExampleComponent'
        }
    ];

    paginationShowing: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(paginationShowingSrc),
            fileName: 'pagination-showing-example',
            component: 'PaginationShowingExampleComponent'
        }
    ];

    paginationPerPageSrc: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(paginationPerPageHtml),
            fileName: 'pagination-per-page-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(paginationPerPageTs),
            fileName: 'pagination-per-page-example',
            component: 'PaginationPerPageExampleComponent'
        }
    ];

    paginationMobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(paginationMobileHtml),
            fileName: 'pagination-mobile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(paginationMobileTs),
            fileName: 'pagination-mobile-example',
            component: 'PaginationMobileExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('pagination');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
