import {
    AfterContentInit,
    AfterViewInit,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item/upload-collection-form-item.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group/upload-collection-button-group.component';
import { Subscription } from 'rxjs';
import {
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective
} from './upload-collection-simple.directives';
import { LINK_CLASS_NAME } from '@fundamental-ngx/core/link';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-upload-collection-item]',
    host: { class: 'fd-upload-collection__item' }
})
export class UploadCollectionItemDirective implements AfterContentInit, OnDestroy, AfterViewInit {
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
    fileNameFull: string;

    /** @hidden */
    titleWidth: number;

    /** @hidden used to compare to the current width to know whether to collapse or expand title */
    previousContainerWidth: number;

    /** @hidden */
    containerWidth: number;

    /** @hidden */
    ngAfterContentInit(): void {
        this.fileNameFull = this.fileName + '.' + this.extension;
        this._titleDirective.elRef.nativeElement.tabIndex = '0';
        this._titleDirective.elRef.nativeElement.innerHTML =
            '<span class="' + LINK_CLASS_NAME.linkContent + '">' + this.fileNameFull + '</span>';
        this._handleDeleteClickedSubscription();
        this._handleOkClickedSubscription();
        this._handleEditClickedSubscription();
        this._handleFormItemInputChangedSubscription();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // Process resize after all the children views is initialized
        setTimeout(() => this.onResize());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    constructor(public elementRef: ElementRef) {}

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        if (!this.elementRef.nativeElement.parentElement) {
            return;
        }
        this.titleWidth = this.getTitleWidth();
        this.containerWidth = this.getContainerWidth();

        // if first load and no previous container width, or if container boundary is resized to smaller than before
        if (!this.previousContainerWidth || this.containerWidth < this.previousContainerWidth) {
            // and the title extends past the container, 1.05x padding to prevent jaggy resizing.
            if (this.titleWidth * 1.05 >= this.containerWidth) {
                this.resizeFileTitle(this._titleDirective.elRef.nativeElement.innerHTML);
            }
        } else if (this.previousContainerWidth && this.containerWidth > this.previousContainerWidth) {
            // Looks to expand file title if container width is resized to greater than before
            // reset file title to initial
            this._titleDirective.elRef.nativeElement.innerHTML = this.fileNameFull;
            this.resizeFileTitle(this.fileNameFull);
        }

        this.previousContainerWidth = this.containerWidth;
    }

    /** @hidden */
    private _handleOkClickedSubscription(): void {
        this._subscriptions.add(
            this._buttonGroupComponent.okClicked.subscribe(() => {
                if (this._formItemComponent.fileName && this._formItemComponent.fileName !== '') {
                    this.fileName = this._formItemComponent.fileName;
                    this._titleDirective.elRef.nativeElement.style.display = 'inline-block';
                    this.fileNameFull = this.fileName + '.' + this.extension;
                    this._titleDirective.elRef.nativeElement.innerHTML = this.fileNameFull;
                    this.resizeFileTitle(this.fileNameFull);
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
                const styles: CSSStyleDeclaration[] = [];
                styles.push((this._titleDirective.elRef.nativeElement as HTMLElement).style);
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

    /** @hidden */
    private getTitleWidth(): number {
        return this._titleDirective.elRef.nativeElement.getBoundingClientRect().width;
    }

    /** @hidden */
    private getContainerWidth(): number {
        return this._titleDirective.elRef.nativeElement.parentElement.getBoundingClientRect().width;
    }

    /**
     * @hidden
     *
     * truncates the string by cutting out excess length in the middle and replacing with '...'
     */
    private truncateTitle(str: string): string {
        const cutLength = Math.floor(str.length * 0.8);

        if (str.length > cutLength) {
            const stringLeftIndex = Math.floor(cutLength / 2);
            const stringRightIndex = str.length - stringLeftIndex + 3;
            return str.substring(0, stringLeftIndex) + '...' + str.substring(stringRightIndex, str.length);
        }
        return str;
    }

    /**
     * @hidden
     *
     * determines if file title needs to be truncated given container constraint.
     */
    private resizeFileTitle(titleStr: string): void {
        let curTitle = titleStr;
        this.containerWidth = this.getContainerWidth();
        this.titleWidth = this.getTitleWidth();

        // repeatedly truncate the title until it fits inside container
        while (this.titleWidth * 1.05 >= this.containerWidth) {
            const truncatedTitleStr = this.truncateTitle(curTitle);
            this._titleDirective.elRef.nativeElement.innerHTML = truncatedTitleStr;
            curTitle = truncatedTitleStr;
            this.titleWidth = this.getTitleWidth();
            this.containerWidth = this.getContainerWidth();
        }
    }
}
