import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLabelColor, InfoLabelComponent } from './info-label.component';

describe('InfoLabelComponent', () => {
    let component: InfoLabelComponent;
    let fixture: ComponentFixture<InfoLabelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InfoLabelComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply appropriate color', () => {
        const colors: InfoLabelColor[] = [
            'mango',
            'red',
            'raspberry',
            'pink',
            'indigo',
            'blue',
            'teal',
            'green',
            'cyan',
            'grey',
            'display'
        ];

        colors.forEach((color) => {
            component.color = color;
            fixture.detectChanges();

            expect(fixture.nativeElement.classList).toContain(`fn-info-label--${color}`);
        });
    });
});
