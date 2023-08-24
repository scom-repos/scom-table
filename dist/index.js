var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-table/global/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-table/global/utils.ts", ["require", "exports", "@scom/scom-chart-data-source-setup"], function (require, exports, scom_chart_data_source_setup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callAPI = exports.formatNumberWithSeparators = exports.formatNumberByFormat = exports.formatNumber = void 0;
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${(0, exports.formatNumberWithSeparators)(num, 2)}%`;
        }
        if (format) {
            return (0, exports.formatNumberByFormat)(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000000), decimals || 3) + 'B';
        }
        if (absNum >= 1000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000), decimals || 3) + 'M';
        }
        if (absNum >= 1000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000), decimals || 3) + 'K';
        }
        if (absNum < 0.0000001) {
            return (0, exports.formatNumberWithSeparators)(num);
        }
        if (absNum < 0.00001) {
            return (0, exports.formatNumberWithSeparators)(num, 6);
        }
        if (absNum < 0.001) {
            return (0, exports.formatNumberWithSeparators)(num, 4);
        }
        return (0, exports.formatNumberWithSeparators)(num, 2);
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
        if (format.includes('%')) {
            return (0, exports.formatNumberWithSeparators)((num * 100), decimalPlaces) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = (0, exports.formatNumberWithSeparators)(num, decimalPlaces);
        if (separators && !format.includes('.ma')) {
            return `${currencySymbol}${roundedNum}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = (0, exports.formatNumber)(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision || precision === 0) {
            let outputStr = '';
            if (value >= 1) {
                outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const callAPI = async (options) => {
        if (!options.dataSource)
            return [];
        try {
            let apiEndpoint = '';
            switch (options.dataSource) {
                case scom_chart_data_source_setup_1.DataSource.Dune:
                    apiEndpoint = `/dune/query/${options.queryId}`;
                    break;
                case scom_chart_data_source_setup_1.DataSource.Custom:
                    apiEndpoint = options.apiEndpoint;
                    break;
            }
            if (!apiEndpoint)
                return [];
            const response = await fetch(apiEndpoint);
            const jsonData = await response.json();
            return jsonData.result.rows || [];
        }
        catch (_a) { }
        return [];
    };
    exports.callAPI = callAPI;
});
define("@scom/scom-table/global/index.ts", ["require", "exports", "@scom/scom-table/global/interfaces.ts", "@scom/scom-table/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-table/global/index.ts'/> 
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-table/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tableStyle = exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        padding: 10
    });
    exports.tableStyle = components_1.Styles.style({
        display: 'block',
        $nest: {
            'i-progress .i-progress_wrapbar': {
                borderRadius: 4
            },
            'i-input input': {
                border: 'none',
                background: 'transparent'
            },
            'i-table': {
                fontSize: '12px',
                $nest: {
                    '.i-table-container': {
                        overflowY: 'auto',
                        height: 'inherit'
                    },
                    'thead': {
                        background: Theme.colors.info.light,
                        position: 'sticky',
                        top: 0,
                        zIndex: 1
                    },
                    '.i-table-header>tr>th': {
                        color: Theme.colors.info.contrastText
                    },
                    'tr:hover td': {
                        background: 'transparent',
                        opacity: 0.8
                    }
                }
            },
            'i-pagination': {
                lineHeight: '24px',
                $nest: {
                    '.pagination a': {
                        minWidth: 30,
                        height: 25,
                        fontSize: 12,
                        padding: '0 2px',
                        background: Theme.colors.success.light,
                        color: Theme.colors.success.contrastText
                    },
                    '.pagination a.active': {
                        background: Theme.colors.success.dark,
                        borderColor: Theme.colors.success.dark,
                        color: Theme.colors.secondary.contrastText
                    }
                }
            },
            '::-webkit-scrollbar': {
                width: '5px',
                height: '5px'
            },
            '::-webkit-scrollbar-track': {
                borderRadius: '10px',
                border: '1px solid transparent',
                background: Theme.action.focus
            },
            '::-webkit-scrollbar-thumb': {
                background: Theme.colors.info.main,
                borderRadius: '10px'
            }
        }
    });
});
define("@scom/scom-table/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_2.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-table/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-table/data.json.ts'/> 
    exports.default = {
        "defaultBuilderData": {
            // "apiEndpoint": "/dune/query/2030664",
            "dataSource": "Dune",
            "queryId": "2030664",
            "title": "Ethereum Beacon Chain Deposits Entity",
            "options": {
                "columns": [
                    {
                        "name": "ranking",
                        "title": "Rnk"
                    },
                    {
                        "name": "entity",
                        "title": "Pool name"
                    },
                    {
                        "name": "eth_deposited",
                        "type": "progressbar",
                        "title": "ETH deposited",
                        "numberFormat": "0,000."
                    },
                    {
                        "name": "validators",
                        "title": "Validators",
                        "numberFormat": "0,000"
                    },
                    {
                        "name": "marketshare",
                        "title": "Share",
                        "numberFormat": "0,000.00%"
                    }
                ]
            }
        }
    };
});
define("@scom/scom-table/formSchema.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmbedderSchema = exports.getBuilderSchema = void 0;
    ///<amd-module name='@scom/scom-table/formSchema.ts'/> 
    const visualizationOptions = {
        type: 'object',
        title: 'Visualization Options',
        properties: {
            columns: {
                type: 'array',
                required: true,
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            required: true
                        },
                        title: {
                            type: 'string'
                        },
                        alignContent: {
                            type: 'string',
                            enum: [
                                'left',
                                'center',
                                'right'
                            ]
                        },
                        type: {
                            type: 'string',
                            enum: [
                                'normal',
                                'progressbar'
                            ]
                        },
                        numberFormat: {
                            type: 'string'
                        },
                        isHidden: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    };
    function getBuilderSchema() {
        return {
            general: {
                dataSchema: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        }
                    }
                },
                uiSchema: {
                    type: 'VerticalLayout',
                    elements: [
                        // {
                        //   type: 'Control',
                        //   scope: '#/properties/apiEndpoint',
                        //   title: 'API Endpoint'
                        // },
                        {
                            type: 'Control',
                            scope: '#/properties/title'
                        },
                        {
                            type: 'Control',
                            scope: '#/properties/description'
                        },
                        {
                            type: 'Control',
                            scope: '#/properties/options/properties/columns',
                            options: {
                                detail: {
                                    type: 'VerticalLayout'
                                }
                            }
                        }
                    ]
                }
            },
            advanced: {
                dataSchema: {
                    type: 'object',
                    properties: {
                        options: visualizationOptions
                    }
                },
                uiSchema: {
                    type: 'VerticalLayout',
                    elements: [
                        {
                            type: "HorizontalLayout",
                            elements: [
                                {
                                    type: "Control",
                                    scope: '#/properties/options/properties/columns',
                                    options: {
                                        detail: {
                                            type: "VerticalLayout"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            theme: {
                dataSchema: {
                    type: 'object',
                    properties: {
                        darkShadow: {
                            type: 'boolean'
                        },
                        fontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        backgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        progressBackgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        footerBackgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        footerFontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        headerBackgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        headerFontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        paginationActiveBackgoundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        paginationActiveFontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        // width: {
                        //   type: 'string'
                        // },
                        height: {
                            type: 'string'
                        }
                    }
                }
            }
        };
    }
    exports.getBuilderSchema = getBuilderSchema;
    function getEmbedderSchema() {
        return {
            general: {
                dataSchema: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        }
                    }
                }
            },
            theme: {
                dataSchema: {
                    type: 'object',
                    properties: {
                        darkShadow: {
                            type: 'boolean'
                        },
                        fontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        backgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        progressBackgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        footerBackgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        footerFontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        headerBackgroundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        headerFontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        paginationActiveBackgoundColor: {
                            type: 'string',
                            format: 'color'
                        },
                        paginationActiveFontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        // width: {
                        //   type: 'string'
                        // },
                        height: {
                            type: 'string'
                        }
                    }
                }
            }
        };
    }
    exports.getEmbedderSchema = getEmbedderSchema;
});
define("@scom/scom-table/dataOptionsForm.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomTableDataOptionsForm = class ScomTableDataOptionsForm extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
            this.renderUI();
        }
        async refreshFormData() {
            this._data = await this.formEl.getFormData();
            return this._data;
        }
        renderUI() {
            this.formEl.clearInnerHTML();
            this.formEl.jsonSchema = JSON.parse(this._dataSchema);
            this.formEl.uiSchema = JSON.parse(this._uiSchema);
            this.formEl.formOptions = {
                columnWidth: '100%',
                columnsPerRow: 1,
                confirmButtonOptions: {
                    hide: true
                }
            };
            this.formEl.renderForm();
            this.formEl.clearFormData();
            this.formEl.setFormData(this._data);
            const inputs = this.formEl.querySelectorAll('[scope]');
            for (let input of inputs) {
                const inputEl = input;
                inputEl.onChanged = this.onInputChanged;
            }
        }
        async onInputChanged() {
            const data = await this.formEl.getFormData();
            await this.onCustomInputChanged(data);
        }
        async onCustomInputChanged(data) {
        }
        async init() {
            super.init();
            this.onInputChanged = this.onInputChanged.bind(this);
            const dataSchema = this.getAttribute('dataSchema', true);
            this._dataSchema = dataSchema;
            const uiSchema = this.getAttribute('uiSchema', true);
            this._uiSchema = uiSchema;
            const options = this.getAttribute('options', true, {});
            this.data = {
                options
            };
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-vstack", { gap: '0.5rem' },
                    this.$render("i-panel", { id: 'pnlForm' },
                        this.$render("i-form", { id: 'formEl' })))));
        }
    };
    ScomTableDataOptionsForm = __decorate([
        components_3.customModule,
        (0, components_3.customElements)('i-scom-table-data-options-form')
    ], ScomTableDataOptionsForm);
    exports.default = ScomTableDataOptionsForm;
});
define("@scom/scom-table", ["require", "exports", "@ijstech/components", "@scom/scom-table/global/index.ts", "@scom/scom-table/index.css.ts", "@scom/scom-table/assets.ts", "@scom/scom-table/data.json.ts", "@scom/scom-chart-data-source-setup", "@scom/scom-table/formSchema.ts", "@scom/scom-table/dataOptionsForm.tsx"], function (require, exports, components_4, index_1, index_css_1, assets_1, data_json_1, scom_chart_data_source_setup_2, formSchema_1, dataOptionsForm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    const currentTheme = components_4.Styles.Theme.currentTheme;
    const pageSize = 25;
    const DefaultData = {
        dataSource: scom_chart_data_source_setup_2.DataSource.Dune,
        queryId: '',
        apiEndpoint: '',
        title: '',
        options: undefined,
        mode: scom_chart_data_source_setup_2.ModeType.LIVE
    };
    let ScomTable = class ScomTable extends components_4.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.tableData = [];
            this.totalPage = 0;
            this.pageNumber = 0;
            this.itemStart = 0;
            this.itemEnd = pageSize;
            this._data = DefaultData;
            this.tag = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.updateTableData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this.width = this.tag.width || 700;
            this.height = this.tag.height || 500;
            this.onUpdateBlock();
        }
        _getActions(propertiesSchema, themeSchema, advancedSchema) {
            const builderSchema = (0, formSchema_1.getBuilderSchema)();
            const actions = [
                {
                    name: 'General',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = DefaultData;
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData) {
                                    if (advancedSchema) {
                                        this._data = Object.assign(Object.assign({}, this._data), userInputData);
                                    }
                                    else {
                                        this._data = Object.assign({}, userInputData);
                                    }
                                }
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (advancedSchema)
                                    _oldData = Object.assign(Object.assign({}, _oldData), { options: this._data.options });
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: advancedSchema ? undefined : builderSchema.general.uiSchema
                },
                {
                    name: 'Data',
                    icon: 'database',
                    command: (builder, userInputData) => {
                        let _oldData = DefaultData;
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.mode)
                                    this._data.mode = userInputData === null || userInputData === void 0 ? void 0 : userInputData.mode;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.file)
                                    this._data.file = userInputData === null || userInputData === void 0 ? void 0 : userInputData.file;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.dataSource)
                                    this._data.dataSource = userInputData === null || userInputData === void 0 ? void 0 : userInputData.dataSource;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.queryId)
                                    this._data.queryId = userInputData === null || userInputData === void 0 ? void 0 : userInputData.queryId;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.apiEndpoint)
                                    this._data.apiEndpoint = userInputData === null || userInputData === void 0 ? void 0 : userInputData.apiEndpoint;
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.options) !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    customUI: {
                        render: (data, onConfirm, onChange) => {
                            const vstack = new components_4.VStack(null, { gap: '1rem' });
                            const dataSourceSetup = new scom_chart_data_source_setup_2.default(null, Object.assign(Object.assign({}, this._data), { chartData: JSON.stringify(this.tableData), onCustomDataChanged: async (dataSourceSetupData) => {
                                    if (onChange) {
                                        onChange(true, Object.assign(Object.assign({}, this._data), dataSourceSetupData));
                                    }
                                } }));
                            const hstackBtnConfirm = new components_4.HStack(null, {
                                verticalAlignment: 'center',
                                horizontalAlignment: 'end'
                            });
                            const button = new components_4.Button(null, {
                                caption: 'Confirm',
                                width: 'auto',
                                height: 40,
                                font: { color: Theme.colors.primary.contrastText }
                            });
                            hstackBtnConfirm.append(button);
                            vstack.append(dataSourceSetup);
                            const dataOptionsForm = new dataOptionsForm_1.default(null, {
                                options: this._data.options,
                                dataSchema: JSON.stringify(advancedSchema),
                                uiSchema: JSON.stringify(builderSchema.advanced.uiSchema)
                            });
                            vstack.append(dataOptionsForm);
                            vstack.append(hstackBtnConfirm);
                            if (onChange) {
                                dataOptionsForm.onCustomInputChanged = async (optionsFormData) => {
                                    onChange(true, Object.assign(Object.assign(Object.assign({}, this._data), optionsFormData), dataSourceSetup.data));
                                };
                            }
                            button.onClick = async () => {
                                const { dataSource, file, mode } = dataSourceSetup.data;
                                if (mode === scom_chart_data_source_setup_2.ModeType.LIVE && !dataSource)
                                    return;
                                if (mode === scom_chart_data_source_setup_2.ModeType.SNAPSHOT && !(file === null || file === void 0 ? void 0 : file.cid))
                                    return;
                                if (onConfirm) {
                                    const optionsFormData = await dataOptionsForm.refreshFormData();
                                    onConfirm(true, Object.assign(Object.assign(Object.assign({}, this._data), optionsFormData), dataSourceSetup.data));
                                }
                            };
                            return vstack;
                        }
                    }
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            // if (advancedSchema) {
            //   const advanced = {
            //     name: 'Advanced',
            //     icon: 'sliders-h',
            //     command: (builder: any, userInputData: any) => {
            //       let _oldData: ITableOptions = { columns: [] };
            //       return {
            //         execute: async () => {
            //           _oldData = { ...this._data?.options };
            //           if (userInputData?.options !== undefined) this._data.options = userInputData.options;
            //           if (builder?.setData) builder.setData(this._data);
            //           this.setData(this._data);
            //         },
            //         undo: () => {
            //           this._data.options = { ..._oldData };
            //           if (builder?.setData) builder.setData(this._data);
            //           this.setData(this._data);
            //         },
            //         redo: () => { }
            //       }
            //     },
            //     userInputDataSchema: advancedSchema,
            //     userInputUISchema: builderSchema.advanced.uiSchema as any
            //   }
            //   actions.push(advanced);
            // }
            return actions;
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const builderSchema = (0, formSchema_1.getBuilderSchema)();
                        const generalSchema = builderSchema.general.dataSchema;
                        const themeSchema = builderSchema.theme.dataSchema;
                        const advancedSchema = builderSchema.advanced.dataSchema;
                        return this._getActions(generalSchema, themeSchema, advancedSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        const embedderSchema = (0, formSchema_1.getEmbedderSchema)();
                        const generalSchema = embedderSchema.general.dataSchema;
                        const themeSchema = embedderSchema.theme.dataSchema;
                        return this._getActions(generalSchema, themeSchema);
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        get dataListFiltered() {
            var _a, _b, _c;
            const searchVal = (_a = this.inputSearch) === null || _a === void 0 ? void 0 : _a.value.toLowerCase();
            if (searchVal) {
                const cols = (_c = (_b = this._data) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.columns.filter(v => !v.isHidden);
                return this.tableData.filter(v => {
                    for (const col of cols) {
                        const val = v[col.name];
                        if (val === null || val === void 0 ? void 0 : val.toString().toLowerCase().includes(searchVal)) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            return this.tableData;
        }
        get dataListPagination() {
            return this.dataListFiltered.slice(this.itemStart, this.itemEnd) || [];
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            if (this.vStackTable) {
                this.vStackTable.style.boxShadow = ((_a = this.tag) === null || _a === void 0 ? void 0 : _a.darkShadow) ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            this.updateStyle('--text-primary', (_b = this.tag) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag) === null || _c === void 0 ? void 0 : _c.backgroundColor);
            this.updateStyle('--colors-info-main', (_d = this.tag) === null || _d === void 0 ? void 0 : _d.progressBackgroundColor);
            this.updateStyle('--colors-success-light', ((_e = this.tag) === null || _e === void 0 ? void 0 : _e.footerBackgroundColor) || '#ffeceb');
            this.updateStyle('--colors-success-contrast_text', (_f = this.tag) === null || _f === void 0 ? void 0 : _f.footerFontColor);
            this.updateStyle('--colors-success-dark', ((_g = this.tag) === null || _g === void 0 ? void 0 : _g.paginationActiveBackgoundColor) || '#e47872');
            this.updateStyle('--colors-secondary-contrast_text', (_h = this.tag) === null || _h === void 0 ? void 0 : _h.paginationActiveFontColor);
            this.updateStyle('--colors-info-light', ((_j = this.tag) === null || _j === void 0 ? void 0 : _j.headerBackgroundColor) || '#ffeceb');
            this.updateStyle('--colors-info-contrast_text', (_k = this.tag) === null || _k === void 0 ? void 0 : _k.headerFontColor);
        }
        onUpdateBlock() {
            this.renderTable();
            this.updateTheme();
        }
        async updateTableData() {
            var _a;
            if (this.inputSearch) {
                this.inputSearch.value = '';
            }
            this.loadingElm.visible = true;
            if (((_a = this._data) === null || _a === void 0 ? void 0 : _a.mode) === scom_chart_data_source_setup_2.ModeType.SNAPSHOT)
                await this.renderSnapshotData();
            else
                await this.renderLiveData();
            this.loadingElm.visible = false;
        }
        async renderSnapshotData() {
            var _a;
            if ((_a = this._data.file) === null || _a === void 0 ? void 0 : _a.cid) {
                try {
                    const data = await (0, scom_chart_data_source_setup_2.fetchContentByCID)(this._data.file.cid);
                    if (data) {
                        this.tableData = data;
                        this.onUpdateBlock();
                        return;
                    }
                }
                catch (_b) { }
            }
            this.tableData = [];
            this.onUpdateBlock();
        }
        async renderLiveData() {
            const dataSource = this._data.dataSource;
            if (dataSource) {
                try {
                    const data = await (0, index_1.callAPI)({
                        dataSource,
                        queryId: this._data.queryId,
                        apiEndpoint: this._data.apiEndpoint
                    });
                    if (data) {
                        this.tableData = data;
                        this.onUpdateBlock();
                        return;
                    }
                }
                catch (_a) { }
            }
            this.tableData = [];
            this.onUpdateBlock();
        }
        renderTable(resize) {
            var _a, _b, _c;
            if (!this.tableElm && ((_a = this._data) === null || _a === void 0 ? void 0 : _a.options))
                return;
            const { title, description } = this._data;
            const { columns } = ((_b = this._data) === null || _b === void 0 ? void 0 : _b.options) || {};
            this.lbTitle.caption = title;
            this.lbDescription.caption = description;
            this.lbDescription.visible = !!description;
            this.pnlTable.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
            if (!(columns === null || columns === void 0 ? void 0 : columns.length))
                return;
            if (!resize) {
                let cols = [];
                const _columns = columns.filter(v => !v.isHidden);
                for (const column of _columns) {
                    const { name, title, alignContent, type, numberFormat, coloredNegativeValues, coloredPositiveValues } = column;
                    let totalValue = 0;
                    if (type === 'progressbar') {
                        totalValue = this.tableData.reduce((acc, cur) => {
                            if (cur[name]) {
                                return acc + Number(cur[name]);
                            }
                            return acc;
                        }, 0);
                    }
                    const col = {
                        title: title || ((_c = columns[name]) === null || _c === void 0 ? void 0 : _c.title) || name,
                        fieldName: name,
                        textAlign: alignContent,
                        onRenderCell: function (source, data, rowData) {
                            const isNumber = typeof data === 'number';
                            const hStack = new components_4.HStack(undefined, {
                                width: '100%',
                                gap: 5,
                                wrap: type === 'progressbar' ? undefined : 'wrap',
                                verticalAlignment: 'center'
                            });
                            if (type === 'progressbar') {
                                new components_4.Progress(hStack, {
                                    width: 60,
                                    height: 8,
                                    strokeWidth: 8,
                                    strokeColor: Theme.colors.info.main,
                                    percent: (data / totalValue) * 100
                                });
                            }
                            new components_4.Label(hStack, {
                                caption: isNumber && numberFormat ? (0, index_1.formatNumberByFormat)(data, numberFormat, true) :
                                    isNumber ? (0, index_1.formatNumberWithSeparators)(data) : data,
                                font: {
                                    size: '12px',
                                    color: Theme.text.primary
                                }
                            });
                            return hStack;
                        }
                    };
                    cols.push(col);
                }
                this.tableElm.columns = cols;
                this.pageNumber = 1;
                const hasData = !!this.tableData.length;
                this.lbTotal.visible = hasData;
                this.inputSearch.visible = hasData;
                this.lbTotal.caption = `${this.tableData.length} ${this.tableData.length === 1 ? 'row' : 'rows'}`;
                this.updateTableUI();
            }
            this.tableElm.height = `${this.pnlTable.offsetHeight - (this.hStackFooter.offsetHeight + 20)}px`;
        }
        updateTableUI() {
            this.totalPage = Math.ceil(this.dataListFiltered.length / pageSize);
            this.paginationElm.visible = this.totalPage > 1;
            this.tableElm.data = this.dataListPagination;
        }
        onSelectIndex() {
            this.pageNumber = this.paginationElm.currentPage;
            this.itemStart = (this.pageNumber - 1) * pageSize;
            this.itemEnd = this.itemStart + pageSize;
            this.updateTableUI();
        }
        onSearch() {
            this.pageNumber = 1;
            this.updateTableUI();
        }
        resizeTable() {
            this.renderTable(true);
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.classList.add(index_css_1.tableStyle);
            this.updateTheme();
            this.setTag({
                fontColor: currentTheme.text.primary,
                backgroundColor: currentTheme.background.main,
                progressBackgroundColor: currentTheme.colors.info.main,
                footerBackgroundColor: currentTheme.colors.success.light || '#ffeceb',
                footerFontColor: currentTheme.colors.success.contrastText,
                paginationActiveBackgoundColor: currentTheme.colors.success.dark || '#e47872',
                paginationActiveFontColor: currentTheme.colors.secondary.contrastText,
                headerBackgroundColor: currentTheme.colors.info.light || '#ffeceb',
                headerFontColor: currentTheme.colors.info.contrastText,
                height: 500,
                boxShadow: false
            });
            // const { width, height, darkShadow } = this.tag || {};
            // this.width = width || 700;
            // this.height = height || 500;
            this.maxWidth = '100%';
            this.vStackTable.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data) {
                    this.setData(data);
                }
            }
            const data = this.getAttribute('data', true);
            if (data) {
                this.setData(data);
            }
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.resizeTable();
                }, 300);
            });
        }
        render() {
            return (this.$render("i-vstack", { id: "vStackTable", position: "relative", background: { color: Theme.background.main }, height: "100%", padding: { top: 10, bottom: 10, left: 10, right: 10 }, class: index_css_1.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", margin: { left: 'auto', right: 'auto', bottom: 10 }, verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true, color: Theme.text.primary } }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, font: { color: Theme.text.primary } })),
                this.$render("i-panel", { id: "pnlTable" },
                    this.$render("i-panel", { height: "inherit" },
                        this.$render("i-table", { id: "tableElm", width: "100%", height: "100%" }),
                        this.$render("i-hstack", { id: "hStackFooter", gap: 10, margin: { top: 16 }, horizontalAlignment: "start", verticalAlignment: "center", wrap: "wrap" },
                            this.$render("i-label", { id: "lbTotal", visible: false, background: { color: Theme.colors.success.light }, padding: { top: 4.5, bottom: 4.5, right: 8, left: 8 }, font: { size: '12px', color: Theme.colors.success.contrastText } }),
                            this.$render("i-input", { id: "inputSearch", visible: false, background: { color: Theme.colors.success.light }, placeholder: "Search", width: 168, padding: { top: 4, bottom: 4, right: 8, left: 8 }, font: { size: '12px', color: Theme.colors.success.contrastText }, onChanged: this.onSearch }),
                            this.$render("i-pagination", { id: "paginationElm", width: "auto", currentPage: this.pageNumber, totalPages: this.totalPage, onPageChanged: this.onSelectIndex.bind(this) }))))));
        }
    };
    __decorate([
        (0, components_4.observable)()
    ], ScomTable.prototype, "totalPage", void 0);
    ScomTable = __decorate([
        components_4.customModule,
        (0, components_4.customElements)('i-scom-table')
    ], ScomTable);
    exports.default = ScomTable;
});
