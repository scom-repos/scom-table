const visualizationOptions = {
    type: 'object',
    // title: 'Visualization Options',
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
}

export function getBuilderSchema() {
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
    }
}

export function getEmbedderSchema() {
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
    }
}