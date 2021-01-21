import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ObjectIdentifierComponent } from './object-identifier.component';
import { LinkComponent } from '../link/link.component';

@Component({
    selector: 'fd-test-object-identifier',
    template: `
        <fd-object-identifier
            #objectRef
            [medium]="medium"
            [bold]="bold"
            [description]="description">
            <a #linkRef fd-link>Link</a>
        </fd-object-identifier>
    `
})
class TestObjectIdentifierComponent {

    @ViewChild('objectRef', { read: ElementRef })
    objectIdentifierElementRef: ElementRef;

    @ViewChild('linkRef', { read: ElementRef })
    linkElementRef: ElementRef;

    description: string;
    bold: boolean;
    medium: boolean;

    getTitleElementClassList(): DOMTokenList {
        const elements = document.getElementsByClassName('fd-object-identifier__title');
        return elements.item(0).classList;
    }
}

describe('ObjectIdentifierComponent', () => {
    let objectIdentifierElementRef: ElementRef;
    let testComponent: TestObjectIdentifierComponent;
    let fixture: ComponentFixture<TestObjectIdentifierComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ObjectIdentifierComponent,
                TestObjectIdentifierComponent,
                LinkComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestObjectIdentifierComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        objectIdentifierElementRef = fixture.componentInstance.objectIdentifierElementRef;
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
    });

    it('Should add medium class', () => {
        testComponent.medium = true;
        fixture.detectChanges();
        expect(testComponent.objectIdentifierElementRef.nativeElement.classList.contains('fd-object-identifier--medium')).toBeTrue();
    });

    it('Should add classes to title', () => {
        testComponent.bold = true;
        fixture.detectChanges();
        expect(testComponent.getTitleElementClassList().contains('fd-object-identifier__title--bold')).toBeTrue();
    });

    it('Should add class to fd-link', () => {
        fixture.detectChanges();
        expect(testComponent.linkElementRef.nativeElement.classList.contains('fd-object-identifier__link')).toBeTrue();
    });
});
