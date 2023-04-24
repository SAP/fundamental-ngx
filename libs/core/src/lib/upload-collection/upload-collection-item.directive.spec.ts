import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UploadCollectionModule } from './upload-collection.module';
import { UploadCollectionItemDirective } from './upload-collection-item.directive';
import { IconModule } from '@fundamental-ngx/core/icon';

@Component({
    template: `
        <li #directiveElement fd-list-item fd-upload-collection-item fileName="File_Name" extension="txt">
            <span fd-list-thumbnail fd-upload-collection-thumbnail><fd-icon glyph="customer"></fd-icon></span>
            <div fd-list-content>
                <a href="#" fd-link fd-list-title fd-upload-collection-title></a>
                <fd-upload-collection-form-item></fd-upload-collection-form-item>
                <div fd-upload-collection-description>
                    This is the file description
                    <span fd-upload-collection-text-separator></span>
                    This is an additional description
                </div>
                <div fd-upload-collection-status-group>
                    <span
                        fd-object-status
                        status="negative"
                        label="Negative Object Status"
                        title="Object status Negative"
                        aria-label="Object status Negative"
                    ></span>
                    <span fd-upload-collection-text-separator></span>
                    <span
                        fd-object-status
                        status="positive"
                        label="Positive Object Status"
                        title="Object status Positive"
                        aria-label="Object status Positive"
                    ></span>
                </div>
            </div>
            <fd-upload-collection-button-group></fd-upload-collection-button-group>
        </li>
    `
})
class TestComponent {
    @ViewChild(UploadCollectionItemDirective)
    item: UploadCollectionItemDirective;

    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('UploadCollectionItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [UploadCollectionModule, IconModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-upload-collection__item');
    });

    it('should set the fileName and extension', () => {
        component.item.ngAfterContentInit();
        expect(component.item._titleDirective.elRef.nativeElement.innerHTML).toEqual(
            '<span class="fd-link__content">File_Name.txt</span>'
        );
    });

    it('should handle the delete button subscriptions', fakeAsync(() => {
        jest.spyOn(component.item.deleteClicked, 'emit');
        component.item.ngAfterContentInit();
        tick(1);
        component.item._buttonGroupComponent.deleteClicked.emit();
        tick(1);
        fixture.detectChanges();
        expect(component.item.deleteClicked.emit).toHaveBeenCalled();
    }));

    it('should handle the ok button subscription', fakeAsync(() => {
        jest.spyOn(component.item.fileNameChanged, 'emit');
        component.item.ngAfterContentInit();
        tick(1);
        component.item._formItemComponent.fileName = 'newName';
        component.item._buttonGroupComponent.okClicked.emit();
        tick(1);
        fixture.detectChanges();
        expect(component.item._titleDirective.elRef.nativeElement.style.display).toEqual('inline-block');
        expect(component.item._titleDirective.elRef.nativeElement.innerHTML).toEqual('newName.txt');
        expect(component.item.fileNameChanged.emit).toHaveBeenCalled();
        expect(component.item.fileName).toEqual('newName');
        expect(component.item._formItemComponent._editMode).toBe(false);
        expect(component.item._buttonGroupComponent._editMode).toBe(false);
    }));

    it('should handle editClicked subscription', fakeAsync(() => {
        component.item.ngAfterContentInit();
        tick(1);
        component.item._formItemComponent.fileName = 'newName';
        component.item._formItemComponent._extension = 'jpg';
        component.item._buttonGroupComponent.editClicked.emit(true);
        tick(1);
        fixture.detectChanges();
        expect(component.item._formItemComponent._editMode).toBeTruthy();
        expect(component.item._titleDirective.elRef.nativeElement.style.display).toBe('none');
        expect(component.item._formItemComponent.fileName).toEqual('File_Name');
        expect(component.item._formItemComponent._extension).toEqual('txt');
    }));
});
