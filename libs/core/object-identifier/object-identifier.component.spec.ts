import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectIdentifierComponent } from './object-identifier.component';

@Component({
    selector: 'fd-test-object-identifier',
    template: `
        <fd-object-identifier #objectRef [medium]="medium" [bold]="bold" [description]="description">
            <a #linkRef fd-link>Link</a>
        </fd-object-identifier>
    `,
    standalone: true,
    imports: [LinkComponent, ObjectIdentifierComponent]
})
class TestObjectIdentifierComponent {
    @ViewChild('objectRef', { read: ElementRef })
    objectIdentifierElementRef: ElementRef;

    @ViewChild('linkRef', { read: ElementRef })
    linkElementRef: ElementRef;

    description = 'Some description';
    bold: boolean;
    medium: boolean;

    getTitleElementClassList(): DOMTokenList {
        const elements = document.getElementsByClassName('fd-object-identifier__title');
        return elements.item(0)?.classList as DOMTokenList;
    }
}

describe('ObjectIdentifierComponent', () => {
    let testComponent: TestObjectIdentifierComponent;
    let fixture: ComponentFixture<TestObjectIdentifierComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestObjectIdentifierComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestObjectIdentifierComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
    });

    it('Should add medium class', () => {
        testComponent.medium = true;
        fixture.detectChanges();
        expect(
            testComponent.objectIdentifierElementRef.nativeElement.classList.contains('fd-object-identifier--medium')
        ).toBe(true);
    });

    it('Should add classes to title', () => {
        testComponent.bold = true;
        fixture.detectChanges();
        expect(testComponent.getTitleElementClassList().contains('fd-object-identifier__title--bold')).toBe(true);
    });

    it('Should add class to fd-link', () => {
        fixture.detectChanges();
        expect(testComponent.linkElementRef.nativeElement.classList.contains('fd-object-identifier__link')).toBe(true);
    });

    it('should add a screen reader text with an id', () => {
        const srElement = fixture.debugElement.query(By.css('.fd-object-identifier__sr-only')).nativeElement;
        expect(srElement.textContent).toBe('Object Identifier');
        expect(srElement.id).toMatch(/fd-obj-identifier-id-\d+-sr/);
    });

    it('should add an aria-describedby containing the screen reader id to fd-link', () => {
        const srElementId = fixture.debugElement.query(By.css('.fd-object-identifier__sr-only')).nativeElement.id;
        expect(testComponent.linkElementRef.nativeElement.getAttribute('aria-describedby')).toContain(srElementId);
    });

    describe('when a description is provided', () => {
        it('should add a description paragraph with an id', () => {
            fixture.detectChanges();
            const description = fixture.debugElement.query(By.css('.fd-object-identifier__text')).nativeElement;
            expect(description.textContent).toContain('Some description');
            expect(description.getAttribute('id')).toMatch(/fd-obj-identifier-id-\d+-desc/);
        });

        it('should add an aria-describedby pointing to the screen reader and the description id to fd-link', () => {
            fixture.detectChanges();
            const srElementId = fixture.debugElement.query(By.css('.fd-object-identifier__sr-only')).nativeElement.id;
            const descriptionId = fixture.debugElement.query(By.css('.fd-object-identifier__text')).nativeElement.id;
            expect(testComponent.linkElementRef.nativeElement.getAttribute('aria-describedby')).toBe(
                `${srElementId} ${descriptionId}`
            );
        });
    });
});
