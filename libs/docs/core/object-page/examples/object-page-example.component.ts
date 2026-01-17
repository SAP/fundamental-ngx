import { CdkScrollable } from '@angular/cdk/scrolling';

import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectNumberComponent } from '@fundamental-ngx/core/object-number';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { TextComponent } from '@fundamental-ngx/core/text';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';

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
    imports: [
        ButtonComponent,
        DynamicPageModule,
        BreadcrumbModule,
        LinkComponent,
        FacetModule,
        AvatarComponent,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        FormLabelComponent,
        TextComponent,
        RatingIndicatorModule,
        ObjectStatusComponent,
        ObjectNumberComponent,
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
