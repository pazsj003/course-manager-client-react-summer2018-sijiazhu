import * as constants from "../constants/index"

export const widgetReducer = (state = {widgets: [], preview: false}, action) => {
    let newState
    switch (action.type) {

        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            }

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.WIDGET_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget)
                })
            }


        case constants.PARAGRAPH_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }


        case constants.LIST_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listItems = action.listItems
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LIST_ORDER_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }


        case constants.IMAGE_TEXT_CHANGED:

            return {

                widgets: state.widgets.map(widget => {

                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.IMAGE_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.LINK_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LINK_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.hrefLink = action.hrefLink
                    }
                    return Object.assign({}, widget)
                })
            }


        case constants.MOVE_UP:

            newState = {
                widgets: state.widgets.map(widget => {
                    if (widget.orderList === action.orderList - 1) {
                        widget.orderList = action.orderList

                    }
                    if (widget.id === action.id) {
                        if (action.orderList !== 1) {
                            widget.orderList = action.orderList - 1

                        }
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview
            };
            newState.widgets.sort((a, b) => a.orderList - b.orderList);
            return newState;

        case constants.MOVE_DOWN:

            newState = {
                widgets: state.widgets.map(widget => {
                    if (widget.orderList === action.orderList + 1) {
                        widget.orderList = action.orderList

                    }
                    if (widget.id === action.id) {

                        if (action.orderList !== state.widgets.length) {
                            widget.orderList = action.orderList + 1

                        }
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview
            };
            newState.widgets.sort((a, b) => a.orderList - b.orderList);
            return newState;


        case constants.SELECT_WIDGET_TYPE:

            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))
        // fetch('http://localhost:8080/api/widget/save', {
        case constants.SAVE:
            console.log("topicId in reducer "+action.topicId),
            fetch(('http://localhost:8080/api/topic/topic_Id/widget')
                .replace('topic_Id', action.topicId),{
                method: 'POST',
                body: JSON.stringify(state.widgets),
                headers: {
                    'Content-Type': 'application/json'
                }

            });




            return state

        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            newState.widgets.sort((a, b) => a.orderList - b.orderList);
            return newState


        case constants.FIND_ALL_WIDGETS_FOR_TOPIC:
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            newState.widgets.sort((a, b) => a.orderList - b.orderList);
            return newState

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: '',
                        widgetType: 'Paragraph',
                        size: '2',
                        hrefLink: '',
                        src: '',
                        listType: 'unordered',
                        listItems: '',
                        name: 'widget name',
                        orderList: state.widgets.length + 1,

                    }
                ]
            }
        default:
            return state
    }
}