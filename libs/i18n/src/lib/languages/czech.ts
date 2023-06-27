import { FdLanguage } from '../models/lang';

/**
 * Default set of translations of Fundamental UI library for Czech language
 */
export const FD_LANGUAGE_CZECH: FdLanguage = {
    coreCarousel: {
        leftNavigationBtnLabel: 'Přejít na předchozí položku',
        rightNavigationBtnLabel: 'Přejít na další položku'
    },
    coreDatePicker: {
        dateInputLabel: 'Date input',
        dateRangeInputLabel: 'Date range input',
        displayCalendarToggleLabel: 'Otevřete výběr',
        valueStateSuccessMessage: 'Úspěšný stav hodnoty',
        valueStateInformationMessage: 'Informativní stav hodnoty',
        valueStateWarningMessage: 'Varovný stav hodnoty',
        valueStateErrorMessage: 'Chybný stav hodnoty'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Datetime input',
        displayDatetimeToggleLabel: 'Přepínač zobrazení kalendáře',
        displayTypeDateLabel: 'Datum',
        displayTypeTimeLabel: 'Čas',
        datetimeOkLabel: 'Ok',
        datetimeCancelLabel: 'Zrušit'
    },
    coreFeedListItem: {
        moreLabel: 'Více',
        lessLabel: 'Méně'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Zrušit',
        listItemStatusAriaLabel: 'Položka má stav. Stav: {{ status }}',
        listItemCounterAriaLabel: 'Položka má {{ count }} potomků.',
        listItemButtonDetailsTitle: 'Podrobnosti',
        listItemButtonDeleteTitle: 'Vymazat',
        listItemStatusContainsErrors: 'Obsahuje chyby',
        listItemStatusLocked: 'Zamčený',
        listItemStatusDraft: 'Koncept'
    },
    coreMessageStrip: {
        dismissLabel: 'Zrušit'
    },
    coreMultiInput: {
        multiInputAriaLabel: 'Multi Value Input'
    },
    coreNavigation: {
        mainNavigation: 'Main Navigation',
        navigationPath: 'Navigation Path'
    },
    coreNestedList: {
        linkItemAriaLabel: 'Položka stromu {{ itemDetails }}, {{ index }} z {{ total }}{{ selectedDescription }}'
    },
    coreOverflowLayout: {
        moreItemsButton: '{{ count }} více'
    },
    corePagination: {
        pageLabel: 'Strana {{ pageNumber }}',
        currentPageAriaLabel: 'Stránka {{ pageNumber }} je aktuální stránka',
        labelBeforeInputMobile: 'Strana:',
        labelAfterInputMobile: 'z {{ totalCount }}',
        inputAriaLabel: 'Vstup stránky, aktuální stránka, stránka {{ pageNumber }} z {{ totalCount }}',
        itemsPerPageLabel: 'Výsledky na stránku:',
        firstLabel: 'První',
        previousLabel: 'Předchozí',
        nextLabel: 'Další',
        lastLabel: 'Poslední',
        ariaLabel: 'Stránkování',
        totalResultsLabel: '{{ totalCount }} Výsledky'
    },
    coreProductSwitch: {
        ariaLabel: 'Přepínač produktu'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Nabídka sbalených položek',
        cancel: 'Cancel',
        search: 'Search'
    },
    coreSlider: {
        singleMinMaxDetails: 'Minimální hodnota posuvníku je {{ min }}, maximální hodnota je {{ max }}',
        singleValueminDetails: 'Hodnota je {{ value}}',
        singleValuemaxDetails: 'Hodnota je {{ value }}',
        singleValueNowDetails: 'Aktuální hodnota je {{ value}}',
        multipleHandle1MinMaxDetails:
            'Minimální hodnota posuvníku rozsahu je {{ min }}, maximální hodnota je {{ max }}',
        multipleHandle1ValueminDetails: 'Hodnota je {{ value}}',
        multipleHandle1ValuemaxDetails: 'Hodnota je {{ value}}',
        multipleHandle1ValueNowDetails: 'Aktuální hodnota je {{ value}}',
        multipleHandle2MinMaxDetails:
            'Minimální hodnota posuvníku rozsahu je {{ min }}, maximální hodnota je {{ max }}',
        multipleHandle2ValueminDetails: 'Hodnota je {{ value }}',
        multipleHandle2ValuemaxDetails: 'Hodnota je {{ value }}',
        multipleHandle2ValueNowDetails: 'Aktuální hodnota je {{ value}}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Více akcí',
        arialLabel: 'Split button'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Sekce'
    },
    coreStepInput: {
        incrementButtonTitle: 'Zvýšit',
        decrementButtonTitle: 'Snížit',
        ariaRoleDescription: 'Step Input'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Akceptovat',
        semanticDeclineLabel: 'Odmítnout'
    },
    coreTabs: {
        tabListExpandButtonText: 'Více'
    },
    coreText: {
        moreLabel: 'Více',
        lessLabel: 'Méně'
    },
    coreTime: {
        componentAriaName: 'Time picker',
        increaseHoursLabel: 'Zvyšit hodiny',
        hoursLabel: 'Hod',
        decreaseHoursLabel: 'Snížit hodiny',
        increaseMinutesLabel: 'Zvyšit minuty',
        minutesLabel: 'Min',
        decreaseMinutesLabel: 'Snížit minuty',
        increaseSecondsLabel: 'Zvyšit sekundy',
        secondsLabel: 'Sec',
        decreaseSecondsLabel: 'Snížit sekundy',
        increasePeriodLabel: 'Zvýšit období',
        periodLabel: 'Období',
        decreasePeriodLabel: 'Snížit období',
        navigationInstruction:
            'Chcete-li se pohybovat mezi položkami v tomto seznamu, stiskněte horní nebo dolní šipku. ' +
            'Pro přepínání mezi seznamy stiskněte levou nebo pravou šipku.'
    },
    coreTimePicker: {
        timePickerInputLabel: 'Time picker input',
        timePickerButtonLabel: 'Otevřete výběr'
    },
    coreToken: {
        deleteButtonLabel: 'Smazatelné',
        ariaRoleDescription: 'token'
    },
    coreTokenizer: {
        moreLabel: '{{count}} more'
    },
    coreUploadCollection: {
        menuOkText: 'Ok',
        menuCancelText: 'Zrušit',
        menuEditAriaLabel: 'Upravit',
        menuDeleteAriaLabel: 'Smazat',
        menuOkAriaLabel: 'Upravit',
        menuCancelAriaLabel: 'Zrušit',
        formItemPlaceholder: 'Název souboru'
    },
    coreWizard: {
        ariaLabel: 'Wizard'
    },
    coreBreadcrumb: {
        overflowTitleMore: 'Více'
    },
    platformActionBar: {
        backButtonLabel: 'Vraťit se zpět'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Pozorovatelé',
        defaultTitle: 'Schvalovací proces',
        nextButtonAriaLabel: 'Přejít na další část',
        prevButtonAriaLabel: 'Přejít na předchozí část',
        editModeSaveButtonLabel: 'Uložit',
        editModeExitButtonLabel: 'Odejít',
        emptyTitle: 'Začněte přidávat schvalovatele a pozorovatele',
        emptyHint:
            'Chcete-li přidat schvalovatele, klikněte na „Přidat krok“. Chcete-li přidat pozorovatele, klikněte na pole Pozorovatele.',
        addNodeDialogHeaderAddApprovers: 'Přidat schvalovatele',
        addNodeDialogHeaderEditApprover: 'Upravit schvalovatele',
        addNodeDialogHeaderAddApproverTeam: 'Uživatel/Tým',
        addNodeDialogHeaderDetail: 'Detail',
        addNodeDialogNodeType: 'Paralelní nebo sériové',
        addNodeDialogNodeTypeSerial: 'Sériové',
        addNodeDialogNodeTypeParallel: 'Paralelní',
        addNodeDialogApproverType: 'Typ schvalovatele',
        addNodeDialogApproverTypeUser: 'A user',
        addNodeDialogApproverTypeTeamAnyone: 'Anyone on the team',
        addNodeDialogApproverTypeTeamEveryone: 'Všichni v týmu',
        addNodeDialogUserOrTeam: 'Uživatel/Tým',
        addNodeDialogAddToNext: 'Přidat k dalšímu sériovému uzlu',
        addNodeDialogDueDate: 'Datum schválení',
        addNodeSearchPlaceholder: 'Hledat',
        addNodeAddActionBtnLabel: 'Přidat',
        addNodeCancelActionBtnLabel: 'Zrušit',
        addNodeSelectApproverActionBtnLabel: 'Select',
        addNodeCancelApproverSelectionActionBtnLabel: 'Zrušit',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Zavřít',
        userDetailsHeader: 'Detail',
        userDetailsSendReminderBtnLabel: 'Send reminder',
        userDetailsCancelBtnLabel: 'Zrušit',
        messagesApproverAddedSuccess: 'Byl přidán 1 schvalovatel',
        messagesTeamAddedSuccess: '1 tým byl přidán',
        messagesNodeEdited: '1 schvalovatel byl upraven',
        messagesNodeRemovedSingular: '1 schvalovatel byl odebrán',
        messagesNodeRemovedPlural: 'Schvalovatelé byli odebráni',
        messagesTeamRemoved: '1 tým byl odstraněn',
        messagesErrorBuildGraph: 'There was an error when trying to build graph. Check the initial data.',
        messagesUndoAction: 'Zpět',
        nodeMembersCount: '{{ count }} členů',
        nodeVariousTeams: 'Různé týmy',
        nodeStatusDueToday: 'Ke schválení dnes',
        nodeStatusDueInXDays: ' Ke schválení za {{ count }} dní',
        nodeStatusXDaysOverdue: '{{ count }} dní po schválení',
        nodeActionAddApproversBefore: 'Přidejte schvalovatele před',
        nodeActionAddApproversAfter: 'Přidejte schvalovatele za',
        nodeActionAddApproversParallel: 'Přidejte paralelní schvalovatele',
        nodeActionEditApprover: 'Upravit schvalovatele',
        nodeActionRemove: 'Odstranit',
        selectTypeDialogMoveApproverAs: 'Přesunout schvalovatele jako',
        selectTypeDialogParallelOrSerial: 'Paralelní nebo sériové',
        selectTypeDialogNodeTypeParallel: 'Paralelní schvalovatel',
        selectTypeDialogNodeTypeSerial: 'Sériový schvalovatel',
        selectTypeDialogConfirmButton: 'Potvrdit',
        selectTypeDialogCancelButton: 'Zrušit',
        toolbarAddStepButton: 'Přidat krok',
        toolbarEditButton: 'Upravit',
        toolbarAddApproversBefore: 'Přidejte schvalovatele před',
        toolbarAddApproversAfter: 'Přidejte schvalovatele za',
        toolbarAddApproversParallel: 'Přidejte paralelní schvalovatele',
        toolbarRemove: 'Odstranit',
        toolbarEditApprover: 'Upravit schvalovatele',
        watchersInputPlaceholder: 'Hledej tady..',
        userListSelectedItemsCountSingular: 'Vybrána 1 položka',
        userListSelectedItemsCountPlural: 'Počet vybraných položek: {{ count }}',
        statusApproved: 'approved',
        statusRejected: 'rejected',
        statusInProgress: 'in progress',
        statusNotStarted: 'not started'
    },
    platformFeedInput: {
        userTitle: 'Uživatel'
    },
    platformVHD: {
        selectionBarLabel: 'Vybrané a podmíněné položky',
        selectedAndConditionLabel: 'Vybrané položky a podmínky',
        footerClearSelectedTitle: 'vymazat vybrané položky',
        footerClearSelectedAriaLabel: 'vymazat vybrané položky',
        searchButtonLabel: 'Jdi',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Zrušit',
        selectedEmptyLabel: 'Nejsou vybrány žádné položky ani podmínky',
        searchPlaceholder: 'hledat',
        searchAdvancedSearchLabel: 'Filtry',
        searchShowAdvancedSearchLabel: 'Zobrazit filtry',
        searchHideAdvancedSearchLabel: 'Skrýt filtry',
        searchShowAllAdvancedSearchLabel: 'Zobrazit všechny filtry',
        searchHideAllAdvancedSearchLabel: 'Skrýt všechny filtry',
        selectTabDisplayCountLabel: 'Položky ({{ count }})',
        selectTabMoreBtnLabel: 'Více',
        selectTabCountHiddenA11yLabel: 'obsahuje {{ rowCount }} řádků a {{ colCount }} sloupců',
        selectMobileTabBackBtnTitle: 'Zpět',
        selectMobileTabBtnOpenDialogLabel: 'Otevřít dialog',
        selectMobileTabTitle: 'Karta {{ title }}',
        selectMobileConditionEmpty: 'Prázdný',
        defineConditionTitle: 'Produkt',
        defineConditionSelectedValueHiddenA11yLabel: 'vybraná hodnota {{ hodnota }}',
        defineConditionConditionsGroupHeaderInclude: 'Zahrnout',
        defineConditionConditionsGroupHeaderExclude: 'Vyloučit',
        defineConditionFromPlaceholder: 'od',
        defineConditionToPlaceholder: 'do',
        defineConditionValuePlaceholder: 'hodnota',
        defineConditionRemoveConditionButtonTitle: 'Odebrat podmínku',
        defineConditionAddConditionButtonLabel: 'Přidat',
        defineConditionAddConditionButtonTitle: 'Přidat podmínku',
        defineConditionConditionStrategyLabelContains: 'obsahuje',
        defineConditionConditionStrategyLabelEqualTo: 'rovná',
        defineConditionConditionStrategyLabelBetween: 'mezi',
        defineConditionConditionStrategyLabelStartsWith: 'začíná s',
        defineConditionConditionStrategyLabelEndsWith: 'končí s',
        defineConditionConditionStrategyLabelLessThan: 'méně než',
        defineConditionConditionStrategyLabelLessThanEqual: 'méně než rovné',
        defineConditionConditionStrategyLabelGreaterThan: 'větší než',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'větší než rovno',
        defineConditionConditionStrategyLabelEmpty: 'prázdný',
        defineConditionConditionStrategyLabelNotEqualTo: 'nerovná se',
        defineConditionConditionStrategyLabelNotEmpty: 'není prázdný',
        defineConditionMaxCountError: 'Zadejte hodnotu s maximálně {{ count }} znaků',
        selectTabTitle: 'Vyberte ze seznamu',
        searchTableEmptyMessage: 'K získání výsledků použijte vyhledávání',
        defineTabTitle: 'Definujte podmínky'
    },
    platformCombobox: {
        countListResultsSingular: '1 položka výsledkové listiny',
        countListResultsPlural: '{{ count }} položek výsledkového seznamu'
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Vyberte Možnosti',
        inputIconTitle: 'Vyberte Možnosti',
        mobileShowAllItemsButton: 'Zobrazit všechny položky',
        mobileShowSelectedItemsButton: 'Zobrazit vybrané položky'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: '1 znak nad limit',
        counterMessageCharactersOverTheLimitPlural: '{{ count }} znaků překračuje limit',
        counterMessageCharactersRemainingSingular: 'Zbývá 1 znak',
        counterMessageCharactersRemainingPlural: 'Zbývá {{ count }} znaků'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Médium: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'načítání'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'detail',
        deleteActionAriaLabel: 'vymazat'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'detail',
        deleteActionAriaLabel: 'vymazat'
    },
    platformSearchField: {
        clearButtonTitle: 'Vymazat',
        submitButtonTitle: 'Search',
        synchronizeButtonTitle: 'Synchronizovat',
        searchSuggestionMessage: 'Počet nalezených návrhů: {{ count }}.',
        searchSuggestionNavigateMessage: 'k navigaci použijte šipky nahoru a dolů'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Vyhledávání',
        submitButtonLabel: 'Jdi',
        filtersButtonLabel: 'Filtry ({{ filtersCount }})',
        showFiltersButtonLabel: 'Zobrazit filtry',
        hideFiltersButtonLabel: 'Skrýt filtry',
        defineConditionsRemoveConditionButtonTitle: 'Odstraňte podmínku',
        defineConditionsAddConditionButtonLabel: 'Přidat podmínku',
        defineConditionsSubmitButtonLabel: 'Jdi',
        defineConditionsCancelButton: 'Zrušit',
        selectFiltersHeader: 'Filtry',
        selectFiltersAvailableFiltersText: 'Dostupné filtry',
        selectFiltersFilterColumnLabel: 'Filtr',
        selectFiltersActiveColumnLabel: 'Aktivní',
        selectFiltersSubmitButtonLabel: 'Jdi',
        selectFiltersCancelButton: 'Zrušit',
        filterConditionContains: 'obsahuje',
        filterConditionEqualTo: 'rovná',
        filterConditionBetween: 'mezi',
        filterConditionBeginsWith: 'začíná s',
        filterConditionEndsWith: 'končí s',
        filterConditionLessThan: 'méně než',
        filterConditionLessThanOrEqualTo: 'menší nebo rovno',
        filterConditionGreaterThan: 'větší než',
        filterConditionGreaterThanOrEqualTo: 'větší nebo rovno',
        filterConditionAfter: 'po',
        filterConditionOnOrAfter: 'na nebo po',
        filterConditionBefore: 'před',
        filterConditionBeforeOrOn: 'před nebo na',
        filterConditionValuePlaceholder: 'hodnota',
        filterConditionValueFromPlaceholder: 'z',
        filterConditionValueToPlaceholder: 'na',
        settingsCategoryAll: 'Všechno',
        settingsCategoryVisible: 'Viditelné',
        settingsCategoryActive: 'Aktivní',
        settingsCategoryVisibleAndActive: 'Viditelné a aktivní',
        settingsCategoryMandatory: 'Povinné'
    },
    platformTable: {
        headerMenuSortAsc: 'Seřadit vzestupně',
        headerMenuSortDesc: 'Seřadit sestupně',
        headerMenuGroup: 'Skupina',
        headerMenuFreeze: 'Zmrazit',
        headerMenuEndFreeze: 'Freeze to End',
        headerMenuUnfreeze: 'HeaderMenuUnfreeze',
        headerMenuFilter: 'Filtr',
        defaultEmptyMessage: 'Nenalezena žádná data',
        resetChangesButtonLabel: 'Resetovat',
        editableCellNumberPlaceholder: 'Zadejte hodnotu',
        editableCellDatePlaceholder: 'Zadejte hodnotu',
        editableCellStringPlaceholder: 'Zadejte hodnotu',
        P13ColumnsDialogHeader: 'Sloupce',
        P13ColumnsDialogSearchPlaceholder: 'Vyhledávání',
        P13ColumnsDialogsShowSelected: 'Zobrazit vybrané',
        P13ColumnsDialogShowAll: 'Ukázat vše',
        P13ColumnsDialogSelectAll: 'Vybrat vše ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Zrušit',
        P13ColumnsDialogMoveToTopBtn: 'Přejít na začátek',
        P13ColumnsDialogMoveUpBtn: 'Posunout nahoru',
        P13ColumnsDialogMoveDownBtn: 'Posunout dolů',
        P13ColumnsDialogMoveToBottomBtn: 'Přesunout na konec',
        P13FilterStrategyLabelBetween: 'mezi',
        P13FilterStrategyLabelContains: 'obsahuje',
        P13FilterStrategyLabelBeginsWith: 'začíná s',
        P13FilterStrategyLabelEndsWith: 'končí s',
        P13FilterStrategyLabelEqualTo: 'rovná',
        P13FilterStrategyLabelGreaterThan: 'větší než',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'větší nebo rovno',
        P13FilterStrategyLabelLessThan: 'méně než',
        P13FilterStrategyLabelLessThanOrEqualTo: 'menší nebo rovno',
        P13FilterStrategyLabelAfter: 'po',
        P13FilterStrategyLabelOnOrAfter: 'na nebo po',
        P13FilterStrategyLabelBefore: 'před',
        P13FilterStrategyLabelBeforeOrOn: 'před nebo na',
        P13FilterStrategyLabelNotDefined: 'Není definovaný',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Ano',
        P13FilterBooleanOptionFalse: 'Ne',
        P13FilterDialogHeader: 'Filtrovat podle',
        P13FilterDialogIncludePanelTitleWithCount: 'Zahrnout ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Zahrnout',
        P13FilterDialogExcludePanelTitleWithCount: 'Vyloučit ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Vyloučit',
        P13FilterDialogRemoveFilterBtnTitle: 'Odstraňte filtr',
        P13FilterDialoAddFilterBtnTitle: 'Přidat filtr',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Zrušit',
        P13GroupDialogHeader: 'Skupina',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(žádný)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Zobrazit pole jako sloupec',
        P13GroupDialogRemoveGroupBtnTitle: 'Odstranit',
        P13GroupDialogAddNewGroupBtnTitle: 'Přidat nový',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Zrušit',
        P13SortDialogHeader: 'Seřadit',
        P13SortDialogNoneSelectedColumn: '(žádný)',
        P13SortDialogNoneSelectedSorting: '(žádný)',
        P13SortDialogSortOrderSelectOptionAsc: 'Vzestupně',
        P13SortDialogSortOrderSelectOptionDesc: 'Klesající',
        P13SortDialogRemoveSortBtnTitle: 'Odstranit',
        P13SortDialogAddNewSortBtnTitle: 'Přidat nový',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Zrušit',
        toolbarSearchPlaceholder: 'Vyhledávání',
        toolbarActionCreateButtonLabel: 'Vytvořit',
        toolbarActionSaveButtonLabel: 'Uložit',
        toolbarActionCancelButtonLabel: 'Zrušit',
        toolbarActionSortButtonTitle: 'Seřadit',
        toolbarActionFilterButtonTitle: 'Filtr',
        toolbarActionGroupButtonTitle: 'Skupina',
        toolbarActionColumnsButtonTitle: 'Sloupce',
        toolbarActionExpandAllButtonTitle: 'Rozbalit vše',
        toolbarActionCollapseAllButtonTitle: 'Sbalit vše',
        filterDialogNotFilteredLabel: '(Nefiltrováno)',
        filterDialogFilterByLabel: 'Filtrovat podle: {{ filterLabel }}',
        filterDialogFilterTitle: 'Filtr',
        filterDialogFilterBy: 'Filtrovat podle',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Zrušení',
        groupDialogHeader: 'Skupina',
        groupDialogGroupOrderHeader: 'Seřadit Skupinově',
        groupDialogGroupOrderAsc: 'Vzestupně',
        groupDialogGroupOrderDesc: 'Klesající',
        groupDialogGroupByHeader: 'Seskupit podle',
        groupDialogNotGroupedLabel: '(Neseskupeno)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Zrušit',
        sortDialogHeader: 'Sort',
        sortDialogSortOrderHeader: 'Pořadí řazení',
        sortDialogSortOrderAsc: 'Vzestupně',
        sortDialogSortOrderDesc: 'Klesající',
        sortDialogSortByHeader: 'Seřazeno podle',
        sortDialogNotSortedLabel: '(Neřazeno)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Zrušit'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Go to Previous',
        detailsGotoNextButtonTitle: 'Přejděte na Další',
        detailsDialogCloseBtnLabel: 'Zavřít',
        roleDescription: 'Obraz'
    },
    platformUploadCollection: {
        moveToTitle: 'Přesunout do',
        moveToTitleFolder: 'Složka',
        moveToNewFolderBtnLabel: 'Nová složka',
        moveToAllFilesSubHeaderLabel: 'Všechny soubory',
        moveToConfirmBtn: 'Přesunout',
        moveToCloseBtn: 'Zrušit',
        newFolderTitle: 'Nová složka',
        newFolderAtRootInputLabel: 'Název nové složky',
        newFolderAtFolderInputLabel: 'Název nové složky uvnitř {{ folderName }}',
        newFolderInputPlaceholder: 'Napište sem..',
        newFolderInputErrorLabel: 'Maximální povolený počet znaků: {{ count }}',
        newFolderDialogCreateBtnLabel: 'Vytvořit',
        newFolderDialogCancelBtnLabel: 'Zrušit',
        breadcrumbLabelAllFiles: 'All files',
        breadcrumbLabelAllFilesWithTotal: 'Všechny soubory ({{ total }})',
        searchPlaceholder: 'Vyhledávání',
        addBtnLabel: 'Přidat',
        newFolderBtnLabel: 'Nová složka',
        moveToBtnLabel: 'Přesunout do',
        downloadBtnLabel: 'Stažení',
        updateVersionBtnLabel: 'Aktualizovat verzi',
        removeBtnLabel: 'Odstranit',
        folderIconTitle: 'Ikona složky',
        fileIconTitle: 'Ikona souboru',
        editFileNameInputPlaceholder: 'Zadejte jméno',
        editFileNameFileAlreadyExistsError: 'Soubor s tímto názvem již existuje',
        editFileNameFolderAlreadyExistsError: 'Složka s tímto názvem již existuje',
        itemStatusSuccessful: 'Úspěšný',
        itemStatusUnsuccessful: 'Neúspěšný',
        uploadNewFileAfterFailAction: 'Spustit',
        cancelUploadNewFileAction: 'Zrušit',
        itemMenuBtnTitle: 'Více',
        dragDropAreaText: 'Přetáhněte soubory k nahrání',
        noDataText: 'Nebyly nalezeny žádné soubory',
        noDataDescription: 'Přetáhněte soubory, které chcete nahrát, nebo použijte tlačítko „Přidat“.',
        paginationTotal: 'Zobrazeno {{ from }}-{{ to }} z {{ to }}',
        resultsPerPage: 'Výsledky na stránku',
        messageCreateFailed: 'Vytvoření {{ folderName }} se nezdařilo.',
        messageCreateSuccess: '{{ folderName }} byl vytvořen.',
        messageUpdateVersionFailed: 'Aktualizace verze {{ folderName }} se nezdařila.',
        messageUpdateVersionSuccess: 'Verze {{ folderName }} byla aktualizována.',
        messageFileRenameFailed: 'Nepodařilo se přejmenovat "{{ from }}" na "{{ to }}."',
        messageFileRenameSuccess: '"{{ from }}" bylo přejmenováno na "{{ to }}".',
        messageRemoveFoldersAndFilesFailed:
            'Nepodařilo se odstranit {{ foldersCount }} složky a {{ filesCount }} soubory.',
        messageRemoveFoldersAndFilesSuccess: 'Bylo odstraněno {{ foldersCount }} složek a {{ filesCount }} souborů.',
        messageRemoveFoldersFailed: 'Nepodařilo se odstranit složky ({{ foldersCount }}).',
        messageRemoveFoldersSuccess: 'Složky ({{ foldersCount }}) byly odstraněny.',
        messageRemoveFilesFailed: 'Nepodařilo se odstranit {{ filesCount }} soubory.',
        messageRemoveFilesSuccess: 'Soubory {{ filesCount }} byly odstraněny.',
        messageRemoveFileOrFolderFailed: 'Nepodařilo se odstranit {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} bylo odstraněno.',
        messageMoveFoldersAndFilesFailed:
            'Nepodařilo se přesunout {{ foldersCount }} složky a {{ filesCount }} soubory do {{ to }}.',
        messageMoveFoldersAndFilesSuccess:
            'Složky {{ foldersCount }} a soubory {{ filesCount }} byly přesunuty do {{ to }}.',
        messageMoveFoldersFailed: 'Přesunutí {{ foldersCount }} složek do {{ to }} se nezdařilo.',
        messageMoveFoldersSuccess: 'Složky {{ foldersCount }} byly přesunuty do {{ to }}.',
        messageMoveFilesFailed: 'Přesunutí {{ filesCount }} souborů do {{ to }} se nezdařilo.',
        messageMoveFilesSuccess: 'Soubory {{ filesCount }} byly přesunuty do {{ to }}.',
        messageMoveFileOrFolderFailed: 'Nepodařilo se přesunout {{ name }} do {{ do }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} bylo přesunuto do {{ do }}.',
        messageMoveRootFoldersAndFilesFailed:
            'Nepodařilo se přesunout {{ foldersCount }} složky a {{ filesCount }} soubory do všech souborů.',
        messageMoveRootFoldersAndFilesSuccess:
            '{{ foldersCount }} složky a {{ filesCount }} soubory byly přesunuty do všech souborů.',
        messageMoveRootFoldersFailed: 'Přesunutí {{ foldersCount }} složek do všech souborů se nezdařilo.',
        messageMoveRootFoldersSuccess: 'Složky {{ foldersCount }} byly přesunuty do všech souborů.',
        messageMoveRootFilesFailed: 'Nepodařilo se přesunout {{ filesCount }} soubory do všech souborů.',
        messageMoveRootFilesSuccess: 'Soubory {{ filesCount }} byly přesunuty do všech souborů.',
        messageMoveRootFileOrFolderFailed: 'Nepodařilo se přesunout {{ name }} do všech souborů.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} bylo přesunuto do všech souborů.',
        messageFileTypeMismatchPlural: 'Soubory {{ filesCount }} mají nesprávný typ. Povolené typy: {{ allowTypes }}.',
        messageFileTypeMismatchSingular: 'Soubor "{{ fileName }}" má nesprávný typ. Povolené typy: {{ allowTypes }}.',
        messageFileSizeExceededPlural:
            '{{ filesCount }} soubory překročily maximální velikost souboru. Povolená maximální velikost souboru: {{ maxFileSize }}.',
        messageFileSizeExceededSingular:
            'Soubor "{{ fileName }}" překročil maximální velikost souboru. Povolená maximální velikost souboru: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural:
            '{{ filesCount }} soubory překročily maximální délku souboru. Povolená délka názvu souboru: {{ maxFilenameLength }} znaků.',
        messageFileNameLengthExceededSingular:
            'Název "{{ fileName }}" překročil maximální délku souboru. Povolená délka názvu souboru: {{ maxFilenameLength }} znaků.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Upravit'
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
        selectOptionLabel: 'Vyberte možnost'
    },
    fnSlider: {
        minMaxDetails: 'Minimální hodnota posuvníku je {{ min }}, maximální hodnota je {{ max }}',
        valueminDetails: 'Hodnota je {{ hodnota }}',
        valuemaxDetails: 'Hodnota je {{ hodnota }}',
        valueNowDetails: 'Aktuální hodnota je {{ hodnota }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Akceptovat',
        semanticDeclineLabel: 'Odmítnout'
    },
    coreTree: {
        expand: 'Expand node',
        collapse: 'Collapse node',
        noData: 'No data'
    }
};
