import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import {
    MenuComponent,
    MenuInteractiveDirective,
    MenuItemComponent,
    MenuTitleDirective
} from '@fundamental-ngx/core/menu';
import { SplitButtonComponent, splitButtonTextClass } from './split-button.component';

@Component({
    selector: 'fd-test-component',
    template: `
        <fd-split-button #splitButton [expandButtonTitle]="moreBtnTitle" [fdCompact]="compact">
            <fd-menu>
                <li fd-menu-item>
                    <div fd-menu-interactive>
                        <span fd-menu-title>Option 1</span>
                    </div>
                </li>
                <li fd-menu-item>
                    <div fd-menu-interactive>
                        <span fd-menu-title>Option 2</span>
                    </div>
                </li>
            </fd-menu>
        </fd-split-button>
    `,
    standalone: true,
    imports: [
        SplitButtonComponent,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveDirective,
        MenuTitleDirective,
        ContentDensityModule
    ]
})
export class TestComponent {
    moreBtnTitle: string;
    compact: boolean;
}

describe('SplitButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement;

    let component: DebugElement;
    let componentInstance: SplitButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        component = debugElement.query(By.directive(SplitButtonComponent));
        componentInstance = component.injector.get(SplitButtonComponent);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(componentInstance).toBeTruthy();
    });

    it('should handle content init - no selected item', () => {
        jest.spyOn(componentInstance, 'selectMenuItem');
        componentInstance.mainActionTitle = null as any;
        componentInstance.ngAfterContentInit();
        expect(componentInstance.selectMenuItem).toHaveBeenCalledWith(
            componentInstance.menu.menuItems[0] as MenuItemComponent
        );
        expect(componentInstance.selected).toBe(componentInstance.menu.menuItems[0]);
    });

    it('should handle content init - selected item', () => {
        jest.spyOn(componentInstance, 'selectMenuItem');
        const lastItem = componentInstance.menu.menuItems[
            componentInstance.menu.menuItems.length - 1
        ] as MenuItemComponent;
        componentInstance.selected = lastItem;
        componentInstance.mainActionTitle = null as any;
        componentInstance.ngAfterContentInit();
        expect(componentInstance.selectMenuItem).toHaveBeenCalledWith(lastItem);
        lastItem.onSelect.emit();
        fixture.detectChanges();
        expect(componentInstance.mainActionTitle).toBe('Option 2');
    });

    it('should handle the main button click - no selected item', () => {
        const mouseEvent = new MouseEvent('click');
        jest.spyOn(mouseEvent, 'stopPropagation');
        jest.spyOn(componentInstance.primaryButtonClicked, 'emit');
        componentInstance.selected = null as any;
        componentInstance.mainAction = {
            mainActionTitle: 'title',
            callback: jest.fn()
        };

        componentInstance.onMainButtonClick(mouseEvent);

        expect(componentInstance.primaryButtonClicked.emit).toHaveBeenCalledWith(mouseEvent);
        expect(componentInstance.mainAction.callback).toHaveBeenCalled();
        expect(mouseEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should handle the main button click - selected item', () => {
        const mouseEvent = new MouseEvent('click');
        jest.spyOn(mouseEvent, 'stopPropagation');
        jest.spyOn(componentInstance.primaryButtonClicked, 'emit');
        componentInstance.selected = componentInstance.menu.menuItems[0] as MenuItemComponent;
        jest.spyOn(componentInstance.selected.elementRef.nativeElement, 'click');

        componentInstance.onMainButtonClick(mouseEvent);

        expect(componentInstance.primaryButtonClicked.emit).toHaveBeenCalledWith(mouseEvent);
        expect(mouseEvent.stopPropagation).toHaveBeenCalled();
        expect(componentInstance.selected.elementRef.nativeElement.click).toHaveBeenCalled();
    });

    it('should add button text class', () => {
        fixture.detectChanges();
        const textElement = componentInstance.mainActionBtn?.nativeElement.querySelector('.fd-button__text');
        expect(textElement.classList.contains(splitButtonTextClass));
        fixture.componentInstance.compact = true;
        fixture.detectChanges();
        expect(component.nativeElement.classList).toContain('is-compact');
    });

    it('should add is-active class to more-actions button', () => {
        const mainActionBtn = componentInstance.menuActionBtn?.nativeElement as HTMLElement;
        expect(mainActionBtn.classList.contains('is-active')).toBeFalsy();

        componentInstance.menu.open();
        fixture.detectChanges();

        expect(mainActionBtn.classList.contains('is-active')).toBeTruthy();
    });
});
