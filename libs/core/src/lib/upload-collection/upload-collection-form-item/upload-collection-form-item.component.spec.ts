import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCollectionFormItemComponent } from '../public_api';

describe('UploadCollectionFormItemComponent', () => {
    let component: UploadCollectionFormItemComponent;
    let fixture: ComponentFixture<UploadCollectionFormItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadCollectionFormItemComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadCollectionFormItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle writeValue function', () => {
        jest.spyOn(component.fileNameChanged, 'emit');
        component.writeValue('testing');
        expect(component.fileName).toEqual('testing');
        expect(component.fileNameChanged.emit).toHaveBeenCalledWith('testing');
    });
});
