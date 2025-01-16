import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-example',
    templateUrl: './platform-list-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListExampleComponent {}

@Component({
    selector: 'fdp-platform-list-with-nodata-example',
    templateUrl: './platform-list-with-nodata-example.component.html',
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformListWithNoDataExampleComponent {}

@Component({
    selector: 'fdp-platform-list-with-unread-example',
    templateUrl: './platform-list-with-unread-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListWithUnReadExampleComponent {}

@Component({
    selector: 'fdp-platform-list-with-group-header-example',
    templateUrl: './platform-list-with-group-header-example.component.html',
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformListWithGroupHeaderExampleComponent {}
