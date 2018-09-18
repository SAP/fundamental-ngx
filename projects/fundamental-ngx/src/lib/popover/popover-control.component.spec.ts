import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverControlComponent } from './popover-control.component';

describe('PopoverControlComponent', () => {
    let component: PopoverControlComponent;
    let fixture: ComponentFixture<PopoverControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopoverControlComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
