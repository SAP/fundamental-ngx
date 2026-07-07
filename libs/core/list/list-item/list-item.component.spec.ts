import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '../list.module';

@Component({
    template: `
        <li #directiveElement fd-list-item [noData]="noData()" [action]="action()" [selected]="selected()">
            @if (link()) {
                <a #linkElement fd-list-link>link</a>
            }
            <button fd-button #button></button>
            List Item Test Text
        </li>
    `,
    standalone: true,
    imports: [ListModule, ButtonComponent]
})
class TestComponent {
    @ViewChild('directiveElement', { read: ElementRef })
    ref: ElementRef;

    @ViewChild('linkElement', { read: ElementRef })
    linkRef: ElementRef;

    @ViewChild('button', { read: ElementRef })
    buttonRef: ElementRef;

    readonly selected = input(false);
    readonly link = input(false);
    readonly noData = input(false);
    readonly action = input(false);
}

describe('ListItemComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-list__item');
    });

    it('should assign classes', () => {
        fixture.componentRef.setInput('selected', true);
        fixture.componentRef.setInput('noData', true);
        fixture.componentRef.setInput('action', true);
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('is-selected');
        expect(component.ref.nativeElement.classList).toContain('fd-list__item--no-data');
        expect(component.ref.nativeElement.classList).toContain('fd-list__item--action');
    });

    it('should assign link class', () => {
        fixture.componentRef.setInput('link', true);
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-list__item--link');
    });

    it('should assign button class', () => {
        fixture.detectChanges();
        expect(component.buttonRef.nativeElement.classList).toContain('fd-list__button');
    });

    it('should handle keyboard events for the link', () => {
        fixture.componentRef.setInput('link', true);
        fixture.detectChanges();
        const downEvent = new KeyboardEvent('keydown', {
            key: 'Space'
        });
        component.ref.nativeElement.dispatchEvent(downEvent);

        expect(component.linkRef.nativeElement.classList).toContain('is-active');

        const upEvent = new KeyboardEvent('keyup', {
            key: 'Space'
        });
        component.ref.nativeElement.dispatchEvent(upEvent);

        expect(component.linkRef.nativeElement.classList).not.toContain('is-active');
    });
});
