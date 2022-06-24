import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SplitButtonComponent, splitButtonTextClass, splitButtonTextCompactClass } from './split-button.component';
import { MenuModule } from '../menu/menu.module';
import { ButtonModule } from '../button/button.module';
import createSpy = jasmine.createSpy;

@Component({
    selector: 'fd-test-component',
    template: `
        <fd-split-button [expandButtonTitle]="moreBtnTitle" [fdCompact]="compact">
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
    `
})
export class TestComponent {
    moreBtnTitle: string;
    compact: boolean;
}

describe('SplitButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement;

    let component: DebugElement;
    let componentInstance: SplitButtonComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [MenuModule, ButtonModule],
                declarations: [SplitButtonComponent, TestComponent]
            });
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        component = debugElement.query(By.directive(SplitButtonComponent));
        componentInstance = component.injector.get(SplitButtonComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(componentInstance).toBeTruthy();
    });

    it('should handle content init - no selected item', () => {
        spyOn(componentInstance, 'selectMenuItem');
        componentInstance.mainActionTitle = null as any;
        componentInstance.ngAfterContentInit();
        expect(componentInstance.selectMenuItem).toHaveBeenCalledWith(componentInstance.menu.menuItems.first);
        expect(componentInstance.selected).toBe(componentInstance.menu.menuItems.first);
    });

    it('should handle content init - selected item', () => {
        spyOn(componentInstance, 'selectMenuItem');
        componentInstance.selected = componentInstance.menu.menuItems.last;
        componentInstance.mainActionTitle = null as any;
        componentInstance.ngAfterContentInit();
        expect(componentInstance.selectMenuItem).toHaveBeenCalledWith(componentInstance.menu.menuItems.last);
        componentInstance.menu.menuItems.last.onSelect.emit();
        fixture.detectChanges();
        expect(componentInstance.mainActionTitle).toBe('Option 2');
    });

    it('should handle the main button click - no selected item', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(mouseEvent, 'stopPropagation');
        spyOn(componentInstance.primaryButtonClicked, 'emit');
        componentInstance.selected = null as any;
        componentInstance.mainAction = {
            mainActionTitle: 'title',
            callback: createSpy()
        };

        componentInstance.onMainButtonClick(mouseEvent);

        expect(componentInstance.primaryButtonClicked.emit).toHaveBeenCalledWith(mouseEvent);
        expect(componentInstance.mainAction.callback).toHaveBeenCalled();
        expect(mouseEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should handle the main button click - selected item', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(mouseEvent, 'stopPropagation');
        spyOn(componentInstance.primaryButtonClicked, 'emit');
        componentInstance.selected = componentInstance.menu.menuItems.first;
        spyOn(componentInstance.selected.elementRef.nativeElement, 'click');

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
        expect(textElement.classList.contains(splitButtonTextCompactClass));
    });

    it('should has aria attributes', () => {
        fixture.detectChanges();
        // Default value
        expect(componentInstance.arialLabel).toBeDefined();

        const wrapperEl: HTMLElement = fixture.nativeElement.querySelector('.fd-button-split');
        expect(wrapperEl.getAttribute('aria-label')).toBe(componentInstance.arialLabel);

        // Default value
        expect(componentInstance.expandButtonAriaLabel).toBeDefined();
        const mainActionBtn = componentInstance.menuActionBtn?.nativeElement as HTMLElement;
        expect(mainActionBtn.getAttribute('aria-label')).toBe(componentInstance.expandButtonAriaLabel);

        expect(mainActionBtn.getAttribute('title')).toBe(componentInstance.expandButtonAriaLabel);
        fixture.componentInstance.moreBtnTitle = 'More Actions Title';
        fixture.detectChanges();
        expect(mainActionBtn.getAttribute('title')).toBe('More Actions Title');
    });

    it('should add is-active class to more-actions button', () => {
        const mainActionBtn = componentInstance.menuActionBtn?.nativeElement as HTMLElement;
        expect(mainActionBtn.classList.contains('is-active')).toBeFalse();

        componentInstance.menu.open();
        fixture.detectChanges();

        expect(mainActionBtn.classList.contains('is-active')).toBeTrue();
    });
});
