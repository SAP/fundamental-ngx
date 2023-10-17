import { FdLanguage } from '../models';

export const FD_LANGUAGE_GERMAN: FdLanguage = {
    coreMultiComboBox: {
        selectAllLabel: 'Alle auswählen ({{selectedItems}} von {{totalItems}})'
    },
    coreCarousel: {
        leftNavigationBtnLabel: 'Zum vorherigen Element',
        rightNavigationBtnLabel: 'Zum nächsten Element'
    },
    coreDatePicker: {
        dateInputLabel: 'Datumseingabe',
        dateRangeInputLabel: 'Eingabe des Datumsbereichs',
        displayCalendarToggleLabel: 'Auswahl öffnen',
        valueStateSuccessMessage: 'Wertstatus Erfolg',
        valueStateInformationMessage: 'Wertstatus Information',
        valueStateWarningMessage: 'Wertstatus Warnung',
        valueStateErrorMessage: 'Wertstatus Fehler'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Eingabe DatumUhrzeit',
        displayDatetimeToggleLabel: 'Kalenderauswahl anzeigen',
        displayTypeDateLabel: 'Datum',
        displayTypeTimeLabel: 'Uhrzeit',
        datetimeOkLabel: 'OK',
        datetimeCancelLabel: 'Abbrechen'
    },
    coreFeedListItem: {
        moreLabel: '{{count}} weitere',
        lessLabel: 'Weniger'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Abbrechen',
        listItemStatusAriaLabel: 'Element hat Status. Status: {{status}}.',
        listItemCounterAriaLabel: 'Element hat {{count}} untergeordnete Elemente',
        listItemButtonDetailsTitle: 'Details',
        listItemButtonDeleteTitle: 'Löschen',
        listItemStatusContainsErrors: 'Enthält Fehler',
        listItemStatusLocked: 'Gesperrt',
        listItemStatusDraft: 'Entwurf'
    },
    coreMessageStrip: {
        dismissLabel: 'Ignorieren'
    },
    coreMultiInput: {
        multiInputAriaLabel: 'Eingabe mehrerer Werte',
        noResults: 'Keine Ergebnisse.',
        navigateSelectionsWithArrows: 'Navigieren Sie mit den Aufwärts- und Abwärtspfeilen durch die Auswahl.',
        countListResultsSingular: '1 Ergebnislisteneintrag.',
        countListResultsPlural: '{{count}} Ergebnislisteneinträge.',
        escapeNavigateTokens:
            'Drücken Sie Escape, um das Eingabefeld zu verlassen, und navigieren Sie mit der linken und rechten Pfeiltaste durch die ausgewählten Optionen.',
        tokensCountText: ({ length }) => {
            if (length === 0) {
                return 'Enthält no token';
            }
            if (length === 1) {
                return 'Enthält 1 token';
            }
            return `Enthält ${length} tokens`;
        }
    },
    coreNavigation: {
        mainNavigation: 'Hauptnavigation',
        navigationPath: 'Navigationspfad'
    },
    coreNestedList: {
        linkItemAriaLabel: 'Strukturelement {{itemDetails}}, {{index}} von {{total}}{{selectedDescription}}'
    },
    coreOverflowLayout: {
        moreItemsButton: '{{count}} weitere'
    },
    corePagination: {
        pageLabel: 'Seite {{pageNumber}}',
        currentPageAriaLabel: 'Seite {{pageNumber}} ist aktuelle Seite',
        labelBeforeInputMobile: 'Seite:',
        labelAfterInputMobile: 'von {{totalCount}}',
        inputAriaLabel: 'Seiteneingabe, Aktuelle Seite, Seite {{pageNumber}} von {{totalCount}}',
        itemsPerPageLabel: 'Ergebnisse pro Seite:',
        firstLabel: 'Erste',
        previousLabel: 'Vorherige',
        nextLabel: 'Nächste',
        lastLabel: 'Letzte',
        ariaLabel: 'Paginierung',
        totalResultsLabel: '{{totalCount}} Ergebnisse'
    },
    coreProductSwitch: {
        ariaLabel: 'Produktwechsel'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Reduziertes Elementmenü',
        cancel: 'Abbrechen',
        search: 'Suchen'
    },
    coreSlider: {
        singleMinMaxDetails: 'Schieberegler-Mindestwert ist {{min}}, Höchstwert ist {{max}}',
        singleValueminDetails: 'Wert ist {{value}}',
        singleValuemaxDetails: 'Wert ist {{value}}',
        singleValueNowDetails: 'Aktueller Wert ist {{value}}',
        multipleHandle1MinMaxDetails: 'Bereichsschieberegler-Mindestwert ist {{min}}, Höchstwert ist {{max}}',
        multipleHandle1ValueminDetails: 'Wert ist {{value}}',
        multipleHandle1ValuemaxDetails: 'Wert ist {{value}}',
        multipleHandle1ValueNowDetails: 'Aktueller Wert ist {{value}}',
        multipleHandle2MinMaxDetails: 'Bereichsschieberegler-Mindestwert ist {{min}}, Höchstwert ist {{max}}',
        multipleHandle2ValueminDetails: 'Wert ist {{value}}',
        multipleHandle2ValuemaxDetails: 'Wert ist {{value}}',
        multipleHandle2ValueNowDetails: 'Aktueller Wert ist {{value}}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Weitere Aktionen',
        arialLabel: 'Schaltfläche Teilen'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Abschnitt'
    },
    coreStepInput: {
        incrementButtonTitle: 'Erhöhung',
        decrementButtonTitle: 'Reduzierung',
        ariaRoleDescription: 'Schritteingabe'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Akzeptieren',
        semanticDeclineLabel: 'Ablehnen'
    },
    coreTabs: {
        tabListExpandButtonText: 'Mehr'
    },
    coreText: {
        moreLabel: 'Mehr',
        lessLabel: 'Weniger'
    },
    coreTime: {
        componentAriaName: 'Zeitauswahl',
        increaseHoursLabel: 'Stunden erhöhen',
        hrsLabel: 'Std.',
        decreaseHoursLabel: 'Stunden reduzieren',
        increaseMinutesLabel: 'Minuten erhöhen',
        minLabel: 'Min.',
        decreaseMinutesLabel: 'Minuten reduzieren',
        increaseSecondsLabel: 'Sekunden erhöhen',
        secLabel: 'Sek.',
        hoursLabel: 'Std.',
        minutesLabel: 'Minuten',
        secondsLabel: 'Sekunden',
        decreaseSecondsLabel: 'Sekunden reduzieren',
        increasePeriodLabel: 'Zeitraum vergrößern',
        periodLabel: 'Zeitraum',
        decreasePeriodLabel: 'Zeitraum reduzieren',
        navigationInstruction:
            // eslint-disable-next-line max-len
            'Um zwischen den Einträgen in dieser Liste zu wechseln, drücken Sie die Pfeiltaste nach oben oder unten. Um zwischen den Listen zu wechseln, drücken Sie die Pfeiltaste nach links oder rechts.'
    },
    coreTimePicker: {
        timePickerInputLabel: 'Zeitauswahleingabe',
        timePickerButtonLabel: 'Auswahl öffnen'
    },
    coreToken: {
        deleteButtonLabel: 'Löschbar',
        ariaRoleDescription: 'Token'
    },
    coreTokenizer: {
        moreLabel: '{{count}} weitere',
        tokenizerLabel: 'Tokenizer'
    },
    coreUploadCollection: {
        menuOkText: 'OK',
        menuCancelText: 'Abbrechen',
        menuEditAriaLabel: 'Bearbeiten',
        menuDeleteAriaLabel: 'Löschen',
        menuOkAriaLabel: 'Bearbeiten',
        menuCancelAriaLabel: 'Abbrechen',
        formItemPlaceholder: 'Dateiname'
    },
    coreWizard: {
        ariaLabel: 'Assistent'
    },
    coreBreadcrumb: {
        overflowTitleMore: 'Mehr'
    },
    platformActionBar: {
        backButtonLabel: 'Zurück'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Beobachter',
        defaultTitle: 'Genehmigungsprozess',
        nextButtonAriaLabel: 'Zur nächsten Folie',
        prevButtonAriaLabel: 'Zur vorherigen Folie',
        editModeSaveButtonLabel: 'Speichern',
        editModeExitButtonLabel: 'Verlassen',
        emptyTitle: 'Mit dem Hinzufügen von Genehmigern und Beobachtern beginnen',
        emptyHint:
            'Zum Hinzufügen von Genehmigern klicken Sie auf "Schritt hinzufügen". Zum Hinzufügen von Beobachtern',
        addNodeDialogHeaderAddApprovers: 'Genehmiger hinzufügen',
        addNodeDialogHeaderEditApprover: 'Genehmiger bearbeiten',
        addNodeDialogHeaderAddApproverTeam: 'Benutzer/Team',
        addNodeDialogHeaderDetail: 'Detail',
        addNodeDialogNodeType: 'Parallel oder seriell',
        addNodeDialogNodeTypeSerial: 'Seriell',
        addNodeDialogNodeTypeParallel: 'Parallel',
        addNodeDialogApproverType: 'Art des Genehmigers',
        addNodeDialogApproverTypeUser: 'Ein Benutzer',
        addNodeDialogApproverTypeTeamAnyone: 'Jeder im Team',
        addNodeDialogApproverTypeTeamEveryone: 'Alle im Team',
        addNodeDialogUserOrTeam: 'Benutzer/Team',
        addNodeDialogAddToNext: 'Zum nächsten seriellen Knoten hinzufügen',
        addNodeDialogDueDate: 'Fälligkeitsdatum',
        addNodeSearchPlaceholder: 'Suchen',
        addNodeAddActionBtnLabel: 'Hinzufügen',
        addNodeCancelActionBtnLabel: 'Abbrechen',
        addNodeSelectApproverActionBtnLabel: 'Auswählen',
        addNodeCancelApproverSelectionActionBtnLabel: 'Abbrechen',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Schließen',
        userDetailsHeader: 'Detail',
        userDetailsSendReminderBtnLabel: 'Erinnerung senden',
        userDetailsCancelBtnLabel: 'Abbrechen',
        messagesApproverAddedSuccess: '1 Genehmiger wurde hinzugefügt',
        messagesTeamAddedSuccess: '1 Team wurde hinzugefügt',
        messagesNodeEdited: '1 Genehmiger wurde bearbeitet',
        messagesNodeRemovedSingular: '1 Genehmiger wurde entfernt',
        messagesNodeRemovedPlural: 'Genehmiger wurden entfernt',
        messagesTeamRemoved: '1 Team wurde entfernt',
        messagesErrorBuildGraph:
            'Beim Erstellen des Diagramms ist ein Fehler aufgetreten. Überprüfen Sie die Anfangsdaten.',
        messagesUndoAction: 'Rückgängig',
        nodeMembersCount: '{{count}} Mitglieder',
        nodeVariousTeams: 'Verschiedene Teams',
        nodeStatusDueToday: 'Heute fällig',
        nodeStatusDueInXDays: ' Fällig in {{count}} Tagen',
        nodeStatusXDaysOverdue: '{{count}} Tage überfällig',
        nodeActionAddApproversBefore: 'Genehmiger hinzufügen vor',
        nodeActionAddApproversAfter: 'Genehmiger hinzufügen nach',
        nodeActionAddApproversParallel: 'Parallele Genehmiger hinzufügen',
        nodeActionEditApprover: 'Genehmiger bearbeiten',
        nodeActionRemove: 'Entfernen',
        selectTypeDialogMoveApproverAs: 'Genehmiger verschieben als',
        selectTypeDialogParallelOrSerial: 'Parallel oder seriell',
        selectTypeDialogNodeTypeParallel: 'Paralleler Genehmiger',
        selectTypeDialogNodeTypeSerial: 'Serieller Genehmiger',
        selectTypeDialogConfirmButton: 'Bestätigen',
        selectTypeDialogCancelButton: 'Abbrechen',
        toolbarAddStepButton: 'Schritt hinzufügen',
        toolbarEditButton: 'Bearbeiten',
        toolbarAddApproversBefore: 'Genehmiger hinzufügen vor',
        toolbarAddApproversAfter: 'Genehmiger hinzufügen nach',
        toolbarAddApproversParallel: 'Parallele Genehmiger hinzufügen',
        toolbarRemove: 'Entfernen',
        toolbarEditApprover: 'Genehmiger bearbeiten',
        watchersInputPlaceholder: 'Hier suchen ...',
        userListSelectedItemsCountSingular: '1 Eintrag ausgewählt',
        userListSelectedItemsCountPlural: '{{count}} Einträge ausgewählt',
        statusApproved: 'genehmigt',
        statusRejected: 'zurückgewiesen',
        statusInProgress: 'in Bearbeitung',
        statusNotStarted: 'nicht gestartet'
    },
    platformFeedInput: {
        userTitle: 'Benutzer'
    },
    platformVHD: {
        selectionBarLabel: 'Ausgewählte und Bedingungselemente',
        selectedAndConditionLabel: 'Ausgewählte Elemente und Bedingungen',
        footerClearSelectedTitle: 'ausgewählte Elemente entfernen',
        footerClearSelectedAriaLabel: 'ausgewählte Elemente entfernen',
        searchButtonLabel: 'Los',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Abbrechen',
        selectedEmptyLabel: 'Keine Elemente oder Bedingungen ausgewählt',
        searchPlaceholder: 'Suchen',
        searchAdvancedSearchLabel: 'Filter',
        searchShowAdvancedSearchLabel: 'Filter anzeigen',
        searchHideAdvancedSearchLabel: 'Filter ausblenden',
        searchShowAllAdvancedSearchLabel: 'Alle Filter anzeigen',
        searchHideAllAdvancedSearchLabel: 'Alle Filter ausblenden',
        selectTabDisplayCountLabel: 'Elemente ({{count}})',
        selectTabMoreBtnLabel: 'Mehr',
        selectTabCountHiddenA11yLabel: 'enthält {{rowCount}} Zeilen und {{colCount}} Spalten',
        selectMobileTabBackBtnTitle: 'Zurück',
        selectMobileTabBtnOpenDialogLabel: 'Dialogfeld Öffnen',
        selectMobileTabTitle: 'Registerkarte {{title}}',
        selectMobileConditionEmpty: 'Leer',
        defineConditionTitle: 'Produkt',
        defineConditionSelectedValueHiddenA11yLabel: 'ausgewählter Wert {{value}}',
        defineConditionConditionsGroupHeaderInclude: 'Einschließen',
        defineConditionConditionsGroupHeaderExclude: 'Ausschließen',
        defineConditionFromPlaceholder: 'von',
        defineConditionToPlaceholder: 'bis',
        defineConditionValuePlaceholder: 'Wert',
        defineConditionRemoveConditionButtonTitle: 'Bedingung entfernen',
        defineConditionAddConditionButtonLabel: 'Hinzufügen',
        defineConditionAddConditionButtonTitle: 'Bedingung hinzufügen',
        defineConditionConditionStrategyLabelContains: 'enthält',
        defineConditionConditionStrategyLabelEqualTo: 'gleich',
        defineConditionConditionStrategyLabelBetween: 'zwischen',
        defineConditionConditionStrategyLabelStartsWith: 'beginnt mit',
        defineConditionConditionStrategyLabelEndsWith: 'endet mit',
        defineConditionConditionStrategyLabelLessThan: 'kleiner als',
        defineConditionConditionStrategyLabelLessThanEqual: 'kleiner als gleich',
        defineConditionConditionStrategyLabelGreaterThan: 'größer als',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'größer als gleich',
        defineConditionConditionStrategyLabelEmpty: 'leer',
        defineConditionConditionStrategyLabelNotEqualTo: 'nicht gleich',
        defineConditionConditionStrategyLabelNotEmpty: 'nicht leer',
        defineConditionMaxCountError: 'Geben Sie einen Wert mit mehr als {{count}} Zeichen ein',
        selectTabTitle: 'Aus Liste auswählen',
        searchTableEmptyMessage: 'Für Ergebnisse Suche verwenden',
        defineTabTitle: 'Bedingungen definieren'
    },
    platformCombobox: {
        countListResultsSingular: '1 Ergebnislisteneintrag',
        countListResultsPlural: '{{count}} Ergebnislisteneinträge'
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Optionen auswählen',
        inputIconTitle: 'Optionen auswählen',
        mobileShowAllItemsButton: 'Alle Elemente anzeigen',
        mobileShowSelectedItemsButton: 'Ausgewählte Elemente anzeigen'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: '1 Zeichen über dem Limit',
        counterMessageCharactersOverTheLimitPlural: '{{count}} Zeichen über dem Limit',
        counterMessageCharactersRemainingSingular: 'Noch 1 Zeichen',
        counterMessageCharactersRemainingPlural: 'noch {{count}} Zeichen'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Medien: {{media}}'
    },
    platformList: {
        loadingAriaLabel: 'wird geladen'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'Detail',
        deleteActionAriaLabel: 'löschen'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'Detail',
        deleteActionAriaLabel: 'löschen'
    },
    platformSearchField: {
        clearButtonTitle: 'Entfernen',
        submitButtonTitle: 'Suchen',
        searchInputLabel: 'Suchen',
        synchronizeButtonTitle: 'Synchronisieren',
        searchSuggestionMessage: '{{count}} Vorschläge gefunden',
        searchSuggestionNavigateMessage: 'Pfeiltaste nach oben und unten zum Navigieren verwenden'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Suchen',
        submitButtonLabel: 'Los',
        filtersButtonLabel: 'Filter ({{filtersCount}})',
        showFiltersButtonLabel: 'Filter anzeigen',
        hideFiltersButtonLabel: 'Filter ausblenden',
        defineConditionsRemoveConditionButtonTitle: 'Bedingung entfernen',
        defineConditionsAddConditionButtonLabel: 'Bedingung hinzufügen',
        defineConditionsSubmitButtonLabel: 'Los',
        defineConditionsCancelButton: 'Abbrechen',
        selectFiltersHeader: 'Filter',
        selectFiltersAvailableFiltersText: 'Verfügbare Filter',
        selectFiltersFilterColumnLabel: 'Filter',
        selectFiltersActiveColumnLabel: 'Aktiv',
        selectFiltersSubmitButtonLabel: 'Los',
        selectFiltersCancelButton: 'Abbrechen',
        filterConditionContains: 'enthält',
        filterConditionEqualTo: 'gleich',
        filterConditionBetween: 'zwischen',
        filterConditionBeginsWith: 'beginnt mit',
        filterConditionEndsWith: 'endet mit',
        filterConditionLessThan: 'kleiner als',
        filterConditionLessThanOrEqualTo: 'kleiner als oder gleich',
        filterConditionGreaterThan: 'größer als',
        filterConditionGreaterThanOrEqualTo: 'größer als oder gleich',
        filterConditionAfter: 'nach',
        filterConditionOnOrAfter: 'am oder nach',
        filterConditionBefore: 'vor',
        filterConditionBeforeOrOn: 'vor oder am',
        filterConditionValuePlaceholder: 'Wert',
        filterConditionValueFromPlaceholder: 'von',
        filterConditionValueToPlaceholder: 'bis',
        settingsCategoryAll: 'Alle',
        settingsCategoryVisible: 'Sichtbar',
        settingsCategoryActive: 'Aktiv',
        settingsCategoryVisibleAndActive: 'Sichtbar und aktiv',
        settingsCategoryMandatory: 'Obligatorisch',
        manageFieldConditions: 'Feldbedingungen verwalten',
        refreshButtonAriaLabel: 'Aktualisieren'
    },
    platformTable: {
        headerMenuSortAsc: 'Aufsteigend sortieren',
        headerMenuSortDesc: 'Absteigend sortieren',
        headerMenuGroup: 'Gruppieren',
        headerMenuFreeze: 'Fixieren',
        headerMenuEndFreeze: 'Fixieren bis Ende',
        headerMenuUnfreeze: 'Fixierung aufheben',
        headerMenuFilter: 'Filtern',
        defaultEmptyMessage: 'Keine Daten gefunden',
        emptyCell: 'Leer',
        noVisibleColumnsMessage:
            'Im Moment sind keine Spalten in der Tabelle sichtbar. Wählen Sie die benötigten Spalten in den Tabelleneinstellungen aus.',
        resetChangesButtonLabel: 'Zurücksetzen',
        editableCellNumberPlaceholder: 'Wert eingeben',
        editableCellDatePlaceholder: 'Wert eingeben',
        editableCellStringPlaceholder: 'Wert eingeben',
        P13ColumnsDialogHeader: 'Spalten',
        P13ColumnsDialogSearchPlaceholder: 'Suchen',
        P13ColumnsDialogsShowSelected: 'Ausgewählte anzeigen',
        P13ColumnsDialogShowAll: 'Alle anzeigen',
        P13ColumnsDialogSelectAll: 'Alle auswählen ({{selectedColumnsCount}}/{{selectableColumnsCount}})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Abbrechen',
        P13ColumnsDialogMoveToTopBtn: 'An den Anfang verschieben',
        P13ColumnsDialogMoveUpBtn: 'Nach oben verschieben',
        P13ColumnsDialogMoveDownBtn: 'Nach unten verschieben',
        P13ColumnsDialogMoveToBottomBtn: 'An das Ende verschieben',
        P13FilterStrategyLabelBetween: 'zwischen',
        P13FilterStrategyLabelContains: 'enthält',
        P13FilterStrategyLabelBeginsWith: 'beginnt mit',
        P13FilterStrategyLabelEndsWith: 'endet mit',
        P13FilterStrategyLabelEqualTo: 'gleich',
        P13FilterStrategyLabelGreaterThan: 'größer als',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'größer als oder gleich',
        P13FilterStrategyLabelLessThan: 'kleiner als',
        P13FilterStrategyLabelLessThanOrEqualTo: 'kleiner als oder gleich',
        P13FilterStrategyLabelAfter: 'nach',
        P13FilterStrategyLabelOnOrAfter: 'am oder nach',
        P13FilterStrategyLabelBefore: 'vor',
        P13FilterStrategyLabelBeforeOrOn: 'vor oder am',
        P13FilterStrategyLabelNotDefined: 'Nicht definiert',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Ja',
        P13FilterBooleanOptionFalse: 'Nein',
        P13FilterDialogHeader: 'Filtern nach',
        P13FilterDialogIncludePanelTitleWithCount: 'Einschließen ({{count}})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Einschließen',
        P13FilterDialogExcludePanelTitleWithCount: 'Ausschließen ({{count}})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Ausschließen',
        P13FilterDialogRemoveFilterBtnTitle: 'Filter entfernen',
        P13FilterDialoAddFilterBtnTitle: 'Filter hinzufügen',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Abbrechen',
        P13GroupDialogHeader: 'Gruppieren',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(keine)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Feld als Spalte anzeigen',
        P13GroupDialogRemoveGroupBtnTitle: 'Entfernen',
        P13GroupDialogAddNewGroupBtnTitle: 'Neu hinzufügen',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Abbrechen',
        P13SortDialogHeader: 'Sortieren',
        P13SortDialogNoneSelectedColumn: '(keine)',
        P13SortDialogNoneSelectedSorting: '(keine)',
        P13SortDialogSortOrderSelectOptionAsc: 'Aufsteigend',
        P13SortDialogSortOrderSelectOptionDesc: 'Absteigend',
        P13SortDialogRemoveSortBtnTitle: 'Entfernen',
        P13SortDialogAddNewSortBtnTitle: 'Neu hinzufügen',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Abbrechen',
        toolbarSearchPlaceholder: 'Suchen',
        toolbarActionCreateButtonLabel: 'Erstellen',
        toolbarActionSaveButtonLabel: 'Speichern',
        toolbarActionCancelButtonLabel: 'Abbrechen',
        toolbarActionSortButtonTitle: 'Sortieren',
        toolbarActionFilterButtonTitle: 'Filtern',
        toolbarActionGroupButtonTitle: 'Gruppieren',
        toolbarActionColumnsButtonTitle: 'Spalten',
        toolbarActionExpandAllButtonTitle: 'Alle erweitern',
        toolbarActionCollapseAllButtonTitle: 'Alle reduzieren',
        filterDialogNotFilteredLabel: '(Nicht gefiltert)',
        filterDialogFilterByLabel: 'Filtern nach: {{filterLabel}}',
        filterDialogFilterTitle: 'Filtern',
        filterDialogFilterBy: 'Filtern nach',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Abbrechen',
        groupDialogHeader: 'Gruppieren',
        groupDialogGroupOrderHeader: 'Gruppenanordnung',
        groupDialogGroupOrderAsc: 'Aufsteigend',
        groupDialogGroupOrderDesc: 'Absteigend',
        groupDialogGroupByHeader: 'Gruppieren nach',
        groupDialogNotGroupedLabel: '(Nicht gruppiert)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Abbrechen',
        sortDialogHeader: 'Sortieren',
        sortDialogSortOrderHeader: 'Sortierreihenfolge',
        sortDialogSortOrderAsc: 'Aufsteigend',
        sortDialogSortOrderDesc: 'Absteigend',
        sortDialogSortByHeader: 'Sortieren nach',
        sortDialogNotSortedLabel: '(Nicht sortiert)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Abbrechen',
        selectAllCheckboxLabel: 'Alle auswählen',
        deselectAllCheckboxLabel: 'Gesamte Auswahl aufheben',
        deselectSingleRow: 'Zum Aufheben der Zeilenauswahl LEERTASTE drücken',
        selectSingleRow: 'Zum Auswählen der Zeile LEERTASTE drücken',
        deselectSingleRowTitle: 'Zum Aufheben der Auswahl klicken',
        selectSingleRowTitle: 'Zum Auswählen klicken'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Zum vorherigen',
        detailsGotoNextButtonTitle: 'Zum nächsten',
        detailsDialogCloseBtnLabel: 'Schließen',
        roleDescription: 'Bild'
    },
    platformUploadCollection: {
        moveToTitle: 'Verschieben nach',
        moveToTitleFolder: 'Ordner',
        moveToNewFolderBtnLabel: 'Neuer Ordner',
        moveToAllFilesSubHeaderLabel: 'Alle Dateien',
        moveToConfirmBtn: 'Verschieben',
        moveToCloseBtn: 'Abbrechen',
        newFolderTitle: 'Neuer Ordner',
        newFolderAtRootInputLabel: 'Name des neuen Ordners',
        newFolderAtFolderInputLabel: 'Name des neuen Ordners in {{folderName}}',
        newFolderInputPlaceholder: 'Hier eingeben ...',
        newFolderInputErrorLabel: 'Maximal {{count}} Zeichen zulässig',
        newFolderDialogCreateBtnLabel: 'Erstellen',
        newFolderDialogCancelBtnLabel: 'Abbrechen',
        breadcrumbLabelAllFiles: 'Alle Dateien',
        breadcrumbLabelAllFilesWithTotal: 'Alle Dateien ({{total}})',
        searchPlaceholder: 'Suchen',
        addBtnLabel: 'Hinzufügen',
        newFolderBtnLabel: 'Neuer Ordner',
        moveToBtnLabel: 'Verschieben nach',
        downloadBtnLabel: 'Herunterladen',
        updateVersionBtnLabel: 'Version aktualisieren',
        removeBtnLabel: 'Entfernen',
        folderIconTitle: 'Ordnersymbol',
        fileIconTitle: 'Dateisymbol',
        editFileNameInputPlaceholder: 'Name eingeben',
        editFileNameFileAlreadyExistsError: 'Eine Datei mit diesem Namen ist bereits vorhanden',
        editFileNameFolderAlreadyExistsError: 'Ein Ordner mit diesem Namen ist bereits vorhanden.',
        itemStatusSuccessful: 'Erfolgreich',
        itemStatusUnsuccessful: 'Nicht erfolgreich',
        uploadNewFileAfterFailAction: 'Ausführen',
        cancelUploadNewFileAction: 'Abbrechen',
        itemMenuBtnTitle: 'Mehr',
        dragDropAreaText: 'Hochzuladende Dateien ziehen',
        noDataText: 'Keine Dateien gefunden',
        noDataDescription: 'Hochzuladende Dateien ablegen oder Schaltfläche Hinzufügen verwenden.',
        paginationTotal: '{{from}}-{{to}} von {{total}} werden angezeigt',
        resultsPerPage: 'Ergebnisse pro Seite',
        messageCreateFailed: '{{folderName}} konnte nicht erstellt werden.',
        messageCreateSuccess: '{{folderName}} wurde erstellt.',
        messageUpdateVersionFailed: '{{folderName}}-Version konnte nicht aktualisiert werden.',
        messageUpdateVersionSuccess: '{{folderName}}-Version wurde aktualisiert.',
        messageFileRenameFailed: 'Umbenennen von "{{from}}" in "{{to}}." fehlgeschlagen',
        messageFileRenameSuccess: '"{{from}}" wurde in "{{to}}" umbenannt.',
        messageRemoveFoldersAndFilesFailed:
            '{{foldersCount}} Ordner und {{filesCount}} Dateien konnten nicht entfernt werden.',
        messageRemoveFoldersAndFilesSuccess: '{{foldersCount}} Ordner und {{filesCount}} Dateien wurden entfernt.',
        messageRemoveFoldersFailed: '{{foldersCount}} Ordner konnten nicht entfernt werden.',
        messageRemoveFoldersSuccess: '{{foldersCount}} Ordner wurden entfernt.',
        messageRemoveFilesFailed: '{{filesCount}} Dateien konnten nicht entfernt werden.',
        messageRemoveFilesSuccess: '{{filesCount}} Dateien wurden entfernt.',
        messageRemoveFileOrFolderFailed: '{{name}} konnte nicht entfernt werden.',
        messageRemoveFileOrFolderSuccess: '{{name}} wurde entfernt.',
        messageMoveFoldersAndFilesFailed:
            '{{foldersCount}} Ordner und {{filesCount}} Dateien konnten nicht in {{to}} verschoben werden.',
        messageMoveFoldersAndFilesSuccess:
            '{{foldersCount}} Ordner und {{filesCount}} Dateien wurden in {{to}} verschoben.',
        messageMoveFoldersFailed: '{{foldersCount}} Ordner konnten nicht in {{to}} verschoben werden.',
        messageMoveFoldersSuccess: '{{foldersCount}} Ordner wurden in {{to}} verschoben.',
        messageMoveFilesFailed: '{{filesCount}} Dateien konnten nicht in {{to}} verschoben werden.',
        messageMoveFilesSuccess: '{{filesCount}} wurden in {{to}} verschoben.',
        messageMoveFileOrFolderFailed: '{{name}} konnte nicht in {{to}} verschoben werden.',
        messageMoveFileOrFolderSuccess: '{{name}} wurde in {{to}} verschoben.',
        messageMoveRootFoldersAndFilesFailed:
            '{{foldersCount}} Ordner und {{filesCount}} Dateien konnten nicht in alle Dateien verschoben werden.',
        messageMoveRootFoldersAndFilesSuccess:
            '{{foldersCount}} Ordner und {{filesCount}} wurden in alle Dateien verschoben.',
        messageMoveRootFoldersFailed: '{{foldersCount}} Ordner konnten nicht in alle Dateien verschoben werden.',
        messageMoveRootFoldersSuccess: '{{foldersCount}} Ordner wurden in alle Dateien verschoben.',
        messageMoveRootFilesFailed: '{{filesCount}} Dateien konnten nicht in alle Dateien verschoben werden.',
        messageMoveRootFilesSuccess: '{{filesCount}} Dateien wurden in alle Dateien verschoben.',
        messageMoveRootFileOrFolderFailed: '{{name}} konnte nicht in alle Dateien verschoben werden.',
        messageMoveRootFileOrFolderSuccess: '{{name}} wurde in alle Dateien verschoben.',
        messageFileTypeMismatchPlural:
            '{{filesCount}} Dateien haben den falschen Typ. Zulässige Typen: {{allowedTypes}}.',
        messageFileTypeMismatchSingular:
            'Die Datei "{{fileName}}" hat den falschen Typ. Zulässige Typen: {{allowedTypes}}.',
        messageFileSizeExceededPlural:
            '{{filesCount}} Dateien überschreiten die maximale Dateigröße. Zulässige maximale Dateigröße: {{maxFileSize}}.',
        messageFileSizeExceededSingular:
            'Die Datei "{{fileName}}" hat die maximale Dateigröße überschritten. Zulässige maximale Dateigröße: {{maxFileSize}}.',
        messageFileNameLengthExceededPlural:
            '{{filesCount}} Dateien haben die maximale Länge für Dateinamen überschritten. Zulässige Länge für Dateinamen: {{maxFilenameLength}} Zeichen.',
        messageFileNameLengthExceededSingular:
            'Der Name "{{fileName}}" hat die maximale Länge für Dateinamen überschritten. Zulässige Länge für Dateinamen: {{maxFilenameLength}} Zeichen.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Bearbeiten'
    },
    platformMessagePopover: {
        allErrors: 'Alle',
        defaultErrors: {
            email: 'E-Mail ist ungültig',
            max: 'Das Feld überschreitet den Höchstwert',
            maxLength: 'Das Feld überschreitet die maximale Länge',
            min: 'Der Feldwert ist kleiner als zulässig',
            minLength: 'Die Feldlänge ist kleiner als zulässig',
            pattern: 'Der Feldwert ist ungültig',
            required: 'Das Feld ist obligatorisch',
            requiredTrue: 'Das Feld ist obligatorisch'
        }
    },
    platformVariantManagement: {
        manage: 'Verwalten',
        saveAs: 'Speichern unter',
        saveView: 'Ansicht speichern',
        save: 'Speichern',
        myViews: 'Meine Ansichten',
        view: 'Ansicht',
        setAsDefault: 'Als Standard festlegen',
        public: 'Öffentlich',
        applyAutomatically: 'Automatisch anwenden',
        requiredFieldError: 'Dieses Feld ist obligatorisch.',
        nameTakenFieldError: 'Es gibt bereits eine Variante mit diesem Namen. Wählen Sie einen anderen Namen.',
        cancel: 'Abbrechen',
        manageViews: 'Ansichten verwalten',
        markAsFavourite: 'Als Favorit kennzeichnen',
        sharing: 'Teilen',
        default: 'Standard',
        createdBy: 'Erstellt von',
        removeVariant: 'Ansicht entfernen',
        search: 'Suchen',
        access: {
            public: 'Öffentlich',
            private: 'Privat'
        }
    },
    platformSelect: {
        selectOptionLabel: 'Wählen Sie eine Option aus'
    },
    fnSlider: {
        minMaxDetails: 'Schieberegler-Mindestwert ist {{min}}, Höchstwert ist {{max}}',
        valueminDetails: 'Wert ist {{value}}',
        valuemaxDetails: 'Wert ist {{value}}',
        valueNowDetails: 'Aktueller Wert ist {{value}}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Akzeptieren',
        semanticDeclineLabel: 'Ablehnen'
    },
    coreTree: {
        expand: 'Knoten erweitern',
        collapse: 'Knoten reduzieren',
        noData: 'Keine Daten'
    }
};
