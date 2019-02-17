import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import { UtilsModule } from '../utils/utils.module';

describe('TokenComponent', () => {
    let component: TokenComponent;
    let fixture: ComponentFixture<TokenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TokenComponent],
            imports: [UtilsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not fire onCloseClick', () => {
        spyOn(component.onCloseClick, 'emit');
        const content = fixture.nativeElement.querySelector('.fd-token-content');
        content.click();

        fixture.detectChanges();
        expect(component.onCloseClick.emit).not.toHaveBeenCalled();
    });

});
