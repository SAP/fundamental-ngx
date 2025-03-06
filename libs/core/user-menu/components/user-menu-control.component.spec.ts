import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMenuControlComponent } from './user-menu-control.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<fd-user-menu-control (clicked)="handleClick()">Button</fd-user-menu-control>`
})
class TestHostComponent {
    clicked = false;
    handleClick(): void {
        this.clicked = true;
    }
}

describe('UserMenuControlComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;
    let userMenuControl: UserMenuControlComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [UserMenuControlComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        userMenuControl = fixture.debugElement.query(By.directive(UserMenuControlComponent)).componentInstance;
    });

    it('should create the component', () => {
        expect(userMenuControl).toBeTruthy();
    });

    it('should emit click event when clicked', () => {
        const spy = jest.spyOn(component, 'handleClick');
        const element = fixture.debugElement.query(By.directive(UserMenuControlComponent));

        element.triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
        expect(component.clicked).toBe(true);
    });

    it('should store the focused element before dialog opens', () => {
        document.body.innerHTML = `<button id="test-button">Test</button>`;
        const button = document.getElementById('test-button') as HTMLElement;
        button.focus();

        userMenuControl.onClick();

        expect(userMenuControl['_focusedElementBeforeDialogOpened']).toBe(button);
    });

    it('should restore focus to previously focused element', () => {
        const mockElement = document.createElement('button');
        jest.spyOn(mockElement, 'focus');

        userMenuControl['_focusedElementBeforeDialogOpened'] = mockElement;
        userMenuControl._focus();

        expect(mockElement.focus).toHaveBeenCalled();
    });
});
