import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SideNavigationPo extends CoreBaseComponentPo {
    private url = '/side-navigation';

    navigationExample = 'fd-side-navigation-example ';
    titlesExample = 'fd-side-navigation-titles-example ';
    compactExample = 'fd-side-navigation-compact-example ';
    nonSelectableExample = 'fd-side-navigation-non-selectable-example ';
    threeLevelsExample = 'fd-side-navigation-three-levels-example ';
    multipleSelectedExample = 'fd-side-navigation-multiple-selected-example ';
    pragmaticalyExample = 'fd-side-navigation-programmatically-example ';
    iconsExample = 'fd-side-navigation-icons-example ';
    condensedExample = 'fd-side-navigation-condensed-example ';
    objectExample = 'fd-side-navigation-object-example ';
    condensedObjectExample = 'fd-side-navigation-condensed-object-example ';
    listItemLink = '.fd-nested-list__link';
    listItem = 'li.fd-nested-list__item';
    pointContainsSubList = '.has-child ';
    expandArrow = this.pointContainsSubList + 'button';
    expandListExample = 'fd-popover-body ';
    expandedListPoint = '.fd-popover__popper ul li a';
    subList = '.level-2';
    subListItem = this.subList + ' li a';
    condensedObjectSelected = 'fd-nested-list__link ng-star-inserted is-selected';
    objectSelected = 'fd-nested-list__link is-selected';
    expandList = this.expandListExample + this.expandedListPoint;
    selectChildBtn = this.pragmaticalyExample + '> button:nth-child(2)';
    openBtn = this.pragmaticalyExample + '> button:nth-child(3)';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'side-navigation'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'side-navigation'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
