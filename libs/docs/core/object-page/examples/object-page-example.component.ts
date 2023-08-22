import { Component } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { TextComponent } from '@fundamental-ngx/core/text';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-object-page-example',
    templateUrl: './object-page-example.component.html',
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
        `
    ],
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
        DynamicPageModule,
        BreadcrumbModule,
        LinkComponent,
        FacetModule,
        AvatarModule,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        FormLabelModule,
        TextComponent,
        RatingIndicatorModule,
        ObjectStatusModule,
        ObjectNumberModule,
        CdkScrollable,
        BarModule
    ]
})
export class ObjectPageExampleComponent {
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
