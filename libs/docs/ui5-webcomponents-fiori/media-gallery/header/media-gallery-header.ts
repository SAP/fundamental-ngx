import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-ui5-media-gallery-header2',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './media-gallery-header.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class MediaGalleryHeader {
    readonly componentName = signal<string>('MediaGallery');
    readonly packageName = signal<string>('@ui5/webcomponents-fiori');
    readonly moduleName = signal<string>('MediaGallery');
    readonly subPackage = signal<string>('media-gallery');
}
