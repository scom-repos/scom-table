function visualizationOptions(columns: string[]) {
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

const theme = {
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
    // width: {
    //   type: 'string'
    // },
    height: {
        type: 'string'
    }
}

const themeUISchema = {
    type: 'Category',
    label: 'Theme',
    elements: [
        {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/darkShadow'
                },
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            scope: '#/properties/fontColor'
                        },
                        {
                            type: 'Control',
                            scope: '#/properties/backgroundColor'
                        },
                        {
                            type: 'Control',
                            scope: '#/properties/progressBackgroundColor'
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
                    type: 'Control',
                    scope: '#/properties/height'
                }
            ]
        }
    ]
}

export function getBuilderSchema(columns: string[]) {
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
    }
}

export function getEmbedderSchema() {
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
    }
}