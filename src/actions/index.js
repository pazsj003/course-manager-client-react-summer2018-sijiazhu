import * as constants from "../constants/index"

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
)

export const paragraphTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)

export const widgetNameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        name: newName
    })
)


export const listTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LIST_TEXT_CHANGED,
        id: widgetId,
        listItems: newText
    })
)
export const listOrderChanged = (dispatch, widgetId, neworder) => (
    dispatch({
        type: constants.LIST_ORDER_CHANGED,
        id: widgetId,
        listType: neworder
    })
)
export const imageTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.IMAGE_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)
export const imageURLChanged = (dispatch, widgetId, newURL) => (
    dispatch({
        type: constants.IMAGE_URL_CHANGED,
        id: widgetId,
        src: newURL
    })
)

export const linkTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LINK_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)
export const linkURLChanged = (dispatch, widgetId, newURL) => (
    dispatch({
        type: constants.LINK_URL_CHANGED,
        id: widgetId,
        hrefLink: newURL
    })
)


export const findAllWidgets = dispatch => {
    fetch('https://course-manager-react-sijiazhu.herokuapp.com/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
}

export const findAllWidgetsForTopic = (dispatch,topicId) => {
    fetch(('https://course-manager-react-sijiazhu.herokuapp.com/api/topic/topicID/widget').replace('topicID', topicId))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS_FOR_TOPIC,
            widgets: widgets
        }))
}


export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
)
export const save = (dispatch,topicId )=> (
    console.log("topicId in action "+topicId),
    dispatch({type: constants.SAVE,
        topicId:topicId
    })
)
export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
)

export const moveUp = (widget) => {
    return {
        type: constants.MOVE_UP,
        widget: widget,
        id: widget.id,
        orderList: widget.orderList
    }
}

export const moveDown = (widget) => {
    return {
        type: constants.MOVE_DOWN,
        widget: widget,
        id: widget.id,
        orderList: widget.orderList
    }
}

