import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TimePo extends CoreBaseComponentPo {
    private url = '/time';

    timeExample = 'fd-time-example ';
    TwelveExample = 'fd-time-12-example ';
    noSpinnersExample = 'fd-time-no-spinners-example ';
    sizesExample = 'fd-time-sizes-example ';
    programmaticallyExample = 'fd-time-programmatically-example ';
    withoutSecondsExample = 'fd-time-no-seconds-example ';
    onlyHoursExample = 'fd-time-only-hours-example ';
    twoDigitsExample = 'fd-time-two-digits-example ';
    i18n8Example = 'fd-time-i18n-example ';
    formExample = 'fd-time-form-example ';
    exampleAreaContainersArr = '.fd-doc-component';

    downArrow = 'button:nth-child(4)';
    UpArrow = 'button:nth-child(2)';

    clockArea = '.fd-time';
    hoursColumn = 'fd-time-column:nth-child(1) ';
    minutesColumn = 'fd-time-column:nth-child(2) ';
    secondsColumn = 'fd-time-column:nth-child(3) ';
    formatColumn = 'fd-time-column:nth-child(4) ul ';

    currentHour = this.hoursColumn + '> .fd-time__wrapper ul > li:nth-child(12)';
    currentMinute = this.minutesColumn + '> .fd-time__wrapper ul > li:nth-child(30)';
    currentSec = this.secondsColumn + '> .fd-time__wrapper ul > li:nth-child(30)';

    lowerHour = this.hoursColumn + '> .fd-time__wrapper ul > li:nth-child(14)';
    upperhour = this.hoursColumn + '> .fd-time__wrapper ul > li:nth-child(10)';
    lowerMinute = this.minutesColumn + '> .fd-time__wrapper ul > li:nth-child(32)';
    upperMinute = this.minutesColumn + '> .fd-time__wrapper ul > li:nth-child(28)';
    lowerSec = this.secondsColumn + '> .fd-time__wrapper ul > li:nth-child(32)';
    upperSec = this.secondsColumn + '> .fd-time__wrapper ul > li:nth-child(28)';

    set11HoursBtn = this.programmaticallyExample + '.fd-button--standard';
    timeItem = 'li.fd-time__item';
    enableTimeRow = this.formExample + 'fd-time + span';

    formExample1Hour = '#fd-time-column-101';
    formExample2Minute = '#fd-time-column-292';
    formExample3Second = '#fd-time-column-303';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }
}
