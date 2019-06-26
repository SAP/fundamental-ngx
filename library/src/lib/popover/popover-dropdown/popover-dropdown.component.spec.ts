import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverDropdownComponent } from './popover-dropdown.component';


describe('PopoverControlComponent', () => {
    let component: PopoverDropdownComponent;
    let fixture: ComponentFixture<PopoverDropdownComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopoverDropdownComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
