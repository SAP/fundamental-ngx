import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { DynamicSideMainComponent } from './dynamic-side-content-main.component';
import { CLASS_NAME } from './constants';

describe('DynamicSideMainComponent', () => {
    let fixture: ComponentFixture<DynamicSideMainComponent>;
    let component: DynamicSideMainComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [DynamicSideMainComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicSideMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.classes[CLASS_NAME.main]).toBeTrue();
    });
});
