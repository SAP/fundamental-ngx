import { FdLanguage } from '../models/lang';
import { PluralizationSet1 } from './pluralization/set1';

const pluralization = new PluralizationSet1();

/**
 * Default set of translations of Fundamental UI library for Bulgarian language
 */
export const FD_LANGUAGE_BULGARIAN: FdLanguage = {
    coreCarousel: {
        leftNavigationBtnLabel: 'Отиди на предишния елемент',
        rightNavigationBtnLabel: 'Отиди на следващия елемент'
    },
    coreDatePicker: {
        dateInputLabel: 'Поле за дата',
        dateRangeInputLabel: 'Поле за дата интервал',
        displayCalendarToggleLabel: 'Избери дата',
        valueStateSuccessMessage: 'Състояние Успех',
        valueStateInformationMessage: 'Състояние Информиране',
        valueStateWarningMessage: 'Състояние Предупреждение',
        valueStateErrorMessage: 'Състояние Грешка'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Поле за дата и час',
        displayDatetimeToggleLabel: 'Покажи/Скрий календар',
        displayTypeDateLabel: 'Дата',
        displayTypeTimeLabel: 'Час',
        datetimeOkLabel: 'Ok',
        datetimeCancelLabel: 'Отмени'
    },
    coreFeedListItem: {
        moreLabel: 'Повече',
        lessLabel: 'По-малко'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Отмени',
        listItemStatusAriaLabel: 'Артикулът има статус. Статус: {{ status }}.',
        listItemCounterAriaLabel: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return 'Артикулът има 1 дете.';
                default:
                    return 'Артикулът има {{ count }} деца.';
            }
        },
        listItemButtonDetailsTitle: 'Подробности',
        listItemButtonDeleteTitle: 'Изтрий',
        listItemStatusContainsErrors: 'Съдържа грешки',
        listItemStatusLocked: 'Заключен',
        listItemStatusDraft: 'Чернова'
    },
    coreMessageStrip: {
        dismissLabel: 'Отхвърляне'
    },
    coreNestedList: {
        linkItemAriaLabel: 'Елемент от дърво {{ itemDetails }}, {{ index }} от {{ total }}{{ selectedDescription }}'
    },
    coreOverflowLayout: {
        moreItemsButton: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return 'Още 1 елемент';
                default:
                    return 'Още {{ count }} елемента';
            }
        }
    },
    corePagination: {
        pageLabel: 'Страница {{ pageNumber }}',
        currentPageAriaLabel: 'Страница {{ pageNumber }} е активна',
        labelBeforeInputMobile: 'Страница:',
        labelAfterInputMobile: 'от {{ totalCount }}',
        inputAriaLabel: 'Поле за страница, Текуща страница, Page {{ pageNumber }} of {{ totalCount }}',
        itemsPerPageLabel: 'Резултати на Страница:',
        firstLabel: 'Първа',
        previousLabel: 'Предна',
        nextLabel: 'Следваща',
        lastLabel: 'Последна',
        ariaLabel: 'Пагинация',
        totalResultsLabel: '{{ totalCount }} резултати'
    },
    coreProductSwitch: {
        ariaLabel: 'Продуктов превключвател'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Collapsed Item Menu',
        cancel: 'Cancel',
        search: 'Search'
    },
    coreSlider: {
        singleMinMaxDetails: 'Минималната стойност на плъзгача е {{ min }}, максималната стойност е {{ max }}',
        singleValueminDetails: 'Стойността е {{ value }}',
        singleValuemaxDetails: 'Стойността е {{ value }}',
        singleValueNowDetails: 'Текущата стойност е {{ value }}',
        multipleHandle1MinMaxDetails:
            'Минималната стойност на плъзгача за обхват е {{ min }}, максималната стойност е {{ max }}',
        multipleHandle1ValueminDetails: 'Стойността е {{ value }}',
        multipleHandle1ValuemaxDetails: 'Стойността е {{ value }}',
        multipleHandle1ValueNowDetails: 'Текущата стойност е {{ value }}',
        multipleHandle2MinMaxDetails:
            'Минималната стойност на плъзгача за обхват е {{ min }}, максималната стойност е {{ max }}',
        multipleHandle2ValueminDetails: 'Стойността е {{ value }}',
        multipleHandle2ValuemaxDetails: 'Стойността е {{ value }}',
        multipleHandle2ValueNowDetails: 'Текущата стойност е {{ value }}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Повече възможности',
        arialLabel: 'Разделен бутон'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Секция'
    },
    coreStepInput: {
        incrementButtonTitle: 'Увеличи',
        decrementButtonTitle: 'Намали',
        ariaRoleDescription: 'Поле за стъпка'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Приеми',
        semanticDeclineLabel: 'Отхвърли'
    },
    coreTabs: {
        tabListExpandButtonText: 'Повече'
    },
    coreText: {
        moreLabel: 'Повече',
        lessLabel: 'По-малко'
    },
    coreTime: {
        componentAriaName: 'Избери час',
        increaseHoursLabel: 'Увеличи часовете',
        hoursLabel: 'Час',
        decreaseHoursLabel: 'Намали часовете',
        increaseMinutesLabel: 'Увеличи минутите',
        minutesLabel: 'Мин',
        decreaseMinutesLabel: 'Намали минутите',
        increaseSecondsLabel: 'Увеличи секундите',
        secondsLabel: 'Сек',
        decreaseSecondsLabel: 'Намали секундите',
        increasePeriodLabel: 'Увеличи интервала',
        periodLabel: 'Интервал',
        decreasePeriodLabel: 'Намали интервала',
        navigationInstruction:
            'За да се придвижвате между елементите в този списък, натиснете горната стрелка или долната стрелка. ' +
            'За да превключвате между списъците, натиснете стрелка наляво или стрелка надясно.'
    },
    coreTimePicker: {
        timePickerInputLabel: 'Поле за избор на час',
        timePickerButtonLabel: 'Избери време'
    },
    coreToken: {
        deleteButtonLabel: 'Изтриваем',
        ariaRoleDescription: 'жетон'
    },
    coreTokenizer: {
        moreLabel: '{{count}} more'
    },
    coreUploadCollection: {
        menuOkText: 'OK',
        menuCancelText: 'Отмени',
        menuEditAriaLabel: 'Редактирай',
        menuDeleteAriaLabel: 'Изтрий',
        menuOkAriaLabel: 'Редактирай',
        menuCancelAriaLabel: 'Отмени',
        formItemPlaceholder: 'Име на файл'
    },
    coreWizard: {
        ariaLabel: 'Помощник'
    },
    platformActionBar: {
        backButtonLabel: 'Върни Се Обратно'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Наблюдатели',
        defaultTitle: 'Процес на одобрение',
        nextButtonAriaLabel: 'Преминете към следващия слайд',
        prevButtonAriaLabel: 'Отидете на предишния слайд',
        editModeSaveButtonLabel: 'Запази',
        editModeExitButtonLabel: 'Излез',
        emptyTitle: 'Започнете да добавяте одобряващи и наблюдатели',
        emptyHint:
            'За да добавите одобряващи, щракнете "Добавете стъпка". За да добавите наблюдатели, щракнете върху полето Наблюдатели.',
        addNodeDialogHeaderAddApprovers: 'Добавете одобряващи',
        addNodeDialogHeaderEditApprover: 'Редактиране на одобряващия',
        addNodeDialogHeaderAddApproverTeam: 'Потребител/Екип',
        addNodeDialogHeaderDetail: 'Детайл',
        addNodeDialogNodeType: 'Паралелно или последователно',
        addNodeDialogNodeTypeSerial: 'Последователно',
        addNodeDialogNodeTypeParallel: 'Паралелно',
        addNodeDialogApproverType: 'Тип одобряващ',
        addNodeDialogApproverTypeUser: 'Потребител',
        addNodeDialogApproverTypeTeamAnyone: 'Всеки от екипа',
        addNodeDialogApproverTypeTeamEveryone: 'Всички в екипа',
        addNodeDialogUserOrTeam: 'Потребител/Екип',
        addNodeDialogAddToNext: 'Добавете към следващия последователен възел',
        addNodeDialogDueDate: 'Краен срок',
        addNodeSearchPlaceholder: 'Търси',
        addNodeAddActionBtnLabel: 'Добаве',
        addNodeCancelActionBtnLabel: 'Отмени',
        addNodeSelectApproverActionBtnLabel: 'Избери',
        addNodeCancelApproverSelectionActionBtnLabel: 'Отмени',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Затвори',
        userDetailsHeader: 'Детайл',
        userDetailsSendReminderBtnLabel: 'Изпрати напомняне',
        userDetailsCancelBtnLabel: 'Отмени',
        messagesApproverAddedSuccess: 'Добавен е 1 одобряващ',
        messagesTeamAddedSuccess: '1 екип е добавен',
        messagesNodeEdited: '1 одобряващ е редактиран',
        messagesNodeRemovedSingular: '1 одобряващ е премахнат',
        messagesNodeRemovedPlural: 'Одобряващите са премахнати',
        messagesTeamRemoved: '1 отбор е премахнат',
        messagesErrorBuildGraph: 'Възникна грешка при опит за изграждане на графиката. Проверете първоначалните данни.',
        messagesUndoAction: 'Отмяна',
        nodeMembersCount: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return '1 член';
                default:
                    return '{{ count }} членове';
            }
        },
        nodeVariousTeams: 'Различни екипи',
        nodeStatusDueToday: 'Предстои днес',
        nodeStatusDueInXDays: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return 'Предстои след 1 ден';
                default:
                    return 'Предстои след {{ count }} дни';
            }
        },
        nodeStatusXDaysOverdue: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return '1 ден просрочие';
                default:
                    return '{{ count }} дни просрочие';
            }
        },
        nodeActionAddApproversBefore: 'Добавете одобряващи преди',
        nodeActionAddApproversAfter: 'Добавете одобряващи след това',
        nodeActionAddApproversParallel: 'Добавете паралелни одобряващи',
        nodeActionEditApprover: 'Редактиране на одобряващия',
        nodeActionRemove: 'Изтрий',
        selectTypeDialogMoveApproverAs: 'Move approver as',
        selectTypeDialogParallelOrSerial: 'Паралелно или последователно',
        selectTypeDialogNodeTypeParallel: 'Паралелен одобряващ',
        selectTypeDialogNodeTypeSerial: 'Последователен одобряващ',
        selectTypeDialogConfirmButton: 'Потвърди',
        selectTypeDialogCancelButton: 'Отмени',
        toolbarAddStepButton: 'Добавете стъпка',
        toolbarEditButton: 'Редактирай',
        toolbarAddApproversBefore: 'Добавете одобряващи преди',
        toolbarAddApproversAfter: 'Добавете одобряващи след това',
        toolbarAddApproversParallel: 'Добавете паралелни одобряващи',
        toolbarRemove: 'Изтрий',
        toolbarEditApprover: 'Редактирай на одобряващия',
        watchersInputPlaceholder: 'Търси тук...',
        userListSelectedItemsCountSingular: 'Избран е 1 елемент',
        userListSelectedItemsCountPlural: 'Избрани са {{ count }} елементи',
        statusApproved: 'approved',
        statusRejected: 'rejected',
        statusInProgress: 'in progress',
        statusNotStarted: 'not started'
    },
    platformFeedInput: {
        userTitle: 'User'
    },
    platformVHD: {
        selectionBarLabel: 'Избрани и кондиционирани артикули',
        selectedAndConditionLabel: 'Избрани артикули и условия',
        footerClearSelectedTitle: 'изчистете избраните елементи',
        footerClearSelectedAriaLabel: 'изчистете избраните елементи',
        searchButtonLabel: 'Търси',
        successButtonLabel: 'ОК',
        cancelButtonLabel: 'Отмени',
        selectedEmptyLabel: 'Няма избрани елементи или условия',
        searchPlaceholder: 'Потърси',
        searchAdvancedSearchLabel: 'Филтри',
        searchShowAdvancedSearchLabel: 'Показване на филтри',
        searchHideAdvancedSearchLabel: 'Скриване на филтрите',
        searchShowAllAdvancedSearchLabel: 'Показване на всички филтри',
        searchHideAllAdvancedSearchLabel: 'Скриване на всички филтри',
        selectTabDisplayCountLabel: '({{ count }}) артикули',
        selectTabMoreBtnLabel: 'Повече',
        selectTabCountHiddenA11yLabel: 'съдържа {{ rowCount }} ред(а) и {{ colCount }} колонa/и',
        selectMobileTabBackBtnTitle: 'Обратно',
        selectMobileTabBtnOpenDialogLabel: 'Отвори диалоговия прозорец',
        selectMobileTabTitle: '{{ title }} раздел',
        selectMobileConditionEmpty: 'Празен',
        defineConditionTitle: 'Продукт',
        defineConditionSelectedValueHiddenA11yLabel: 'избрана стойност {{ value }}',
        defineConditionConditionsGroupHeaderInclude: 'Включи',
        defineConditionConditionsGroupHeaderExclude: 'Изключи',
        defineConditionFromPlaceholder: 'от',
        defineConditionToPlaceholder: 'до',
        defineConditionValuePlaceholder: 'стойност',
        defineConditionRemoveConditionButtonTitle: 'Премахни Условие',
        defineConditionAddConditionButtonLabel: 'Добави',
        defineConditionAddConditionButtonTitle: 'Добави Условие',
        defineConditionConditionStrategyLabelContains: 'съдържа',
        defineConditionConditionStrategyLabelEqualTo: 'равно на',
        defineConditionConditionStrategyLabelBetween: 'между',
        defineConditionConditionStrategyLabelStartsWith: 'започна с',
        defineConditionConditionStrategyLabelEndsWith: 'завършва с',
        defineConditionConditionStrategyLabelLessThan: 'по-малко от',
        defineConditionConditionStrategyLabelLessThanEqual: 'по-малко или равно от',
        defineConditionConditionStrategyLabelGreaterThan: 'по-голямо от',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'по-голямо или равно от',
        defineConditionConditionStrategyLabelEmpty: 'празно',
        defineConditionConditionStrategyLabelNotEqualTo: 'не е равно на',
        defineConditionConditionStrategyLabelNotEmpty: 'не празно',
        defineConditionMaxCountError: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return 'Въведи стойност с не повече от 1 символ';
                default:
                    return 'Въведи стойност с не повече от {{ count }} символа';
            }
        },
        selectTabTitle: 'Избери от списъка',
        searchTableEmptyMessage: 'Use the search to get results',
        defineTabTitle: 'Дефиниране на условия'
    },
    platformCombobox: {
        countListResultsSingular: '1 елемент от списъка с резултати',
        countListResultsPlural: '{{ count }} елемента от списъка с резултати'
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Избери Опции',
        inputIconTitle: 'Избери Опции',
        mobileShowAllItemsButton: 'Покажи всички елементи',
        mobileShowSelectedItemsButton: 'Покажи избраните елементи'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: '1 символ над ограничението',
        counterMessageCharactersOverTheLimitPlural: '{{ count }} символи над ограничението',
        counterMessageCharactersRemainingSingular: 'Остава 1 символ',
        counterMessageCharactersRemainingPlural: 'Остават {{ count }} символи'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Медия: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'зареждане'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'детайл',
        deleteActionAriaLabel: 'изтрий'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'детайл',
        deleteActionAriaLabel: 'изтрий'
    },
    platformSearchField: {
        clearButtonTitle: 'Изчисти',
        submitButtonTitle: 'Търси',
        synchronizeButtonTitle: 'Синхронизирай',
        searchSuggestionMessage: (params) => {
            const count = params['count'];
            const option = pluralization.process(count);
            switch (option) {
                case 'one':
                    return 'Намерено е 1 предложение.';
                default:
                    return 'Намерени са {{ count }} предложения.';
            }
        },
        searchSuggestionNavigateMessage: 'използвайте стрелки нагоре и надолу за навигация'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Търси',
        submitButtonLabel: 'Търси',
        filtersButtonLabel: 'Филтри ({{ filtersCount }})',
        showFiltersButtonLabel: 'Покажи филтрите',
        hideFiltersButtonLabel: 'Скрий филтрите',
        defineConditionsRemoveConditionButtonTitle: 'Премахни Условие',
        defineConditionsAddConditionButtonLabel: 'Добави Условие',
        defineConditionsSubmitButtonLabel: 'Търси',
        defineConditionsCancelButton: 'Отмени',
        selectFiltersHeader: 'Filters',
        selectFiltersAvailableFiltersText: 'Налични филтри',
        selectFiltersFilterColumnLabel: 'Филтър',
        selectFiltersActiveColumnLabel: 'Активни',
        selectFiltersSubmitButtonLabel: 'Филтрирай',
        selectFiltersCancelButton: 'Отмени',
        filterConditionContains: 'съдържа',
        filterConditionEqualTo: 'равно на',
        filterConditionBetween: 'между',
        filterConditionBeginsWith: 'започна с',
        filterConditionEndsWith: 'завършва с',
        filterConditionLessThan: 'по-малко от',
        filterConditionLessThanOrEqualTo: 'по-малко или равно',
        filterConditionGreaterThan: 'по-голямо от',
        filterConditionGreaterThanOrEqualTo: 'по-голямо или равно от',
        filterConditionAfter: 'след',
        filterConditionOnOrAfter: 'равно или повече',
        filterConditionBefore: 'преди',
        filterConditionBeforeOrOn: 'до или равно',
        filterConditionValuePlaceholder: 'стойност',
        filterConditionValueFromPlaceholder: 'от',
        filterConditionValueToPlaceholder: 'до',
        settingsCategoryAll: 'Всички',
        settingsCategoryVisible: 'Видими',
        settingsCategoryActive: 'Активни',
        settingsCategoryVisibleAndActive: 'Видими и Активни',
        settingsCategoryMandatory: 'Задължителни'
    },
    platformTable: {
        headerMenuSortAsc: 'Сортирай Възходящо',
        headerMenuSortDesc: 'Сортирай Нисходящо',
        headerMenuGroup: 'Групирай',
        headerMenuFreeze: 'Замрази',
        headerMenuEndFreeze: 'Freeze to End',
        headerMenuUnfreeze: 'Размрази',
        headerMenuFilter: 'Филтър',
        defaultEmptyMessage: 'Няма намерени данни',
        resetChangesButtonLabel: 'Нулиране',
        editableCellNumberPlaceholder: 'Въведи стойност',
        editableCellDatePlaceholder: 'Въведи стойност',
        editableCellStringPlaceholder: 'Въведи стойност',
        P13ColumnsDialogHeader: 'Колони',
        P13ColumnsDialogSearchPlaceholder: 'Търси',
        P13ColumnsDialogsShowSelected: 'Покажи избраните',
        P13ColumnsDialogShowAll: 'Покажи всички',
        P13ColumnsDialogSelectAll: 'Покажи всички ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Отмени',
        P13ColumnsDialogMoveToTopBtn: 'Измести най-отгоре',
        P13ColumnsDialogMoveUpBtn: 'Измести нагоре',
        P13ColumnsDialogMoveDownBtn: 'Измести надолу',
        P13ColumnsDialogMoveToBottomBtn: 'Измести най-отдолу',
        P13FilterStrategyLabelBetween: 'между',
        P13FilterStrategyLabelContains: 'съдържа',
        P13FilterStrategyLabelBeginsWith: 'започва с',
        P13FilterStrategyLabelEndsWith: 'завършва с',
        P13FilterStrategyLabelEqualTo: 'равно на',
        P13FilterStrategyLabelGreaterThan: 'по-голямо от',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'по-голямо или равно от',
        P13FilterStrategyLabelLessThan: 'по-малко от',
        P13FilterStrategyLabelLessThanOrEqualTo: 'по-малко или равно от',
        P13FilterStrategyLabelAfter: 'след',
        P13FilterStrategyLabelOnOrAfter: 'равно или повече',
        P13FilterStrategyLabelBefore: 'преди',
        P13FilterStrategyLabelBeforeOrOn: 'до или равно',
        P13FilterStrategyLabelNotDefined: 'Недефинирано',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Да',
        P13FilterBooleanOptionFalse: 'Не',
        P13FilterDialogHeader: 'Филтрирано от',
        P13FilterDialogIncludePanelTitleWithCount: 'Добави ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Добави',
        P13FilterDialogExcludePanelTitleWithCount: 'Изключи ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Exclude',
        P13FilterDialogRemoveFilterBtnTitle: 'Премахни Филтър',
        P13FilterDialoAddFilterBtnTitle: 'Добави Филтър',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Отмени',
        P13GroupDialogHeader: 'Групирай',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(нито един)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Show Field as Column',
        P13GroupDialogRemoveGroupBtnTitle: 'Премахни',
        P13GroupDialogAddNewGroupBtnTitle: 'Добави Нова',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Отмени',
        P13SortDialogHeader: 'Сортирай',
        P13SortDialogNoneSelectedColumn: '(нито един)',
        P13SortDialogNoneSelectedSorting: '(нито един)',
        P13SortDialogSortOrderSelectOptionAsc: 'Възходящ',
        P13SortDialogSortOrderSelectOptionDesc: 'Низходящ',
        P13SortDialogRemoveSortBtnTitle: 'Премахни',
        P13SortDialogAddNewSortBtnTitle: 'Добави Ново',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Отмени',
        toolbarSearchPlaceholder: 'Търси',
        toolbarActionCreateButtonLabel: 'Създай',
        toolbarActionSaveButtonLabel: 'Запиши',
        toolbarActionCancelButtonLabel: 'Отмени',
        toolbarActionSortButtonTitle: 'Сортирай',
        toolbarActionFilterButtonTitle: 'Филтрирай',
        toolbarActionGroupButtonTitle: 'Групирай',
        toolbarActionColumnsButtonTitle: 'Колони',
        filterDialogNotFilteredLabel: '(Нефилтрирано)',
        filterDialogFilterByLabel: 'Филтрирано по: {{ filterLabel }}',
        filterDialogFilterTitle: 'Филтър',
        filterDialogFilterBy: 'Филтрирано по',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Отмени',
        groupDialogHeader: 'Група',
        groupDialogGroupOrderHeader: 'Ред на групиране',
        groupDialogGroupOrderAsc: 'Възходяща',
        groupDialogGroupOrderDesc: 'Низходяща',
        groupDialogGroupByHeader: 'Групирано по',
        groupDialogNotGroupedLabel: '(Негрупирано)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Отмени',
        sortDialogHeader: 'Сортирай',
        sortDialogSortOrderHeader: 'Сортирано',
        sortDialogSortOrderAsc: 'Възходяща',
        sortDialogSortOrderDesc: 'Низходяща',
        sortDialogSortByHeader: 'Сортирай по',
        sortDialogNotSortedLabel: '(Несортирано)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Отмени'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Отиди на предишнита',
        detailsGotoNextButtonTitle: 'Отиди на следващата',
        detailsDialogCloseBtnLabel: 'Затвори',
        roleDescription: 'Картинка'
    },
    platformUploadCollection: {
        moveToTitle: 'Премести в',
        moveToTitleFolder: 'Папка',
        moveToNewFolderBtnLabel: 'Нова папка',
        moveToAllFilesSubHeaderLabel: 'Всички файлове',
        moveToConfirmBtn: 'Премести',
        moveToCloseBtn: 'Отмени',
        newFolderTitle: 'Нова папка',
        newFolderAtRootInputLabel: 'Име на новата папка',
        newFolderAtFolderInputLabel: 'Име на новата папка вътре в {{ folderName }}',
        newFolderInputPlaceholder: 'Пиши тук...',
        newFolderInputErrorLabel: 'Максимум {{ count }} символ(а) позволени',
        newFolderDialogCreateBtnLabel: 'Създай',
        newFolderDialogCancelBtnLabel: 'Отмени',
        breadcrumbLabelAllFiles: 'Всички файлове',
        breadcrumbLabelAllFilesWithTotal: 'Всички файлове ({{ total }})',
        searchPlaceholder: 'Търси',
        addBtnLabel: 'Добави',
        newFolderBtnLabel: 'Нова папка',
        moveToBtnLabel: 'Премести в',
        downloadBtnLabel: 'Изтегли',
        updateVersionBtnLabel: 'Актуализирай версията',
        removeBtnLabel: 'Премахни',
        folderIconTitle: 'Икона на папка',
        fileIconTitle: 'Икона на файл',
        editFileNameInputPlaceholder: 'Въведи име',
        editFileNameFileAlreadyExistsError: 'Файл с това име вече съществува',
        editFileNameFolderAlreadyExistsError: 'Папка с това име вече съществува',
        itemStatusSuccessful: 'Успешено',
        itemStatusUnsuccessful: 'Неуспешно',
        uploadNewFileAfterFailAction: 'Изпълни',
        cancelUploadNewFileAction: 'Отмени',
        itemMenuBtnTitle: 'Повече',
        dragDropAreaText: 'Плъзнете файлове за качване',
        noDataText: 'Няма намерени файлове',
        noDataDescription: 'Пуснете файлове за качване или използвайте бутона „Добави“.',
        paginationTotal: 'Показване {{ from }}-{{ to }} от {{ total }}',
        resultsPerPage: 'Резултати на страница',
        messageCreateFailed: 'Неуспешно създадена {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} е създаден.',
        messageUpdateVersionFailed: 'Неуспешно актуализиране на версията на {{ folderName }}.',
        messageUpdateVersionSuccess: 'Версията на {{ folderName }} е актуализирана.',
        messageFileRenameFailed: 'Неуспешно преименуване от "{{ from }}" на "{{ to }}."',
        messageFileRenameSuccess: '"{{ from }}" беще преименуван на "{{ to }}".',
        messageRemoveFoldersAndFilesFailed:
            'Неуспешно премахване на {{ foldersCount }} папки и {{ filesCount }} файлове.',
        messageRemoveFoldersAndFilesSuccess: '{{ foldersCount }} папки и {{ filesCount }} файлове бяха изтрити.',
        messageRemoveFoldersFailed: 'Неуспешно премахване на {{ foldersCount }} папки.',
        messageRemoveFoldersSuccess: '{{ foldersCount }} папки са премахнати.',
        messageRemoveFilesFailed: 'Неуспешно премахване на {{ filesCount }} файлове.',
        messageRemoveFilesSuccess: '{{ filesCount }} файлове са премахнати.',
        messageRemoveFileOrFolderFailed: 'Неуспешно премахване на {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} беше изтрита.',
        messageMoveFoldersAndFilesFailed:
            'Неуспешно преместване {{ foldersCount }} папки и {{ filesCount }} файлове в {{ to }}.',
        messageMoveFoldersAndFilesSuccess:
            '{{ foldersCount }} папки и {{ filesCount }} файлове са преместени в {{ to }}.',
        messageMoveFoldersFailed: 'Неуспешно преместване {{ foldersCount }} папки в {{ to }}.',
        messageMoveFoldersSuccess: '{{ foldersCount }} папки беше преместена в {{ to }}.',
        messageMoveFilesFailed: 'Неуспешно преместване {{ filesCount }} файлове в {{ to }}.',
        messageMoveFilesSuccess: '{{ filesCount }} файлове бяха преместени в {{ to }}.',
        messageMoveFileOrFolderFailed: 'Неуспешно преместване {{ name }} в {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} е изместен(а) в {{ to }}.',
        messageMoveRootFoldersAndFilesFailed:
            'Неуспешно преместване {{ foldersCount }} папки и {{ filesCount }} файлове от всички файлове.',
        messageMoveRootFoldersAndFilesSuccess:
            '{{ foldersCount }} папки and {{ filesCount }} файлове успешно преместени.',
        messageMoveRootFoldersFailed: 'Неуспешно преместване {{ foldersCount }} папки за всички файлове.',
        messageMoveRootFoldersSuccess: '{{ foldersCount }} папки бяха преместени за всички файлове.',
        messageMoveRootFilesFailed: 'Неуспешно преместване {{ filesCount }} файлове за всички файлове.',
        messageMoveRootFilesSuccess: '{{ filesCount }} файлове бяха изместени за всички файлове.',
        messageMoveRootFileOrFolderFailed: 'Неуспешно преместване {{ name }} за всички файлове.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} е изместен за всички файлове.',
        messageFileTypeMismatchPlural:
            '{{ filesCount }} файлове имат грешно разширение. Позволени разширения: {{ allowedTypes }}.',
        messageFileTypeMismatchSingular:
            'Файлът "{{ fileName }}" има грешно разширение. Позволени разширения: {{ allowedTypes }}.',
        messageFileSizeExceededPlural:
            '{{ filesCount }} файлове надвишават максималната големина на файла. Позволен максимален размер на файла: {{ maxFileSize }}.',
        messageFileSizeExceededSingular:
            'Файлът "{{ fileName }}" надвишава максималната големина на файла. Позволен максимален размер на файла: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural:
            '{{ filesCount }} файлове надвишават максималната дължина на името на файла. Позволена дължина на името на файла: {{ maxFilenameLength }} символа.',
        messageFileNameLengthExceededSingular:
            'Името "{{ fileName }}" надвишава максималната дължина на името на файла. Позволена дължина на името на файла: {{ maxFilenameLength }} символа.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Редактирай'
    },
    platformMessagePopover: {
        allErrors: 'All',
        defaultErrors: {
            email: 'Email is invalid',
            max: 'The field exceeds maximum value',
            maxLength: 'The field exceeds maximum length',
            min: 'The field value is less than allowed',
            minLength: 'The field length is less than allowed',
            pattern: 'The field value is invalid',
            required: 'The field is mandatory',
            requiredTrue: 'The field is mandatory'
        }
    },
    platformVariantManagement: {
        manage: 'Manage',
        saveAs: 'Save as',
        saveView: 'Save View',
        save: 'Save',
        myViews: 'My Views',
        view: 'View',
        setAsDefault: 'Set as Default',
        public: 'Public',
        applyAutomatically: 'Apply Automatically',
        requiredFieldError: 'This field is required.',
        nameTakenFieldError: 'Variant with such name already exists. Please chose a different name.',
        cancel: 'Cancel',
        manageViews: 'Manage Views',
        markAsFavourite: 'Mark as Favourite',
        sharing: 'Sharing',
        default: 'Default',
        createdBy: 'Created By',
        removeVariant: 'Remove View',
        search: 'Search',
        access: {
            public: 'Public',
            private: 'Private'
        }
    },
    platformSelect: {
        selectOptionLabel: 'Изберете опция'
    },
    fnSlider: {
        minMaxDetails: 'Минималната стойност на плъзгача е {{ min }}, максималната стойност е {{ max }}',
        valueminDetails: 'Стойността е {{ value }}',
        valuemaxDetails: 'Стойността е {{ value }}',
        valueNowDetails: 'Текущата стойност е {{ value }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Приеми',
        semanticDeclineLabel: 'Отхвърли'
    }
};
