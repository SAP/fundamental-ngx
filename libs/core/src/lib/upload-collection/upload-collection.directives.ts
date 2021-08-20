import { AfterContentInit, ContentChild, ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group.component';
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
    selector: '[fd-upload-collection-title-container]',
    host: { class: 'fd-upload-collection__title-container' }
})
export class UploadCollectionTitleContainerDirective {

    /** @hidden */
    @ContentChildren(ObjectMarkerComponent)
    objectMarkerComponents: QueryList<ObjectMarkerComponent>;

}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-description]',
    host: { class: 'fd-upload-collection__description' }
})
export class UploadCollectionDescriptionDirective {}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-text-separator]',
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
    selector: '[fd-upload-collection-item]',
    host: { class: 'fd-upload-collection__item' }
})
export class UploadCollectionItemDirective implements AfterContentInit {

    /** The name of the file, not including the type extension. */
    @Input()
    fileName: string;

    /** The file type extension. */
    @Input()
    extension: string;

    /** @hidden */
    @ContentChild(UploadCollectionFormItemComponent)
    formItemComponent: UploadCollectionFormItemComponent;

    /** @hidden */
    @ContentChild(UploadCollectionTitleDirective)
    titleDirective: UploadCollectionTitleDirective;

    /** @hidden */
    @ContentChild(UploadCollectionButtonGroupComponent)
    buttonGroupComponent: UploadCollectionButtonGroupComponent;

    /** @hidden */
    @ContentChild(UploadCollectionTitleContainerDirective)
    titleContainerDirective: UploadCollectionTitleContainerDirective;

    /** @hidden */
    ngAfterContentInit(): void {
        this.titleDirective.elRef.nativeElement.innerHTML = this.fileName + '.' + this.extension;
        this.buttonGroupComponent.emitEditClicked.subscribe(event => {
            this.formItemComponent.editMode = event;
            const styles = [];
            styles.push(this.titleDirective.elRef.nativeElement.style);
            this.titleContainerDirective?.objectMarkerComponents?.forEach(objectMarker => {
                styles.push(objectMarker.elementRef().nativeElement.style);
            });
            !!event ? styles.forEach(style => style.display = 'none') : styles.forEach(style => style.display = 'inline-block');
            if (event) {
                this.formItemComponent.extension = this.extension;
                this.formItemComponent.fileName = this.fileName;
            }
        });
        this.formItemComponent.fileNameChanged.subscribe(newName => {
            newName ? this.buttonGroupComponent.okDisabled = false : this.buttonGroupComponent.okDisabled = true;
        });
    }
}
