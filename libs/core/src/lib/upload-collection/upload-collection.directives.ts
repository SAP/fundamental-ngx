import { AfterContentInit, ContentChild, Directive } from '@angular/core';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group.component';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-item]',
    host: { class: 'fd-upload-collection__item' }
})
export class UploadCollectionItemDirective implements AfterContentInit {
    /** @hidden */
    @ContentChild(UploadCollectionFormItemComponent)
    formItemComponent: UploadCollectionFormItemComponent;

    /** @hidden */
    @ContentChild(UploadCollectionButtonGroupComponent)
    buttonGroupComponent: UploadCollectionButtonGroupComponent;

    /** @hidden */
    ngAfterContentInit(): void {
        this.buttonGroupComponent.emitEditClicked.subscribe(event => {
            this.formItemComponent.editMode = event;
        });
    }
}

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
export class UploadCollectionTitleDirective {}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-title-container]',
    host: { class: 'fd-upload-collection__title-container' }
})
export class UploadCollectionTitleContainerDirective {}

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

