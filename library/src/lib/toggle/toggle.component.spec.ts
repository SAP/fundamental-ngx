import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { UtilsModule } from '../utils/utils.module';
import { CommonModule } from '@angular/common';

describe('ToggleComponent', () => {
    let component: ToggleComponent;
    let fixture: ComponentFixture<ToggleComponent>;
    let input;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, UtilsModule],
            declarations: [ToggleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleComponent);
        component = fixture.componentInstance;
        input = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call onKeypressHandler when Enter key pressed', () => {
        component.checked = false;
        spyOn(component, 'onKeypressHandler');
        input.dispatchEvent(new KeyboardEvent('keypress', {code: 'Enter'}));
        fixture.detectChanges();
        expect(component.onKeypressHandler).toHaveBeenCalled();
    });

    it('should toggle on click', () => {
        component.checked = false;
        spyOn(component, 'toggle');
        input.click();
        fixture.detectChanges();
        expect(component.toggle).toHaveBeenCalled();
    });

});
