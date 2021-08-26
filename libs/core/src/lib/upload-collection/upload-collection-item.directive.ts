import { AfterContentInit, ContentChild, Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group.component';
import { Subscription } from 'rxjs';
import {
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective
} from './upload-collection-simple.directives';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-upload-collection-item]',
    host: { class: 'fd-upload-collection__item' }
})
export class UploadCollectionItemDirective implements AfterContentInit, OnDestroy {
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

    /** Event emitted when the user changes a file name. */
    @Output()
    readonly fileNameChanged = new EventEmitter<any>();

    /** Event emitted when presses the delete button. */
    @Output()
    readonly deleteClicked = new EventEmitter<any>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    ngAfterContentInit(): void {
        this.titleDirective.elRef.nativeElement.innerHTML = this.fileName + '.' + this.extension;
        this._handleDeleteClickedSubscription();
        this._handleOkClickedSubscription();
        this._handleEditClickedSubscription();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _handleOkClickedSubscription(): void {
        this._subscriptions.add(
            this.buttonGroupComponent.okClicked.subscribe(() => {
                if (this.formItemComponent.fileName && this.formItemComponent.fileName !== '') {
                    this.fileName = this.formItemComponent.fileName;
                    this.titleDirective.elRef.nativeElement.style.display = 'inline-block';
                    this.titleDirective.elRef.nativeElement.innerHTML = this.fileName + '.' + this.extension;
                    this.formItemComponent.editMode = false;
                    this.buttonGroupComponent.editMode = false;
                    this.fileNameChanged.emit(this);
                }
            })
        );
    }

    /** @hidden */
    private _handleEditClickedSubscription(): void {
        this._subscriptions.add(
            this.buttonGroupComponent.editClicked.subscribe((event) => {
                this.formItemComponent.editMode = event;
                this.titleContainerDirective.applyContainerClass = !event;
                const styles = [];
                styles.push(this.titleDirective.elRef.nativeElement.style);
                this.titleContainerDirective?.objectMarkerComponents?.forEach((objectMarker) => {
                    styles.push(objectMarker.elementRef().nativeElement.style);
                });
                !!event
                    ? styles.forEach((style) => (style.display = 'none'))
                    : styles.forEach((style) => (style.display = 'inline-block'));
                if (event) {
                    this.formItemComponent.extension = this.extension;
                    this.formItemComponent.fileName = this.fileName;
                }
            })
        );
    }

    /** @hidden */
    private _handleDeleteClickedSubscription(): void {
        this._subscriptions.add(
            this.buttonGroupComponent.deleteClicked.subscribe(() => {
                this.deleteClicked.emit(this);
            })
        );
    }
}
