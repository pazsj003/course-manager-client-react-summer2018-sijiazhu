import React from 'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const Heading = ({widget, preview, headingTextChanged, headingSizeChanged}) => {
    let selectElem
    let inputElem
    return (
        <div>
            <div hidden={preview}>
                <h2> Heading {widget.size}</h2>
                <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}
const HeadingDispathToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize)
})


const stateToPropsMapper = state => ({
    preview: state.preview
})

const HeadingContainer = connect(stateToPropsMapper, HeadingDispathToPropsMapper)(Heading)


const Paragraph = ({widget, preview, paragraphTextChanged, paragraphSizeChanged}) => {

    let inputElem
    return (
        <div>
            <div hidden={preview}>
                <h2> Paragraph {widget.size}</h2>

                <textarea className="form-control" rows="8"

                          onChange={() => paragraphTextChanged(widget.id, inputElem.value)}

                          value={widget.text}
                          ref={node => inputElem = node}/>


                <h3>Preview</h3>
            </div>

            {<body>{widget.text}</body>}


        </div>
    )

}

const ParagraphDispathToPropsMapper = dispatch => ({
    paragraphTextChanged: (widgetId, newText) =>
        actions.paragraphTextChanged(dispatch, widgetId, newText),

})


const ParagraphContainer = connect(stateToPropsMapper, ParagraphDispathToPropsMapper)(Paragraph)


const List = ({widget, preview, listTextChanged, listOrderChanged}) => {

    let selectElem
    let inputElem


    return (
        <div>
            <div hidden={preview}>
                <h2> {widget.listType}</h2>

                <textarea className="form-control" rows="5"

                          onChange={() => listTextChanged(widget.id, inputElem.value)}

                          value={widget.listItems}
                          ref={node => inputElem = node}/>


                <select onChange={() => listOrderChanged(widget.id, selectElem.value)}
                        value={widget.listType}
                        ref={node => selectElem = node}>
                    <option value="unordered">Unordered list</option>
                    <option value="ordered">Ordered list</option>

                </select>
                <h3>Preview</h3>
            </div>

            {widget.listType == "ordered" &&
            <ul>
                {widget.listItems.split("\n").map((text) =>
                    <li>{text}</li>
                )}
            </ul>}

            {widget.listType == "unordered" &&

            <ol>
                {widget.listItems.split("\n").map((text) =>
                    <li>{text}</li>
                )}
            </ol>}


        </div>
    )
}

const ListDispathToPropsMapper = dispatch => ({
    listTextChanged: (widgetId, newText) =>
        actions.listTextChanged(dispatch, widgetId, newText),
    listOrderChanged: (widgetId, newOrder) =>
        actions.listOrderChanged(dispatch, widgetId, newOrder)
})
const ListContainer = connect(stateToPropsMapper, ListDispathToPropsMapper)(List)


const Image = ({widget, preview, imageTextChanged, imageURLChanged}) => {
    let inputURLElem
    let inputElem
    return (
        <div>
            <div hidden={preview} >
                <h2> Image {widget.name}</h2>

                <input className="form-control"

                          onChange={() => imageURLChanged(widget.id, inputURLElem.value)}

                          value={widget.src}
                          ref={node => inputURLElem = node}/>


                <input className="form-control"

                    onChange={() => imageTextChanged(widget.id, inputElem.value)}
                       value={widget.name}
                       ref={node => inputElem = node}/>


                <h3>Preview</h3>
            </div>

             <body>{widget.name}</body>
             <img src={widget.src}/>


        </div>
    )

}



const ImageDispathToPropsMapper = dispatch => ({
    imageTextChanged: (widgetId, newText) =>
        actions.imageTextChanged(dispatch, widgetId, newText),
    imageURLChanged: (widgetId, newURL) =>
        actions. imageURLChanged(dispatch, widgetId, newURL)
})
const ImageContainer = connect(stateToPropsMapper, ImageDispathToPropsMapper)(Image)



const Link = ({widget, preview, linkTextChanged, linkURLChanged}) => {
    let inputURLElem
    let inputElem
    return (
        <div>
            <div hidden={preview} >
                <h2> Link </h2>

                <input className="form-control"

                       onChange={() => linkURLChanged(widget.id, inputURLElem.value)}

                       value={widget.hrefLink}
                       ref={node => inputURLElem = node}/>


                <input className="form-control"

                       onChange={() => linkTextChanged(widget.id, inputElem.value)}
                       value={widget.name}
                       ref={node => inputElem = node}/>


                <h3>Preview</h3>
            </div>


            <a href={widget.hrefLink}> {widget.name}</a>


        </div>
    )

}



const LinkDispathToPropsMapper = dispatch => ({
    linkTextChanged: (widgetId, newText) =>
        actions.linkTextChanged(dispatch, widgetId, newText),
    linkURLChanged: (widgetId, newURL) =>
        actions. linkURLChanged(dispatch, widgetId, newURL)
})
const LinkContainer = connect(stateToPropsMapper, LinkDispathToPropsMapper)(Link)





const Widget = ({widget, preview, dispatch}) => {
    let selectElement
    return (
        <li>
            <div hidden={preview}>
                {widget.id}
                {widget.widgetType}

                <select value={widget.widgetType}
                        onChange={e =>
                            dispatch({
                                type: 'SELECT_WIDGET_TYPE',
                                id: widget.id,
                                widgetType: selectElement.value
                            })}

                        ref={node => selectElement = node}>

                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                    <option>Link</option>
                </select>

                <button onClick={e => (
                    dispatch({type: DELETE_WIDGET, id: widget.id})
                )}>Delete
                </button>
            </div>
            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
            </div>
        </li>
    )
}


const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)

export default WidgetContainer