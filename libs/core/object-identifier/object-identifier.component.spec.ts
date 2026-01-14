import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectIdentifierComponent } from './object-identifier.component';

@Component({
    selector: 'fd-test-object-identifier',
    template: `
        <fd-object-identifier #objectRef [medium]="medium()" [bold]="bold()" [description]="description()">
            <a #linkRef fd-link>Link</a>
        </fd-object-identifier>
    `,
    imports: [LinkComponent, ObjectIdentifierComponent]
})
class TestObjectIdentifierComponent {
    readonly objectIdentifierElementRef = viewChild.required('objectRef', { read: ElementRef });
    readonly linkElementRef = viewChild.required('linkRef', { read: ElementRef });

    readonly description = signal<string | undefined>(undefined);
    readonly bold = signal(false);
    readonly medium = signal(false);
}

describe('ObjectIdentifierComponent', () => {
    let component: TestObjectIdentifierComponent;
    let fixture: ComponentFixture<TestObjectIdentifierComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(TestObjectIdentifierComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add medium class when medium input is true', () => {
        component.medium.set(true);
        fixture.detectChanges();

        const element = component.objectIdentifierElementRef().nativeElement;
        expect(element.classList.contains('fd-object-identifier--medium')).toBe(true);
    });

    it('should add bold class to title when bold input is true', () => {
        component.bold.set(true);
        fixture.detectChanges();

        const titleElement = fixture.nativeElement.querySelector('.fd-object-identifier__title');
        expect(titleElement?.classList.contains('fd-object-identifier__title--bold')).toBe(true);
    });

    it('should render description when provided', () => {
        const descriptionText = 'Test Description';
        component.description.set(descriptionText);
        fixture.detectChanges();

        const descriptionElement = fixture.nativeElement.querySelector('.fd-object-identifier__text');
        expect(descriptionElement?.textContent.trim()).toBe(descriptionText);
    });

    it('should not render description element when description is not provided', () => {
        const descriptionElement = fixture.nativeElement.querySelector('.fd-object-identifier__text');
        expect(descriptionElement).toBeNull();
    });

    it('should add identifier class to projected fd-link', () => {
        const linkElement = component.linkElementRef().nativeElement;
        expect(linkElement.classList.contains('fd-object-identifier__link')).toBe(true);
    });
});
