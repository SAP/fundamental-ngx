import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TitleComponent, TitleModule } from '@fundamental-ngx/core/title';

describe('TitleComponent', () => {
    let component: TitleComponent;
    let fixture: ComponentFixture<TitleComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [TitleModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
    });

    it('should assign class', () => {
        component.headerSize = 5;
        component.ngOnInit();
        expect(fixture.nativeElement.classList).toContain('fd-title');
        expect(fixture.nativeElement.classList).toContain('fd-title--h5');
    });
});
