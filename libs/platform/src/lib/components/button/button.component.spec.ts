import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from '@fundamental-ngx/core';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [ButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a content disabled button', () => {
        spyOn(component, 'setDisabledState');
        component.setDisabledState(true);
        expect(component.setDisabledState).toHaveBeenCalled();
    });

    it('size should set to small', () => {
        component.size = 'small';
        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
        component._setProperties();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-button--compact');
    });

    it('button onclick should be called', () => {
        spyOn(component, 'onBtnClick');
        component.onBtnClick(event);
        expect(component.onBtnClick).toHaveBeenCalled();
    });
});
