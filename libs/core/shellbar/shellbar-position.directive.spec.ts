import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarPositionDirective } from './shellbar-position.directive';

@Component({
    template: `
        <div fdShellbarPosition="left" id="left-item">Left Item</div>
        <div [fdShellbarPosition]="position" id="right-item">Right Item</div>
        <div id="no-directive-item">No Directive Item</div>
    `,
    imports: [ShellbarPositionDirective]
})
class PositionTestComponent {
    position: 'left' | 'right' = 'right';
}

describe('ShellbarPositionDirective', () => {
    let component: PositionTestComponent;
    let fixture: ComponentFixture<PositionTestComponent>;
    let leftElement: HTMLElement;
    let rightElement: HTMLElement;
    let noDirectiveElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PositionTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PositionTestComponent);
        component = fixture.componentInstance;
        leftElement = fixture.nativeElement.querySelector('#left-item');
        rightElement = fixture.nativeElement.querySelector('#right-item');
        noDirectiveElement = fixture.nativeElement.querySelector('#no-directive-item');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set data-fd-shellbar-position attribute to "left"', () => {
        expect(leftElement.getAttribute('data-fd-shellbar-position')).toBe('left');
    });

    it('should set data-fd-shellbar-position attribute to "right"', () => {
        expect(rightElement.getAttribute('data-fd-shellbar-position')).toBe('right');
    });

    it('should work without the directive', () => {
        expect(noDirectiveElement).toBeTruthy();
        expect(noDirectiveElement.getAttribute('data-fd-shellbar-position')).toBeNull();
    });
});
