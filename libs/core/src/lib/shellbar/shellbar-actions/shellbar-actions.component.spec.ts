import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarActionsComponent } from './shellbar-actions.component';

import { MenuModule } from '../../menu/menu.module';
import { PopoverModule } from '../../popover/popover.module';
import { ShellbarUserMenuComponent } from '../user-menu/shellbar-user-menu.component';
import { ShellbarProductSwitcherComponent } from '../shellbar-product-switcher/shellbar-product-switcher.component';
import { ButtonModule } from '../../button/button.module';
import { IdentifierModule } from '../../identifier/identifier.module';

describe('ShellbarActionsComponent', () => {
    let component: ShellbarActionsComponent;
    let fixture: ComponentFixture<ShellbarActionsComponent>;
    const windowMock: Window = <any>{
        innerWidth: 1024
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ShellbarActionsComponent, ShellbarUserMenuComponent, ShellbarProductSwitcherComponent ],
            imports: [ MenuModule, PopoverModule, ButtonModule, IdentifierModule ],
            providers: [{ provide: 'window', useFactory: (() => windowMock ) }]
        }).compileComponents();
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
        const resizeSpy = spyOn(component, 'onResize');
        window.dispatchEvent(new Event('resize'));
        expect(resizeSpy).toHaveBeenCalled();
    });
});
