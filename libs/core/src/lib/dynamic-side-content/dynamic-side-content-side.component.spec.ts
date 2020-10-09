import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { DynamicSideSideComponent } from './dynamic-side-content-side.component';
import { CLASS_NAME } from './constants';

describe('DynamicSideSideComponent', () => {
    let fixture: ComponentFixture<DynamicSideSideComponent>;
    let component: DynamicSideSideComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [DynamicSideSideComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicSideSideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.classes[CLASS_NAME.side]).toBeTrue();
    });
});
