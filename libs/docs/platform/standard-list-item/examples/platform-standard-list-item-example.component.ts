import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-standard-list-item-example',
    templateUrl: './platform-standard-list-item-example.component.html',
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformStandardListItemExampleComponent {}

@Component({
    selector: 'fdp-non-byline-standard-list-item-example',
    templateUrl: './platform-non-byline-standard-list-item-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformNonByLineStandardListItemExampleComponent {}

@Component({
    selector: 'fdp-standard-list-item-with-secondary-type-example',
    templateUrl: './platform-standard-list-item-with-secondary-type-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformStandardListItemWithSecondaryTypeExampleComponent {}

@Component({
    selector: '<fdp-standard-list-item-with-inverted-secondary-type-example>',
    templateUrl: './platform-standard-list-item-with-inverted-secondary-type-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent {}

@Component({
    selector: 'fdp-standard-list-item-with-group-header-example',
    templateUrl: './platform-standard-list-item-with-group-header-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformStandardListItemtWithGroupHeaderExampleComponent {}
