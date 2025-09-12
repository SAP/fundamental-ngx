import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDetectionStrategy } from '@angular/core';
import { TokenComponent } from './token.component';

describe('TokenComponent', () => {
    let component: TokenComponent;
    let fixture: ComponentFixture<TokenComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.overrideComponent(TokenComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        })
            .configureTestingModule({
                imports: [TokenComponent]
            })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TokenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not fire onCloseClick when clicking text', () => {
        jest.spyOn(component.onCloseClick, 'emit');
        const content = fixture.nativeElement.querySelector('.fd-token__text');
        content.click();

        fixture.detectChanges();
        expect(component.onCloseClick.emit).not.toHaveBeenCalled();
    });

    it('should not render close icon when in read-only mode', async () => {
        component.readOnly = false;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeTruthy();
        component.readOnly = true;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeFalsy();
    });

    it('should not render close icon when in display-only mode', async () => {
        component.display = false;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeTruthy();
        component.display = true;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(fixture.nativeElement.querySelector('.fd-token__close')).toBeFalsy();
    });

    it('should fire onCloseClick when clicking x', () => {
        jest.spyOn(component.onCloseClick, 'emit');
        const content = fixture.nativeElement.querySelector('.fd-token__close');
        content.click();

        fixture.detectChanges();
        expect(component.onCloseClick.emit).toHaveBeenCalled();
    });
});
