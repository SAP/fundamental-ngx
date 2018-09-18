import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverBodyComponent } from './popover-body.component';

describe('PopoverBodyComponent', () => {
    let component: PopoverBodyComponent;
    let fixture: ComponentFixture<PopoverBodyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopoverBodyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
