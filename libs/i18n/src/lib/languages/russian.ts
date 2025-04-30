/* eslint-disable */
import { FdLanguage } from '../models/lang';
import { PluralizationSet1 } from './pluralization/set1';
const pluralization = new PluralizationSet1();

export const FD_LANGUAGE_RUSSIAN: FdLanguage = {
    coreCalendar: {
        yearSelectionLabel: 'Выбрать год',
        yearsRangeSelectionLabel: 'Выбрать диапазон лет',
        monthSelectionLabel: 'Выбрать месяц',
        dateSelectionLabel: 'Выбрать дату',
        previousYearLabel: 'Предыдущий год',
        nextYearLabel: 'Следующий год',
        previousMonthLabel: 'Предыдущий месяц',
        nextMonthLabel: 'Следующий месяц',
        weekColumnLabel: 'Неделя календаря',
        dateSelectedLabel: 'Выбранная дата',
        todayLabel: 'Сегодня',
        rangeStartLabel: 'Начало диапазона',
        rangeEndLabel: 'Конец диапазона',
        dayInPastLabel: 'Прошедшие дни',
        closeCalendarLabel: 'Закрыть календарь',
        calendarDayViewDescription: 'Календарь',
        calendarMonthViewDescription: 'Выбор месяца',
        calendarYearsViewDescription: 'Выбор года',
        calendarYearsRangeViewDescription: 'Выбор диапазона лет'
    },
    coreMultiComboBox: {
        multiComboBoxAriaLabel: 'Поле со списком с несколькими значениями',
        selectAllLabel: 'Выбрать все ({{selectedItems}} из {{totalItems}})'
    },
    coreCarousel: {
        leftNavigationBtnLabel: 'Перейти к предыдущему элементу',
        rightNavigationBtnLabel: 'Перейти к следующему элементу'
    },
    coreDatePicker: {
        dateInputLabel: 'Поле ввода даты',
        dateRangeInputLabel: 'Поле ввода диапазона дат',
        displayCalendarToggleLabel: 'Открыть средство выбора',
        valueStateSuccessMessage: 'Значение состояния: Успех',
        valueStateInformationMessage: 'Значение состояния: Информационное',
        valueStateWarningMessage: 'Значение состояния: Предупреждение',
        valueStateErrorMessage: 'Значение состояния: Ошибка'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Поле ввода даты и времени',
        displayDatetimeToggleLabel: 'Показать календарь',
        displayTypeDateLabel: 'Дата',
        displayTypeTimeLabel: 'Время',
        datetimeOkLabel: 'ОК',
        datetimeCancelLabel: 'Отменить'
    },
    coreDynamicPage: {
        expandLabel: 'Развернуть заголовок',
        collapseLabel: 'Свернуть заголовок',
        pinLabel: 'Закрепить заголовок',
        unpinLabel: 'Открепить заголовок'
    },
    coreFeedListItem: { moreLabel: 'Больше', lessLabel: 'Меньше' },
    coreGridList: {
        filterBarCancelButtonTitle: 'Отмена',
        listItemStatusAriaLabel: 'Элемент имеет статус. Статус: {{status}}.',
        listItemCounterAriaLabel: (params) => {
            return `Элемент имеет ${(() => {
                if (params['count'] === 1) {
                    return `1 дочерний элемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} дочерних элемента`;
                } else {
                    return `${params['count']} дочерних элементов`;
                }
            })()}.`;
        },
        listItemButtonDetailsTitle: 'Подробности',
        listItemButtonDeleteTitle: 'Удалить',
        listItemStatusContainsErrors: 'Содержит ошибки',
        listItemStatusLocked: 'Заблокировано',
        listItemStatusDraft: 'Черновик'
    },
    coreMessageStrip: { dismissLabel: 'Закрыть' },
    coreMultiInput: {
        multiInputAriaLabel: 'Multi Value Input',
        noResults: 'No results.',
        navigateSelectionsWithArrows: 'Navigate selections with the up and down arrows.',
        countListResultsSingular: '1 элемент.',
        countListResultsPlural: (params) => {
            return `${(() => {
                if (params['count'] === 1) {
                    return `1 элемент.`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} элемента.`;
                } else {
                    return `${params['count']} элементов.`;
                }
            })()}`;
        },
        escapeNavigateTokens:
            'Press escape to exit the input field and use the left and right arrow keys to navigate through the selected options.',
        tokensCountText: (params) => {
            return `${(() => {
                if (params['length'] == 0) {
                    return `Нет выбранных`;
                }
                if (params['length'] === 1) {
                    return `Выбран 1`;
                } else {
                    return `Выбрано ${params['length']}`;
                }
            })()} ${(() => {
                if (params['length'] === 1) {
                    return ` вариант `;
                }
                if (pluralization.process(params['length']) === 'few') {
                    return ` варианта `;
                } else {
                    return ` вариантов `;
                }
            })()}.`;
        }
    },
    coreNavigation: { mainNavigation: 'Главная Навигация', navigationPath: 'Путь навигации' },
    coreNestedList: {
        linkItemAriaLabel: 'Элемент дерева {{itemDetails}}, {{index}} из {{total}}{{selectedDescription}}'
    },
    coreOverflowLayout: {
        moreItemsButton: (params) => {
            return `Еще ${(() => {
                if (params['count'] === 1) {
                    return `1 елемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} елемента`;
                } else {
                    return `${params['count']} елементов`;
                }
            })()}`;
        }
    },
    corePagination: {
        pageLabel: 'Страница {{pageNumber}}',
        currentPageAriaLabel: 'Страница {{pageNumber}} активна',
        labelBeforeInputMobile: 'Страница:',
        labelAfterInputMobile: 'из {{totalCount}}',
        inputAriaLabel: 'Поле ввода страницы, Текущая страница, Страница {{pageNumber}} из {{totalCount}}',
        itemsPerPageLabel: 'Результатов на странице:',
        firstLabel: 'Перейти к первой',
        previousLabel: 'Перейти к предыдущей',
        nextLabel: 'Перейти к следующей',
        lastLabel: 'Перейти к последней',
        ariaLabel: 'Нумерация страниц',
        totalResultsLabel: '{{totalCount}} результатов'
    },
    coreProductSwitch: { ariaLabel: 'Переключатель' },
    coreShellbar: { collapsedItemMenuLabel: 'Свернутое меню элементов', cancel: 'Отмена', search: 'Поиск' },
    coreSlider: {
        singleMinMaxDetails: 'Минимальное значение слайдера {{min}}, максимальное значение {{max}}',
        singleValueminDetails: 'Значение равно {{value}}',
        singleValuemaxDetails: 'Значение равно {{value}}',
        singleValueNowDetails: 'Текущее значение: {{value}}',
        multipleHandle1MinMaxDetails: 'Минимальное значение слайдера {{min}}, максимальное значение {{max}}',
        multipleHandle1ValueminDetails: 'Значение равно {{value}}',
        multipleHandle1ValuemaxDetails: 'Значение равно {{value}}',
        multipleHandle1ValueNowDetails: 'Текущее значение: {{value}}',
        multipleHandle2MinMaxDetails: 'Минимальное значение слайдера {{min}}, максимальное значение {{max}}',
        multipleHandle2ValueminDetails: 'Значение равно {{value}}',
        multipleHandle2ValuemaxDetails: 'Значение равно {{value}}',
        multipleHandle2ValueNowDetails: 'Текущее значение: {{value}}'
    },
    coreSplitButton: { expandButtonAriaLabel: 'Больше действий', arialLabel: 'Кнопка разделения' },
    coreSplitter: { paginationItemAriaLabel: 'Секция' },
    coreStepInput: {
        incrementButtonTitle: 'Увеличить',
        decrementButtonTitle: 'Уменьшить',
        ariaRoleDescription: 'Шаг ввода'
    },
    coreSwitch: { semanticAcceptLabel: 'Принять', semanticDeclineLabel: 'Отклонить' },
    coreTabs: { tabListExpandButtonText: 'Больше' },
    coreText: { moreLabel: 'Больше', lessLabel: 'Меньше' },
    coreTime: {
        componentAriaName: 'Выбор времени',
        increaseHoursLabel: 'Увеличить часы',
        hrsLabel: 'Час',
        decreaseHoursLabel: 'Decrease hours',
        increaseMinutesLabel: 'Increase minutes',
        minLabel: 'Min',
        decreaseMinutesLabel: 'Decrease minutes',
        increaseSecondsLabel: 'Increase seconds',
        secLabel: 'Sec',
        hoursLabel: 'Hours',
        minutesLabel: 'Minutes',
        secondsLabel: 'Seconds',
        decreaseSecondsLabel: 'Уменьшить секунды',
        increasePeriodLabel: 'Увеличить период',
        periodLabel: 'Период',
        decreasePeriodLabel: 'Уменьшить период',
        navigationInstruction:
            'Для перемещения между элементами в этом списке используйте стрелку вверх или вниз. Для переключения между списками используйте стрелку влево или вправо.'
    },
    coreTimePicker: { timePickerInputLabel: 'Поле ввода времени', timePickerButtonLabel: 'Открыть окно выбора' },
    coreToken: { deleteButtonLabel: 'Удаляемый', ariaRoleDescription: 'токен' },
    coreTokenizer: {
        moreLabel: (params) => {
            return `Еще ${(() => {
                if (params['count'] === 1) {
                    return `1 елемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} елемента`;
                } else {
                    return `${params['count']} елементов`;
                }
            })()}`;
        },
        tokenizerLabel: 'Tokenizer'
    },
    coreUploadCollection: {
        menuOkText: 'ОК',
        menuCancelText: 'Отменить',
        menuEditAriaLabel: 'Редактировать',
        menuDeleteAriaLabel: 'Удалить',
        menuOkAriaLabel: 'Редактировать',
        menuCancelAriaLabel: 'Отменить',
        formItemPlaceholder: 'Имя файла'
    },
    coreWizard: { ariaLabel: 'Мастер' },
    coreBreadcrumb: { overflowTitleMore: 'Щелкните или нажмите Enter, чтобы просмотреть подробности' },
    platformActionBar: { backButtonLabel: 'Вернуться назад' },
    platformApprovalFlow: {
        addNodeButtonTitle: 'Добавить',
        nodeMenuButtonTitle: 'Меню',
        defaultWatchersLabel: 'Наблюдатели',
        defaultTitle: 'Процесс утверждения',
        nextButtonAriaLabel: 'Перейти к следующему слайд',
        prevButtonAriaLabel: 'Перейти к предыдущему слайду',
        editModeSaveButtonLabel: 'Сохранить',
        editModeExitButtonLabel: 'Выйти',
        emptyTitle: 'Начать добавлять утверждающих и наблюдателей',
        emptyHint:
            'Чтобы добавить утверждающих, нажмите "Добавить шаг". Чтобы добавить наблюдателей, нажмите поле Наблюдатели.',
        addNodeDialogHeaderAddApprovers: 'Добавить утверждающего',
        addNodeDialogHeaderEditApprover: 'Редактировать утверждающего',
        addNodeDialogHeaderAddApproverTeam: 'Пользователь/Команда',
        addNodeDialogHeaderDetail: 'Детали',
        addNodeDialogNodeType: 'Параллельный или последовательный',
        addNodeDialogNodeTypeSerial: 'Последовательный',
        addNodeDialogNodeTypeParallel: 'Параллельный',
        addNodeDialogApproverType: 'Тип утверждающего',
        addNodeDialogApproverTypeUser: 'Пользователь',
        addNodeDialogApproverTypeTeamAnyone: 'Любой из команды',
        addNodeDialogApproverTypeTeamEveryone: 'Все в команде',
        addNodeDialogUserOrTeam: 'Пользователь/Команда',
        addNodeDialogAddToNext: 'Добавить в следующий последовательный узел',
        addNodeDialogDueDate: 'Дата выполнения',
        addNodeSearchPlaceholder: 'Поиск',
        addNodeAddActionBtnLabel: 'Добавить',
        addNodeCancelActionBtnLabel: 'Отмена',
        addNodeSelectApproverActionBtnLabel: 'Выбрать',
        addNodeCancelApproverSelectionActionBtnLabel: 'Выйти',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Закрыть',
        userDetailsHeader: 'Детали',
        userDetailsSendReminderBtnLabel: 'Отправить напоминание',
        userDetailsCancelBtnLabel: 'Отменить',
        messagesApproverAddedSuccess: '1 утверждающий добавлен',
        messagesTeamAddedSuccess: '1 команда добавлена',
        messagesNodeEdited: '1 утверждающий отредактирован',
        messagesNodeRemovedSingular: '1 утверждающий удален',
        messagesNodeRemovedPlural: 'Утверждающие удалены',
        messagesTeamRemoved: '1 команда удалена',
        messagesErrorBuildGraph: 'При попытке построить график произошла ошибка. Проверьте входящие данные.',
        messagesUndoAction: 'Отменить',
        nodeMembersCount: (params) => {
            return `${(() => {
                if (params['count'] === 1) {
                    return `1 член`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} члена`;
                } else {
                    return `${params['count']} членов`;
                }
            })()} команды`;
        },
        nodeVariousTeams: 'Различные команды',
        nodeStatusDueToday: 'Срок выполнения сегодня',
        nodeStatusDueInXDays: (params) => {
            return `Срок выполнения через ${(() => {
                if (params['count'] === 1) {
                    return `1 день`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} дня`;
                } else {
                    return `${params['count']} дней`;
                }
            })()}`;
        },
        nodeStatusXDaysOverdue: (params) => {
            return `Просрочено на ${(() => {
                if (params['count'] === 1) {
                    return `1 день`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} дня`;
                } else {
                    return `${params['count']} дней`;
                }
            })()}`;
        },
        nodeActionAddApproversBefore: 'Добавить утверждающих до',
        nodeActionAddApproversAfter: 'Добавить утверждающих после',
        nodeActionAddApproversParallel: 'Добавить параллельных утверждающих',
        nodeActionEditApprover: 'Редактировать утверждающего',
        nodeActionRemove: 'Удалить',
        selectTypeDialogMoveApproverAs: 'Переместить утверждающего как',
        selectTypeDialogParallelOrSerial: 'Параллельный или последовательный',
        selectTypeDialogNodeTypeParallel: 'Параллельный утверждающий',
        selectTypeDialogNodeTypeSerial: 'Последовательный утверждающий',
        selectTypeDialogConfirmButton: 'Подтвердить',
        selectTypeDialogCancelButton: 'Отмена',
        toolbarAddStepButton: 'Добавить шаг',
        toolbarEditButton: 'Редактировать',
        toolbarAddApproversBefore: 'Добавить утверждающих до',
        toolbarAddApproversAfter: 'Добавить утверждающих после',
        toolbarAddApproversParallel: 'Добавить параллельных утверждающих',
        toolbarRemove: 'Удалить',
        toolbarEditApprover: 'Редактировать утверждающего',
        watchersInputPlaceholder: 'Поиск',
        userListSelectedItemsCountSingular: 'Выбран 1 элемент',
        userListSelectedItemsCountPlural: (params) => {
            return `Выбрано ${(() => {
                if (params['count'] === 1) {
                    return `1 элемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} элемента`;
                } else {
                    return `${params['count']} элементов`;
                }
            })()}`;
        },
        statusApproved: 'утверждено',
        statusRejected: 'отклонено',
        statusInProgress: 'в процессе',
        statusNotStarted: 'не начато'
    },
    platformFeedInput: { userTitle: 'Пользователь' },
    platformVHD: {
        selectedAndConditionLabel: 'Выбранные элементы и условия',
        footerClearSelectedTitle: 'очистить выбранные элементы',
        footerClearSelectedAriaLabel: 'очистить выбранные элементы',
        searchButtonLabel: 'Поиск',
        successButtonLabel: 'ОК',
        cancelButtonLabel: 'Отменить',
        selectedEmptyLabel: 'Не выбрано никаких элементов или условий',
        searchPlaceholder: 'Поиск',
        searchAdvancedSearchLabel: 'Фильтры',
        searchShowAdvancedSearchLabel: 'Показать фильтры',
        searchHideAdvancedSearchLabel: 'Скрыть фильтры',
        searchShowAllAdvancedSearchLabel: 'Показать все фильтры',
        searchHideAllAdvancedSearchLabel: 'Скрыть все фильтры',
        selectTabDisplayCountLabel: 'Элементы ({{count}})',
        selectTabMoreBtnLabel: 'Больше',
        selectTabCountHiddenA11yLabel: (params) => {
            return `содержит ${(() => {
                if (params['rowCount'] === 1) {
                    return `1 строку`;
                }
                if (pluralization.process(params['rowCount']) === 'few') {
                    return `${params['rowCount']} строки`;
                } else {
                    return `${params['rowCount']} строк`;
                }
            })()} и ${(() => {
                if (params['colCount'] === 1) {
                    return `1 столбец`;
                }
                if (pluralization.process(params['colCount']) === 'few') {
                    return `${params['colCount']} столбца`;
                } else {
                    return `${params['colCount']} столбцов`;
                }
            })()}`;
        },
        selectMobileTabBackBtnTitle: 'Назад',
        selectMobileTabBtnOpenDialogLabel: 'Открыть диалоговое окно',
        selectMobileTabTitle: '{{title}} вкладка',
        selectMobileConditionEmpty: 'Пусто',
        defineConditionTitle: 'Продукт',
        defineConditionSelectedValueHiddenA11yLabel: 'выбранное значение {{value}}',
        defineConditionConditionsGroupHeaderInclude: 'Включающие условия',
        defineConditionConditionsGroupHeaderExclude: 'Исключительные условия',
        defineConditionFromPlaceholder: 'от',
        defineConditionToPlaceholder: 'до',
        defineConditionValuePlaceholder: 'значение',
        defineConditionRemoveConditionButtonTitle: 'Удалить условие',
        defineConditionAddConditionButtonLabel: 'Добавить',
        defineConditionAddConditionButtonTitle: 'Добавить условие',
        defineConditionConditionStrategyLabelContains: 'содержит',
        defineConditionConditionStrategyLabelEqualTo: 'равно',
        defineConditionConditionStrategyLabelBetween: 'между',
        defineConditionConditionStrategyLabelStartsWith: 'начинается с',
        defineConditionConditionStrategyLabelEndsWith: 'заканчивается на',
        defineConditionConditionStrategyLabelLessThan: 'меньше чем',
        defineConditionConditionStrategyLabelLessThanEqual: 'меньше чем или равно',
        defineConditionConditionStrategyLabelGreaterThan: 'больше чем',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'больше чем или равно',
        defineConditionConditionStrategyLabelEmpty: 'пусто',
        defineConditionConditionStrategyLabelNotEqualTo: 'не равно',
        defineConditionConditionStrategyLabelNotEmpty: 'не пусто',
        defineConditionMaxCountError: (params) => {
            return `Введите значение не более ${(() => {
                if (params['count'] === 1) {
                    return `1 символа`;
                } else {
                    return `${params['count']} символов`;
                }
            })()}`;
        },
        selectTabTitle: 'Выбрать из списка',
        searchTableEmptyMessage: 'Используйте поиск для получения результатов',
        defineTabTitle: 'Определить условия'
    },
    platformCombobox: {
        countListResultsSingular: '1 элемент',
        countListResultsPlural: (params) => {
            return `${(() => {
                if (params['count'] === 1) {
                    return `1 элемент`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} элемента`;
                } else {
                    return `${params['count']} элементов`;
                }
            })()}`;
        }
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Выбрать опции',
        inputIconTitle: 'Выбрать опции',
        mobileShowAllItemsButton: 'Показать все элементы',
        mobileShowSelectedItemsButton: 'Показать выбранные элементы',
        invalidEntryError: 'Invalid Entry'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: 'Превышен лимит на 1 символ',
        counterMessageCharactersOverTheLimitPlural: (params) => {
            return `Превышен лимит на ${(() => {
                if (params['count'] === 1) {
                    return `1 символ`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `${params['count']} символа`;
                } else {
                    return `${params['count']} символов`;
                }
            })()}`;
        },
        counterMessageCharactersRemainingSingular: 'Остался 1 символ',
        counterMessageCharactersRemainingPlural: (params) => {
            return `${(() => {
                if (params['count'] === 1) {
                    return `Остался 1 символ`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `Осталось ${params['count']} символа`;
                } else {
                    return `Осталось ${params['count']} символов`;
                }
            })()}`;
        }
    },
    platformLink: { roleDescriptionWithMedia: 'Медиа: {{media}}' },
    platformList: { loadingAriaLabel: 'загрузка' },
    platformObjectListItem: { detailsActionAriaLabel: 'детали', deleteActionAriaLabel: 'удалить' },
    platformStandardListItem: { detailsActionAriaLabel: 'детали', deleteActionAriaLabel: 'удалить' },
    platformSearchField: {
        clearButtonTitle: 'Очистить',
        submitButtonTitle: 'Поиск',
        searchInputLabel: 'Поиск',
        synchronizeButtonTitle: 'Синхронизировать',
        searchSuggestionMessage: (params) => {
            return `${(() => {
                if (params['count'] === 1) {
                    return `Найден 1 вариант`;
                }
                if (pluralization.process(params['count']) === 'few') {
                    return `Найдено ${params['count']} варианта`;
                } else {
                    return `Найдено ${params['count']} вариантов`;
                }
            })()}`;
        },
        searchSuggestionNavigateMessage: 'используйте стрелки вверх и вниз для навигации'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Поиск',
        submitButtonLabel: 'Перейти',
        filtersButtonLabel: 'Фильтры ({{filtersCount}})',
        showFiltersButtonLabel: 'Показать фильтры',
        hideFiltersButtonLabel: 'Скрыть фильтры',
        defineConditionsRemoveConditionButtonTitle: 'Удалить условие',
        defineConditionsAddConditionButtonLabel: 'Добавить условие',
        defineConditionsSubmitButtonLabel: 'Перейти',
        defineConditionsCancelButton: 'Отменить',
        selectFiltersHeader: 'Фильтры',
        selectFiltersAvailableFiltersText: 'Доступные фильтры',
        selectFiltersFilterColumnLabel: 'Фильтр',
        selectFiltersActiveColumnLabel: 'Активный',
        selectFiltersSubmitButtonLabel: 'Перейти',
        selectFiltersCancelButton: 'Отменить',
        filterConditionContains: 'содержит',
        filterConditionEqualTo: 'равно',
        filterConditionBetween: 'между',
        filterConditionBeginsWith: 'начинается с',
        filterConditionEndsWith: 'заканчивается',
        filterConditionLessThan: 'меньше чем',
        filterConditionLessThanOrEqualTo: 'меньше или равно',
        filterConditionGreaterThan: 'больше чем',
        filterConditionGreaterThanOrEqualTo: 'больше или равно',
        filterConditionAfter: 'после',
        filterConditionOnOrAfter: 'равно или после',
        filterConditionBefore: 'до',
        filterConditionBeforeOrOn: 'до или равно',
        filterConditionValuePlaceholder: 'значение',
        filterConditionValueFromPlaceholder: 'от',
        filterConditionValueToPlaceholder: 'до',
        settingsCategoryAll: 'Все',
        settingsCategoryVisible: 'Видимые',
        settingsCategoryActive: 'Активные',
        settingsCategoryVisibleAndActive: 'Видимые и активные',
        settingsCategoryMandatory: 'Обязательные',
        manageFieldConditions: 'Показать условия для поля',
        refreshButtonAriaLabel: 'Обновить'
    },
    platformTable: {
        headerMenuSortAsc: 'Сортировать по возрастанию',
        headerMenuSortDesc: 'Сортировать по убыванию',
        headerMenuGroup: 'Сгруппировать',
        headerMenuFreeze: 'Зафиксировать столбец',
        headerMenuEndFreeze: 'Зафиксировать до конца',
        headerMenuUnfreeze: 'Отменить фиксацию столбца',
        headerMenuFreezePlural: 'Зафиксировать столбцы',
        headerMenuUnfreezePlural: 'Отменить фиксацию столбцов',
        headerMenuFilter: 'Фильтр',
        defaultEmptyMessage: 'Ничего не найдено',
        emptyCell: 'Пусто',
        noVisibleColumnsMessage:
            'Сейчас в таблице нет видимых столбцов. Пожалуйста, выберите нужные столбцы в настройках таблицы.',
        resetChangesButtonLabel: 'Сбросить',
        editableCellNumberPlaceholder: 'Введите значение',
        editableCellDatePlaceholder: 'Введите значение',
        editableCellStringPlaceholder: 'Введите значение',
        P13ColumnsDialogHeader: 'Столбцы',
        P13ColumnsDialogSearchPlaceholder: 'Поиск',
        P13ColumnsDialogsShowSelected: 'Показать выбранное',
        P13ColumnsDialogShowAll: 'Показать все',
        P13ColumnsDialogSelectAll: 'Выбрать все ({{selectedColumnsCount}}/{{selectableColumnsCount}})',
        P13ColumnsDialogConfirmationBtnLabel: 'ОК',
        P13ColumnsDialogCancelBtnLabel: 'Отмена',
        P13ColumnsDialogMoveToTopBtn: 'Переместить вверх',
        P13ColumnsDialogMoveUpBtn: 'Переместить выше',
        P13ColumnsDialogMoveDownBtn: 'Переместить ниже',
        P13ColumnsDialogMoveToBottomBtn: 'Переместить вниз',
        P13FilterStrategyLabelBetween: 'между',
        P13FilterStrategyLabelContains: 'содержит',
        P13FilterStrategyLabelBeginsWith: 'начинается с',
        P13FilterStrategyLabelEndsWith: 'заканчивается на',
        P13FilterStrategyLabelEqualTo: 'равно',
        P13FilterStrategyLabelGreaterThan: 'больше чем',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'больше или равно',
        P13FilterStrategyLabelLessThan: 'меньше чем',
        P13FilterStrategyLabelLessThanOrEqualTo: 'меньше или равно',
        P13FilterStrategyLabelAfter: 'после',
        P13FilterStrategyLabelOnOrAfter: 'равно или после',
        P13FilterStrategyLabelBefore: 'до',
        P13FilterStrategyLabelBeforeOrOn: 'до или равно',
        P13FilterStrategyLabelNotDefined: 'Не определено',
        P13FilterBooleanOptionNotDefined: '',
        P13FilterBooleanOptionTrue: 'Да',
        P13FilterBooleanOptionFalse: 'Нет',
        P13FilterDialogHeader: 'Фильтровать по',
        P13FilterDialogIncludePanelTitleWithCount: 'Включающие условия ({{count}})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Включающие условия',
        P13FilterDialogExcludePanelTitleWithCount: 'Исключающие условия ({{count}})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Исключающие условия',
        P13FilterDialogRemoveFilterBtnTitle: 'Удалить фильтр',
        P13FilterDialoAddFilterBtnTitle: 'Добавить фильтр',
        P13FilterDialogConfirmationBtnLabel: 'ОК',
        P13FilterDialogCancelBtnLabel: 'Отмена',
        P13GroupDialogHeader: 'Группировка',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(нету)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Показать поле как столбец',
        P13GroupDialogRemoveGroupBtnTitle: 'Удалить',
        P13GroupDialogAddNewGroupBtnTitle: 'Добавить',
        P13GroupDialogConfirmationBtnLabel: 'ОК',
        P13GroupDialogCancelBtnLabel: 'Отмена',
        P13SortDialogHeader: 'Сортировка',
        P13SortDialogNoneSelectedColumn: '(нету)',
        P13SortDialogNoneSelectedSorting: '(нету)',
        P13SortDialogSortOrderSelectOptionAsc: 'По возрастанию',
        P13SortDialogSortOrderSelectOptionDesc: 'По убыванию',
        P13SortDialogRemoveSortBtnTitle: 'Удалить',
        P13SortDialogAddNewSortBtnTitle: 'Добавить',
        P13SortDialogConfirmationBtnLabel: 'ОК',
        P13SortDialogCancelBtnLabel: 'Отмена',
        toolbarSearchPlaceholder: 'Поиск',
        toolbarActionCreateButtonLabel: 'Создать',
        toolbarActionSaveButtonLabel: 'Сохранить',
        toolbarActionCancelButtonLabel: 'Отменить',
        toolbarActionSortButtonTitle: 'Сортировать',
        toolbarActionFilterButtonTitle: 'Фильтр',
        toolbarActionGroupButtonTitle: 'Группировка',
        toolbarActionColumnsButtonTitle: 'Столбцы',
        toolbarActionExpandAllButtonTitle: 'Expand all',
        toolbarActionCollapseAllButtonTitle: 'Collapse all',
        filterDialogNotFilteredLabel: '(Не отфильтровано)',
        filterDialogFilterByLabel: 'Фильтр: {{filterLabel}}',
        filterDialogFilterTitle: 'Фильтр',
        filterDialogFilterBy: 'Фильтровать по',
        filterDialogConfirmBtnLabel: 'ОК',
        filterDialogCancelBtnLabel: 'Отменить',
        groupDialogHeader: 'Группировка',
        groupDialogGroupOrderHeader: 'Порядок группировки',
        groupDialogGroupOrderAsc: 'По возрастанию',
        groupDialogGroupOrderDesc: 'По убыванию',
        groupDialogGroupByHeader: 'Группировать по',
        groupDialogNotGroupedLabel: '(Не сгруппировано)',
        groupDialogConfirmBtnLabel: 'ОК',
        groupDialogCancelBtnLabel: 'Отменить',
        sortDialogHeader: 'Сортировать',
        sortDialogSortOrderHeader: 'Порядок сортировки',
        sortDialogSortOrderAsc: 'По росту',
        sortDialogSortOrderDesc: 'по убыванию',
        sortDialogSortByHeader: 'Сортировать по',
        sortDialogNotSortedLabel: '(Не отсортировано)',
        sortDialogConfirmBtnLabel: 'ОК',
        sortDialogCancelBtnLabel: 'Отменить',
        selectAllCheckboxLabel: 'Select all',
        deselectAllCheckboxLabel: 'Deselect all',
        deselectSingleRow: 'To deselect row, press SPACEBAR',
        selectSingleRow: 'To select row, press SPACEBAR'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Перейти к предыдущему',
        detailsGotoNextButtonTitle: 'Перейти к следующему',
        detailsDialogCloseBtnLabel: 'Закрыть',
        roleDescription: 'Изображение'
    },
    platformUploadCollection: {
        moveToTitle: 'Переместить в',
        moveToTitleFolder: 'Папка',
        moveToNewFolderBtnLabel: 'Новая папка',
        moveToAllFilesSubHeaderLabel: 'Все файлы',
        moveToConfirmBtn: 'Переместить',
        moveToCloseBtn: 'Отменить',
        newFolderTitle: 'Новая папка',
        newFolderAtRootInputLabel: 'Название новой папки',
        newFolderAtFolderInputLabel: 'Название новой папки внутри {{ folderName }',
        newFolderInputPlaceholder: 'Введите имя..',
        newFolderInputErrorLabel: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return `Максимально разрешено 1 символ`;
                case 'few':
                    return `Максимально разрешено ${count} символа`;
                default:
                    return `Максимально разрешено ${count} символов`;
            }
        },
        newFolderDialogCreateBtnLabel: 'Создать',
        newFolderDialogCancelBtnLabel: 'Отменить',
        breadcrumbLabelAllFiles: 'Все файлы',
        breadcrumbLabelAllFilesWithTotal: 'Все файлы ({{ total }})',
        searchPlaceholder: 'Поиск',
        addBtnLabel: 'Добавить',
        newFolderBtnLabel: 'Новая папка',
        moveToBtnLabel: 'Переместить в',
        downloadBtnLabel: 'Загрузить',
        updateVersionBtnLabel: 'Обновить версию',
        removeBtnLabel: 'Удалить',
        folderIconTitle: 'Значок папки',
        fileIconTitle: 'Значок файла',
        editFileNameInputPlaceholder: 'Введите название',
        editFileNameFileAlreadyExistsError: 'Файл с таким названием уже существует',
        editFileNameFolderAlreadyExistsError: 'Папка с таким именем уже существует',
        itemStatusSuccessful: 'Успешно',
        itemStatusUnsuccessful: 'Неудачно',
        uploadNewFileAfterFailAction: 'Выполнить',
        cancelUploadNewFileAction: 'Отменить',
        itemMenuBtnTitle: 'Больше',
        dragDropAreaText: 'Перетащите файлы для загрузки',
        noDataText: 'Файлы не найдены',
        noDataDescription: 'Перетащите файлы для загрузки или воспользуйтесь кнопкой «Добавить».',
        paginationTotal: 'Показано {{ from }}-{{ to }} из {{ total }}',
        resultsPerPage: 'Результаты на странице',
        messageCreateFailed: 'Не удалось создать {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} успешно создано.',
        messageUpdateVersionFailed: 'Не удалось обновить версию {{ folderName }}.',
        messageUpdateVersionSuccess: 'Версия {{ folderName }} обновлена.',
        messageFileRenameFailed: 'Не удалось переименовать "{{ from }}" в "{{ to }}."',
        messageFileRenameSuccess: '{{ from }}" переименовано в "{{ to }}".',
        messageRemoveFoldersAndFilesFailed: (params) =>
            `Не удалось удалить ${(() => {
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
            })()} и ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
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
            })()} и ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} удалено.`,
        messageRemoveFoldersFailed: (params) =>
            `Не удалось удалить ${(() => {
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
            `Удалено ${(() => {
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
        messageRemoveFilesFailed: 'Не удалось удалить файлы {{ filesCount }}.',
        messageRemoveFilesSuccess: (params) =>
            `Удалено ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()}.`,
        messageRemoveFileOrFolderFailed: 'Не удалось удалить {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} удалено.',
        messageMoveFoldersAndFilesFailed: (params) =>
            `Не удалось переместить ${(() => {
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
            })()} и ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} в {{ to }}.`,
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
            })()} и ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} перемещены в {{ to }}.`,
        messageMoveFoldersFailed: (params) =>
            `Не удалось переместить ${(() => {
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
            })()} в {{ to }}.`,
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
            })()} перемещен в {{ to }}.`,
        messageMoveFilesFailed: (params) =>
            `Не удалось переместить ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} в {{ to }}.`,
        messageMoveFilesSuccess: (params) =>
            `${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} перемещен в {{ to }}.`,
        messageMoveFileOrFolderFailed: 'Не удалось переместить {{ name }} в {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} перемещен в {{ to }}.',
        messageMoveRootFoldersAndFilesFailed: (params) =>
            `Не удалось переместить ${(() => {
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
            })()} и ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} во все файлы.`,
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
            })()} и ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} перемещены ко всем файлам.`,
        messageMoveRootFoldersFailed: (params) =>
            `Не удалось переместить ${(() => {
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
            })()} во все файлы.`,
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
            })()} перемещен ко всем файлам.`,
        messageMoveRootFilesFailed: (params) =>
            `Не удалось переместить ${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} во все файлы.`,
        messageMoveRootFilesSuccess: (params) =>
            `${(() => {
                const filesCount = params['filesCount'];
                const filesCountOption = pluralization.process(filesCount);
                switch (filesCountOption) {
                    case 'one':
                        return '1 файл';
                    case 'few':
                        return `${filesCount} файла`;
                    default:
                        return `${filesCount || 0} файлов`;
                }
            })()} перемещены ко всем файлам.`,
        messageMoveRootFileOrFolderFailed: 'Не удалось переместить {{ name }} во все файлы.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} перемещен ко всем файлам.',
        messageFileTypeMismatchPlural: (params) => {
            const filesCount = params['filesCount'];
            const foldersCountOption = pluralization.process(filesCount);
            switch (foldersCountOption) {
                case 'one':
                    return '1 файл имеет неправильный тип. Разрешенные типы: {{ allowedTypes }}.';
                case 'few':
                    return `${filesCount} файла имеют неправильный тип. Разрешенные типы: {{ allowedTypes }}.`;
                default:
                    return `${filesCount || 0} файлов имеют неправильный тип. Разрешенные типы: {{ allowedTypes }}.`;
            }
        },
        messageFileTypeMismatchSingular:
            'Файл "{{ fileName }}" имеет неправильный тип. Разрешенные типы: {{ allowedTypes }}.',
        messageFileSizeExceededPlural: (params) => {
            const filesCount = params['filesCount'];
            const foldersCountOption = pluralization.process(filesCount);
            switch (foldersCountOption) {
                case 'one':
                    return '1 файл превышают максимальный размер файла. Разрешен максимальный размер файла: {{ maxFileSize }}.';
                case 'few':
                    return `${filesCount} файла превышают максимальный размер файла. Разрешен максимальный размер файла: {{ maxFileSize }}.`;
                default:
                    return `${
                        filesCount || 0
                    } файлов превышают максимальный размер файла. Разрешен максимальный размер файла: {{ maxFileSize }}.`;
            }
        },
        messageFileSizeExceededSingular:
            'Файл "{{ fileName }}" превышает максимальный размер файла. Разрешен максимальный размер файла: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural: (params) => {
            const filesCount = params['filesCount'];
            const foldersCountOption = pluralization.process(filesCount);
            switch (foldersCountOption) {
                case 'one':
                    return '1 файл превысили максимальную длину имени файла. Разрешена длина имени файла: {{ maxFilenameLength }} символов.';
                case 'few':
                    return `${filesCount} файла превысили максимальную длину имени файла. Разрешена длина имени файла: {{ maxFilenameLength }} символов.`;
                default:
                    return `${
                        filesCount || 0
                    } файлов превысили максимальную длину имени файла. Разрешена длина имени файла: {{ maxFilenameLength }} символов.`;
            }
        },
        messageFileNameLengthExceededSingular:
            'Имя "{{ fileName }}" превышает максимальную длину имени файла. Разрешена длина имени файла: {{ maxFilenameLength }} символов.'
    },
    platformWizardGenerator: { summarySectionEditStep: 'Редактировать' },
    platformMessagePopover: {
        allErrors: 'Все',
        defaultErrors: {
            email: 'Значение поля не соответствует формату E-mail',
            max: 'Значение поля превышает максимально допустимое',
            maxLength: 'Длина значения поля превышает максимально допустимое',
            min: 'Значение поля меньше минимально допустимого',
            minLength: 'Длина значения поля меньше максимально допустимого',
            pattern: 'Поле не соответствует формату',
            required: 'Обязательное поле',
            requiredTrue: 'Обязательное поле'
        }
    },
    platformVariantManagement: {
        manage: 'Управление',
        saveAs: 'Сохранить как',
        saveView: 'Сохранить Вид',
        save: 'Сохранить',
        myViews: 'Мои Виды',
        view: 'Вид',
        setAsDefault: 'Установить по умолчанию',
        public: 'Публичный',
        applyAutomatically: 'Применять автоматически',
        requiredFieldError: 'Обязательное поле.',
        nameTakenFieldError: 'Вид с таким именем уже существует. Введите другое имя.',
        cancel: 'Отменить',
        manageViews: 'Управление видами',
        markAsFavourite: 'Отметить как избранное',
        sharing: 'Совместное использование',
        default: 'По умолчанию',
        createdBy: 'Создал(а)',
        removeVariant: 'Удалить вид',
        search: 'Поиск',
        access: { public: 'Публичное', private: 'Приватное' }
    },
    platformSelect: { selectOptionLabel: 'Выберите вариант' },
    fnSlider: {
        minMaxDetails: 'Минимальное значение слайдера {{ min }}, максимальное значение {{ max }}',
        valueminDetails: 'Значение равно {{ value }}',
        valuemaxDetails: 'Значение равно {{ value }}',
        valueNowDetails: 'Текущее значение: {{ value }}'
    },
    fnSwitch: { semanticAcceptLabel: 'Принять', semanticDeclineLabel: 'Отклонить' },
    coreTree: { expand: 'Развернуть узел', collapse: 'Свернуть узел', noData: 'Нет данных' }
};
