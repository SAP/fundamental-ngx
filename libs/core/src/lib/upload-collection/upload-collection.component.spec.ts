import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadCollectionComponent } from './upload-collection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UploadCollectionComponent', () => {
    let component: UploadCollectionComponent;
    let fixture: ComponentFixture<UploadCollectionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UploadCollectionComponent],
            schemas: [NO_ERRORS_SCHEMA]
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
