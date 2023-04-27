var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
define("@scom/scom-table/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callAPI = exports.formatNumberWithSeparators = exports.formatNumberByFormat = exports.formatNumber = void 0;
    ///<amd-module name='@scom/scom-table/global/utils.ts'/> 
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${exports.formatNumberWithSeparators(num, 2)}%`;
        }
        if (format) {
            return exports.formatNumberByFormat(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000000000) {
            return exports.formatNumberWithSeparators((num / 1000000000), decimals || 3) + 'B';
        }
        if (absNum >= 1000000) {
            return exports.formatNumberWithSeparators((num / 1000000), decimals || 3) + 'M';
        }
        if (absNum >= 1000) {
            return exports.formatNumberWithSeparators((num / 1000), decimals || 3) + 'K';
        }
        if (absNum < 0.0000001) {
            return exports.formatNumberWithSeparators(num);
        }
        if (absNum < 0.00001) {
            return exports.formatNumberWithSeparators(num, 6);
        }
        if (absNum < 0.001) {
            return exports.formatNumberWithSeparators(num, 4);
        }
        return exports.formatNumberWithSeparators(num, 2);
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
        if (format.includes('%')) {
            return exports.formatNumberWithSeparators((num * 100), decimalPlaces) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = exports.formatNumberWithSeparators(num, decimalPlaces);
        if (separators && !format.includes('.ma')) {
            return `${currencySymbol}${roundedNum}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = exports.formatNumber(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
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
    const callAPI = async (apiEndpoint) => {
        if (!apiEndpoint)
            return [];
        try {
            const response = await fetch(apiEndpoint);
            const jsonData = await response.json();
            return jsonData.result.rows || [];
        }
        catch (error) {
            console.log(error);
        }
        return [];
    };
    exports.callAPI = callAPI;
});
define("@scom/scom-table/global/index.ts", ["require", "exports", "@scom/scom-table/global/interfaces.ts", "@scom/scom-table/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                        background: Theme.background.main,
                        position: 'sticky',
                        top: 0,
                        zIndex: 1
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
define("@scom/scom-table", ["require", "exports", "@ijstech/components", "@scom/scom-table/global/index.ts", "@scom/scom-table/index.css.ts", "@scom/scom-table/assets.ts"], function (require, exports, components_3, index_1, index_css_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    const pageSize = 25;
    let ScomTable = class ScomTable extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
            this.tableData = [];
            this.apiEndpoint = '';
            this.totalPage = 0;
            this.pageNumber = 0;
            this.itemStart = 0;
            this.itemEnd = pageSize;
            this._oldData = { apiEndpoint: '', options: undefined };
            this._data = { apiEndpoint: '', options: undefined };
            this.oldTag = {};
            this.tag = {};
            this.defaultEdit = true;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._oldData = this._data;
            this._data = data;
            this.updateTableData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value || {};
            this.width = this.tag.width || 700;
            this.height = this.tag.height || 500;
            this.onUpdateBlock();
        }
        getConfigSchema() {
            return this.getThemeSchema();
        }
        onConfigSave(config) {
            this.tag = config;
            this.onUpdateBlock();
        }
        async edit() {
            // this.vStackTable.visible = false
        }
        async confirm() {
            this.onUpdateBlock();
            // this.vStackTable.visible = true
        }
        async discard() {
            // this.vStackTable.visible = true
        }
        async config() { }
        getPropertiesSchema(readOnly) {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    apiEndpoint: {
                        type: 'string',
                        title: 'API Endpoint',
                        required: true
                    },
                    options: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string',
                                required: true
                            },
                            description: {
                                type: 'string'
                            },
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
                    }
                }
            };
            return propertiesSchema;
        }
        getThemeSchema(readOnly) {
            const themeSchema = {
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
                    paginationActiveBackgoundColor: {
                        type: 'string',
                        format: 'color'
                    },
                    paginationActiveFontColor: {
                        type: 'string',
                        format: 'color'
                    },
                    width: {
                        type: 'string'
                    },
                    height: {
                        type: 'string'
                    }
                }
            };
            return themeSchema;
        }
        getEmbedderActions() {
            return this._getActions(this.getPropertiesSchema(true), this.getThemeSchema(true));
        }
        getActions() {
            return this._getActions(this.getPropertiesSchema(), this.getThemeSchema());
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData) {
                                    builder.setData(userInputData);
                                }
                                this.setData(userInputData);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData) {
                                    builder.setData(this._oldData);
                                }
                                this.setData(this._oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/apiEndpoint',
                                title: 'API Endpoint'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/title'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/description'
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
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                this.oldTag = Object.assign({}, this.tag);
                                this.setTag(userInputData);
                                if (builder)
                                    builder.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.setTag(this.oldTag);
                                if (builder)
                                    builder.setTag(this.oldTag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            return actions;
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
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (this.vStackTable) {
                this.vStackTable.style.boxShadow = ((_a = this.tag) === null || _a === void 0 ? void 0 : _a.darkShadow) ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            this.updateStyle('--text-primary', (_b = this.tag) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag) === null || _c === void 0 ? void 0 : _c.backgroundColor);
            this.updateStyle('--colors-info-main', (_d = this.tag) === null || _d === void 0 ? void 0 : _d.progressBackgroundColor);
            this.updateStyle('--colors-success-light', ((_e = this.tag) === null || _e === void 0 ? void 0 : _e.tableFooterBackgroundColor) || '#ffeceb');
            this.updateStyle('--colors-success-contrast_text', (_f = this.tag) === null || _f === void 0 ? void 0 : _f.tableFooterFontColor);
            this.updateStyle('--colors-success-dark', ((_g = this.tag) === null || _g === void 0 ? void 0 : _g.paginationActiveBackgoundColor) || '#e47872');
            this.updateStyle('--colors-secondary-contrast_text', (_h = this.tag) === null || _h === void 0 ? void 0 : _h.paginationActiveFontColor);
        }
        onUpdateBlock() {
            this.renderTable();
            this.updateTheme();
        }
        async updateTableData() {
            if (this.inputSearch) {
                this.inputSearch.value = '';
            }
            if (this._data.apiEndpoint === this.apiEndpoint) {
                this.onUpdateBlock();
                return;
            }
            const apiEndpoint = this._data.apiEndpoint;
            this.apiEndpoint = apiEndpoint;
            if (apiEndpoint) {
                this.loadingElm.visible = true;
                const data = await index_1.callAPI(apiEndpoint);
                this.loadingElm.visible = false;
                if (data && this._data.apiEndpoint === apiEndpoint) {
                    this.tableData = data;
                    this.onUpdateBlock();
                    return;
                }
            }
            this.tableData = [];
            this.onUpdateBlock();
        }
        renderTable(resize) {
            var _a;
            if (!this.tableElm && this._data.options)
                return;
            const { title, description, columns } = this._data.options;
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
                        title: title || ((_a = columns[name]) === null || _a === void 0 ? void 0 : _a.title) || name,
                        fieldName: name,
                        textAlign: alignContent,
                        onRenderCell: function (source, data, rowData) {
                            const isNumber = typeof data === 'number';
                            const hStack = new components_3.HStack(undefined, {
                                width: '100%',
                                gap: 5,
                                wrap: type === 'progressbar' ? undefined : 'wrap',
                                verticalAlignment: 'center'
                            });
                            if (type === 'progressbar') {
                                new components_3.Progress(hStack, {
                                    width: 60,
                                    height: 8,
                                    strokeWidth: 8,
                                    strokeColor: Theme.colors.info.main,
                                    percent: (data / totalValue) * 100
                                });
                            }
                            new components_3.Label(hStack, {
                                caption: isNumber && numberFormat ? index_1.formatNumberByFormat(data, numberFormat, true) :
                                    isNumber ? index_1.formatNumberWithSeparators(data) : data,
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
            this.updateTheme();
            super.init();
            this.classList.add(index_css_1.tableStyle);
            const { width, height, darkShadow } = this.tag || {};
            this.width = width || 700;
            this.height = height || 500;
            this.maxWidth = '100%';
            this.vStackTable.style.boxShadow = darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
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
        components_3.observable()
    ], ScomTable.prototype, "totalPage", void 0);
    ScomTable = __decorate([
        components_3.customModule,
        components_3.customElements('i-scom-table')
    ], ScomTable);
    exports.default = ScomTable;
});
