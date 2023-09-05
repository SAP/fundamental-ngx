import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-dynamic-page-dynamic-container-height-example',
    templateUrl: './dynamic-page-dynamic-container-height-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .overlay {
                height: 100%;
                width: 100%;
                position: fixed;
                overflow: auto;
                z-index: 10;
                top: 0;
                left: 0;
                background-color: rgb(255, 255, 255);
            }
            .fd-dynamic-page-section-example {
                min-height: 20vh;
            }
            .spacing-item {
                display: block;
                height: 10vh;
            }
        `
    ],
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
        DynamicPageModule,
        NgFor,
        BreadcrumbModule,
        LinkComponent,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        CdkScrollable,
        BarModule
    ]
})
export class DynamicPageDynamicContainerHeightExampleComponent {
    visible = false;
    spacingItems: string[] = [];

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.visible = true;
    }

    closePage(): void {
        this.visible = false;
    }

    addSpace(): void {
        if (this.spacingItems.length > 1) {
            return;
        }
        this.spacingItems.push(`Spacing item ${this.spacingItems.length + 1}`);
    }
}
