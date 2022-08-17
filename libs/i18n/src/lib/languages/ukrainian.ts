import { FdLanguage, FdLanguageKeyArgs } from '../models/lang';
import { PluralizationSet1 } from './pluralization/set1';

const pluralization = new PluralizationSet1();
/**
 * Default set of translations of Fundamental UI libarary for Ukrainian language
 */
export const FD_LANGUAGE_UKRAINIAN: FdLanguage = {
    coreCarousel: {
        leftNavigationBtnLabel: 'Перейти до попереднього елемента',
        rightNavigationBtnLabel: 'Перейти до наступного елемента'
    },
    coreDatePicker: {
        dateInputLabel: 'Поле вводу дати',
        dateRangeInputLabel: 'Поле введення діапазону дат',
        displayCalendarToggleLabel: 'Відкрити засіб вибору',
        valueStateSuccessMessage: 'Значення стану: Успіх',
        valueStateInformationMessage: 'Значення стану: Інформаційний',
        valueStateWarningMessage: 'Значення стану: Попередження',
        valueStateErrorMessage: 'Значення стану: Помилка'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Поле вводу дати та часу',
        displayDatetimeToggleLabel: 'Показати календар',
        displayTypeDateLabel: 'Дата',
        displayTypeTimeLabel: 'Час',
        datetimeOkLabel: 'OK',
        datetimeCancelLabel: 'Відмінити'
    },
    coreFeedListItem: {
        moreLabel: 'Більше',
        lessLabel: 'Менше'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Скасувати',
        listItemStatusAriaLabel: 'Елемент має статус. Статус: {{ status }}.',
        listItemCounterAriaLabel: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Елемент має 1 дочірній елемент.`;
                case 'few':
                    return `Елемент має ${count} дочірніх елемента.`;
                default:
                    return `Елемент має ${count} дочірніх елементів.`;
            }
        },
        listItemButtonDetailsTitle: 'Подробиці',
        listItemButtonDeleteTitle: 'Видалити',
        listItemStatusContainsErrors: 'Містить помилки',
        listItemStatusLocked: 'Заблоковано',
        listItemStatusDraft: 'Чернетка'
    },
    coreMessageStrip: {
        dismissLabel: 'Закрити'
    },
    coreNestedList: {
        linkItemAriaLabel: 'Елемент дерева {{ itemDetails }}, {{ index }} із {{ total }}{{ selectedDescription }}'
    },
    coreOverflowLayout: {
        moreItemsButton: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Ще 1 елемент`;
                case 'few':
                    return `Ще ${count} елемента`;
                default:
                    return `Ще ${count} елементів`;
            }
        }
    },
    corePagination: {
        pageLabel: 'Сторінка {{ pageNumber }}',
        currentPageAriaLabel: 'Сторінка {{ pageNumber }} є активною',
        labelBeforeInputMobile: 'Сторінка:',
        labelAfterInputMobile: 'із {{ totalCount }}',
        inputAriaLabel: 'Поле вводу сторінки, Поточна сторінка, Сторінка {{ pageNumber }} із {{ totalCount }}',
        itemsPerPageLabel: 'Результатів на сторінці:',
        firstLabel: 'Перейти до першої',
        previousLabel: 'Перейти до попердньої',
        nextLabel: 'Перейти до наступної',
        lastLabel: 'Перейти до останньої',
        ariaLabel: 'Нумерація сторінок',
        totalResultsLabel: '{{ totalCount }} результатів'
    },
    coreProductSwitch: {
        ariaLabel: 'Перемикач'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Згорнуте меню елементів'
    },
    coreSlider: {
        singleMinMaxDetails: 'Мінімальне значення слайдера {{min}}, максимальне значення {{ max }}',
        singleValueminDetails: 'Поточне значення: {{ value }}',
        singleValuemaxDetails: 'Поточне значення: {{ value }}',
        singleValueNowDetails: 'Поточне значення: {{ value }}',
        multipleHandle1MinMaxDetails: 'Мінімальне значення слайдера {{ min }}, максимальне значення {{ max }}',
        multipleHandle1ValueminDetails: 'Поточне значення: {{ value }}',
        multipleHandle1ValuemaxDetails: 'Поточне значення: {{ value }}',
        multipleHandle1ValueNowDetails: 'Поточне значення: {{ value }}',
        multipleHandle2MinMaxDetails: 'Мінімальне значення слайдера {{ min }}, максимальне значення {{ max }}',
        multipleHandle2ValueminDetails: 'Поточне значення: {{ value }}',
        multipleHandle2ValuemaxDetails: 'Поточне значення: {{ value }}',
        multipleHandle2ValueNowDetails: 'Поточне значення: {{ value }}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Більше дій',
        arialLabel: 'Кнопка розділення'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Секція'
    },
    coreStepInput: {
        incrementButtonTitle: 'Збільшити',
        decrementButtonTitle: 'Зменшити',
        ariaRoleDescription: 'Крок вводу'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Прийняти',
        semanticDeclineLabel: 'Відхилити'
    },
    coreTabs: {
        tabListExpandButtonText: 'Більше'
    },
    coreText: {
        moreLabel: 'Більше',
        lessLabel: 'Менше'
    },
    coreTime: {
        componentAriaName: 'Вибір часу',
        increaseHoursLabel: 'Збільшити години',
        hoursLabel: 'Год',
        decreaseHoursLabel: 'Зменшити години',
        increaseMinutesLabel: 'Збільшити хвилини',
        minutesLabel: 'Хв',
        decreaseMinutesLabel: 'Зменшити хвилини',
        increaseSecondsLabel: 'Збільшити секунди',
        secondsLabel: 'Сек',
        decreaseSecondsLabel: 'Зменшити секунди',
        increasePeriodLabel: 'Збільшити період',
        periodLabel: 'Період',
        decreasePeriodLabel: 'Зменшити період',
        navigationInstruction:
            'Щоб переміщатися між елементами в цьому списку, використовуйте стрілку вверх або вниз. ' +
            'Для переключення між списками використовуйте стрілку вліво або вправо.'
    },
    coreTimePicker: {
        timePickerInputLabel: 'Поле вводу часу',
        timePickerButtonLabel: 'Відкрити вікно вибору'
    },
    coreToken: {
        deleteButtonLabel: 'Може бути видаленим',
        ariaRoleDescription: 'токен'
    },
    coreUploadCollection: {
        menuOkText: 'ОК',
        menuCancelText: 'Відмінити',
        menuEditAriaLabel: 'Редагувати',
        menuDeleteAriaLabel: 'Видалити',
        menuOkAriaLabel: 'Редагувати',
        menuCancelAriaLabel: 'Відминити',
        formItemPlaceholder: "Ім'я файлу"
    },
    coreWizard: {
        ariaLabel: 'Майстер'
    },
    platformActionBar: {
        backButtonLabel: 'Повернутися назад'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Спостерігачі',
        defaultTitle: 'Процес затвердження',
        nextButtonAriaLabel: 'Перейти до наступного слайду',
        prevButtonAriaLabel: 'Перейти до попереднього слайду',
        editModeSaveButtonLabel: 'Зберегти',
        editModeExitButtonLabel: 'Вийти',
        emptyTitle: 'Почати додавати стверджувачів і спостерігачів',
        emptyHint:
            'Щоб додати стверджувачів, натисніть "Додати крок". Щоб додати спостерігачів, натисніть поле Спостерігачі.',
        addNodeDialogHeaderAddApprovers: 'Додати стверджувачів',
        addNodeDialogHeaderEditApprover: 'Редагувати стверджувача',
        addNodeDialogHeaderAddApproverTeam: 'Користувач/Команда',
        addNodeDialogHeaderDetail: 'Деталі',
        addNodeDialogNodeType: 'Паралельний або послідовний',
        addNodeDialogNodeTypeSerial: 'Послідовний',
        addNodeDialogNodeTypeParallel: 'Паралельний',
        addNodeDialogApproverType: 'Тип стверджувача',
        addNodeDialogApproverTypeUser: 'Користувач',
        addNodeDialogApproverTypeTeamAnyone: 'Будь-хто в команді',
        addNodeDialogApproverTypeTeamEveryone: 'Усі в команді',
        addNodeDialogUserOrTeam: 'Користувач/Команда',
        addNodeDialogAddToNext: 'Додати до наступного послідовного вузла',
        addNodeDialogDueDate: 'Дата виконання',
        addNodeSearchPlaceholder: 'Пошук',
        addNodeAddActionBtnLabel: 'Додати',
        addNodeCancelActionBtnLabel: 'Скасувати',
        addNodeSelectApproverActionBtnLabel: 'Вибрати',
        addNodeCancelApproverSelectionActionBtnLabel: 'Вийти',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Закрити',
        userDetailsHeader: 'Деталі',
        userDetailsSendReminderBtnLabel: 'Надіслати нагадування',
        userDetailsCancelBtnLabel: 'Скасувати',
        messagesApproverAddedSuccess: '1 стверджувач доданий',
        messagesTeamAddedSuccess: '1 команда додана',
        messagesNodeEdited: '1 стверджувач відредагований',
        messagesNodeRemovedSingular: '1 стверджувач видалений',
        messagesNodeRemovedPlural: 'Стверджувачі видалені',
        messagesTeamRemoved: '1 команду видалено',
        messagesErrorBuildGraph: 'Під час спроби побудувати графік сталася помилка. Перевірте вхідні дані.',
        messagesUndoAction: 'Скасувати',
        nodeMembersCount: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `1 член команди`;
                case 'few':
                    return `${count} члена команди`;
                default:
                    return `${count || 0} членів команди`;
            }
        },
        nodeVariousTeams: 'Різні команди',
        nodeStatusDueToday: 'Термін виконання сьогодні',
        nodeStatusDueInXDays: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Термін виконання через 1 день`;
                case 'few':
                    return `Термін виконання через ${count} дні`;
                default:
                    return `Термін виконання через ${count || 0} днів`;
            }
        },
        nodeStatusXDaysOverdue: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Прострочено на 1 день`;
                case 'few':
                    return `Прострочено на ${count} дні`;
                default:
                    return `Прострочено на ${count || 0} днів`;
            }
        },
        nodeActionAddApproversBefore: 'Додати стверджувача до',
        nodeActionAddApproversAfter: 'Додати стверджувача після',
        nodeActionAddApproversParallel: 'Додати паралельних стверджувачів',
        nodeActionEditApprover: 'Редагувати стверджувача',
        nodeActionRemove: 'Видалити',
        selectTypeDialogMoveApproverAs: 'Перемістити стверджувача як',
        selectTypeDialogParallelOrSerial: 'Паралельний або послідовний',
        selectTypeDialogNodeTypeParallel: 'Паралельний стверджувач',
        selectTypeDialogNodeTypeSerial: 'Послідовний стверджувач',
        selectTypeDialogConfirmButton: 'Підтвердити',
        selectTypeDialogCancelButton: 'Скасувати',
        toolbarAddStepButton: 'Додати крок',
        toolbarEditButton: 'Редагувати',
        toolbarAddApproversBefore: 'Додати стверджувачів до',
        toolbarAddApproversAfter: 'Додати стверджувачів після',
        toolbarAddApproversParallel: 'Додати паралельних стверджувачів',
        toolbarRemove: 'Видалити',
        toolbarEditApprover: 'Редагувати стверджувача',
        watchersInputPlaceholder: 'Пошук',
        userListSelectedItemsCountSingular: 'Вибрано 1 елемент',
        userListSelectedItemsCountPlural: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Вибрано 1 елемент`;
                case 'few':
                    return `Вибрано ${count} елементи`;
                default:
                    return `Вибрано ${count || 0} елементів`;
            }
        }
    },
    platformFeedInput: {
        userTitle: 'Користувач'
    },
    platformVHD: {
        selectionBarLabel: 'Вибрані елементи та умови',
        selectedAndConditionLabel: 'Вибрані елементи та умови',
        footerClearSelectedTitle: 'очистити вибрані елементи',
        footerClearSelectedAriaLabel: 'очистити вибрані елементи',
        searchButtonLabel: 'Пошук',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Скасувати',
        selectedEmptyLabel: 'Не вибрано жодних елементів або умов',
        searchPlaceholder: 'Пошук',
        searchAdvancedSearchLabel: 'Фільтри',
        searchShowAdvancedSearchLabel: 'Показати фільтри',
        searchHideAdvancedSearchLabel: 'Сховати фільтри',
        searchShowAllAdvancedSearchLabel: 'Показати всі фільтри',
        searchHideAllAdvancedSearchLabel: 'Сховати всі фільтри',
        selectTabDisplayCountLabel: 'Елементи ({{ count }})',
        selectTabMoreBtnLabel: 'Більше',
        selectTabCountHiddenA11yLabel: (params) => {
            const rowCount = params['rowCount'];
            const rowOption = pluralization.process(rowCount);
            let rowPart: string;
            switch (rowOption) {
                case 'one':
                    rowPart = 'містить 1 ряд';
                    break;
                case 'few':
                    rowPart = `містить ${rowCount} ряди`;
                    break;
                default:
                    rowPart = `містить ${rowCount} рядів`;
                    break;
            }
            const colCount = params['colCount'];
            const colOption = pluralization.process(colCount);
            let colPart: string;
            switch (colOption) {
                case 'one':
                    colPart = '1 колонку';
                    break;
                case 'few':
                    colPart = `${colCount} колонки`;
                    break;
                default:
                    colPart = `${colCount} колонок`;
                    break;
            }
            return `${rowPart} і ${colPart}`;
        },
        selectMobileTabBackBtnTitle: 'Назад',
        selectMobileTabBtnOpenDialogLabel: 'Відкрити діалогове вікно',
        selectMobileTabTitle: '{{ title }} вкладка',
        selectMobileConditionEmpty: 'Пусто',
        defineConditionTitle: 'Продукт',
        defineConditionSelectedValueHiddenA11yLabel: 'вибране значення {{ value }}',
        defineConditionConditionsGroupHeaderInclude: 'Включні умови',
        defineConditionConditionsGroupHeaderExclude: 'Виключні умови',
        defineConditionFromPlaceholder: 'від',
        defineConditionToPlaceholder: 'до',
        defineConditionValuePlaceholder: 'значення',
        defineConditionRemoveConditionButtonTitle: 'Видалити умову',
        defineConditionAddConditionButtonLabel: 'Додати',
        defineConditionAddConditionButtonTitle: 'Додати умову',
        defineConditionConditionStrategyLabelContains: 'містить',
        defineConditionConditionStrategyLabelEqualTo: 'дорівнює',
        defineConditionConditionStrategyLabelBetween: 'між',
        defineConditionConditionStrategyLabelStartsWith: 'починається з',
        defineConditionConditionStrategyLabelEndsWith: 'закінчується на',
        defineConditionConditionStrategyLabelLessThan: 'менше ніж',
        defineConditionConditionStrategyLabelLessThanEqual: 'менше ніж або дорівнює',
        defineConditionConditionStrategyLabelGreaterThan: 'більше ніж',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'більше ніж або дорівнює',
        defineConditionConditionStrategyLabelEmpty: 'порожнє',
        defineConditionConditionStrategyLabelNotEqualTo: 'не дорівнює',
        defineConditionConditionStrategyLabelNotEmpty: 'не порожнє',
        defineConditionMaxCountError: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Введіть значення не більше ніж 1 символу`;
                default:
                    return `Введіть значення не більше ніж ${count || 0} символів`;
            }
        },
        selectTabTitle: 'Вибрати зі списку',
        searchTableEmptyMessage: 'Використовуйте пошук, щоб отримати результати',
        defineTabTitle: 'Визначити умови'
    },
    platformCombobox: {
        countListResultsSingular: '1 елемент',
        countListResultsPlural: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `1 елемент`;
                case 'few':
                    return `${count} елементи`;
                default:
                    return `${count || 0} елементів`;
            }
        }
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Вибрати опції',
        inputIconTitle: 'Вибрати опції',
        mobileShowAllItemsButton: 'Показати всі елементи',
        mobileShowSelectedItemsButton: 'Показати вибрані елементи'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: 'Перевищено ліміт на 1 символ',
        counterMessageCharactersOverTheLimitPlural: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Перевищено ліміт на 1 символ`;
                case 'few':
                    return `Перевищено ліміт на ${count} символи`;
                default:
                    return `Перевищено ліміт на ${count || 0} символів`;
            }
        },
        counterMessageCharactersRemainingSingular: 'Залишився 1 символ',
        counterMessageCharactersRemainingPlural: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Залишилось 1 символ`;
                case 'few':
                    return `Залишилось ${count} символи`;
                default:
                    return `Залишилось ${count || 0} символів`;
            }
        }
    },
    platformLink: {
        roleDescriptionWithMedia: 'Медіа: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'завантаження'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'деталі',
        deleteActionAriaLabel: 'видалити'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'деталі',
        deleteActionAriaLabel: 'видалити'
    },
    platformSearchField: {
        clearButtonTitle: 'Очистити',
        submitButtonTitle: 'Пошук',
        synchronizeButtonTitle: 'Синхронізувати',
        searchSuggestionMessage: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Знайдено 1 варіант`;
                case 'few':
                    return `Знайдено ${count} варіанти`;
                default:
                    return `Знайдено ${count || 0} варіантів`;
            }
        },
        searchSuggestionNavigateMessage: 'використовуйте стрілки вгору та вниз для навігації'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Пошук',
        submitButtonLabel: 'Перейти',
        filtersButtonLabel: 'Фільтри ({{ filtersCount }})',
        showFiltersButtonLabel: 'Показати фільтри',
        hideFiltersButtonLabel: 'Сховати фільтри',
        defineConditionsRemoveConditionButtonTitle: 'Видалити умову',
        defineConditionsAddConditionButtonLabel: 'Додати умову',
        defineConditionsSubmitButtonLabel: 'Перейти',
        defineConditionsCancelButton: 'Скасувати',
        selectFiltersHeader: 'Фільтри',
        selectFiltersAvailableFiltersText: 'Доступні фільтри',
        selectFiltersFilterColumnLabel: 'Фільтр',
        selectFiltersActiveColumnLabel: 'Активний',
        selectFiltersSubmitButtonLabel: 'Перейти',
        selectFiltersCancelButton: 'Скасувати',
        filterConditionContains: 'містить',
        filterConditionEqualTo: 'дорівнює',
        filterConditionBetween: 'між',
        filterConditionBeginsWith: 'починається з',
        filterConditionEndsWith: 'закінчується',
        filterConditionLessThan: 'менше ніж',
        filterConditionLessThanOrEqualTo: 'менше або одно',
        filterConditionGreaterThan: 'більше ніж',
        filterConditionGreaterThanOrEqualTo: 'більше або дорівнює',
        filterConditionAfter: 'після',
        filterConditionOnOrAfter: 'дорівнює або після',
        filterConditionBefore: 'до',
        filterConditionBeforeOrOn: 'до або дорівнює',
        filterConditionValuePlaceholder: 'значення',
        filterConditionValueFromPlaceholder: 'від',
        filterConditionValueToPlaceholder: 'до',
        settingsCategoryAll: 'Всі',
        settingsCategoryVisible: 'Видимі',
        settingsCategoryActive: 'Активні',
        settingsCategoryVisibleAndActive: 'Видимі та активні',
        settingsCategoryMandatory: "Обов'язкові"
    },
    platformTable: {
        headerMenuSortAsc: 'Сортувати за зростанням',
        headerMenuSortDesc: 'Сортувати за спаданням',
        headerMenuGroup: 'Сгрупувати',
        headerMenuFreeze: 'Заморозити',
        headerMenuUnfreeze: 'Розморозити',
        headerMenuFilter: 'Фільтр',
        defaultEmptyMessage: 'Нічого не знайдено',
        resetChangesButtonLabel: 'Скинути',
        editableCellNumberPlaceholder: 'Введіть значення',
        editableCellDatePlaceholder: 'Введіть значення',
        editableCellStringPlaceholder: 'Введіть значення',
        P13ColumnsDialogHeader: 'Стовпці',
        P13ColumnsDialogSearchPlaceholder: 'Пошук',
        P13ColumnsDialogsShowSelected: 'Показати вибране',
        P13ColumnsDialogShowAll: 'Показати все',
        P13ColumnsDialogSelectAll: 'Вибрати всі ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Скасувати',
        P13ColumnsDialogMoveToTopBtn: 'Перемістити вгору',
        P13ColumnsDialogMoveUpBtn: 'Перемістити вище',
        P13ColumnsDialogMoveDownBtn: 'Перемістити нижче',
        P13ColumnsDialogMoveToBottomBtn: 'Перемістити вниз',
        P13FilterStrategyLabelBetween: 'між',
        P13FilterStrategyLabelContains: 'містить',
        P13FilterStrategyLabelBeginsWith: 'починається з',
        P13FilterStrategyLabelEndsWith: 'закінчується на',
        P13FilterStrategyLabelEqualTo: 'дорівнює',
        P13FilterStrategyLabelGreaterThan: 'більше ніж',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'більше або дорівнює',
        P13FilterStrategyLabelLessThan: 'менше ніж',
        P13FilterStrategyLabelLessThanOrEqualTo: 'менше або дорівнює',
        P13FilterStrategyLabelAfter: 'після',
        P13FilterStrategyLabelOnOrAfter: 'дорівнює або після',
        P13FilterStrategyLabelBefore: 'до',
        P13FilterStrategyLabelBeforeOrOn: 'до або дорівнює',
        P13FilterStrategyLabelNotDefined: 'Не визначено',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Так',
        P13FilterBooleanOptionFalse: 'Ні',
        P13FilterDialogHeader: 'Фільтрувати за',
        P13FilterDialogIncludePanelTitleWithCount: 'Включні умови ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Включні умови',
        P13FilterDialogExcludePanelTitleWithCount: 'Виключні умови ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Виключні умови',
        P13FilterDialogRemoveFilterBtnTitle: 'Видалити фільтр',
        P13FilterDialoAddFilterBtnTitle: 'Додати фільтр',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Скасувати',
        P13GroupDialogHeader: 'Групування',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(немає)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Показати поле як стовпець',
        P13GroupDialogRemoveGroupBtnTitle: 'Видалити',
        P13GroupDialogAddNewGroupBtnTitle: 'Додати новий',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Скасувати',
        P13SortDialogHeader: 'Сортування',
        P13SortDialogNoneSelectedColumn: '(немає)',
        P13SortDialogNoneSelectedSorting: '(немає)',
        P13SortDialogSortOrderSelectOptionAsc: 'За зростанням',
        P13SortDialogSortOrderSelectOptionDesc: 'За спаданням',
        P13SortDialogRemoveSortBtnTitle: 'Видалити',
        P13SortDialogAddNewSortBtnTitle: 'Додати нове',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Скасувати',
        toolbarSearchPlaceholder: 'Пошук',
        toolbarActionCreateButtonLabel: 'Створити',
        toolbarActionSaveButtonLabel: 'Зберегти',
        toolbarActionCancelButtonLabel: 'Скасувати',
        toolbarActionSortButtonTitle: 'Сортувати',
        toolbarActionFilterButtonTitle: 'Фільтр',
        toolbarActionGroupButtonTitle: 'Сгрупувати',
        toolbarActionColumnsButtonTitle: 'Стовпці',
        filterDialogNotFilteredLabel: '(Не відфільтровано)',
        filterDialogFilterByLabel: 'Фільтрувати за: {{ filterLabel }}',
        filterDialogFilterTitle: 'Фільтр',
        filterDialogFilterBy: 'Фільтрувати за',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Скасувати',
        groupDialogHeader: 'Сгрупувати',
        groupDialogGroupOrderHeader: 'Порядок групування',
        groupDialogGroupOrderAsc: 'За зростанням',
        groupDialogGroupOrderDesc: 'За спаданням',
        groupDialogGroupByHeader: 'Групувати за',
        groupDialogNotGroupedLabel: '(Не згруповано)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Скасувати',
        sortDialogHeader: 'Сортувати',
        sortDialogSortOrderHeader: 'Порядок сортування',
        sortDialogSortOrderAsc: 'За зростанням',
        sortDialogSortOrderDesc: 'за спаданням',
        sortDialogSortByHeader: 'Сортувати за',
        sortDialogNotSortedLabel: '(Не відсортовано)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Скасувати'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Перейти до попереднього',
        detailsGotoNextButtonTitle: 'Перейти до наступного',
        detailsDialogCloseBtnLabel: 'Закрити',
        roleDescription: 'Зображення'
    },
    platformUploadCollection: {
        moveToTitle: 'Перемістити до',
        moveToTitleFolder: 'Папка',
        moveToNewFolderBtnLabel: 'Нова папка',
        moveToAllFilesSubHeaderLabel: 'Усі файли',
        moveToConfirmBtn: 'Перемістити',
        moveToCloseBtn: 'Скасувати',
        newFolderTitle: 'Нова папка',
        newFolderAtRootInputLabel: 'Назва нової папки',
        newFolderAtFolderInputLabel: 'Назва нової папки усередині {{ folderName }',
        newFolderInputPlaceholder: 'Введіть назву..',
        newFolderInputErrorLabel: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Максимально дозволено 1 символ`;
                case 'few':
                    return `Максимально дозволено ${count} символи`;
                default:
                    return `Максимально дозволено ${count} символів`;
            }
        },
        newFolderDialogCreateBtnLabel: 'Створити',
        newFolderDialogCancelBtnLabel: 'Скасувати',
        breadcrumbLabelAllFiles: 'Усі файли',
        breadcrumbLabelAllFilesWithTotal: 'Усі файли ({{ total }})',
        searchPlaceholder: 'Пошук',
        addBtnLabel: 'Додати',
        newFolderBtnLabel: 'Нова папка',
        moveToBtnLabel: 'Перемістити до',
        downloadBtnLabel: 'Завантажити',
        updateVersionBtnLabel: 'Оновити версію',
        removeBtnLabel: 'Видалити',
        folderIconTitle: 'Значок папки',
        fileIconTitle: 'Значок файлу',
        editFileNameInputPlaceholder: 'Введіть назву',
        editFileNameFileAlreadyExistsError: 'Файл з такою назвою вже існує',
        editFileNameFolderAlreadyExistsError: 'Папка з такою назвою вже існує',
        itemStatusSuccessful: 'Успішно',
        itemStatusUnsuccessful: 'Невдало',
        uploadNewFileAfterFailAction: 'Виконати',
        cancelUploadNewFileAction: 'Скасувати',
        itemMenuBtnTitle: 'Більше',
        dragDropAreaText: 'Перетягніть файли для завантаження',
        noDataText: 'Файлів не знайдено',
        noDataDescription: 'Перетягніть файли для завантаження або скористайтеся кнопкою «Додати».',
        paginationTotal: 'Показано {{ from }}-{{ to }} із {{ total }}',
        resultsPerPage: 'Результатів на сторінці',
        messageCreateFailed: 'Не вдалося створити {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} успішно створено.',
        messageUpdateVersionFailed: 'Не вдалося оновити версію {{ folderName }}.',
        messageUpdateVersionSuccess: 'Версія {{ folderName }} оновлена.',
        messageFileRenameFailed: 'Не вдалося перейменувати "{{ from }}" на "{{ to }}."',
        messageFileRenameSuccess: '{{ from }}" перейменовано на "{{ to }}".',
        messageRemoveFoldersAndFilesFailed: (params) =>
            `Не вдалося видалити ${folderNamePluralization(params)} і ${fileNamePluralization(params)}.`,
        messageRemoveFoldersAndFilesSuccess: (params) =>
            `${folderNamePluralization(params)} і ${fileNamePluralization(params)} видалено.`,
        messageRemoveFoldersFailed: (params) => `Не вдалося видалити ${folderNamePluralization(params)}.`,
        messageRemoveFoldersSuccess: (params) => `Видалено ${folderNamePluralization(params)}.`,
        messageRemoveFilesFailed: (params) => `Не вдалося видалити ${fileNamePluralization(params)}.`,
        messageRemoveFilesSuccess: (params) => `Видалено ${fileNamePluralization(params)}.`,
        messageRemoveFileOrFolderFailed: 'Не вдалося видалити {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} видалено.',
        messageMoveFoldersAndFilesFailed: (params) =>
            `Не вдалося перемістити ${folderNamePluralization(params)} і ${fileNamePluralization(params)} до {{ to }}.`,
        messageMoveFoldersAndFilesSuccess: (params) =>
            `${folderNamePluralization(params)} і ${fileNamePluralization(params)} переміщено в {{ to }}.`,
        messageMoveFoldersFailed: (params) => `Не вдалося перемістити ${folderNamePluralization(params)} до {{ to }}.`,
        messageMoveFoldersSuccess: (params) => `${folderNamePluralization(params)} переміщено до {{ to }}.`,
        messageMoveFilesFailed: (params) => `Не вдалося перемістити ${fileNamePluralization(params)} до {{ to }}.`,
        messageMoveFilesSuccess: (params) => `${fileNamePluralization(params)} переміщено до {{ to }}.`,
        messageMoveFileOrFolderFailed: 'Не вдалося перемістити {{ name }} до {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} переміщено в {{ to }}.',
        messageMoveRootFoldersAndFilesFailed: (params) =>
            `Не вдалося перемістити ${folderNamePluralization(params)} і ${fileNamePluralization(
                params
            )} до всіх файлів.`,
        messageMoveRootFoldersAndFilesSuccess: (params) =>
            `${folderNamePluralization(params)} і ${fileNamePluralization(params)} переміщено до всіх файлів.`,
        messageMoveRootFoldersFailed: (params) =>
            `Не вдалося перемістити ${folderNamePluralization(params)} до всіх файлів.`,
        messageMoveRootFoldersSuccess: (params) => `${folderNamePluralization(params)} переміщено до всіх файлів.`,
        messageMoveRootFilesFailed: (params) =>
            `Не вдалося перемістити ${fileNamePluralization(params)} до всіх файлів.`,
        messageMoveRootFilesSuccess: (params) => `${fileNamePluralization(params)} переміщено до всіх файлів.`,
        messageMoveRootFileOrFolderFailed: 'Не вдалося перемістити {{ name }} до всіх файлів.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} переміщено до всіх файлів.',
        messageFileTypeMismatchPlural: (params) => {
            const filesCount = params['filesCount'];
            const foldersCountOption = pluralization.process(filesCount);
            switch (foldersCountOption) {
                case 'one':
                    return '1 файл має неправильний тип. Дозволені типи: {{ allowedTypes }}.';
                case 'few':
                    return `${filesCount} файли мають неправильний тип. Дозволені типи: {{ allowedTypes }}.`;
                default:
                    return `${filesCount || 0} файлів мають неправильний тип. Дозволені типи: {{ allowedTypes }}.`;
            }
        },
        messageFileTypeMismatchSingular:
            'Файл "{{ fileName }}" має неправильний тип. Дозволені типи: {{ allowedTypes }}.',
        messageFileSizeExceededPlural: (params) => {
            const filesCount = params['filesCount'];
            const foldersCountOption = pluralization.process(filesCount);
            switch (foldersCountOption) {
                case 'one':
                    return '1 файл перевищує максимальний розмір файлу. Дозволений максимальний розмір файлу: {{ maxFileSize }}.';
                case 'few':
                    return `${filesCount} файли перевищують максимальний розмір файлу. Дозволений максимальний розмір файлу: {{ maxFileSize }}.`;
                default:
                    return `${
                        filesCount || 0
                    } файлів перевищують максимальний розмір файлу. Дозволений максимальний розмір файлу: {{ maxFileSize }}.`;
            }
        },
        messageFileSizeExceededSingular:
            'Файл "{{ fileName }}" перевищує максимальний розмір файлу. Дозволений максимальний розмір файлу: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural: (params) => {
            const filesCount = params['filesCount'];
            const foldersCountOption = pluralization.process(filesCount);
            switch (foldersCountOption) {
                case 'one':
                    return '1 файл перевищив максимальну довжину імені файлу. Дозволена довжина імені файлу: {{ maxFilenameLength }} символів.';
                case 'few':
                    return `${filesCount} файли перевищили максимальну довжину імені файлу. Дозволена довжина імені файлу: {{ maxFilenameLength }} символів.`;
                default:
                    return `${
                        filesCount || 0
                    } файлів перевищили максимальну довжину імені файлу. Дозволена довжина імені файлу: {{ maxFilenameLength }} символів.`;
            }
        },
        messageFileNameLengthExceededSingular:
            'Назва "{{ fileName }}" перевищує максимальну довжину імені файлу. Дозволена довжина імені файлу: {{ maxFilenameLength }} символів.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Редагувати'
    },
    fnSlider: {
        minMaxDetails: 'Мінімальне значення слайдера {{min}}, максимальне значення {{ max }}',
        valueminDetails: 'Поточне значення: {{ value }}',
        valuemaxDetails: 'Поточне значення: {{ value }}',
        valueNowDetails: 'Поточне значення: {{ value }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Прийняти',
        semanticDeclineLabel: 'Відхилити'
    }
};

/**
 * Pluralization for "file" word in ukrainian language
 *
 * Output samples:
 * * 1 файл
 * * 2 файли
 * * 10 файлів
 */
function fileNamePluralization(params: FdLanguageKeyArgs): string {
    const filesCount = params['filesCount'];
    const filesCountOption = pluralization.process(filesCount);
    switch (filesCountOption) {
        case 'one':
            return '1 файл';
        case 'few':
            return `${filesCount} файли`;
        default:
            return `${filesCount || 0} файлів`;
    }
}

/**
 * Pluralization for "folder" word in ukrainian language
 *
 * Outputs samples:
 * * 1 папку
 * * 2 папки
 * * 10 папок
 */
function folderNamePluralization(params: FdLanguageKeyArgs): string {
    const foldersCount = params['foldersCount'];
    const foldersCountOption = pluralization.process(foldersCount);
    switch (foldersCountOption) {
        case 'one':
            return '1 папку';
        case 'few':
            return `${foldersCount} папки`;
        default:
            return `${foldersCount || 0} папок`;
    }
}
