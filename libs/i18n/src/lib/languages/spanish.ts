import { FdLanguage } from '../models/lang';

/**
 * Default set of translations of Fundamental UI library for Spanish language
 */
export const FD_LANGUAGE_SPANISH: FdLanguage = {
    coreMultiComboBox: {
        selectAllLabel: 'Seleccionar todo'
    },
    coreCarousel: {
        leftNavigationBtnLabel: 'Ir al item anterior',
        rightNavigationBtnLabel: 'Ir al proximo item'
    },
    coreDatePicker: {
        dateInputLabel: 'Entrada de fecha',
        dateRangeInputLabel: 'Entrada de rango de fecha',
        displayCalendarToggleLabel: 'Abrir selector',

        valueStateSuccessMessage: 'Value state Success',
        valueStateInformationMessage: 'Value state Information',
        valueStateWarningMessage: 'Value state Warning',
        valueStateErrorMessage: 'Value state Error'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Entrada de fecha y hora',
        displayDatetimeToggleLabel: 'Visualizar calendar toggle',
        displayTypeDateLabel: 'Fecha',
        displayTypeTimeLabel: 'Hora',
        datetimeOkLabel: 'Ok',
        datetimeCancelLabel: 'Cancelar'
    },
    coreFeedListItem: {
        moreLabel: 'Más',
        lessLabel: 'Menos'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Cancelar',
        listItemStatusAriaLabel: 'El item tiene estado. Estado: {{ status }}.',
        listItemCounterAriaLabel: 'El item tiene {{ count }} sub items.',
        listItemButtonDetailsTitle: 'Detalles',
        listItemButtonDeleteTitle: 'Eliminar',
        listItemStatusContainsErrors: 'Contiene Errores',
        listItemStatusLocked: 'Bloqueado',
        listItemStatusDraft: 'Borrador'
    },
    coreMessageStrip: {
        dismissLabel: 'Descartar'
    },
    coreMultiInput: {
        multiInputAriaLabel: 'Multi Value Input'
    },
    coreNavigation: {
        mainNavigation: 'Main Navigation',
        navigationPath: 'Navigation Path'
    },
    coreNestedList: {
        linkItemAriaLabel: 'Arbol del item {{ itemDetails }}, {{ index }} de {{ total }}{{ selectedDescription }}'
    },
    coreOverflowLayout: {
        moreItemsButton: '{{ count }} más'
    },
    corePagination: {
        pageLabel: 'Página {{ pageNumber }}',
        currentPageAriaLabel: 'Página {{ pageNumber }} es la actual',
        labelBeforeInputMobile: 'Página:',
        labelAfterInputMobile: 'de {{ totalCount }}',
        inputAriaLabel: 'Página de entrada, Página actual, Página {{ pageNumber }} de {{ totalCount }}',
        itemsPerPageLabel: 'Resultados por página:',
        firstLabel: 'Primera',
        previousLabel: 'Anterior',
        nextLabel: 'Siguiente',
        lastLabel: 'Última',
        ariaLabel: 'Páginacion',
        totalResultsLabel: '{{ totalCount }} Resultados'
    },
    coreProductSwitch: {
        ariaLabel: 'Cambio de producto'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Item de menu contraído',
        cancel: 'Cancel',
        search: 'Search'
    },
    coreSlider: {
        singleMinMaxDetails: 'Slider el valor mínimo es {{ min }}, el valor máximo es {{ max }}',
        singleValueminDetails: 'El valor es {{ value }}',
        singleValuemaxDetails: 'El valor es {{ value }}',
        singleValueNowDetails: 'El valor actual es {{ value }}',
        multipleHandle1MinMaxDetails: 'Slider el valor mínimo es {{ min }}, el valor máximo es {{ max }}',
        multipleHandle1ValueminDetails: 'El valor es {{ value }}',
        multipleHandle1ValuemaxDetails: 'El valor es {{ value }}',
        multipleHandle1ValueNowDetails: 'El valor actual es {{ value }}',
        multipleHandle2MinMaxDetails: 'Slider de rango el valor mínimo es {{ min }}, el valor máximo es {{ max }}',
        multipleHandle2ValueminDetails: 'El valor es {{ value }}',
        multipleHandle2ValuemaxDetails: 'El valor es {{ value }}',
        multipleHandle2ValueNowDetails: 'El valor actual es {{ value }}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Más acciones',
        arialLabel: 'Botón dividir'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Sección'
    },
    coreStepInput: {
        incrementButtonTitle: 'Incremento',
        decrementButtonTitle: 'Decremento',
        ariaRoleDescription: 'Entrada de pasos'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Aceptar',
        semanticDeclineLabel: 'Rechazar'
    },
    coreTabs: {
        tabListExpandButtonText: 'Más'
    },
    coreText: {
        moreLabel: 'Más',
        lessLabel: 'Menos'
    },
    coreTime: {
        componentAriaName: 'Selector de tiempo',
        increaseHoursLabel: 'Aumentar horas',
        hoursLabel: 'Hrs',
        decreaseHoursLabel: 'Reducir horas',
        increaseMinutesLabel: 'Aumentar minutos',
        minutesLabel: 'Min',
        decreaseMinutesLabel: 'Reducir minutos',
        increaseSecondsLabel: 'Aumentar segundos',
        secondsLabel: 'Seg',
        decreaseSecondsLabel: 'Reducir segundos',
        increasePeriodLabel: 'Aumentar period',
        periodLabel: 'período',
        decreasePeriodLabel: 'Reducir período de horas',
        navigationInstruction:
            'Para moverse entre los elementos de esta lista, presione la flecha superior o la flecha inferior.' +
            'Para cambiar entre listas, presione la flecha izquierda o la flecha derecha.'
    },
    coreTimePicker: {
        timePickerInputLabel: 'Entrada del selector de tiempo',
        timePickerButtonLabel: 'Abrir selector'
    },
    coreToken: {
        deleteButtonLabel: 'Borrar',
        ariaRoleDescription: 'token'
    },
    coreTokenizer: {
        moreLabel: '{{count}} more'
    },
    coreUploadCollection: {
        menuOkText: 'Ok',
        menuCancelText: 'Cancelar',
        menuEditAriaLabel: 'Editar',
        menuDeleteAriaLabel: 'Borrar',
        menuOkAriaLabel: 'Editar',
        menuCancelAriaLabel: 'Cancelar',
        formItemPlaceholder: 'Nombre del archivo'
    },
    coreWizard: {
        ariaLabel: 'Wizard'
    },
    coreBreadcrumb: {
        overflowTitleMore: 'More'
    },
    platformActionBar: {
        backButtonLabel: 'Regresar'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Observadores',
        defaultTitle: 'Proceso de aprobación',
        nextButtonAriaLabel: 'Ir al siguiente slide',
        prevButtonAriaLabel: 'Ir al slide anterior',
        editModeSaveButtonLabel: 'Guardar',
        editModeExitButtonLabel: 'Salir',
        emptyTitle: 'Empezar a agregar aprobadores y observadores',
        emptyHint:
            'Para agregar aprobadores, haga clic en "Agregar un paso". Para agregar observadores, haz clic en el campo Observadores.',
        addNodeDialogHeaderAddApprovers: 'Agregar aprobadores',
        addNodeDialogHeaderEditApprover: 'Editar aprovador',
        addNodeDialogHeaderAddApproverTeam: 'Usuario/Equipo',
        addNodeDialogHeaderDetail: 'Detalles',
        addNodeDialogNodeType: 'Paralelo o serial',
        addNodeDialogNodeTypeSerial: 'Serial',
        addNodeDialogNodeTypeParallel: 'Paralelo',
        addNodeDialogApproverType: 'Tipo de aprobador',
        addNodeDialogApproverTypeUser: 'Un usuario',
        addNodeDialogApproverTypeTeamAnyone: 'Cualquiera en el equipo',
        addNodeDialogApproverTypeTeamEveryone: 'Todos en el equipo',
        addNodeDialogUserOrTeam: 'Usuario/Equipo',
        addNodeDialogAddToNext: 'Agregar al siguiente nodo serial',
        addNodeDialogDueDate: 'Fecha de vencimiento',
        addNodeSearchPlaceholder: 'Buscar',
        addNodeAddActionBtnLabel: 'Agregar',
        addNodeCancelActionBtnLabel: 'Cancelar',
        addNodeSelectApproverActionBtnLabel: 'Seleccionar',
        addNodeCancelApproverSelectionActionBtnLabel: 'Cancelar',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Cerrar',
        userDetailsHeader: 'Detalle',
        userDetailsSendReminderBtnLabel: 'Enviar recordatorio',
        userDetailsCancelBtnLabel: 'Cancel',
        messagesApproverAddedSuccess: 'Se agregó 1 aprobador',
        messagesTeamAddedSuccess: 'Se agregó 1 equipo',
        messagesNodeEdited: '1 aprobador ha sido editado',
        messagesNodeRemovedSingular: '1 aprobador ha sido eliminado',
        messagesNodeRemovedPlural: 'Se han eliminado los aprobadores',
        messagesTeamRemoved: '1 equipo ha sido eliminado',
        messagesErrorBuildGraph: 'Hubo un error al intentar construir el gráfico. Comprueba los datos iniciales.',
        messagesUndoAction: 'Deshacer',
        nodeMembersCount: '{{ count }} miembros',
        nodeVariousTeams: 'Varios equipos',
        nodeStatusDueToday: 'Vence hoy',
        nodeStatusDueInXDays: ' Vence en {{ count }} días',
        nodeStatusXDaysOverdue: '{{ count }} días de retraso',
        nodeActionAddApproversBefore: 'Agregar aprobadores antes',
        nodeActionAddApproversAfter: 'Agregar aprobadores después',
        nodeActionAddApproversParallel: 'Agregar aprobadores paralelos',
        nodeActionEditApprover: 'Editar aprobador',
        nodeActionRemove: 'Eliminar',
        selectTypeDialogMoveApproverAs: 'Mover aprobador como',
        selectTypeDialogParallelOrSerial: 'Paralelo o serie',
        selectTypeDialogNodeTypeParallel: 'Aprobador paralelo',
        selectTypeDialogNodeTypeSerial: 'Aprobador en serie',
        selectTypeDialogConfirmButton: 'Confirmar',
        selectTypeDialogCancelButton: 'Cancelar',
        toolbarAddStepButton: 'Agregar un paso',
        toolbarEditButton: 'Editar',
        toolbarAddApproversBefore: 'Agregar aprobadores antes',
        toolbarAddApproversAfter: 'Agregar aprobadores después',
        toolbarAddApproversParallel: 'Agregar aprobadores paralelos',
        toolbarRemove: 'Eliminar',
        toolbarEditApprover: 'Editar aprobador',
        watchersInputPlaceholder: 'Buscar aquí..',
        userListSelectedItemsCountSingular: '1 elemento seleccionado',
        userListSelectedItemsCountPlural: '{{ count }} elementos seleccionados',
        statusApproved: 'approved',
        statusRejected: 'rejected',
        statusInProgress: 'in progress',
        statusNotStarted: 'not started'
    },
    platformFeedInput: {
        userTitle: 'Usuario'
    },
    platformVHD: {
        selectionBarLabel: 'Selected and condition items',
        selectedAndConditionLabel: 'Elementos seleccionados y condiciones',
        footerClearSelectedTitle: 'Deshacer seleccion',
        footerClearSelectedAriaLabel: 'Deshacer seleccion',
        searchButtonLabel: 'Ir',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Cancelar',
        selectedEmptyLabel: 'No se seleccionaron elementos ni condiciones',
        searchPlaceholder: 'Buscar',
        searchAdvancedSearchLabel: 'Filtros',
        searchShowAdvancedSearchLabel: 'Mostrar filtros',
        searchHideAdvancedSearchLabel: 'Ocultar filtros',
        searchShowAllAdvancedSearchLabel: 'Mostrar todos los filtros',
        searchHideAllAdvancedSearchLabel: 'Ocultar todos los filtros',
        selectTabDisplayCountLabel: 'Elementos ({{ count }})',
        selectTabMoreBtnLabel: 'Más',
        selectTabCountHiddenA11yLabel: 'contiene {{ rowCount }} filas y {{ colCount }} columnas',
        selectMobileTabBackBtnTitle: 'Volver',
        selectMobileTabBtnOpenDialogLabel: 'Diálogo abierto',
        selectMobileTabTitle: '{{ title }} tab',
        selectMobileConditionEmpty: 'Vacío',
        defineConditionTitle: 'Producto',
        defineConditionSelectedValueHiddenA11yLabel: 'valor seleccionado {{ value }}',
        defineConditionConditionsGroupHeaderInclude: 'Incluir',
        defineConditionConditionsGroupHeaderExclude: 'Excluir',
        defineConditionFromPlaceholder: 'de',
        defineConditionToPlaceholder: 'a',
        defineConditionValuePlaceholder: 'valor',
        defineConditionRemoveConditionButtonTitle: 'Quitar condición',
        defineConditionAddConditionButtonLabel: 'Agregar',
        defineConditionAddConditionButtonTitle: 'Agregar condición',
        defineConditionConditionStrategyLabelContains: 'contiene',
        defineConditionConditionStrategyLabelEqualTo: 'igual a',
        defineConditionConditionStrategyLabelBetween: 'entre',
        defineConditionConditionStrategyLabelStartsWith: 'comienza con',
        defineConditionConditionStrategyLabelEndsWith: 'termina en',
        defineConditionConditionStrategyLabelLessThan: 'menor que',
        defineConditionConditionStrategyLabelLessThanEqual: 'menor o igual',
        defineConditionConditionStrategyLabelGreaterThan: 'mayor que',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'mayor o igual',
        defineConditionConditionStrategyLabelEmpty: 'vacío',
        defineConditionConditionStrategyLabelNotEqualTo: 'no es igual a',
        defineConditionConditionStrategyLabelNotEmpty: 'no vacío',
        defineConditionMaxCountError: 'Ingrese un valor con no más de {{ count }} carácteres',
        selectTabTitle: 'Seleccionar de la lista',
        searchTableEmptyMessage: 'Use la búsqueda para obtener resultados',
        defineTabTitle: 'Definir Condiciones'
    },
    platformCombobox: {
        countListResultsSingular: '1 elemento en la lista de resultados',
        countListResultsPlural: '{{ count }} elementos de la lista de resultados'
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Seleccionar opciones',
        inputIconTitle: 'Seleccionar opciones',
        mobileShowAllItemsButton: 'Mostrar todos los elementos',
        mobileShowSelectedItemsButton: 'Mostrar elementos seleccionados'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: '1 carácter por encima del límite',
        counterMessageCharactersOverTheLimitPlural: '{{ count }} caracteres por encima del límite',
        counterMessageCharactersRemainingSingular: '1 carácter restante',
        counterMessageCharactersRemainingPlural: '{{ count }} caracteres restantes'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Media: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'cargando'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'detalle',
        deleteActionAriaLabel: 'eliminar'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'detalle',
        deleteActionAriaLabel: 'eliminar'
    },
    platformSearchField: {
        clearButtonTitle: 'Borrar',
        submitButtonTitle: 'Buscar',
        synchronizeButtonTitle: 'Sincronizar',
        searchSuggestionMessage: '{{ count }} sugerencias encontradas.',
        searchSuggestionNavigateMessage: 'usa las flechas hacia arriba y hacia abajo para navegar'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Buscar',
        submitButtonLabel: 'Ir',
        filtersButtonLabel: 'Filtros ({{ filtersCount }})',
        showFiltersButtonLabel: 'Mostrar filtros',
        hideFiltersButtonLabel: 'Ocultar filtros',
        defineConditionsRemoveConditionButtonTitle: 'Quitar condición',
        defineConditionsAddConditionButtonLabel: 'Agregar condición',
        defineConditionsSubmitButtonLabel: 'Ir',
        defineConditionsCancelButton: 'Cancelar',
        selectFiltersHeader: 'Filtros',
        selectFiltersAvailableFiltersText: 'Filtros disponibles',
        selectFiltersFilterColumnLabel: 'Filtro',
        selectFiltersActiveColumnLabel: 'Activo',
        selectFiltersSubmitButtonLabel: 'Ir',
        selectFiltersCancelButton: 'Cancelar',
        filterConditionContains: 'contiene',
        filterConditionEqualTo: 'igual a',
        filterConditionBetween: 'entre',
        filterConditionBeginsWith: 'comienza con',
        filterConditionEndsWith: 'termina con',
        filterConditionLessThan: 'menor que',
        filterConditionLessThanOrEqualTo: 'menor o igual que',
        filterConditionGreaterThan: 'mayor que',
        filterConditionGreaterThanOrEqualTo: 'mayor o igual que',
        filterConditionAfter: 'después',
        filterConditionOnOrAfter: 'en o después',
        filterConditionBefore: 'antes',
        filterConditionBeforeOrOn: 'antes o en',
        filterConditionValuePlaceholder: 'valor',
        filterConditionValueFromPlaceholder: 'desde',
        filterConditionValueToPlaceholder: 'a',
        settingsCategoryAll: 'Todos',
        settingsCategoryVisible: 'Visible',
        settingsCategoryActive: 'Activo',
        settingsCategoryVisibleAndActive: 'Visible y activo',
        settingsCategoryMandatory: 'Obligatorio'
    },

    platformTable: {
        headerMenuSortAsc: 'Ordenar ascendente',
        headerMenuSortDesc: 'Orden descendente',
        headerMenuGroup: 'Grupo',
        headerMenuFreeze: 'Congelar',
        headerMenuEndFreeze: 'Freeze to End',
        headerMenuUnfreeze: 'HeaderMenuUnfreeze',
        headerMenuFilter: 'Filtro',
        defaultEmptyMessage: 'No se encontraron datos',
        resetChangesButtonLabel: 'Restablecer',
        editableCellNumberPlaceholder: 'Ingresar valor',
        editableCellDatePlaceholder: 'Ingresar valor',
        editableCellStringPlaceholder: 'Ingresar valor',
        P13ColumnsDialogHeader: 'Columnas',
        P13ColumnsDialogSearchPlaceholder: 'Buscar',
        P13ColumnsDialogsShowSelected: 'Mostrar seleccionado',
        P13ColumnsDialogShowAll: 'Mostrar todo',
        P13ColumnsDialogSelectAll: 'Seleccionar todo ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Cancelar',
        P13ColumnsDialogMoveToTopBtn: 'Mover al principio',
        P13ColumnsDialogMoveUpBtn: 'Mover hacia arriba',
        P13ColumnsDialogMoveDownBtn: 'Mover hacia abajo',
        P13ColumnsDialogMoveToBottomBtn: 'Mover a la parte inferior',
        P13FilterStrategyLabelBetween: 'entre',
        P13FilterStrategyLabelContains: 'contiene',
        P13FilterStrategyLabelBeginsWith: 'comienza con',
        P13FilterStrategyLabelEndsWith: 'termina en',
        P13FilterStrategyLabelEqualTo: 'igual a',
        P13FilterStrategyLabelGreaterThan: 'mayor que',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'mayor o igual que',
        P13FilterStrategyLabelLessThan: 'menor que',
        P13FilterStrategyLabelLessThanOrEqualTo: 'menor o igual que',
        P13FilterStrategyLabelAfter: 'después',
        P13FilterStrategyLabelOnOrAfter: 'en o después',
        P13FilterStrategyLabelBefore: 'antes',
        P13FilterStrategyLabelBeforeOrOn: 'antes o en',
        P13FilterStrategyLabelNotDefined: 'No definido',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Sí',
        P13FilterBooleanOptionFalse: 'No',
        P13FilterDialogHeader: 'Filtrar por',
        P13FilterDialogIncludePanelTitleWithCount: 'Incluir ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Incluir',
        P13FilterDialogExcludePanelTitleWithCount: 'Excluir ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Excluir',
        P13FilterDialogRemoveFilterBtnTitle: 'Eliminar filtro',
        P13FilterDialoAddFilterBtnTitle: 'Agregar filtro',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Cancelar',
        P13GroupDialogHeader: 'Grupo',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(ninguno)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Mostrar campo como columna',
        P13GroupDialogRemoveGroupBtnTitle: 'Eliminar',
        P13GroupDialogAddNewGroupBtnTitle: 'Agregar nuevo',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Cancelar',
        P13SortDialogHeader: 'Ordenar',
        P13SortDialogNoneSelectedColumn: '(ninguno)',
        P13SortDialogNoneSelectedSorting: '(ninguno)',
        P13SortDialogSortOrderSelectOptionAsc: 'Ascendente',
        P13SortDialogSortOrderSelectOptionDesc: 'Descendente',
        P13SortDialogRemoveSortBtnTitle: 'Eliminar',
        P13SortDialogAddNewSortBtnTitle: 'Agregar nuevo',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Cancelar',
        toolbarSearchPlaceholder: 'Buscar',
        toolbarActionCreateButtonLabel: 'Crear',
        toolbarActionSaveButtonLabel: 'Guardar',
        toolbarActionCancelButtonLabel: 'Cancelar',
        toolbarActionSortButtonTitle: 'Ordenar',
        toolbarActionFilterButtonTitle: 'Filtro',
        toolbarActionGroupButtonTitle: 'Grupo',
        toolbarActionColumnsButtonTitle: 'Columnas',
        toolbarActionExpandAllButtonTitle: 'Expand all',
        toolbarActionCollapseAllButtonTitle: 'Collapse all',
        filterDialogNotFilteredLabel: '(No filtrado)',
        filterDialogFilterByLabel: 'Filtrar por: {{ filterLabel }}',
        filterDialogFilterTitle: 'Filtro',
        filterDialogFilterBy: 'Filtrar por',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Cancelar',
        groupDialogHeader: 'Grupo',
        groupDialogGroupOrderHeader: 'Orden de grupo',
        groupDialogGroupOrderAsc: 'Ascendente',
        groupDialogGroupOrderDesc: 'Descendente',
        groupDialogGroupByHeader: 'Agrupar por',
        groupDialogNotGroupedLabel: '(No agrupado)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Cancelar',
        sortDialogHeader: 'Ordenar',
        sortDialogSortOrderHeader: 'Orden de clasificación',
        sortDialogSortOrderAsc: 'Ascendente',
        sortDialogSortOrderDesc: 'Descendente',
        sortDialogSortByHeader: 'Ordenado por',
        sortDialogNotSortedLabel: '(No ordenado)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Cancelar',
        selectAllCheckboxLabel: 'Select all',
        deselectAllCheckboxLabel: 'Deselect all'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Ir al anterior',
        detailsGotoNextButtonTitle: 'Ir al siguiente',
        detailsDialogCloseBtnLabel: 'Cerrar',
        roleDescription: 'Imagen'
    },
    platformUploadCollection: {
        moveToTitle: 'Mover a',
        moveToTitleFolder: 'Carpeta',
        moveToNewFolderBtnLabel: 'Nueva carpeta',
        moveToAllFilesSubHeaderLabel: 'Todos los archivos',
        moveToConfirmBtn: 'Mover',
        moveToCloseBtn: 'Cancelar',
        newFolderTitle: 'Nueva carpeta',
        newFolderAtRootInputLabel: 'Nombre de la nueva carpeta',
        newFolderAtFolderInputLabel: 'Nombre de la nueva carpeta dentro de {{ folderName }}',
        newFolderInputPlaceholder: 'Escriba aquí..',
        newFolderInputErrorLabel: 'Máximo de {{ count }} caracteres permitidos',
        newFolderDialogCreateBtnLabel: 'Crear',
        newFolderDialogCancelBtnLabel: 'Cancelar',
        breadcrumbLabelAllFiles: 'Todos los archivos',
        breadcrumbLabelAllFilesWithTotal: 'Todos los archivos ({{ total }})',
        searchPlaceholder: 'Buscar',
        addBtnLabel: 'Agregar',
        newFolderBtnLabel: 'Nueva Carpeta',
        moveToBtnLabel: 'Mover a',
        downloadBtnLabel: 'Descargar',
        updateVersionBtnLabel: 'Actualizar versión',
        removeBtnLabel: 'Eliminar',
        folderIconTitle: 'Icono de carpeta',
        fileIconTitle: 'Icono de archivo',
        editFileNameInputPlaceholder: 'Ingrese un nombre',
        editFileNameFileAlreadyExistsError: 'El archivo con este nombre ya existe',
        editFileNameFolderAlreadyExistsError: 'La carpeta con este nombre ya existe',
        itemStatusSuccessful: 'Exitoso',
        itemStatusUnsuccessful: 'Fracasado',
        uploadNewFileAfterFailAction: 'Ejecutar',
        cancelUploadNewFileAction: 'Cancelar',
        itemMenuBtnTitle: 'Más',
        dragDropAreaText: 'Arrastrar archivos para cargar',
        noDataText: 'No se encontraron archivos',
        noDataDescription: 'Suelte los archivos para cargarlos o use el botón "Agregar".',
        paginationTotal: 'Mostrando {{ from }}-{{ to }} de {{ total }}',
        resultsPerPage: 'Resultados por página',
        messageCreateFailed: 'No se pudo crear {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} ha sido creado.',
        messageUpdateVersionFailed: 'No se pudo actualizar la versión de {{ folderName }}.',
        messageUpdateVersionSuccess: 'La versión de {{ folderName }} ha sido actualizada.',
        messageFileRenameFailed: 'No se pudo cambiar el nombre de "{{ from }}" a "{{ to }}."',
        messageFileRenameSuccess: '"{{ from }}" ha sido renombrado a "{{ to }}".',
        messageRemoveFoldersAndFilesFailed:
            'No se pudieron eliminar {{ foldersCount }} carpetas y {{ filesCount }} archivos.',
        messageRemoveFoldersAndFilesSuccess:
            'Se han eliminado {{ foldersCount }} carpetas y {{ filesCount }} archivos.',
        messageRemoveFoldersFailed: 'No se pudieron eliminar {{ foldersCount }} carpetas.',
        messageRemoveFoldersSuccess: '{{ foldersCount }} carpetas han sido eliminadas.',
        messageRemoveFilesFailed: 'No se pudieron eliminar {{ filesCount }} archivos.',
        messageRemoveFilesSuccess: '{{ filesCount }} archivos han sido eliminados.',
        messageRemoveFileOrFolderFailed: 'No se pudo eliminar {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} ha sido eliminado.',
        messageMoveFoldersAndFilesFailed:
            'Error al mover {{ foldersCount }} carpetas y {{ filesCount }} archivos a {{ to }}.',
        messageMoveFoldersAndFilesSuccess:
            '{{ foldersCount }} carpetas y {{ filesCount }} archivos se han movido a {{ to }}.',
        messageMoveFoldersFailed: 'Error al mover {{ foldersCount }} carpetas a {{ to }}.',
        messageMoveFoldersSuccess: '{{ foldersCount }} carpetas se han movido a {{ to }}.',
        messageMoveFilesFailed: 'Error al mover {{ filesCount }} archivos a {{ to }}.',
        messageMoveFilesSuccess: '{{ filesCount }} archivos se han movido a {{ to }}.',
        messageMoveFileOrFolderFailed: 'No se pudo mover {{ name }} a {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} se ha movido a {{ to }}.',
        messageMoveRootFoldersAndFilesFailed:
            'Error al mover {{ foldersCount }} carpetas y {{ filesCount }} archivos a todos los archivos.',
        messageMoveRootFoldersAndFilesSuccess:
            '{{ foldersCount }} carpetas y {{ filesCount }} archivos se han movido a todos los archivos.',
        messageMoveRootFoldersFailed: 'Error al mover {{ foldersCount }} carpetas a todos los archivos.',
        messageMoveRootFoldersSuccess: '{{ foldersCount }} carpetas se han movido a todos los archivos.',
        messageMoveRootFilesFailed: 'Error al mover {{ filesCount }} archivos a todos los archivos.',
        messageMoveRootFilesSuccess: '{{ filesCount }} archivos se han movido a todos los archivos.',
        messageMoveRootFileOrFolderFailed: 'No se pudo mover {{ name }} a todos los archivos.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} se ha movido a todos los archivos.',
        messageFileTypeMismatchPlural:
            '{{ filesCount }} los archivos tienen el tipo incorrecto. Tipos permitidos: {{ allowedTypes }}.',
        messageFileTypeMismatchSingular:
            'El archivo "{{ fileName }}" tiene un tipo incorrecto. Tipos permitidos: {{ allowedTypes }}.',
        messageFileSizeExceededPlural: '{{ filesCount }} archivos excedieron el tamaño máximo de archivo',
        messageFileSizeExceededSingular:
            'El archivo "{{ fileName }}" excedió el tamaño máximo de archivo. Tamaño de archivo máximo permitido: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural:
            '{{ filesCount }} archivos excedieron la longitud máxima del nombre de archivo.' +
            'Longitud de nombre de archivo permitida: {{ maxFilenameLength }} caracteres.',
        messageFileNameLengthExceededSingular:
            'El nombre "{{ fileName }}" excedió la longitud máxima del nombre de archivo.' +
            'Longitud permitida del nombre de archivo: {{ maxFilenameLength }} caracteres.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Editar'
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
        selectOptionLabel: 'Seleccione una opción'
    },
    fnSlider: {
        minMaxDetails: 'Slider el valor mínimo es {{ min }}, el valor máximo es {{ max }}',
        valueminDetails: 'El valor es {{ value }}',
        valuemaxDetails: 'El valor es {{ value }}',
        valueNowDetails: 'El valor actual es {{ value }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Aceptar',
        semanticDeclineLabel: 'Rechazar'
    },
    coreTree: {
        expand: 'Expand node',
        collapse: 'Collapse node',
        noData: 'No data'
    }
};
