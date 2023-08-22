import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListModule } from '@fundamental-ngx/core/list';
import { CardModule } from '@fundamental-ngx/core/card';
import { CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-carousel-auto-slides-example',
    templateUrl: './carousel-auto-slides-example.component.html',
    styleUrls: ['./carousel-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
        ToolbarComponent,
        ToolbarLabelDirective,
        ToolbarSpacerDirective,
        ToolbarItemDirective,
        ContentDensityDirective,
        CarouselComponent,
        CarouselItemComponent,
        CardModule,
        ListModule
    ]
})
export class CarouselAutoSlidesExampleComponent {
    visible = false;

    openPage(): void {
        this.visible = true;
    }

    closePage(): void {
        this.visible = false;
    }
}
