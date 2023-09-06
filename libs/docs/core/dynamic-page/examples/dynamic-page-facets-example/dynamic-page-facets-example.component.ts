import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    DynamicPageHeaderSubtitleDirective,
    DynamicPageHeaderTitleDirective,
    DynamicPageModule
} from '@fundamental-ngx/core/dynamic-page';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { TextComponent } from '@fundamental-ngx/core/text';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-dynamic-page-facets-example',
    templateUrl: './dynamic-page-facets-example.component.html',
    styles: [
        `
            .overlay {
                height: 100%;
                width: 100%;
                position: fixed;
                z-index: 10;
                top: 0;
                left: 0;
                background-color: rgb(255, 255, 255);
            }
            .fd-dynamic-page-section-example {
                min-height: 20vh;
            }
            .red-subtitle {
                color: red;
            }
            .blue-subtitle {
                color: blue;
            }
            .green-subtitle {
                color: green;
            }
        `
    ],
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
        DynamicPageModule,
        DynamicPageHeaderTitleDirective,
        DynamicPageHeaderSubtitleDirective,
        BreadcrumbModule,
        LinkComponent,
        FacetModule,
        AvatarModule,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        FormLabelComponent,
        TextComponent,
        RatingIndicatorModule,
        ObjectStatusModule,
        ObjectNumberModule,
        CdkScrollable,
        BarModule
    ]
})
export class DynamicPageFacetsExampleComponent {
    visible = false;

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.visible = true;
    }

    closePage(): void {
        this.visible = false;
    }
}
