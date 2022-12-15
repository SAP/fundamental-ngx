import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
    let component: SkeletonComponent;
    let fixture: ComponentFixture<SkeletonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SkeletonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SkeletonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
