import { FdLanguage } from '../models/lang';

/**
 * Default set of translations of Fundamental UI library for Polish language
 */
export const FD_LANGUAGE_POLISH: FdLanguage = {
    coreMultiComboBox: {
        selectAllLabel: 'Zaznacz wszystko ({{selectedItems}} z {{totalItems}})'
    },
    coreCarousel: {
        leftNavigationBtnLabel: 'Idź do poprzedniego elementu',
        rightNavigationBtnLabel: 'Idź do nestępnego elementu'
    },
    coreDatePicker: {
        dateInputLabel: 'Data',
        dateRangeInputLabel: 'Przedział czasowy',
        displayCalendarToggleLabel: 'Otwórz selektor',
        valueStateSuccessMessage: 'Value state Success', // I have no idea what it is about (?)
        valueStateInformationMessage: 'Value state Information', // I have no idea what it is about (?)
        valueStateWarningMessage: 'Value state Warning', // I have no idea what it is about (?)
        valueStateErrorMessage: 'Value state Error' // I have no idea what it is about (?)
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Data i czas',
        displayDatetimeToggleLabel: 'Pokaż przełącznik daty',
        displayTypeDateLabel: 'Data',
        displayTypeTimeLabel: 'Czas',
        datetimeOkLabel: 'Ok',
        datetimeCancelLabel: 'Anuluj'
    },
    coreFeedListItem: {
        moreLabel: 'Więcej',
        lessLabel: 'Mniej'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Anuluj',
        listItemStatusAriaLabel: 'Status elementu: {{ status }} ',
        listItemCounterAriaLabel: 'Element posiada {{ count }} subelementów',
        listItemButtonDetailsTitle: 'Szczegóły',
        listItemButtonDeleteTitle: 'Usuń',
        listItemStatusContainsErrors: 'Zawiera błędy',
        listItemStatusLocked: 'Zablokowany',
        listItemStatusDraft: 'Szkic'
    },
    coreMessageStrip: {
        dismissLabel: 'Odrzuć'
    },
    coreMultiInput: {
        multiInputAriaLabel: 'Multi Value Input'
    },
    coreNavigation: {
        mainNavigation: 'Main Navigation',
        navigationPath: 'Navigation Path'
    },
    coreNestedList: {
        linkItemAriaLabel: 'Element drzewa {{ itemDetails }}, {{ index }} z {{ total }}{{ selectedDescription }}'
    },
    coreOverflowLayout: {
        moreItemsButton: '{{ count }} więcej'
    },
    corePagination: {
        pageLabel: 'Strona {{ pageNumber }}',
        currentPageAriaLabel: 'Aktualna strona {{ pageNumber }}',
        labelBeforeInputMobile: 'Strona:',
        labelAfterInputMobile: 'z {{ totalCount }}',
        inputAriaLabel: 'Dane strony, Aktualna strona, Strona {{ pageNumber }} z {{ totalCount }}',
        itemsPerPageLabel: 'Liczba wyników na stronę:',
        firstLabel: 'Pierwszy',
        previousLabel: 'Poprzedni',
        nextLabel: 'Następny',
        lastLabel: 'Ostatni',
        ariaLabel: 'Stronicowanie',
        totalResultsLabel: 'Liczba wyników: {{ totalCount }}'
    },
    coreProductSwitch: {
        ariaLabel: 'Przełącznik Produktu'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Ukryty Element Menu',
        cancel: 'Cancel',
        search: 'Search'
    },
    coreSlider: {
        singleMinMaxDetails: 'Minimalna wartość {{ min }}, maksymalna wartość {{ max }}',
        singleValueminDetails: 'Wartość {{ value }}',
        singleValuemaxDetails: 'Wartość {{ value }}',
        singleValueNowDetails: 'Aktualna wartość: {{ value }}',
        multipleHandle1MinMaxDetails: 'Minimalna wartość {{ min }}, maksymalna wartość {{ max }}',
        multipleHandle1ValueminDetails: 'Wartość {{ value }}',
        multipleHandle1ValuemaxDetails: 'Wartość {{ value }}',
        multipleHandle1ValueNowDetails: 'Aktualna wartość {{ value }}',
        multipleHandle2MinMaxDetails: 'Minimalna wartość {{ min }}, maksymalna wartość {{ max }}',
        multipleHandle2ValueminDetails: 'Wartość {{ value }}',
        multipleHandle2ValuemaxDetails: 'Wartość {{ value }}',
        multipleHandle2ValueNowDetails: 'Aktualna wartość {{ max }}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Pokaż więcej',
        arialLabel: 'Przycisk podziału'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Sekcja'
    },
    coreStepInput: {
        incrementButtonTitle: 'Zwiększ',
        decrementButtonTitle: 'Zmniejsz',
        ariaRoleDescription: 'Dane kroku'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Akceptuj',
        semanticDeclineLabel: 'Zrezygnuj'
    },
    coreTabs: {
        tabListExpandButtonText: 'Więcej'
    },
    coreText: {
        moreLabel: 'Więcej',
        lessLabel: 'Mniej'
    },
    coreTime: {
        componentAriaName: 'Selector godziny',
        increaseHoursLabel: 'Zwiększ godzinę',
        hoursLabel: 'Godz.',
        decreaseHoursLabel: 'Zmniejsz godzinę',
        increaseMinutesLabel: 'Zwiększ minuty',
        minutesLabel: 'Min',
        decreaseMinutesLabel: 'Zmniejsz minuty',
        increaseSecondsLabel: 'Zwiększ sekundy',
        secondsLabel: 'Sec',
        decreaseSecondsLabel: 'Zmniejsz sekundy',
        increasePeriodLabel: 'Zwiększ zakres',
        periodLabel: 'Zakres',
        decreasePeriodLabel: 'Zmniejsz zakres',
        navigationInstruction:
            'Uzyj strzałek góra/dół żeby przechodzić pomiędzy elementami listy. Naciśnij strzłki w lewo/prawo żeby przełączyć się pomiędzy listami.'
    },
    coreTimePicker: {
        timePickerInputLabel: 'Pole selectora godziny',
        timePickerButtonLabel: 'Otwórz selektor'
    },
    coreToken: {
        deleteButtonLabel: 'Usuń',
        ariaRoleDescription: 'token'
    },
    coreTokenizer: {
        moreLabel: '{{count}} more'
    },
    coreUploadCollection: {
        menuOkText: 'Ok',
        menuCancelText: 'Anuluj',
        menuEditAriaLabel: 'Edytuj',
        menuDeleteAriaLabel: 'Usuń',
        menuOkAriaLabel: 'Edutuj',
        menuCancelAriaLabel: 'Anuluj',
        formItemPlaceholder: 'Nazwa pliku'
    },
    coreWizard: {
        ariaLabel: 'Kreator'
    },
    coreBreadcrumb: {
        overflowTitleMore: 'Więcej'
    },
    platformActionBar: {
        backButtonLabel: 'Powrót'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Obserwatorzy',
        defaultTitle: 'Proces zatwierdzenia',
        nextButtonAriaLabel: 'Idz do nestępnego slajdu',
        prevButtonAriaLabel: 'Idz do poprzedniego slajdu',
        editModeSaveButtonLabel: 'Zapisz',
        editModeExitButtonLabel: 'Wyjdz',
        emptyTitle: 'Zacznij dodawać zatwierdzających oraz obserwatorów',
        emptyHint:
            'Żeby dodać zatwierdzających kliknij "Dodaj krok". Żeby dodać obserwujących kliknij pole Obserwujący',
        addNodeDialogHeaderAddApprovers: 'Dodaj zatwierdzjących',
        addNodeDialogHeaderEditApprover: 'Edutuj zatwierdzającego',
        addNodeDialogHeaderAddApproverTeam: 'Użytkownik/Zespół',
        addNodeDialogHeaderDetail: 'Cecha',
        addNodeDialogNodeType: 'Równoległy lub seryjny',
        addNodeDialogNodeTypeSerial: 'Seryjny',
        addNodeDialogNodeTypeParallel: 'Równoległy',
        addNodeDialogApproverType: 'Typ zatwierdzenia',
        addNodeDialogApproverTypeUser: 'Użytkownik',
        addNodeDialogApproverTypeTeamAnyone: 'Ktokolwiek z zespółu',
        addNodeDialogApproverTypeTeamEveryone: 'Każdy z zespołu',
        addNodeDialogUserOrTeam: 'Użytkownik/Zespół',
        addNodeDialogAddToNext: 'Dodaj do następnego seryjnego noda',
        addNodeDialogDueDate: 'Termin',
        addNodeSearchPlaceholder: 'Szukaj',
        addNodeAddActionBtnLabel: 'Dodaj',
        addNodeCancelActionBtnLabel: 'Anuluj',
        addNodeSelectApproverActionBtnLabel: 'Zaznacz',
        addNodeCancelApproverSelectionActionBtnLabel: 'Anuluj',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Zamknij',
        userDetailsHeader: 'Informacje',
        userDetailsSendReminderBtnLabel: 'Wyślij przypomnienie',
        userDetailsCancelBtnLabel: 'Anuluj',
        messagesApproverAddedSuccess: '1 zatwierdzający dodany',
        messagesTeamAddedSuccess: '1 zespół dodany',
        messagesNodeEdited: '1 zatwierdzający zmodyfinowany',
        messagesNodeRemovedSingular: '1 zatwierdzający usunięty',
        messagesNodeRemovedPlural: 'Zatwierdzający usunięci',
        messagesTeamRemoved: '1 zespół usuniety',
        messagesErrorBuildGraph: 'Wystąpił błąd podczas budowy grafu. Sprawdź wprowadzone dane.',
        messagesUndoAction: 'Cofnij',
        nodeMembersCount: 'Liczba subnodów {{ count }}',
        nodeVariousTeams: 'Różne zespoły',
        nodeStatusDueToday: 'Do dziś',
        nodeStatusDueInXDays: 'Termin dni {{ count }}',
        nodeStatusXDaysOverdue: 'Liczba dni zaległych {{ count }}',
        nodeActionAddApproversBefore: 'Dodaj zatwierdzających przed',
        nodeActionAddApproversAfter: 'Dodaj zatwierdzających po',
        nodeActionAddApproversParallel: 'Dodaj równolegle zatwierdzających',
        nodeActionEditApprover: 'Edytuj zatwierdzającego',
        nodeActionRemove: 'Usuń',
        selectTypeDialogMoveApproverAs: 'Przesuń zatwierdzjącego jako',
        selectTypeDialogParallelOrSerial: 'Równoległy lub seryjny',
        selectTypeDialogNodeTypeParallel: 'Równoległy zatwierdzający',
        selectTypeDialogNodeTypeSerial: 'Seryjny zatwierdzający',
        selectTypeDialogConfirmButton: 'Potwierdź',
        selectTypeDialogCancelButton: 'Anuluj',
        toolbarAddStepButton: 'Dodaj krok',
        toolbarEditButton: 'Edytuj',
        toolbarAddApproversBefore: 'Dodaj zatwierdzających przed',
        toolbarAddApproversAfter: 'Dodaj zatwierdzających po',
        toolbarAddApproversParallel: 'Dodaj równolegle zatwierdzających',
        toolbarRemove: 'Usuń',
        toolbarEditApprover: 'Edytuj zatwierdzającego',
        watchersInputPlaceholder: 'Szukaj tutaj..',
        userListSelectedItemsCountSingular: 'Liczba zaznaczonych elementów: {{ count }}',
        userListSelectedItemsCountPlural: 'Liczba zaznaczonych elementów: {{ count }}',
        statusApproved: 'approved',
        statusRejected: 'rejected',
        statusInProgress: 'in progress',
        statusNotStarted: 'not started'
    },
    platformFeedInput: {
        userTitle: 'Użytkownik'
    },
    platformVHD: {
        selectionBarLabel: 'Zaznaczenia i warunki',
        selectedAndConditionLabel: 'Zaznaczenia i Warunki',
        footerClearSelectedTitle: 'wyczyść zaznaczenie',
        footerClearSelectedAriaLabel: 'wyczyść zaznaczenie',
        searchButtonLabel: 'Idź',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Anuluj',
        selectedEmptyLabel: 'Nie zaznaczono żadnych elementów ani warunków',
        searchPlaceholder: 'Szukaj',
        searchAdvancedSearchLabel: 'Filtry',
        searchShowAdvancedSearchLabel: 'Pokaż filtry',
        searchHideAdvancedSearchLabel: 'Ukryj filtry',
        searchShowAllAdvancedSearchLabel: 'Pokaż wszystkie filtry',
        searchHideAllAdvancedSearchLabel: 'Ukryj wszystkie filtry',
        selectTabDisplayCountLabel: 'Elementy ({{ count }})',
        selectTabMoreBtnLabel: 'Więcej',
        selectTabCountHiddenA11yLabel: 'Liczba wierszy {{ rowCount }}, liczba kolumn {{ colCount }}',
        selectMobileTabBackBtnTitle: 'Powrót',
        selectMobileTabBtnOpenDialogLabel: 'Otwórz dialog',
        selectMobileTabTitle: '{{ title }} zakładka',
        selectMobileConditionEmpty: 'Pusty',
        defineConditionTitle: 'Produkt',
        defineConditionSelectedValueHiddenA11yLabel: 'zaznaczona wartość {{ value }}',
        defineConditionConditionsGroupHeaderInclude: 'Zawiera',
        defineConditionConditionsGroupHeaderExclude: 'Nie zawiera',
        defineConditionFromPlaceholder: 'od',
        defineConditionToPlaceholder: 'do',
        defineConditionValuePlaceholder: 'wartość',
        defineConditionRemoveConditionButtonTitle: 'Usuń warunek',
        defineConditionAddConditionButtonLabel: 'Dodaj',
        defineConditionAddConditionButtonTitle: 'Dodaj Warunek',
        defineConditionConditionStrategyLabelContains: 'zawiera',
        defineConditionConditionStrategyLabelEqualTo: 'równy',
        defineConditionConditionStrategyLabelBetween: 'pomiędzy',
        defineConditionConditionStrategyLabelStartsWith: 'zaczynający się na',
        defineConditionConditionStrategyLabelEndsWith: 'kończący się na',
        defineConditionConditionStrategyLabelLessThan: 'mniej niż',
        defineConditionConditionStrategyLabelLessThanEqual: 'mniej lub równo niż',
        defineConditionConditionStrategyLabelGreaterThan: 'więcej niż',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'więcej lub równo niż',
        defineConditionConditionStrategyLabelEmpty: 'pusty',
        defineConditionConditionStrategyLabelNotEqualTo: 'nie równy',
        defineConditionConditionStrategyLabelNotEmpty: 'nie pusty',
        defineConditionMaxCountError: 'Wprowadź wartość zawierającą nie wiecej niż {{ count }} znaków',
        selectTabTitle: 'Wybierz z listy',
        searchTableEmptyMessage: 'Użyj wyszukiwania by uzyskać wyniki',
        defineTabTitle: 'Zdefinjuj warunki'
    },
    platformCombobox: {
        countListResultsSingular: 'Lista 1 elementowa',
        countListResultsPlural: 'Lista {{ count }} elementowa'
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Zaznacz elementy',
        inputIconTitle: 'Zaznacz elementy',
        mobileShowAllItemsButton: 'Pokaż wszystkie elementy',
        mobileShowSelectedItemsButton: 'Pokaż zaznaczone elementy'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: 'Liczba znaków powyżej limitu {{ count }}',
        counterMessageCharactersOverTheLimitPlural: 'Liczba znaków powyżej limitu {{ count }}',
        counterMessageCharactersRemainingSingular: 'Liczba pozostających znaków {{ count }}',
        counterMessageCharactersRemainingPlural: 'Liczba pozostających znaków {{ count }}'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Media: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'wczytywanie'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'cecha',
        deleteActionAriaLabel: 'usuń'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'cecha',
        deleteActionAriaLabel: 'usuń'
    },
    platformSearchField: {
        clearButtonTitle: 'Wyczyść',
        submitButtonTitle: 'Szukaj',
        synchronizeButtonTitle: 'Synchronizuj',
        searchSuggestionMessage: 'Znaleziono {{ count }} możliwych wyników.',
        searchSuggestionNavigateMessage: 'Poruszaj się za pomocą strzałek góra/dół'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Szukaj',
        submitButtonLabel: 'Idź',
        filtersButtonLabel: 'Filtry ({{ filtersCount }})',
        showFiltersButtonLabel: 'Pokaż filtry',
        hideFiltersButtonLabel: 'Ukryj filtry',
        defineConditionsRemoveConditionButtonTitle: 'Usuń warunek',
        defineConditionsAddConditionButtonLabel: 'Dodaj warunek',
        defineConditionsSubmitButtonLabel: 'Idź',
        defineConditionsCancelButton: 'Anuluj',
        selectFiltersHeader: 'Filtry',
        selectFiltersAvailableFiltersText: 'Dostępne filtry',
        selectFiltersFilterColumnLabel: 'Filtr',
        selectFiltersActiveColumnLabel: 'Aktywny',
        selectFiltersSubmitButtonLabel: 'Idź',
        selectFiltersCancelButton: 'Anuluj',
        filterConditionContains: 'zawiera',
        filterConditionEqualTo: 'równy',
        filterConditionBetween: 'pomiędzy',
        filterConditionBeginsWith: 'zaczynający się na',
        filterConditionEndsWith: 'kończący się na',
        filterConditionLessThan: 'mniej niż',
        filterConditionLessThanOrEqualTo: 'mniej lub równo niż',
        filterConditionGreaterThan: 'więcej niż',
        filterConditionGreaterThanOrEqualTo: 'więcej lub równo niż',
        filterConditionAfter: 'po',
        filterConditionOnOrAfter: 'w lub po',
        filterConditionBefore: 'przed',
        filterConditionBeforeOrOn: 'przed lub w',
        filterConditionValuePlaceholder: 'wartość',
        filterConditionValueFromPlaceholder: 'od',
        filterConditionValueToPlaceholder: 'do',
        settingsCategoryAll: 'Wszystko',
        settingsCategoryVisible: 'Widoczny',
        settingsCategoryActive: 'Aktywny',
        settingsCategoryVisibleAndActive: 'Widoczny i aktywny',
        settingsCategoryMandatory: 'Obowiązkowy',
        manageFieldConditions: 'Manage field conditions',
        refreshButtonAriaLabel: 'Refresh'
    },
    platformTable: {
        headerMenuSortAsc: 'Sortuj Rosnąco',
        headerMenuSortDesc: 'Sortuj Malejąco',
        headerMenuGroup: 'Grupa',
        headerMenuFreeze: 'Zamrożenie',
        headerMenuEndFreeze: 'Freeze to End',
        headerMenuUnfreeze: 'HeaderMenuUnfreeze',
        headerMenuFilter: 'Filtr',
        defaultEmptyMessage: 'Brak wyników',
        noVisibleColumnsMessage:
            'Right now, there are no visible columns in the table. Please select the columns you need in the table settings.',
        resetChangesButtonLabel: 'Reset',
        editableCellNumberPlaceholder: 'Wprowadz wartość',
        editableCellDatePlaceholder: 'Wprowadz wartość',
        editableCellStringPlaceholder: 'Wprowadz wartość',
        P13ColumnsDialogHeader: 'Kolumny',
        P13ColumnsDialogSearchPlaceholder: 'Szukaj',
        P13ColumnsDialogsShowSelected: 'Pokaż wybrane',
        P13ColumnsDialogShowAll: 'Pokaż wszystkie',
        P13ColumnsDialogSelectAll: 'Pokaż wszystkie ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Anuluj',
        P13ColumnsDialogMoveToTopBtn: 'Przesuń do samej góry',
        P13ColumnsDialogMoveUpBtn: 'Przesuń do góry',
        P13ColumnsDialogMoveDownBtn: 'Przesuń na dół',
        P13ColumnsDialogMoveToBottomBtn: 'Przesuń na sam dół',
        P13FilterStrategyLabelBetween: 'pomiędzy',
        P13FilterStrategyLabelContains: 'zawiera',
        P13FilterStrategyLabelBeginsWith: 'zaczynający się na',
        P13FilterStrategyLabelEndsWith: 'kończący się na',
        P13FilterStrategyLabelEqualTo: 'równy',
        P13FilterStrategyLabelGreaterThan: 'więcej niż',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'więcej lub równo niż',
        P13FilterStrategyLabelLessThan: 'mniej niż',
        P13FilterStrategyLabelLessThanOrEqualTo: 'mniej lub równo niż',
        P13FilterStrategyLabelAfter: 'po',
        P13FilterStrategyLabelOnOrAfter: 'w lub po',
        P13FilterStrategyLabelBefore: 'przed',
        P13FilterStrategyLabelBeforeOrOn: 'przed lub w',
        P13FilterStrategyLabelNotDefined: 'Nie Zdefiniowano',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Tak',
        P13FilterBooleanOptionFalse: 'Nie',
        P13FilterDialogHeader: 'Filtruj',
        P13FilterDialogIncludePanelTitleWithCount: 'Zawiera ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Zawiera',
        P13FilterDialogExcludePanelTitleWithCount: 'Nie zawiera ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Nie zawiera',
        P13FilterDialogRemoveFilterBtnTitle: 'Usuń Filtr',
        P13FilterDialoAddFilterBtnTitle: 'Dodaj Filtr',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Anuluj',
        P13GroupDialogHeader: 'Grupa',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(nic)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Pokaż Pole jako Kolumnę',
        P13GroupDialogRemoveGroupBtnTitle: 'Usuń',
        P13GroupDialogAddNewGroupBtnTitle: 'Dodaj nową',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Anuluj',
        P13SortDialogHeader: 'Sortuj',
        P13SortDialogNoneSelectedColumn: '(nic)',
        P13SortDialogNoneSelectedSorting: '(nic)',
        P13SortDialogSortOrderSelectOptionAsc: 'Rosnąco',
        P13SortDialogSortOrderSelectOptionDesc: 'Malejąco',
        P13SortDialogRemoveSortBtnTitle: 'Usuń',
        P13SortDialogAddNewSortBtnTitle: 'Dodaj nowy',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Anuluj',
        toolbarSearchPlaceholder: 'Szukaj',
        toolbarActionCreateButtonLabel: 'Utwórz',
        toolbarActionSaveButtonLabel: 'Zapisz',
        toolbarActionCancelButtonLabel: 'Anuluj',
        toolbarActionSortButtonTitle: 'Sortuj',
        toolbarActionFilterButtonTitle: 'Filtr',
        toolbarActionGroupButtonTitle: 'Grupa',
        toolbarActionColumnsButtonTitle: 'Kolumny',
        toolbarActionExpandAllButtonTitle: 'Expand all',
        toolbarActionCollapseAllButtonTitle: 'Collapse all',
        filterDialogNotFilteredLabel: '(Nie zastosowano żadnego filtra)',
        filterDialogFilterByLabel: 'Użyto filtr: {{ filterLabel }}',
        filterDialogFilterTitle: 'Filtr',
        filterDialogFilterBy: 'Użyto filtr',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Anuluj',
        groupDialogHeader: 'Grupa',
        groupDialogGroupOrderHeader: 'Kolejność grup',
        groupDialogGroupOrderAsc: 'Rosnąco',
        groupDialogGroupOrderDesc: 'Malejąco',
        groupDialogGroupByHeader: 'Grupuj po',
        groupDialogNotGroupedLabel: '(Nie Pogrupowano)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Anuluj',
        sortDialogHeader: 'Sortuj',
        sortDialogSortOrderHeader: 'Kolejność sortowania',
        sortDialogSortOrderAsc: 'Rosnąco',
        sortDialogSortOrderDesc: 'Malejąco',
        sortDialogSortByHeader: 'Posortowano po',
        sortDialogNotSortedLabel: '(Nie Posortowano)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Anuluj',
        selectAllCheckboxLabel: 'Select all',
        deselectAllCheckboxLabel: 'Deselect all',
        deselectSingleRow: 'To deselect row, press SPACEBAR',
        selectSingleRow: 'To select row, press SPACEBAR'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Idź do poprzedniego',
        detailsGotoNextButtonTitle: 'Idź do następnego',
        detailsDialogCloseBtnLabel: 'Zamknij',
        roleDescription: 'Obraz'
    },
    platformUploadCollection: {
        moveToTitle: 'Przenieś do',
        moveToTitleFolder: 'Folder',
        moveToNewFolderBtnLabel: 'Nowy Folder',
        moveToAllFilesSubHeaderLabel: 'Wszystkie pliki',
        moveToConfirmBtn: 'Przesuń',
        moveToCloseBtn: 'Anuluj',
        newFolderTitle: 'Nowy folder',
        newFolderAtRootInputLabel: 'Nazwa nowego folderu',
        newFolderAtFolderInputLabel: 'Nazwa nowego folderu wewnątrz folderu {{ folderName }}',
        newFolderInputPlaceholder: 'Pisz tutaj...',
        newFolderInputErrorLabel: 'Maksymalna liczba znaków {{ count }}',
        newFolderDialogCreateBtnLabel: 'Utwórz',
        newFolderDialogCancelBtnLabel: 'Anuluj',
        breadcrumbLabelAllFiles: 'Wszystkie pliki',
        breadcrumbLabelAllFilesWithTotal: 'Wszystkie pliki ({{ total }})',
        searchPlaceholder: 'Szukaj',
        addBtnLabel: 'Dodaj`',
        newFolderBtnLabel: 'Nowy Folder',
        moveToBtnLabel: 'Przenieś do',
        downloadBtnLabel: 'Ściągnij',
        updateVersionBtnLabel: 'Aktualizuj wersję',
        removeBtnLabel: 'Usuń',
        folderIconTitle: 'Obrazek folderu',
        fileIconTitle: 'Obrazek pliku',
        editFileNameInputPlaceholder: 'Wprowadz nazwę',
        editFileNameFileAlreadyExistsError: 'Plik o podanej nazwie już istnieje',
        editFileNameFolderAlreadyExistsError: 'Folder o podanej nazwie już istnieje',
        itemStatusSuccessful: 'Sukces',
        itemStatusUnsuccessful: 'Niepowodzenie',
        uploadNewFileAfterFailAction: 'Idź',
        cancelUploadNewFileAction: 'Anuluj',
        itemMenuBtnTitle: 'Więcej',
        dragDropAreaText: 'Przeciągnij by przekazać plik',
        noDataText: 'Nie znaleziono żadnych plików',
        noDataDescription: 'Upuść pliki żeby przekazać lub użyj przycisku “Dodaj” ',
        paginationTotal: 'Widoczne {{ from }}-{{ to }} z {{ total }}',
        resultsPerPage: 'Liczba wyników na strone',
        messageCreateFailed: 'Nie udało się utworzyć {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} został utworzony.',
        messageUpdateVersionFailed: 'Nie udało się zaktualizować wersji {{ folderName }}.',
        messageUpdateVersionSuccess: '{{ folderName }} wersja zaktualizowana.',
        messageFileRenameFailed: 'Nie powiodła się zmiana nazwy z "{{ from }}" na "{{ to }}."',
        messageFileRenameSuccess: '"{{ from }}" został zmieniony na "{{ to }}".',
        messageRemoveFoldersAndFilesFailed:
            'Nie powiodło się usunięcie folderów w liczbie {{ foldersCount }} oraz plików w liczbie {{ filesCount }} .',
        messageRemoveFoldersAndFilesSuccess:
            'Liczba folderów usunięta {{ foldersCount }} oraz liczba plików usuniętych {{ filesCount }}.',
        messageRemoveFoldersFailed: 'Nie powiodło się usunięcie folderów w liczbie {{ foldersCount }}.',
        messageRemoveFoldersSuccess: 'Liczba folderów usuniętych {{ foldersCount }}',
        messageRemoveFilesFailed: 'Nie powiodło się usunięcie plików w liczbie {{ foldersCount }}.',
        messageRemoveFilesSuccess: 'Liczba plików usuniętych {{ foldersCount }}',
        messageRemoveFileOrFolderFailed: 'Nie powiodło się usunięcie {{ name }}.',
        messageRemoveFileOrFolderSuccess: 'Usunięto {{ name }}.',
        messageMoveFoldersAndFilesFailed:
            'Nie powiodło się przeniesienie folderów w liczbie {{ foldersCount }} oraz plików w liczbie {{ filesCount }} do {{ to }}.',
        messageMoveFoldersAndFilesSuccess:
            'Foldery w liczbie {{ foldersCount }} oraz pliki w liczbie {{ filesCount }} zostały przeniesione do {{ to }}.',
        messageMoveFoldersFailed: 'Nie powiodło się przeniesienie folderów w liczbie {{ foldersCount }} do {{ to }}.',
        messageMoveFoldersSuccess: 'Foldery w liczbie {{ foldersCount }} zostały przeniesione do {{ to }}.',
        messageMoveFilesFailed: 'Nie powiodło się przeniesienie plików w liczbie {{ filesCount }} do {{ to }}.',
        messageMoveFilesSuccess: 'Pliki w liczbie {{ filesCount }} zostały przeniesione do {{ to }}.',
        messageMoveFileOrFolderFailed: 'Nie powiodło się przeniesienie {{ name }} do {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} przeniesiono do {{ to }}.',
        messageMoveRootFoldersAndFilesFailed:
            'Nie powiodło się przeniesienie folderów w liczbie {{ foldersCount }} oraz plików w liczbie {{ filesCount }} do wszystkich plików.',
        messageMoveRootFoldersAndFilesSuccess:
            'Foldery w liczbie {{ foldersCount }} oraz pliki w liczbie {{ filesCount }} zostały przeniesione do wszystkich plików.',
        messageMoveRootFoldersFailed:
            'Nie powiodło się przeniesienie folderów w liczbie {{ foldersCount }} do wszystkich folderów.',
        messageMoveRootFoldersSuccess:
            'Foldery w liczbie {{ foldersCount }} zostały przeniesione do wszystkich folderów.',
        messageMoveRootFilesFailed:
            'Nie powiodło się przeniesienie plików w liczbie {{ filesCount }} do wszystkich plików.',
        messageMoveRootFilesSuccess: 'Pliki w liczbie {{ filesCount }} zostały przeniesione do wszystkich plików.',
        messageMoveRootFileOrFolderFailed: 'Nie powiodło się przeniesienie {{ name }} do wszystkich plików.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} przeniesiono do wszystkich plików.',
        messageFileTypeMismatchPlural:
            'Liczba plików ze złym typem {{ filesCount }}. Typy dozwolone: {{ allowedTypes }}.',
        messageFileTypeMismatchSingular: 'Plik "{{ fileName }}" ma zły typ. Typy dozwolone: {{ allowedTypes }}.',
        messageFileSizeExceededPlural:
            'Liczba plików przekraczająca maksymalny rozmiar {{ filesCount }}. Maksymalna wielkość pliku do: {{ maxFileSize }}.',
        messageFileSizeExceededSingular:
            'Plik "{{ fileName }}" przekroczył maksymalny rozmiar. Maksymalna wielkość pliku: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural:
            'Liczba plików przekraczająca maksymalną długość nazwy {{ filesCount }}. Maksymalna długość: {{ maxFilenameLength }} znaków.',
        messageFileNameLengthExceededSingular:
            'Nazwa "{{ fileName }}" przekroczyła maksymalną długość. Maksymalna długość: {{ maxFilenameLength }} znaków.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Edytuj'
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
        selectOptionLabel: 'Wybierz opcję'
    },
    fnSlider: {
        minMaxDetails: 'Minimalna wartość {{ min }}, maksymalna wartość {{ max }}',
        valueminDetails: 'Wartość {{ value }}',
        valuemaxDetails: 'Wartość {{ value }}',
        valueNowDetails: 'Aktualna wartość: {{ value }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Zatwierdz',
        semanticDeclineLabel: 'Odrzuć'
    },
    coreTree: {
        expand: 'Expand node',
        collapse: 'Collapse node',
        noData: 'No data'
    }
};
