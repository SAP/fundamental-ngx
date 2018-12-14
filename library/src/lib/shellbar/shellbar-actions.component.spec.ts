import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarActionsComponent } from './shellbar-actions.component';

import { MenuModule } from '../menu/menu.module';
import { PopoverModule } from '../popover/popover.module';

describe('ShellbarActionsComponent', () => {
    let component: ShellbarActionsComponent;
    let fixture: ComponentFixture<ShellbarActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ShellbarActionsComponent ],
            imports: [ MenuModule, PopoverModule ]
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
        (<any>window).screen = { width: 1025};
        expect(component.actionsCollapsed).toBeFalsy();
        const resizeSpy = spyOn(component, 'onResize');
        window.dispatchEvent(new Event('resize'));
        expect(resizeSpy).toHaveBeenCalled();
    });
});
