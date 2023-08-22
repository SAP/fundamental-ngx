import {
    ContentChildren,
    Directive,
    ElementRef,
    HostBinding,
    Inject,
    OnInit,
    Optional,
    QueryList
} from '@angular/core';
import { ObjectMarkerComponent } from '@fundamental-ngx/core/object-marker';
import { FD_OBJECT_STATUS_COMPONENT, ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-thumbnail]',
    host: { class: 'fd-upload-collection__thumbnail' },
    standalone: true
})
export class UploadCollectionThumbnailDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-title]',
    host: { class: 'fd-upload-collection__title' },
    standalone: true
})
export class UploadCollectionTitleDirective {
    /** @hidden */
    constructor(public elRef: ElementRef) {}
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-description]',
    host: { class: 'fd-upload-collection__description' },
    standalone: true
})
export class UploadCollectionDescriptionDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-text-separator], fd-upload-collection-text-separator',
    host: { class: 'fd-upload-collection__text-separator' },
    standalone: true
})
export class UploadCollectionTextSeparatorDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-status-group]',
    host: { class: 'fd-upload-collection__status-group' },
    standalone: true
})
export class UploadCollectionStatusGroupDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-status-item]',
    host: { class: 'fd-upload-collection__status-group-item' },
    standalone: true
})
export class UploadCollectionStatusItemDirective implements OnInit {
    /** @hidden */
    constructor(@Optional() @Inject(FD_OBJECT_STATUS_COMPONENT) private _objectStatus: ObjectStatusComponent) {}

    /** @hidden */
    ngOnInit(): void {
        if (this._objectStatus) {
            this._objectStatus._textClass += ' fd-upload-collection__status-group-item-text';
        }
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-title-container]',
    standalone: true
})
export class UploadCollectionTitleContainerDirective {
    /** @hidden */
    @ContentChildren(ObjectMarkerComponent)
    _objectMarkerComponents: QueryList<ObjectMarkerComponent>;

    /** Whether or not this is in edit mode. */
    @HostBinding('class.fd-upload-collection__title-container')
    applyContainerClass = true;
}
