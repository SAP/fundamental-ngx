import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TokenComponent } from './token.component';

describe('TokenComponent', () => {
    let component: TokenComponent;
    let fixture: ComponentFixture<TokenComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TokenComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not fire onCloseClick when clicking text', () => {
        spyOn(component.onCloseClick, 'emit');
        const content = fixture.nativeElement.querySelector('.fd-token__text');
        content.click();

        fixture.detectChanges();
        expect(component.onCloseClick.emit).not.toHaveBeenCalled();
    });

    it('should fire onCloseClick when clicking x', () => {
        spyOn(component.onCloseClick, 'emit');
        const content = fixture.nativeElement.querySelector('.fd-token__close');
        content.click();

        fixture.detectChanges();
        expect(component.onCloseClick.emit).toHaveBeenCalled();
    });
});
