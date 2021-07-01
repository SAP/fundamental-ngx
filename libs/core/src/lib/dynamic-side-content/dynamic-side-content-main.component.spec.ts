import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { DynamicSideContentMainComponent } from './dynamic-side-content-main.component';
import { DYNAMIC_SIDE_CONTENT_CLASS_NAME } from './constants';

describe('DynamicSideContentMainComponent', () => {
    let fixture: ComponentFixture<DynamicSideContentMainComponent>;
    let component: DynamicSideContentMainComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [DynamicSideContentMainComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicSideContentMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.classes[DYNAMIC_SIDE_CONTENT_CLASS_NAME.main]).toBeTrue();
    });
});
