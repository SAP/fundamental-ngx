import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInput2Component } from './search-input.component';
import { Component, ViewChild } from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'fp-test',
    template: `
        <fp-search-input #component [placeholder]="placeholder" [dropdownValues]="dropdownValues"> </fp-search-input>
    `
})
class TestComponent {
    @ViewChild('component') component: SearchInput2Component;
    public placeholder: string;
    public dropdownValues: any[];
    constructor() {}
}

describe('SearchInputComponent', () => {
    let component: SearchInput2Component;
    let host: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, SearchInput2Component],
            imports: [FormsModule, FundamentalNgxCoreModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        host = fixture.componentInstance;
        component = host.component;
        fixture.detectChanges();
    });

    it('should allow "placeholder" text to be set', () => {
        host.placeholder = 'Input Search Here!';
        fixture.detectChanges();
        let placeholder = fixture.debugElement.query(By.css('input')).nativeElement.placeholder;
        expect(placeholder).toBe('Input Search Here!');

        host.placeholder = 'Search Again!';
        fixture.detectChanges();
        placeholder = fixture.debugElement.query(By.css('input')).nativeElement.placeholder;
        expect(placeholder).toBe('Search Again!');
    });

    it('should allow "dropdown" string list to be set', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.dropdownValues = ['Apple', 'Banana', 'Carrot'];
        fixture.detectChanges();

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input'));
        textInput.nativeElement.value = 'a';
        const keyPress = new KeyboardEvent('keyup', {
            key: 'a'
        });
        textInput.nativeElement.dispatchEvent(keyPress);
        fixture.detectChanges();

        const test = fixture.debugElement.query(By.css('fd-popover-container'));
        console.log(test.nativeElement);
        // expect(listItems[0].nativeElement.textContent).toBe('Apple');
    });
});
