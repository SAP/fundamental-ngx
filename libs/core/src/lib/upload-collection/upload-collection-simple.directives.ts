import { ContentChildren, Directive, ElementRef, HostBinding, QueryList } from '@angular/core';
import { ObjectMarkerComponent } from '@fundamental-ngx/core/object-marker';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-thumbnail]',
    host: { class: 'fd-upload-collection__thumbnail' }
})
export class UploadCollectionThumbnailDirective {}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-title]',
    host: { class: 'fd-upload-collection__title' }
})
export class UploadCollectionTitleDirective {
    constructor(public elRef: ElementRef) {}
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-description]',
    host: { class: 'fd-upload-collection__description' }
})
export class UploadCollectionDescriptionDirective {}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-text-separator], fd-upload-collection-text-separator',
    host: { class: 'fd-upload-collection__text-separator' }
})
export class UploadCollectionTextSeparatorDirective {}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-status-group]',
    host: { class: 'fd-upload-collection__status-group' }
})
export class UploadCollectionStatusGroupDirective {}

@Directive({
    // tslint:disable-next-line: directive-selector
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
