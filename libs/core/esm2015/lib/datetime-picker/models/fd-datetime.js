/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Default date with time model used by the fundamental components.
 */
import { FdDate } from '../../calendar/models/fd-date';
export class FdDatetime {
    /**
     * Static function to get the current date in FdDateTime form.
     * @return {?}
     */
    static getToday() {
        /** @type {?} */
        const date = new Date();
        /** @type {?} */
        const time = { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() };
        return new FdDatetime(FdDate.getToday(), time);
    }
    /**
     * Constructor to build a FdDateTime object from a FdDate and TimeObject.
     * @param {?} date the FdDate object.
     * @param {?} time the TimeObject object.
     */
    constructor(date, time) {
        this.date = date;
        this.time = time;
    }
    /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    toLocaleDateString() {
        if (this.toDate() && this.isTimeValid() && this.isDateValid()) {
            return this.toDate().toLocaleString();
        }
        else {
            return null;
        }
    }
    /**
     * Method that checks validity of time on FdDateTime object.
     * @return {?}
     */
    isTimeValid() {
        if (!this.time ||
            this.hour === undefined ||
            this.minute === undefined ||
            this.second === undefined) {
            return false;
        }
        if (this.hour > 23 || this.hour < 0) {
            return false;
        }
        if (this.minute > 59 || this.minute < 0) {
            return false;
        }
        if (this.second > 59 || this.second < 0) {
            return false;
        }
        return true;
    }
    /**
     * Method that checks validity of date on FdDateTime object.
     * @return {?}
     */
    isDateValid() {
        return this.date && this.date.isDateValid();
    }
    /**
     * @return {?}
     */
    get year() {
        if (this.date) {
            return this.date.year;
        }
    }
    /**
     * @return {?}
     */
    get month() {
        if (this.date) {
            return this.date.month;
        }
    }
    /**
     * @return {?}
     */
    get day() {
        if (this.date) {
            return this.date.day;
        }
    }
    /**
     * @return {?}
     */
    get hour() {
        if (this.time) {
            return this.time.hour;
        }
    }
    /**
     * @return {?}
     */
    get minute() {
        if (this.time) {
            return this.time.minute;
        }
    }
    /**
     * @return {?}
     */
    get second() {
        if (this.time) {
            return this.time.second;
        }
    }
    /**
     * Get native date object from FdDate.
     * @return {?}
     */
    toDate() {
        return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
    }
}
if (false) {
    /** @type {?} */
    FdDatetime.prototype.date;
    /** @type {?} */
    FdDatetime.prototype.time;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmQtZGF0ZXRpbWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGF0ZXRpbWUtcGlja2VyL21vZGVscy9mZC1kYXRldGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBR3ZELE1BQU0sT0FBTyxVQUFVOzs7OztJQVFuQixNQUFNLENBQUMsUUFBUTs7Y0FDTCxJQUFJLEdBQVMsSUFBSSxJQUFJLEVBQUU7O2NBQ3ZCLElBQUksR0FBZSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDO1FBQ3RHLE9BQU8sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQU9ELFlBQ0ksSUFBWSxFQUNaLElBQWdCO1FBRWhCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBS00sa0JBQWtCO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDM0QsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekM7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7OztJQUtNLFdBQVc7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDVixJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUMzQjtZQUNFLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNqQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFLTSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELElBQVcsSUFBSTtRQUNYLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7O0lBRUQsSUFBVyxLQUFLO1FBQ1osSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMxQjtJQUNMLENBQUM7Ozs7SUFFRCxJQUFXLEdBQUc7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQzs7OztJQUVELElBQVcsSUFBSTtRQUNYLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7O0lBRUQsSUFBVyxNQUFNO1FBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7SUFFRCxJQUFXLE1BQU07UUFDYixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQzs7Ozs7SUFLTSxNQUFNO1FBQ1QsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RixDQUFDO0NBQ0o7OztJQWpIRywwQkFBYTs7SUFDYiwwQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmF1bHQgZGF0ZSB3aXRoIHRpbWUgbW9kZWwgdXNlZCBieSB0aGUgZnVuZGFtZW50YWwgY29tcG9uZW50cy5cbiAqL1xuXG5pbXBvcnQgeyBGZERhdGUgfSBmcm9tICcuLi8uLi9jYWxlbmRhci9tb2RlbHMvZmQtZGF0ZSc7XG5pbXBvcnQgeyBUaW1lT2JqZWN0IH0gZnJvbSAnLi4vLi4vdGltZS90aW1lLW9iamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBGZERhdGV0aW1lIHtcblxuICAgIGRhdGU6IEZkRGF0ZTtcbiAgICB0aW1lOiBUaW1lT2JqZWN0O1xuXG4gICAgLyoqXG4gICAgICogU3RhdGljIGZ1bmN0aW9uIHRvIGdldCB0aGUgY3VycmVudCBkYXRlIGluIEZkRGF0ZVRpbWUgZm9ybS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VG9kYXkoKTogRmREYXRldGltZSB7XG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0aW1lOiBUaW1lT2JqZWN0ID0ge2hvdXI6IGRhdGUuZ2V0SG91cnMoKSwgbWludXRlOiBkYXRlLmdldE1pbnV0ZXMoKSwgc2Vjb25kOiBkYXRlLmdldFNlY29uZHMoKX07XG4gICAgICAgIHJldHVybiBuZXcgRmREYXRldGltZShGZERhdGUuZ2V0VG9kYXkoKSwgdGltZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgdG8gYnVpbGQgYSBGZERhdGVUaW1lIG9iamVjdCBmcm9tIGEgRmREYXRlIGFuZCBUaW1lT2JqZWN0LlxuICAgICAqIEBwYXJhbSBkYXRlIHRoZSBGZERhdGUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB0aW1lIHRoZSBUaW1lT2JqZWN0IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZGF0ZTogRmREYXRlLFxuICAgICAgICB0aW1lOiBUaW1lT2JqZWN0XG4gICAgKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IEx1eG9uIGRhdGUgb2JqZWN0IGNvbnZlcnRlZCB0byBzdHJpbmcgZnJvbSBGZERhdGUuXG4gICAgICovXG4gICAgcHVibGljIHRvTG9jYWxlRGF0ZVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy50b0RhdGUoKSAmJiB0aGlzLmlzVGltZVZhbGlkKCkgJiYgdGhpcy5pc0RhdGVWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBjaGVja3MgdmFsaWRpdHkgb2YgdGltZSBvbiBGZERhdGVUaW1lIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNUaW1lVmFsaWQoKTogYm9vbGVhbiB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuaG91ciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0aGlzLnNlY29uZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ciA+IDIzIHx8IHRoaXMuaG91ciA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pbnV0ZSA+IDU5IHx8IHRoaXMubWludXRlIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kID4gNTkgfHwgdGhpcy5zZWNvbmQgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBjaGVja3MgdmFsaWRpdHkgb2YgZGF0ZSBvbiBGZERhdGVUaW1lIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNEYXRlVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5kYXRlLmlzRGF0ZVZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB5ZWFyKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLmRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGUueWVhcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbW9udGgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZS5tb250aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZGF5KCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLmRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGUuZGF5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBob3VyKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWUuaG91cjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWludXRlKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWUubWludXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZWNvbmQoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMudGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGltZS5zZWNvbmQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbmF0aXZlIGRhdGUgb2JqZWN0IGZyb20gRmREYXRlLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b0RhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGggLSAxLCB0aGlzLmRheSwgdGhpcy5ob3VyLCB0aGlzLm1pbnV0ZSwgdGhpcy5zZWNvbmQpO1xuICAgIH1cbn1cbiJdfQ==