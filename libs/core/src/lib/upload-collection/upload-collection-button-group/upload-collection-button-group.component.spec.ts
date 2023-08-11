import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group.component';

describe('UploadCollectionButtonGroupComponent', () => {
    let component: UploadCollectionButtonGroupComponent;
    let fixture: ComponentFixture<UploadCollectionButtonGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UploadCollectionButtonGroupComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadCollectionButtonGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle editButtonClicked', () => {
        jest.spyOn(component.editClicked, 'emit');
        component._editButtonClicked();
        expect(component._editMode).toBeTruthy();
        expect(component.editClicked.emit).toHaveBeenCalledWith(true);
    });

    it('should handle deleteButtonClicked', () => {
        jest.spyOn(component.deleteClicked, 'emit');
        component._deleteButtonClicked();
        expect(component.deleteClicked.emit).toHaveBeenCalled();
    });

    it('should handle okButtonClicked', () => {
        jest.spyOn(component.okClicked, 'emit');
        component._okButtonClicked();
        expect(component.okClicked.emit).toHaveBeenCalled();
    });

    it('should handle editButtonClicked', () => {
        component._editMode = true;
        jest.spyOn(component.editClicked, 'emit');
        component._cancelButtonClicked();
        expect(component._editMode).toBeFalsy();
        expect(component.editClicked.emit).toHaveBeenCalledWith(false);
    });
});
