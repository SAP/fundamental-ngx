import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadCollectionComponent } from './upload-collection.component';

describe('UploadCollectionComponent', () => {
    let component: UploadCollectionComponent;
    let fixture: ComponentFixture<UploadCollectionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UploadCollectionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
