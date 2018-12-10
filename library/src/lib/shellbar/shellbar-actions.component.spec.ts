import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarActionsComponent } from './shellbar-actions.component';

describe('ShellbarActionsComponent', () => {
    let component: ShellbarActionsComponent;
    let fixture: ComponentFixture<ShellbarActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ShellbarActionsComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle window resize', () => {
        expect(component.actionsCollapsed).toBeFalsy();
        const resizeSpy = spyOn(component, 'onResize');
        window.dispatchEvent(new Event('resize'));
        expect(resizeSpy).toHaveBeenCalled();
    });
});
