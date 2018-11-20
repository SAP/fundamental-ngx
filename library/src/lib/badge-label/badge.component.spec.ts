import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
    let component: BadgeComponent;
    let fixture: ComponentFixture<BadgeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BadgeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeComponent);
        component = fixture.componentInstance;
        component.status = 'someStatus';
        component.modifier = 'someModifier';
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-badge');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-badge--someStatus');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-badge--someModifier');
    });
});
