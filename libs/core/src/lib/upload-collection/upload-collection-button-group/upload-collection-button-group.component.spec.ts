import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCollectionButtonGroupComponent } from '@fundamental-ngx/core';

describe('UploadCollectionButtonGroupComponent', () => {
    let component: UploadCollectionButtonGroupComponent;
    let fixture: ComponentFixture<UploadCollectionButtonGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadCollectionButtonGroupComponent]
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
        spyOn(component.editClicked, 'emit');
        component.editButtonClicked();
        expect(component.editMode).toBeTruthy();
        expect(component.editClicked.emit).toHaveBeenCalledWith(true);
    });

    it('should handle deleteButtonClicked', () => {
        spyOn(component.deleteClicked, 'emit');
        component.deleteButtonClicked();
        expect(component.deleteClicked.emit).toHaveBeenCalled();
    });

    it('should handle okButtonClicked', () => {
        spyOn(component.okClicked, 'emit');
        component.okButtonClicked();
        expect(component.okClicked.emit).toHaveBeenCalled();
    });

    it('should handle editButtonClicked', () => {
        component.editMode = true;
        spyOn(component.editClicked, 'emit');
        component.cancelButtonClicked();
        expect(component.editMode).toBeFalsy();
        expect(component.editClicked.emit).toHaveBeenCalledWith(false);
    });
});
