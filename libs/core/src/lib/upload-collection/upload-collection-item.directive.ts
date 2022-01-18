import { AfterContentInit, ContentChild, Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item/upload-collection-form-item.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group/upload-collection-button-group.component';
import { Subscription } from 'rxjs';
import {
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective
} from './upload-collection-simple.directives';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
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
    _formItemComponent: UploadCollectionFormItemComponent;

    /** @hidden */
    @ContentChild(UploadCollectionTitleDirective)
    _titleDirective: UploadCollectionTitleDirective;

    /** @hidden */
    @ContentChild(UploadCollectionButtonGroupComponent)
    _buttonGroupComponent: UploadCollectionButtonGroupComponent;

    /** @hidden */
    @ContentChild(UploadCollectionTitleContainerDirective)
    _titleContainerDirective: UploadCollectionTitleContainerDirective;

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
        this._titleDirective.elRef.nativeElement.innerHTML = this.fileName + '.' + this.extension;
        this._handleDeleteClickedSubscription();
        this._handleOkClickedSubscription();
        this._handleEditClickedSubscription();
        this._handleFormItemInputChangedSubscription();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _handleOkClickedSubscription(): void {
        this._subscriptions.add(
            this._buttonGroupComponent.okClicked.subscribe(() => {
                if (this._formItemComponent.fileName && this._formItemComponent.fileName !== '') {
                    this.fileName = this._formItemComponent.fileName;
                    this._titleDirective.elRef.nativeElement.style.display = 'inline-block';
                    this._titleDirective.elRef.nativeElement.innerHTML = this.fileName + '.' + this.extension;
                    this._formItemComponent._editMode = false;
                    this._buttonGroupComponent._editMode = false;
                    this.fileNameChanged.emit(this);
                }
            })
        );
    }

    /** @hidden */
    private _handleEditClickedSubscription(): void {
        this._subscriptions.add(
            this._buttonGroupComponent.editClicked.subscribe((event) => {
                this._formItemComponent._editMode = event;
                if (this._titleContainerDirective) {
                    this._titleContainerDirective.applyContainerClass = !event;
                }
                const styles = [];
                styles.push(this._titleDirective.elRef.nativeElement.style);
                this._titleContainerDirective?._objectMarkerComponents?.forEach((objectMarker) => {
                    styles.push(objectMarker.elementRef().nativeElement.style);
                });
                event
                    ? styles.forEach((style) => (style.display = 'none'))
                    : styles.forEach((style) => (style.display = 'inline-block'));
                if (event) {
                    this._formItemComponent._extension = this.extension;
                    this._formItemComponent.fileName = this.fileName;
                }
            })
        );
    }

    /** @hidden */
    private _handleDeleteClickedSubscription(): void {
        this._subscriptions.add(
            this._buttonGroupComponent.deleteClicked.subscribe(() => {
                this.deleteClicked.emit(this);
            })
        );
    }

    /** @hidden */
    private _handleFormItemInputChangedSubscription(): void {
        this._subscriptions.add(
            this._formItemComponent.fileNameChanged.subscribe((event) => {
                this._buttonGroupComponent._okButton.disabled = event === '';
                this._buttonGroupComponent._okButton.buildComponentCssClass();
            })
        );
    }
}
