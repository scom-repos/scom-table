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
define("@scom/scom-table/global/utils.ts", ["require", "exports", "@ijstech/eth-wallet", "@ijstech/components"], function (require, exports, eth_wallet_1, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatNumberByFormat = exports.formatNumber = exports.isNumeric = void 0;
    const isNumeric = (value) => {
        if (value instanceof eth_wallet_1.BigNumber) {
            return !value.isNaN() && value.isFinite();
        }
        if (typeof value === 'string') {
            const parsed = new eth_wallet_1.BigNumber(value);
            return !parsed.isNaN() && parsed.isFinite();
        }
        return !isNaN(value) && isFinite(value);
    };
    exports.isNumeric = isNumeric;
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${components_1.FormatUtils.formatNumber(num, { decimalFigures: 2 })}%`;
        }
        if (format) {
            return (0, exports.formatNumberByFormat)(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: decimals, shortScale: true, roundingMethod: 'round' });
        }
        if (absNum < 0.0000001) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 0 });
        }
        if (absNum < 0.00001) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 6 });
        }
        if (absNum < 1) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 4 });
        }
        return components_1.FormatUtils.formatNumber(num, { decimalFigures: 2 });
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        if (!format)
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 0 });
        const decimalFigures = format.split('.')[1] ? format.split('.')[1].length : 0;
        if (format.includes('%')) {
            return components_1.FormatUtils.formatNumber((num * 100), { decimalFigures }) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = components_1.FormatUtils.formatNumber(num, { decimalFigures });
        if (separators && !format.includes('.ma')) {
            return `${currencySymbol}${roundedNum}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = (0, exports.formatNumber)(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
});
define("@scom/scom-table/global/index.ts", ["require", "exports", "@scom/scom-table/global/interfaces.ts", "@scom/scom-table/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-table/global/index.ts'/> 
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-table/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tableStyle = exports.textStyle = exports.containerStyle = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    exports.containerStyle = components_2.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        background: 'var(--custom-background-color, var(--background-main))'
    });
    exports.textStyle = components_2.Styles.style({
        color: 'var(--custom-text-color, var(--text-primary))'
    });
    exports.tableStyle = components_2.Styles.style({
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
define("@scom/scom-table/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_3.application.currentModuleDir;
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
            "mode": "Live",
            "dataSource": "Dune",
            "queryId": "2030664",
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
    function visualizationOptions(columns) {
        return {
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
                                enum: columns,
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
                                    'progressbar',
                                    'action',
                                    'truncate'
                                ]
                            },
                            actions: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        caption: {
                                            type: 'string',
                                            default: ''
                                        },
                                        colorType: {
                                            type: 'string',
                                            enum: [
                                                'primary',
                                                'success',
                                                'danger',
                                                'warning',
                                                'secondary',
                                                'info'
                                            ],
                                            default: 'primary'
                                        }
                                    }
                                }
                            },
                            numberFormat: {
                                type: 'string'
                            },
                            dateFormat: {
                                type: 'string'
                            },
                            dateType: {
                                type: 'string'
                            },
                            isHidden: {
                                type: 'boolean'
                            }
                        }
                    }
                },
                fixedRowCount: {
                    type: 'number',
                    title: 'Row count',
                }
            }
        };
    }
    const theme = {
        darkShadow: {
            type: 'boolean'
        },
        customFontColor: {
            type: 'boolean'
        },
        fontColor: {
            type: 'string',
            format: 'color'
        },
        customBackgroundColor: {
            type: 'boolean'
        },
        backgroundColor: {
            type: 'string',
            format: 'color'
        },
        progressBackgroundColor: {
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
        height: {
            type: 'string'
        }
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/customFontColor'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/fontColor',
                                rule: {
                                    effect: 'ENABLE',
                                    condition: {
                                        scope: '#/properties/customFontColor',
                                        schema: {
                                            const: true
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/customBackgroundColor'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/backgroundColor',
                                rule: {
                                    effect: 'ENABLE',
                                    condition: {
                                        scope: '#/properties/customBackgroundColor',
                                        schema: {
                                            const: true
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'Group',
                        label: 'Header',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/headerBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/headerFontColor'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'Group',
                        label: 'Footer',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/footerBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/footerFontColor'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'Group',
                        label: 'Pagination',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/paginationActiveBackgoundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/paginationActiveFontColor'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/progressBackgroundColor'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/height'
                            }
                        ]
                    },
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/darkShadow'
                            }
                        ]
                    }
                ]
            }
        ]
    };
    function getBuilderSchema(columns) {
        return {
            dataSchema: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    ...theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/title'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/description'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            },
            advanced: {
                dataSchema: {
                    type: 'object',
                    properties: {
                        options: visualizationOptions(columns)
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
                                    scope: '#/properties/options/properties/fixedRowCount'
                                }
                            ]
                        },
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
            }
        };
    }
    exports.getBuilderSchema = getBuilderSchema;
    function getEmbedderSchema() {
        return {
            dataSchema: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    ...theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/title'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/description'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            }
        };
    }
    exports.getEmbedderSchema = getEmbedderSchema;
});
define("@scom/scom-table/dataOptionsForm.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomTableDataOptionsForm = class ScomTableDataOptionsForm extends components_4.Module {
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
            this.formEl.setFormData(JSON.parse(JSON.stringify(this._data)));
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
        components_4.customModule,
        (0, components_4.customElements)('i-scom-table-data-options-form')
    ], ScomTableDataOptionsForm);
    exports.default = ScomTableDataOptionsForm;
});
define("@scom/scom-table/dts/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-table/dts/index.ts'/> 
    exports.default = `/// <amd-module name="@scom/scom-table/global/interfaces.ts" />
declare module "@scom/scom-table/global/interfaces.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    import { ModeType } from "@scom/scom-chart-data-source-setup";
    export interface ITableOptions {
        columns: {
            name: string;
            title?: string;
            alignContent?: string;
            isHidden?: boolean;
            numberFormat?: string;
            dateFormat?: string;
            dateType?: string;
            actions?: {
                caption?: string;
                colorType?: string;
            }[];
            type?: 'normal' | 'progressbar' | 'action' | 'truncate';
            coloredPositiveValues?: boolean;
            coloredNegativeValues?: boolean;
        }[];
        fixedRowCount?: number;
    }
    export interface ITableConfig {
        dataSource: string;
        queryId?: string;
        apiEndpoint?: string;
        title: string;
        description?: string;
        options: ITableOptions;
        file?: {
            cid: string;
            name: string;
        };
        mode: ModeType;
    }
    export interface IFormatNumberOptions {
        precision?: number;
        roundingMode?: BigNumber.RoundingMode;
    }
}
/// <amd-module name="@scom/scom-table/global/utils.ts" />
declare module "@scom/scom-table/global/utils.ts" {
    import { BigNumber } from '@ijstech/eth-wallet';
    export const isNumeric: (value: string | number | BigNumber) => boolean;
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
}
/// <amd-module name="@scom/scom-table/global/index.ts" />
declare module "@scom/scom-table/global/index.ts" {
    export * from "@scom/scom-table/global/interfaces.ts";
    export * from "@scom/scom-table/global/utils.ts";
}
/// <amd-module name="@scom/scom-table/index.css.ts" />
declare module "@scom/scom-table/index.css.ts" {
    export const containerStyle: string;
    export const textStyle: string;
    export const tableStyle: string;
}
/// <amd-module name="@scom/scom-table/assets.ts" />
declare module "@scom/scom-table/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-table/data.json.ts" />
declare module "@scom/scom-table/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            mode: string;
            dataSource: string;
            queryId: string;
            options: {
                columns: ({
                    name: string;
                    title: string;
                    type?: undefined;
                    numberFormat?: undefined;
                } | {
                    name: string;
                    type: string;
                    title: string;
                    numberFormat: string;
                } | {
                    name: string;
                    title: string;
                    numberFormat: string;
                    type?: undefined;
                })[];
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-table/formSchema.ts" />
declare module "@scom/scom-table/formSchema.ts" {
    export function getBuilderSchema(columns: string[]): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                progressBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerFontColor: {
                    type: string;
                    format: string;
                };
                footerBackgroundColor: {
                    type: string;
                    format: string;
                };
                footerFontColor: {
                    type: string;
                    format: string;
                };
                paginationActiveBackgoundColor: {
                    type: string;
                    format: string;
                };
                paginationActiveFontColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                };
                description: {
                    type: string;
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                        label?: undefined;
                    } | {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    })[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
        advanced: {
            dataSchema: {
                type: string;
                properties: {
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            columns: {
                                type: string;
                                required: boolean;
                                items: {
                                    type: string;
                                    properties: {
                                        name: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        title: {
                                            type: string;
                                        };
                                        alignContent: {
                                            type: string;
                                            enum: string[];
                                        };
                                        type: {
                                            type: string;
                                            enum: string[];
                                        };
                                        actions: {
                                            type: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    caption: {
                                                        type: string;
                                                        default: string;
                                                    };
                                                    colorType: {
                                                        type: string;
                                                        enum: string[];
                                                        default: string;
                                                    };
                                                };
                                            };
                                        };
                                        numberFormat: {
                                            type: string;
                                        };
                                        dateFormat: {
                                            type: string;
                                        };
                                        dateType: {
                                            type: string;
                                        };
                                        isHidden: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                            fixedRowCount: {
                                type: string;
                                title: string;
                            };
                        };
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: ({
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                } | {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                })[];
            };
        };
    };
    export function getEmbedderSchema(): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                progressBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerFontColor: {
                    type: string;
                    format: string;
                };
                footerBackgroundColor: {
                    type: string;
                    format: string;
                };
                footerFontColor: {
                    type: string;
                    format: string;
                };
                paginationActiveBackgoundColor: {
                    type: string;
                    format: string;
                };
                paginationActiveFontColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                };
                description: {
                    type: string;
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                        label?: undefined;
                    } | {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    })[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
    };
}
/// <amd-module name="@scom/scom-table/dataOptionsForm.tsx" />
declare module "@scom/scom-table/dataOptionsForm.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    interface IData {
        options: any;
    }
    interface ScomTableDataOptionsFormElement extends ControlElement {
        dataSchema?: string;
        uiSchema?: string;
        options: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-table-data-options-form"]: ScomTableDataOptionsFormElement;
            }
        }
    }
    export default class ScomTableDataOptionsForm extends Module {
        private formEl;
        private _dataSchema;
        private _uiSchema;
        private _data;
        constructor(parent?: Container, options?: any);
        get data(): IData;
        set data(value: IData);
        refreshFormData(): Promise<IData>;
        private renderUI;
        private onInputChanged;
        onCustomInputChanged(data: IData): Promise<void>;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-table/dts/index.ts" />
declare module "@scom/scom-table/dts/index.ts" {
    const _default_2: "/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            actions?: {\n                caption?: string;\n                colorType?: string;\n            }[];\n            type?: 'normal' | 'progressbar' | 'action' | 'truncate';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n        fixedRowCount?: number;\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        actions: {\n                                            type: string;\n                                            items: {\n                                                type: string;\n                                                properties: {\n                                                    caption: {\n                                                        type: string;\n                                                        default: string;\n                                                    };\n                                                    colorType: {\n                                                        type: string;\n                                                        enum: string[];\n                                                        default: string;\n                                                    };\n                                                };\n                                            };\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                            fixedRowCount: {\n                                type: string;\n                                title: string;\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: ({\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                } | {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                })[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            actions?: {\n                caption?: string;\n                colorType?: string;\n            }[];\n            type?: 'normal' | 'progressbar' | 'action' | 'truncate';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        actions: {\n                                            type: string;\n                                            items: {\n                                                type: string;\n                                                properties: {\n                                                    caption: {\n                                                        type: string;\n                                                        default: string;\n                                                    };\n                                                    colorType: {\n                                                        type: string;\n                                                        enum: string[];\n                                                        default: string;\n                                                    };\n                                                };\n                                            };\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            actions?: {\n                caption?: string;\n                colorType?: string;\n            }[];\n            type?: 'normal' | 'progressbar' | 'action' | 'truncate';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        actions: {\n                                            type: string;\n                                            items: {\n                                                type: string;\n                                                properties: {\n                                                    caption: {\n                                                        type: string;\n                                                        default: string;\n                                                    };\n                                                    colorType: {\n                                                        type: string;\n                                                        enum: string[];\n                                                        default: string;\n                                                    };\n                                                };\n                                            };\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            buttons?: any[];\n            type?: 'normal' | 'progressbar' | 'action';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        buttons: {\n                                            type: string;\n                                            items: {\n                                                type: string;\n                                                properties: {\n                                                    caption: {\n                                                        type: string;\n                                                    };\n                                                    colorType: {\n                                                        type: string;\n                                                        enum: string[];\n                                                    };\n                                                };\n                                            };\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            type?: 'normal' | 'progressbar';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            type?: 'normal' | 'progressbar';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            type?: 'normal' | 'progressbar';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private copyText;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    type onConfigChanged = (prop: string, value: any, mediaQueryProp?: string) => void;\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string, onChanged: onConfigChanged) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string, onChanged: onConfigChanged): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private copyText;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    type renderCallback = (fieldName: string, data: any) => any;\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n        onCellRender?: renderCallback;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    type onConfigChanged = (prop: string, value: any, mediaQueryProp?: string) => void;\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string, onChanged: onConfigChanged) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private totalRowCount;\n        private _data;\n        tag: any;\n        onCellRender: renderCallback;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string, onChanged: onConfigChanged): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private fetchPaginatedData;\n        private renderTable;\n        private copyText;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n";
    export default _default_2;
}
/// <amd-module name="@scom/scom-table" />
declare module "@scom/scom-table" {
    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';
    import { ITableConfig } from "@scom/scom-table/global/index.ts";
    type renderCallback = (fieldName: string, data: any) => any;
    interface ScomTableElement extends ControlElement {
        lazyLoad?: boolean;
        data: ITableConfig;
        onCellRender?: renderCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-table']: ScomTableElement;
            }
        }
    }
    type onConfigChanged = (prop: string, value: any, mediaQueryProp?: string) => void;
    interface ICustomWidget {
        showConfigurator: (parent: Modal, prop: string, onChanged: onConfigChanged) => void;
        register: () => {
            types: string;
            defaultData: ITableConfig;
        };
    }
    export default class ScomTable extends Module implements ICustomWidget {
        private vStackTable;
        private vStackInfo;
        private hStackFooter;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private pnlTable;
        private tableElm;
        private columnNames;
        private tableData;
        private paginationElm;
        private lbTotal;
        private inputSearch;
        private totalPage;
        private pageNumber;
        private itemStart;
        private itemEnd;
        private totalRowCount;
        private _data;
        tag: any;
        onCellRender: renderCallback;
        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;
        constructor(parent?: Container, options?: ScomTableElement);
        showConfigurator(parent: Modal, prop: string, onChanged: onConfigChanged): void;
        private onConfigSave;
        register(): {
            types: string;
            defaultData: ITableConfig;
        };
        private getData;
        private setData;
        private getTag;
        private setTag;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            })[];
            getData: any;
            setData: (data: ITableConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            })[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private get dataListFiltered();
        private get dataListPagination();
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateTableData;
        private renderSnapshotData;
        private renderLiveData;
        private fetchPaginatedData;
        private renderTable;
        private copyText;
        private updateTableUI;
        private onSelectIndex;
        private onSearch;
        resize(): void;
        init(): Promise<void>;
        render(): any;
    }
}
`;
});
define("@scom/scom-table", ["require", "exports", "@ijstech/components", "@scom/scom-table/global/index.ts", "@scom/scom-table/index.css.ts", "@scom/scom-table/assets.ts", "@scom/scom-table/data.json.ts", "@scom/scom-chart-data-source-setup", "@scom/scom-table/formSchema.ts", "@scom/scom-table/dataOptionsForm.tsx", "@scom/scom-table/dts/index.ts"], function (require, exports, components_5, index_1, index_css_1, assets_1, data_json_1, scom_chart_data_source_setup_1, formSchema_1, dataOptionsForm_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_5.Styles.Theme.ThemeVars;
    const currentTheme = components_5.Styles.Theme.currentTheme;
    const pageSize = 25;
    const DefaultData = {
        dataSource: scom_chart_data_source_setup_1.DataSource.Dune,
        queryId: '',
        apiEndpoint: '',
        title: '',
        options: undefined,
        mode: scom_chart_data_source_setup_1.ModeType.LIVE
    };
    let ScomTable = class ScomTable extends components_5.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.columnNames = [];
            this.tableData = [];
            this.totalPage = 0;
            this.pageNumber = 0;
            this.itemStart = 0;
            this.itemEnd = pageSize;
            this.totalRowCount = 0;
            this._data = DefaultData;
            this.tag = {};
        }
        showConfigurator(parent, prop, onChanged) {
            const props = this._getDesignPropValue('data');
            const builderTarget = this.getConfigurators().find((conf) => conf.target === 'Builders');
            const dataAction = builderTarget?.getActions().find((action) => action.name === prop);
            const self = this;
            if (dataAction) {
                const control = dataAction.customUI.render(props, (result, data) => {
                    parent.visible = false;
                    if (result) {
                        self.onConfigSave(data);
                        if (typeof onChanged === 'function')
                            onChanged('data', data);
                    }
                });
                parent.item = control;
                parent.visible = true;
            }
        }
        onConfigSave(data) {
            this.setData({ ...data });
        }
        register() {
            return { types: index_2.default, defaultData: data_json_1.default.defaultBuilderData };
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.loadingElm.visible = true;
            await this.updateTableData();
            await this.onUpdateBlock();
            this.loadingElm.visible = false;
        }
        getTag() {
            return this.tag;
        }
        async setTag(value, fromParent) {
            if (fromParent) {
                this.tag.parentFontColor = value.fontColor;
                this.tag.parentCustomFontColor = value.customFontColor;
                this.tag.parentBackgroundColor = value.backgroundColor;
                this.tag.parentCustomBackgroundColor = value.customBackgoundColor;
                this.tag.customWidgetsBackground = value.customWidgetsBackground;
                this.tag.widgetsBackground = value.widgetsBackground;
                this.tag.customWidgetsColor = value.customWidgetsColor;
                this.tag.widgetsColor = value.widgetsColor;
                this.onUpdateBlock();
                return;
            }
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            if (this.tag?.height !== undefined) {
                this.height = this.tag.height;
            }
            if (this.tag?.width !== undefined) {
                this.width = this.tag.width;
            }
            this.onUpdateBlock();
        }
        _getActions(dataSchema, uiSchema, advancedSchema) {
            const builderSchema = (0, formSchema_1.getBuilderSchema)(this.columnNames);
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = DefaultData;
                        let oldTag = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { title, description, ...themeSettings } = userInputData;
                                const generalSettings = {
                                    title,
                                    description,
                                };
                                if (generalSettings) {
                                    if (advancedSchema) {
                                        this._data = { ...this._data, ...generalSettings };
                                    }
                                    else {
                                        this._data = { ...generalSettings };
                                    }
                                }
                                if (builder?.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder?.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                            },
                            undo: () => {
                                if (advancedSchema)
                                    oldData = { ...oldData, options: this._data.options };
                                if (builder?.setData)
                                    builder.setData(oldData);
                                this.setData(oldData);
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder?.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: dataSchema,
                    userInputUISchema: uiSchema
                },
                {
                    name: 'Data',
                    icon: 'database',
                    command: (builder, userInputData) => {
                        let _oldData = DefaultData;
                        return {
                            execute: async () => {
                                _oldData = { ...this._data };
                                if (userInputData?.mode)
                                    this._data.mode = userInputData?.mode;
                                if (userInputData?.file)
                                    this._data.file = userInputData?.file;
                                if (userInputData?.dataSource)
                                    this._data.dataSource = userInputData?.dataSource;
                                if (userInputData?.queryId)
                                    this._data.queryId = userInputData?.queryId;
                                if (userInputData?.apiEndpoint)
                                    this._data.apiEndpoint = userInputData?.apiEndpoint;
                                if (userInputData?.options !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder?.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (builder?.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    customUI: {
                        render: (data, onConfirm, onChange) => {
                            const vstack = new components_5.VStack(null, { gap: '1rem' });
                            const dataSourceSetup = new scom_chart_data_source_setup_1.default(null, {
                                ...this._data,
                                chartData: JSON.stringify(this.tableData),
                                onCustomDataChanged: async (dataSourceSetupData) => {
                                    if (onChange) {
                                        onChange(true, {
                                            ...this._data,
                                            ...dataSourceSetupData
                                        });
                                    }
                                }
                            });
                            const hstackBtnConfirm = new components_5.HStack(null, {
                                verticalAlignment: 'center',
                                horizontalAlignment: 'end'
                            });
                            const button = new components_5.Button(null, {
                                caption: 'Confirm',
                                width: 'auto',
                                height: 40,
                                font: { color: Theme.colors.primary.contrastText },
                                padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' },
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
                                    onChange(true, {
                                        ...this._data,
                                        ...optionsFormData,
                                        ...dataSourceSetup.data
                                    });
                                };
                            }
                            button.onClick = async () => {
                                const { dataSource, file, mode } = dataSourceSetup.data;
                                if (mode === scom_chart_data_source_setup_1.ModeType.LIVE && !dataSource)
                                    return;
                                if (mode === scom_chart_data_source_setup_1.ModeType.SNAPSHOT && !file?.cid)
                                    return;
                                if (onConfirm) {
                                    const optionsFormData = await dataOptionsForm.refreshFormData();
                                    onConfirm(true, {
                                        ...this._data,
                                        ...optionsFormData,
                                        ...dataSourceSetup.data
                                    });
                                }
                            };
                            return vstack;
                        }
                    }
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
                        const builderSchema = (0, formSchema_1.getBuilderSchema)(this.columnNames);
                        const dataSchema = builderSchema.dataSchema;
                        const uiSchema = builderSchema.uiSchema;
                        const advancedSchema = builderSchema.advanced.dataSchema;
                        return this._getActions(dataSchema, uiSchema, advancedSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData({ ...defaultData, ...data });
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        const embedderSchema = (0, formSchema_1.getEmbedderSchema)();
                        const dataSchema = embedderSchema.dataSchema;
                        const uiSchema = embedderSchema.uiSchema;
                        return this._getActions(dataSchema, uiSchema);
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
                            let resultingData = {
                                ...self._data,
                                ...newData
                            };
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
            const searchVal = (this.inputSearch?.value || '').toLowerCase();
            if (searchVal) {
                const cols = this._data?.options?.columns.filter(v => !v.isHidden);
                return this.tableData.filter(v => {
                    for (const col of cols) {
                        const val = v[col.name];
                        if (val?.toString().toLowerCase().includes(searchVal)) {
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
            if (this.vStackTable) {
                this.vStackTable.style.boxShadow = this.tag?.darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            const tags = this.tag || {};
            this.updateStyle('--custom-text-color', tags.customFontColor ? tags.fontColor : tags.customWidgetsColor ? tags.widgetsColor : tags.parentCustomFontColor ? tags.parentFontColor : '');
            this.updateStyle('--custom-background-color', tags.customBackgroundColor ? tags.backgroundColor : tags.customWidgetsBackground ? tags.widgetsBackground : tags.parentCustomBackgroundColor ? tags.parentBackgroundColor : '');
            this.updateStyle('--colors-info-main', tags.progressBackgroundColor);
            this.updateStyle('--colors-success-light', tags.footerBackgroundColor || '#ffeceb');
            this.updateStyle('--colors-success-contrast_text', tags.footerFontColor);
            this.updateStyle('--colors-success-dark', tags.paginationActiveBackgoundColor || '#e47872');
            this.updateStyle('--colors-secondary-contrast_text', tags.paginationActiveFontColor);
            this.updateStyle('--colors-info-light', tags.headerBackgroundColor || (this.designMode ? 'transparent' : '#ffeceb'));
            this.updateStyle('--colors-info-contrast_text', tags.headerFontColor || (this.designMode ? currentTheme.text.secondary : currentTheme.colors.info.contrastText));
        }
        async onUpdateBlock() {
            await this.renderTable();
            this.updateTheme();
        }
        async updateTableData() {
            if (this.inputSearch) {
                if (!this.inputSearch.isConnected)
                    await this.inputSearch.ready();
                this.inputSearch.value = '';
            }
            const columns = this._data?.options?.columns || [];
            this.columnNames = [...columns].map(v => v.name);
            if (this.designMode) {
                this.tableData = [];
                this.onUpdateBlock();
                return;
            }
            if (this._data?.mode === scom_chart_data_source_setup_1.ModeType.SNAPSHOT)
                await this.renderSnapshotData();
            else
                await this.renderLiveData();
        }
        async renderSnapshotData() {
            if (this._data.file?.cid) {
                try {
                    const data = await (0, scom_chart_data_source_setup_1.fetchContentByCID)(this._data.file.cid);
                    if (data) {
                        const { metadata, rows } = data;
                        this.tableData = rows || [];
                        this.totalRowCount = this.tableData.length;
                        this.columnNames = metadata?.column_names || [];
                        return;
                    }
                }
                catch { }
            }
            this.tableData = [];
            this.columnNames = [];
            this.totalRowCount = 0;
        }
        async renderLiveData() {
            const dataSource = this._data.dataSource;
            if (dataSource) {
                try {
                    const data = await (0, scom_chart_data_source_setup_1.callAPI)({
                        dataSource,
                        queryId: this._data.queryId,
                        apiEndpoint: this._data.apiEndpoint
                    });
                    if (data) {
                        const { metadata, rows } = data;
                        this.tableData = rows;
                        this.columnNames = metadata?.column_names || [];
                        this.totalRowCount = metadata?.total_row_count || 0;
                        return;
                    }
                }
                catch { }
            }
            this.tableData = [];
            this.columnNames = [];
            this.totalRowCount = 0;
        }
        async fetchPaginatedData() {
            const dataSource = this._data.dataSource;
            let result = [];
            this.totalRowCount = 0;
            if (dataSource) {
                try {
                    const data = await (0, scom_chart_data_source_setup_1.callAPI)({
                        dataSource,
                        queryId: this._data.queryId,
                        apiEndpoint: this._data.apiEndpoint,
                        limit: this._data?.options?.fixedRowCount,
                        offset: this.pageNumber - 1
                    });
                    const { metadata, rows } = data;
                    result = rows || [];
                    this.totalRowCount = metadata?.total_row_count || 0;
                }
                catch { }
            }
            return result;
        }
        async renderTable(resize) {
            if ((!this.tableElm && this._data.options) || !this._data.options)
                return;
            const { title = '', description = '' } = this._data;
            const { columns } = this._data?.options || {};
            if (!this.lbTitle.isConnected)
                await this.lbTitle.ready();
            this.lbTitle.caption = title;
            if (!this.lbDescription.isConnected)
                await this.lbDescription.ready();
            this.lbDescription.caption = description;
            this.lbDescription.visible = !!description;
            this.pnlTable.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
            if (!columns?.length)
                return;
            if (!resize) {
                let cols = [];
                let self = this;
                const _columns = columns.filter(v => !v.isHidden);
                for (const column of _columns) {
                    const { name, title, alignContent, type, numberFormat, dateFormat, dateType, actions = [], coloredNegativeValues, coloredPositiveValues } = column;
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
                        title: title || '',
                        fieldName: name,
                        textAlign: alignContent,
                        onRenderCell: function (source, data, rowData) {
                            let result = null;
                            if (typeof self.onCellRender === 'function' && !self.designMode) {
                                result = self.onCellRender(name, data);
                                if (result)
                                    return result;
                            }
                            const isNumber = (0, index_1.isNumeric)(data);
                            const hStack = new components_5.HStack(undefined, {
                                width: '100%',
                                gap: 5,
                                wrap: type === 'progressbar' ? undefined : 'wrap',
                                verticalAlignment: 'center'
                            });
                            if (type === 'action') {
                                for (const action of actions) {
                                    const colorType = action.colorType ?? 'primary';
                                    new components_5.Button(hStack, {
                                        caption: action.caption,
                                        padding: { top: '0.4375rem', bottom: '0.4375rem', left: '0.625rem', right: '0.625rem' },
                                        border: { radius: '0.5rem' },
                                        font: { weight: 500, color: Theme.colors[colorType].contrastText, size: '0.875rem', transform: 'capitalize' },
                                        boxShadow: 'none',
                                        background: { color: Theme.colors[colorType].main }
                                    });
                                }
                            }
                            else {
                                if (type === 'progressbar') {
                                    new components_5.Progress(hStack, {
                                        width: 60,
                                        height: 8,
                                        strokeWidth: 8,
                                        strokeColor: Theme.colors.info.main,
                                        percent: totalValue ? (data / totalValue) * 100 : 0
                                    });
                                }
                                let caption = '';
                                const hasTruncate = type === 'truncate' && (data || '').length > 6;
                                if (hasTruncate) {
                                    caption = components_5.FormatUtils.truncateWalletAddress(data);
                                }
                                else {
                                    caption = dateFormat ? (0, components_5.moment)(data, dateType).format(dateFormat) : isNumber && numberFormat ? (0, index_1.formatNumberByFormat)(data, numberFormat, true) :
                                        isNumber ? components_5.FormatUtils.formatNumber(data, { decimalFigures: 0 }) : (data ?? '--');
                                }
                                const lb = new components_5.Label(hStack, {
                                    font: { size: '0.75rem' },
                                    caption
                                });
                                lb.classList.add(index_css_1.textStyle);
                                if (hasTruncate) {
                                    new components_5.Icon(hStack, {
                                        height: '1.5rem',
                                        width: '1.5rem',
                                        padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' },
                                        name: 'copy',
                                        cursor: 'pointer',
                                        onClick: (target) => self.copyText(target, data)
                                    });
                                }
                            }
                            return hStack;
                        }
                    };
                    cols.push(col);
                }
                this.tableElm.columns = cols;
                this.pageNumber = 1;
                this.updateTableUI();
            }
            if (!this.designMode) {
                this.tableElm.height = `${this.pnlTable.offsetHeight - (this.hStackFooter.offsetHeight + 20)}px`;
            }
        }
        copyText(target, value) {
            components_5.application.copyToClipboard(value || "");
            target.name = "check-circle";
            target.fill = Theme.colors.success.main;
            setTimeout(() => {
                target.name = 'copy';
                target.fill = Theme.text.primary;
            }, 1600);
        }
        async updateTableUI() {
            const { options, mode } = this._data || {};
            const fixedRowCount = options?.fixedRowCount;
            if (fixedRowCount && mode !== scom_chart_data_source_setup_1.ModeType.SNAPSHOT) {
                this.loadingElm.visible = true;
                if (this.tableElm)
                    this.tableElm.data = await this.fetchPaginatedData();
                this.totalPage = Math.ceil(this.totalRowCount / fixedRowCount);
                this.loadingElm.visible = false;
            }
            else {
                this.totalPage = Math.ceil(this.dataListFiltered.length / pageSize);
                if (this.tableElm)
                    this.tableElm.data = this.dataListPagination;
            }
            const hasData = this.totalRowCount > 0;
            if (!this.lbTotal.isConnected)
                await this.lbTotal.ready();
            this.lbTotal.visible = hasData;
            this.inputSearch.visible = hasData;
            this.lbTotal.caption = `${this.totalRowCount} ${this.totalRowCount === 1 ? 'row' : 'rows'}`;
            this.paginationElm.visible = this.totalPage > 1;
        }
        onSelectIndex() {
            this.pageNumber = this.paginationElm.currentPage;
            if (!this._data?.options?.fixedRowCount) {
                this.itemStart = (this.pageNumber - 1) * pageSize;
                this.itemEnd = this.itemStart + pageSize;
            }
            this.updateTableUI();
        }
        onSearch() {
            this.pageNumber = 1;
            this.updateTableUI();
        }
        resize() {
            this.renderTable(true);
        }
        async init() {
            super.init();
            this.classList.add(index_css_1.tableStyle);
            this.onCellRender = this.getAttribute('onCellRender', true) || this.onCellRender;
            this.updateTheme();
            this.setTag({
                progressBackgroundColor: currentTheme.colors.info.main,
                footerBackgroundColor: currentTheme.colors.success.light || '#ffeceb',
                footerFontColor: currentTheme.colors.success.contrastText,
                paginationActiveBackgoundColor: currentTheme.colors.success.dark || '#e47872',
                paginationActiveFontColor: currentTheme.colors.secondary.contrastText,
                headerBackgroundColor: this.designMode ? 'transparent' : currentTheme.colors.info.light || '#ffeceb',
                headerFontColor: this.designMode ? currentTheme.text.secondary : currentTheme.colors.info.contrastText,
                width: '100%',
                boxShadow: false
            });
            this.maxWidth = '100%';
            this.vStackTable.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data) {
                    this.setData(data);
                }
            }
            this.executeReadyCallback();
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.resize();
                }, 300);
            });
        }
        render() {
            return (this.$render("i-vstack", { id: "vStackTable", position: "relative", height: "100%", class: index_css_1.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay", minHeight: 100 },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true }, class: index_css_1.textStyle }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, class: index_css_1.textStyle })),
                this.$render("i-panel", { id: "pnlTable" },
                    this.$render("i-panel", { height: "inherit" },
                        this.$render("i-table", { id: "tableElm", width: "100%", height: "100%" }),
                        this.$render("i-hstack", { id: "hStackFooter", gap: 10, margin: { top: 16 }, horizontalAlignment: "start", verticalAlignment: "center", wrap: "wrap" },
                            this.$render("i-label", { id: "lbTotal", visible: false, background: { color: Theme.colors.success.light }, padding: { top: 4.5, bottom: 4.5, right: 8, left: 8 }, font: { size: '12px', color: Theme.colors.success.contrastText } }),
                            this.$render("i-input", { id: "inputSearch", visible: false, background: { color: Theme.colors.success.light }, placeholder: "Search", width: 168, height: 'auto', padding: { top: 4, bottom: 4, right: 8, left: 8 }, font: { size: '12px', color: Theme.colors.success.contrastText }, onChanged: this.onSearch }),
                            this.$render("i-pagination", { id: "paginationElm", width: "auto", currentPage: this.pageNumber, totalPages: this.totalPage, onPageChanged: this.onSelectIndex.bind(this) }))))));
        }
    };
    __decorate([
        (0, components_5.observable)()
    ], ScomTable.prototype, "totalPage", void 0);
    ScomTable = __decorate([
        components_5.customModule,
        (0, components_5.customElements)('i-scom-table', {
            icon: 'table',
            className: 'ScomTable',
            props: {
                data: { type: 'object' }
            },
            events: {
                onCellRender: [
                    { name: 'fieldName', type: 'string' },
                    { name: 'data', type: 'any' }
                ]
            }
        })
    ], ScomTable);
    exports.default = ScomTable;
});
