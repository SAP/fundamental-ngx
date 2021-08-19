import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCollectionHeaderComponent } from './upload-collection-header.component';

describe('UploadCollectionHeaderComponent', () => {
    let component: UploadCollectionHeaderComponent;
    let fixture: ComponentFixture<UploadCollectionHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadCollectionHeaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadCollectionHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
