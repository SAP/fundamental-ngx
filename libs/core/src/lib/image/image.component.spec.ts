import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { browser, element, by } from 'protractor';

import { By } from '@angular/platform-browser';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
    let component: ImageComponent;
    let fixture: ComponentFixture<ImageComponent>;
    let htmlElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImageComponent]
        })
            .overrideComponent(ImageComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        htmlElement = fixture.debugElement.query(By.css('.fd-image--m'));
    });

    it('should create Image component', () => {
        expect(component).toBeTruthy();
        expect(component.size).toBe('m');
        expect(component.label).toBe('Image label');
    });

    it('should change Image component properties', () => {
        const imageLabel = 'My Image';

        component.size = 's';
        component.circle = true;
        component.photo = imageLabel;
        component.label = imageLabel;

        fixture.detectChanges();

        const componentInstance = fixture.debugElement.componentInstance;

        expect(componentInstance.size).toEqual('s');
        expect(componentInstance.circle).toBeTruthy();
        expect(componentInstance.photo).toEqual(imageLabel);
        expect(componentInstance.label).toEqual(imageLabel);
    });

    it('should change the size of the image', () => {
        const imageElement = fixture.debugElement.nativeElement.querySelector('span');
        expect(imageElement.className).toEqual('fd-image--m');

        component.size = 's';
        fixture.detectChanges();
        expect(imageElement.className).toEqual('fd-image--s');
    });

    it('should set image url', () => {
        const imageLabel = 'imgUrl';
        component.photo = imageLabel;

        const imageElement = fixture.debugElement.nativeElement.querySelector('span');
        fixture.detectChanges();

        expect(imageElement.style.backgroundImage).toEqual('url("' + imageLabel + '")');
    });
});
