import { ContentChildren, Directive, ElementRef, HostBinding, QueryList } from '@angular/core';
import { ObjectMarkerComponent } from '@fundamental-ngx/core/object-marker';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-thumbnail]',
    host: { class: 'fd-upload-collection__thumbnail' }
})
export class UploadCollectionThumbnailDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-title]',
    host: { class: 'fd-upload-collection__title' }
})
export class UploadCollectionTitleDirective {
    constructor(public elRef: ElementRef) {}
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-description]',
    host: { class: 'fd-upload-collection__description' }
})
export class UploadCollectionDescriptionDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-text-separator], fd-upload-collection-text-separator',
    host: { class: 'fd-upload-collection__text-separator' }
})
export class UploadCollectionTextSeparatorDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-status-group]',
    host: { class: 'fd-upload-collection__status-group' }
})
export class UploadCollectionStatusGroupDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-title-container]'
})
export class UploadCollectionTitleContainerDirective {
    /** @hidden */
    @ContentChildren(ObjectMarkerComponent)
    _objectMarkerComponents: QueryList<ObjectMarkerComponent>;

    /** Whether or not this is in edit mode. */
    @HostBinding('class.fd-upload-collection__title-container')
    applyContainerClass = true;
}
