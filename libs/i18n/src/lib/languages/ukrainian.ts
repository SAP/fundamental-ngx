/* eslint-disable */
import { FdLanguage } from '../models/lang';
import { PluralizationSet1 } from './pluralization/set1';
const pluralization = new PluralizationSet1();

export const FD_LANGUAGE_UKRAINIAN: FdLanguage = {
    coreCalendar: {
        yearSelectionLabel: 'Оберіть рік',
        yearsRangeSelectionLabel: 'Оберіть діапазон років',
        monthSelectionLabel: 'Оберіть місяць',
        dateSelectionLabel: 'Оберіть дату',
        previousYearLabel: 'Попередній рік',
        nextYearLabel: 'Наступний рік',
        previousMonthLabel: 'Попередній місяць',
        nextMonthLabel: 'Наступний місяць',
        weekColumnLabel: 'Тиждень календаря',
        dateSelectedLabel: 'Вибрана дата',
        todayLabel: 'Сьогодні',
        rangeStartLabel: 'Початок діапазону',
        rangeEndLabel: 'Кінець діапазону',
        dayInPastLabel: 'Минулі дні',
        closeCalendarLabel: 'Закрити календар',
        calendarDayViewDescription: 'Календар',
        calendarMonthViewDescription: 'Вибір місяця',
        calendarYearsViewDescription: 'Вибір року',
        calendarYearsRangeViewDescription: 'Вибір діапазону років'
    },
    coreMultiComboBox: {
        multiComboBoxAriaLabel: 'Багатозначне поле зі списком',
        selectAllLabel: 'Вибрати все ({{selectedItems}} з {{totalItems}})'
    },
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
    coreDynamicPage: {
        expandLabel: 'Розгорнути заголовок',
        collapseLabel: 'Згорнути заголовок',
        pinLabel: 'Прикріпити заголовок',
        unpinLabel: 'Відкріпити заголовок'
    },
    coreFeedListItem: { moreLabel: 'Більше', lessLabel: 'Менше' },
    coreGridList: {
        filterBarCancelButtonTitle: 'Скасувати',
        listItemStatusAriaLabel: 'Елемент має статус. Статус: {{status}}.',
        listItemCounterAriaLabel: (params) => {
            return `Елемент має ${(() => {
                if (params['count'] === 1) {
                    return `один дочірній елемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} дочірніх елемента`;
                } else {
                    return `${params['count']} дочірніх елементів`;
                }
            })()}.`;
        },
        listItemButtonDetailsTitle: 'Подробиці',
        listItemButtonDeleteTitle: 'Видалити',
        listItemStatusContainsErrors: 'Містить помилки',
        listItemStatusLocked: 'Заблоковано',
        listItemStatusDraft: 'Чернетка'
    },
    coreMessageStrip: { dismissLabel: 'Закрити' },
    coreMultiInput: {
        multiInputAriaLabel: 'Multi Value Input',
        noResults: 'Немає результатів.',
        navigateSelectionsWithArrows: 'Навігація здійснюється за допомогою клавіш зі стрілками "вгору" та "вниз"',
        countListResultsSingular: '1 елемент.',
        countListResultsPlural: (params) => {
            return `${(() => {
                if (params['count'] === 1) {
                    return `1 елемент.`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} елементи.`;
                } else {
                    return `${params['count']} елементів.`;
                }
            })()}`;
        },
        escapeNavigateTokens:
            'Натисніть клавішу "Escape\\ щоб вийти з поля введення, і використовуйте клавіші зі стрілками "вліво" та "вправо" для навігації між вибраними параметрами.',
        tokensCountText: (params) => {
            return `${(() => {
                if (params['length'] == 0) {
                    return `Немає вибраних`;
                } else {
                    return `Обрано ${params['length']}`;
                }
            })()} ${(() => {
                if (params['length'] === 1) {
                    return `варіант`;
                }
                if (pluralization.process(params['length']) === 'few') {
                    return `варіанти`;
                } else {
                    return `варіантів`;
                }
            })()}.`;
        }
    },
    coreNavigation: { mainNavigation: 'Main Navigation', navigationPath: 'Navigation Path' },
    coreNestedList: {
        linkItemAriaLabel: 'Елемент дерева {{itemDetails}}, {{index}} із {{total}}{{selectedDescription}}'
    },
    coreOverflowLayout: {
        moreItemsButton: (params) => {
            return `Ще ${(() => {
                if (params['count'] === 1) {
                    return `елемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `елемента`;
                } else {
                    return `елементів`;
                }
            })()}`;
        }
    },
    corePagination: {
        pageLabel: 'Сторінка {{pageNumber}}',
        currentPageAriaLabel: 'Сторінка {{pageNumber}} є активною',
        labelBeforeInputMobile: 'Сторінка:',
        labelAfterInputMobile: 'із {{totalCount}}',
        inputAriaLabel: 'Поле вводу сторінки, Поточна сторінка, Сторінка {{pageNumber}} із {{totalCount}}',
        itemsPerPageLabel: 'Результатів на сторінці:',
        firstLabel: 'Перейти до першої',
        previousLabel: 'Перейти до попердньої',
        nextLabel: 'Перейти до наступної',
        lastLabel: 'Перейти до останньої',
        ariaLabel: 'Нумерація сторінок',
        totalResultsLabel: '{{totalCount}} результатів'
    },
    coreProductSwitch: { ariaLabel: 'Перемикач' },
    coreShellbar: { collapsedItemMenuLabel: 'Згорнуте меню елементів', cancel: 'Відміна', search: 'Пошук' },
    coreSlider: {
        singleMinMaxDetails: 'Мінімальне значення слайдера {{min}}, максимальне значення {{max}}',
        singleValueminDetails: 'Поточне значення: {{value}}',
        singleValuemaxDetails: 'Поточне значення: {{value}}',
        singleValueNowDetails: 'Поточне значення: {{value}}',
        multipleHandle1MinMaxDetails: 'Мінімальне значення слайдера {{min}}, максимальне значення {{max}}',
        multipleHandle1ValueminDetails: 'Поточне значення: {{value}}',
        multipleHandle1ValuemaxDetails: 'Поточне значення: {{value}}',
        multipleHandle1ValueNowDetails: 'Поточне значення: {{value}}',
        multipleHandle2MinMaxDetails: 'Мінімальне значення слайдера {{min}}, максимальне значення {{max}}',
        multipleHandle2ValueminDetails: 'Поточне значення: {{value}}',
        multipleHandle2ValuemaxDetails: 'Поточне значення: {{value}}',
        multipleHandle2ValueNowDetails: 'Поточне значення: {{value}}'
    },
    coreSplitButton: { expandButtonAriaLabel: 'Більше дій', arialLabel: 'Кнопка розділення' },
    coreSplitter: { paginationItemAriaLabel: 'Секція' },
    coreStepInput: {
        incrementButtonTitle: 'Збільшити',
        decrementButtonTitle: 'Зменшити',
        ariaRoleDescription: 'Крок вводу'
    },
    coreSwitch: { semanticAcceptLabel: 'Прийняти', semanticDeclineLabel: 'Відхилити' },
    coreTabs: { tabListExpandButtonText: 'Більше' },
    coreText: { moreLabel: 'Більше', lessLabel: 'Менше' },
    coreTime: {
        componentAriaName: 'Вибір часу',
        increaseHoursLabel: 'Збільшити години',
        hrsLabel: 'Год',
        decreaseHoursLabel: 'Decrease hours',
        increaseMinutesLabel: 'Increase minutes',
        minLabel: 'Min',
        decreaseMinutesLabel: 'Decrease minutes',
        increaseSecondsLabel: 'Increase seconds',
        secLabel: 'Sec',
        hoursLabel: 'Hours',
        minutesLabel: 'Minutes',
        secondsLabel: 'Seconds',
        decreaseSecondsLabel: 'Зменшити секунди',
        increasePeriodLabel: 'Збільшити період',
        periodLabel: 'Період',
        decreasePeriodLabel: 'Зменшити період',
        navigationInstruction:
            'Щоб переміщатися між елементами в цьому списку, використовуйте стрілку вверх або вниз. Для переключення між списками використовуйте стрілку вліво або вправо.'
    },
    coreTimePicker: { timePickerInputLabel: 'Поле вводу часу', timePickerButtonLabel: 'Відкрити вікно вибору' },
    coreToken: { deleteButtonLabel: 'Може бути видаленим', ariaRoleDescription: 'токен' },
    coreTokenizer: {
        moreLabel: (params) => {
            return `Ще ${(() => {
                if (params['count'] === 1) {
                    return `${params['count']} елемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} елемента`;
                } else {
                    return `${params['count']} елементів`;
                }
            })()}`;
        },
        tokenizerLabel: 'Tokenizer'
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
    coreWizard: { ariaLabel: 'Майстер' },
    coreBreadcrumb: {
        overflowTitleMore: 'Щоб переглянути докладнішу інформацію, клікніть або натисніть клавішу Enter'
    },
    platformActionBar: { backButtonLabel: 'Повернутися назад' },
    platformApprovalFlow: {
        addNodeButtonTitle: 'Додати',
        nodeMenuButtonTitle: 'Меню',
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
            return `${(() => {
                if (params['count'] === 1) {
                    return `1 член`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} члена`;
                } else {
                    return `${params['count']} членів`;
                }
            })()} команди`;
        },
        nodeVariousTeams: 'Різні команди',
        nodeStatusDueToday: 'Термін виконання сьогодні',
        nodeStatusDueInXDays: (params) => {
            return `Термін виконання через ${(() => {
                if (params['count'] === 1) {
                    return `1 день`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} дні`;
                } else {
                    return `${params['count']} днів`;
                }
            })()}`;
        },
        nodeStatusXDaysOverdue: (params) => {
            return `Прострочено на ${(() => {
                if (params['count'] === 1) {
                    return `1 день`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} дні`;
                } else {
                    return `${params['count']} днів`;
                }
            })()}`;
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
            return `Вибрано ${(() => {
                if (params['count'] === 1) {
                    return `1 елемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} елемента`;
                } else {
                    return `${params['count']} елементів`;
                }
            })()}`;
        },
        statusApproved: 'затверджено',
        statusRejected: 'відхилено',
        statusInProgress: 'в процесі',
        statusNotStarted: 'не розпочато'
    },
    platformFeedInput: { userTitle: 'Користувач' },
    platformVHD: {
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
        selectTabDisplayCountLabel: 'Елементи ({{count}})',
        selectTabMoreBtnLabel: 'Більше',
        selectTabCountHiddenA11yLabel: (params) => {
            return `містить ${(() => {
                if (params['rowCount'] === 1) {
                    return `1 ряд`;
                }
                if (pluralization.process(params['rowCount']) === 'few') {
                    return `${params['rowCount']} ряди`;
                } else {
                    return `${params['rowCount']} рядів`;
                }
            })()} і ${(() => {
                if (params['colCount'] === 1) {
                    return `1 колонку`;
                }
                if (pluralization.process(params['colCount']) === 'few') {
                    return `${params['colCount']} колонки`;
                } else {
                    return `${params['colCount']} колонок`;
                }
            })()}`;
        },
        selectMobileTabBackBtnTitle: 'Назад',
        selectMobileTabBtnOpenDialogLabel: 'Відкрити діалогове вікно',
        selectMobileTabTitle: '{{title}} вкладка',
        selectMobileConditionEmpty: 'Пусто',
        defineConditionTitle: 'Продукт',
        defineConditionSelectedValueHiddenA11yLabel: 'вибране значення {{value}}',
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
            return `Введіть значення не більше ніж ${(() => {
                if (params['count'] === 1) {
                    return `1 символ`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} символи`;
                } else {
                    return `${params['count']} символів`;
                }
            })()}`;
        },
        selectTabTitle: 'Вибрати зі списку',
        searchTableEmptyMessage: 'Використовуйте пошук, щоб отримати результати',
        defineTabTitle: 'Визначити умови'
    },
    platformCombobox: {
        countListResultsSingular: '1 елемент',
        countListResultsPlural: (params) => {
            return `${(() => {
                if (params['count'] === 1) {
                    return `1 елемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} елементи`;
                } else {
                    return `${params['count']} елементів`;
                }
            })()}`;
        }
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Вибрати опції',
        inputIconTitle: 'Вибрати опції',
        mobileShowAllItemsButton: 'Показати всі елементи',
        mobileShowSelectedItemsButton: 'Показати вибрані елементи',
        invalidEntryError: 'Invalid Entry'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: 'Перевищено ліміт на 1 символ',
        counterMessageCharactersOverTheLimitPlural: (params) => {
            return `Перевищено ліміт на ${(() => {
                if (params['count'] === 1) {
                    return `1 символ`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} символи`;
                } else {
                    return `${params['count']} символів`;
                }
            })()}`;
        },
        counterMessageCharactersRemainingSingular: 'Залишився 1 символ',
        counterMessageCharactersRemainingPlural: (params) => {
            return `Залишилось ${(() => {
                if (params['count'] === 1) {
                    return `1 символ`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} символи`;
                } else {
                    return `${params['count']} символів`;
                }
            })()}`;
        }
    },
    platformLink: { roleDescriptionWithMedia: 'Медіа: {{media}}' },
    platformList: { loadingAriaLabel: 'завантаження' },
    platformObjectListItem: { detailsActionAriaLabel: 'деталі', deleteActionAriaLabel: 'видалити' },
    platformStandardListItem: { detailsActionAriaLabel: 'деталі', deleteActionAriaLabel: 'видалити' },
    platformSearchField: {
        clearButtonTitle: 'Очистити',
        submitButtonTitle: 'Пошук',
        searchInputLabel: 'Пошук',
        synchronizeButtonTitle: 'Синхронізувати',
        searchSuggestionMessage: (params) => {
            return `Знайдено ${(() => {
                if (params['count'] === 1) {
                    return `1 варіант`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} варіанти`;
                } else {
                    return `${params['count']} варіантів`;
                }
            })()}`;
        },
        searchSuggestionNavigateMessage: 'використовуйте стрілки вгору та вниз для навігації'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Пошук',
        submitButtonLabel: 'Перейти',
        filtersButtonLabel: 'Фільтри ({{filtersCount}})',
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
        settingsCategoryMandatory: "Обов'язкові",
        manageFieldConditions: 'Показати умови для поля',
        refreshButtonAriaLabel: 'Оновити'
    },
    platformTable: {
        headerMenuSortAsc: 'Сортувати за зростанням',
        headerMenuSortDesc: 'Сортувати за спаданням',
        headerMenuGroup: 'Сгрупувати',
        headerMenuFreeze: 'Заблокувати стовпець',
        headerMenuEndFreeze: 'Заблокувати до кінця',
        headerMenuUnfreeze: 'Розблокувати стовпець',
        headerMenuFreezePlural: 'Заблокувати стовпці',
        headerMenuUnfreezePlural: 'Розблокувати стовпці',
        headerMenuFilter: 'Фільтр',
        defaultEmptyMessage: 'Нічого не знайдено',
        emptyCell: 'Empty',
        noVisibleColumnsMessage:
            'На даний момент у таблиці немає видимих стовпців. Виберіть потрібні стовпці в налаштуваннях таблиці.',
        resetChangesButtonLabel: 'Скинути',
        editableCellNumberPlaceholder: 'Введіть значення',
        editableCellDatePlaceholder: 'Введіть значення',
        editableCellStringPlaceholder: 'Введіть значення',
        P13ColumnsDialogHeader: 'Стовпці',
        P13ColumnsDialogSearchPlaceholder: 'Пошук',
        P13ColumnsDialogsShowSelected: 'Показати вибране',
        P13ColumnsDialogShowAll: 'Показати все',
        P13ColumnsDialogSelectAll: 'Вибрати всі ({{selectedColumnsCount}}/{{selectableColumnsCount}})',
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
        P13FilterBooleanOptionNotDefined: '',
        P13FilterBooleanOptionTrue: 'Так',
        P13FilterBooleanOptionFalse: 'Ні',
        P13FilterDialogHeader: 'Фільтрувати за',
        P13FilterDialogIncludePanelTitleWithCount: 'Включні умови ({{count}})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Включні умови',
        P13FilterDialogExcludePanelTitleWithCount: 'Виключні умови ({{count}})',
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
        toolbarActionExpandAllButtonTitle: 'Expand all',
        toolbarActionCollapseAllButtonTitle: 'Collapse all',
        filterDialogNotFilteredLabel: '(Не відфільтровано)',
        filterDialogFilterByLabel: 'Фільтрувати за: {{filterLabel}}',
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
        sortDialogCancelBtnLabel: 'Скасувати',
        selectAllCheckboxLabel: 'Вибрати все',
        deselectAllCheckboxLabel: 'Deselect all',
        deselectSingleRow: 'Щоб скасувати вибір, натисніть пробіл',
        selectSingleRow: 'Щоб вибрати рядок, натисніть пробіл'
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
            `Не вдалося видалити ${(() => {
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
            })()} і ${(() => {
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
            })()}.`,
        messageRemoveFoldersAndFilesSuccess: (params) =>
            `${(() => {
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
            })()} і ${(() => {
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
            })()} видалено.`,
        messageRemoveFoldersFailed: (params) =>
            `Не вдалося видалити ${(() => {
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
            })()}.`,
        messageRemoveFoldersSuccess: (params) =>
            `Видалено ${(() => {
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
            })()}.`,
        messageRemoveFilesFailed: (params) =>
            `Не вдалося видалити ${(() => {
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
            })()}.`,
        messageRemoveFilesSuccess: (params) =>
            `Видалено ${(() => {
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
            })()}.`,
        messageRemoveFileOrFolderFailed: 'Не вдалося видалити {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} видалено.',
        messageMoveFoldersAndFilesFailed: (params) =>
            `Не вдалося перемістити ${(() => {
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
            })()} і ${(() => {
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
            })()} до {{ to }}.`,
        messageMoveFoldersAndFilesSuccess: (params) =>
            `${(() => {
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
            })()} і ${(() => {
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
            })()} переміщено в {{ to }}.`,
        messageMoveFoldersFailed: (params) =>
            `Не вдалося перемістити ${(() => {
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
            })()} до {{ to }}.`,
        messageMoveFoldersSuccess: (params) =>
            `${(() => {
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
            })()} переміщено до {{ to }}.`,
        messageMoveFilesFailed: (params) =>
            `Не вдалося перемістити ${(() => {
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
            })()} до {{ to }}.`,
        messageMoveFilesSuccess: (params) =>
            `${(() => {
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
            })()} переміщено до {{ to }}.`,
        messageMoveFileOrFolderFailed: 'Не вдалося перемістити {{ name }} до {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} переміщено в {{ to }}.',
        messageMoveRootFoldersAndFilesFailed: (params) =>
            `Не вдалося перемістити ${(() => {
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
            })()} і ${(() => {
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
            })()} до всіх файлів.`,
        messageMoveRootFoldersAndFilesSuccess: (params) =>
            `${(() => {
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
            })()} і ${(() => {
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
            })()} переміщено до всіх файлів.`,
        messageMoveRootFoldersFailed: (params) =>
            `Не вдалося перемістити ${(() => {
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
            })()} до всіх файлів.`,
        messageMoveRootFoldersSuccess: (params) =>
            `${(() => {
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
            })()} переміщено до всіх файлів.`,
        messageMoveRootFilesFailed: (params) =>
            `Не вдалося перемістити ${(() => {
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
            })()} до всіх файлів.`,
        messageMoveRootFilesSuccess: (params) =>
            `${(() => {
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
            })()} переміщено до всіх файлів.`,
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
    platformWizardGenerator: { summarySectionEditStep: 'Редагувати' },
    platformMessagePopover: {
        allErrors: 'Всі',
        defaultErrors: {
            email: 'Значення поля не відповідає формату E-mail',
            max: 'Значення поля перевищує максимально допустиме',
            maxLength: 'Довжина значення поля перевищує максимально допустиме',
            min: 'Значення поля менше мінімально допустимого',
            minLength: 'Довжина значення поля менше максимально допустимого',
            pattern: 'Поле не відповідає формату',
            required: "Обов'язкове поле",
            requiredTrue: "Обов'язкове поле"
        }
    },
    platformVariantManagement: {
        manage: 'Управління',
        saveAs: 'Зберегти як',
        saveView: 'Зберегти Вид',
        save: 'Зберегти',
        myViews: 'Мої Види',
        view: 'Вид',
        setAsDefault: 'Встановити за замовчуванням',
        public: 'Публічний',
        applyAutomatically: 'Застосовувати автоматично',
        requiredFieldError: "Обов'язкове поле.",
        nameTakenFieldError: "Вид з таким ім'ям вже існує. Введіть інше ім'я.",
        cancel: 'Скасувати',
        manageViews: 'Управління видами',
        markAsFavourite: 'Позначити як обране',
        sharing: 'Спільне використання',
        default: 'За замовчуванням',
        createdBy: 'Створив(ла)',
        removeVariant: 'Видалити вид',
        search: 'Пошук',
        access: { public: 'Публічне', private: 'Приватне' }
    },
    platformSelect: { selectOptionLabel: 'Виберіть опцію' },
    fnSlider: {
        minMaxDetails: 'Мінімальне значення слайдера {{min}}, максимальне значення {{ max }}',
        valueminDetails: 'Поточне значення: {{ value }}',
        valuemaxDetails: 'Поточне значення: {{ value }}',
        valueNowDetails: 'Поточне значення: {{ value }}'
    },
    fnSwitch: { semanticAcceptLabel: 'Прийняти', semanticDeclineLabel: 'Відхилити' },
    coreTree: { expand: 'Розгорнути вузол', collapse: 'Згорнути вузол', noData: 'Немає даних' }
};
