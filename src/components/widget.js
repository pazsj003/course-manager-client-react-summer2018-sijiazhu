import React from 'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import 'array.prototype.move';


const Heading = ({widget, preview, headingTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let selectElem
    let inputElem
    let inputName
    return (
        <div>
            <div hidden={preview}>
                <h2> Heading widget</h2>
                <label htmlFor="headText"/>
                <input className="form-control"
                       id="headText"
                       onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       placeholder="Heading text"
                       value={widget.text}

                       ref={node => inputElem = node}/>
                <br/>
                <label htmlFor="headSize"/>
                <select
                    id="headSize"
                    className="form-control"
                    onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                    value={widget.size}
                    ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>

                <label htmlFor="headName"/>
                <input
                    id="headName"
                    className="form-control"
                    onChange={() => widgetNameChanged(widget.id, inputName.value)}
                    value={widget.name}
                    ref={node => inputName = node}/>
                <br/>
                <h3>Preview</h3>
            </div>
            {widget.size === "1" && <h1>{widget.text}</h1>}
            {widget.size === "2" && <h2>{widget.text}</h2>}
            {widget.size === "3" && <h3>{widget.text}</h3>}
        </div>
    )
}
const HeadingDispathToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),
})


const stateToPropsMapper = state => ({
    preview: state.preview
})

const HeadingContainer = connect(stateToPropsMapper, HeadingDispathToPropsMapper)(Heading)


const Paragraph = ({widget, preview, paragraphTextChanged, widgetNameChanged}) => {

    let inputElem
    let inputName
    return (
        <div>
            <div hidden={preview}>
                <h2> Paragraph widget</h2>
                <label htmlFor="paragraphText"/>
                <textarea className="form-control" rows="5"
                          id="paragraphText"
                          onChange={() => paragraphTextChanged(widget.id, inputElem.value)}
                          placeholder="Paragraph text"
                          value={widget.text}
                          ref={node => inputElem = node}/>

                <label htmlFor="paragraphName"/>

                <input
                    id="paragraphName"
                    className="form-control"
                    onChange={() => widgetNameChanged(widget.id, inputName.value)}
                    value={widget.name}
                    ref={node => inputName = node}/>

                <br/>
                <h3>Preview</h3>
            </div>

            <p>{widget.text}</p>


        </div>
    )

}

const ParagraphDispathToPropsMapper = dispatch => ({
    paragraphTextChanged: (widgetId, newText) =>
        actions.paragraphTextChanged(dispatch, widgetId, newText),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),

})


const ParagraphContainer = connect(stateToPropsMapper, ParagraphDispathToPropsMapper)(Paragraph)


const List = ({widget, preview, listTextChanged, listOrderChanged, widgetNameChanged}) => {

    let selectElem
    let inputElem
    let inputName


    return (
        <div>
            <div hidden={preview}>
                <h2> List widget</h2>
                <label htmlFor="listItem"/>
                <textarea className="form-control" rows="3"
                          id="listItem"
                          onChange={() => listTextChanged(widget.id, inputElem.value)}
                          placeholder="Enter one list item per line"
                          value={widget.listItems}
                          ref={node => inputElem = node}/>

                <br/>
                <label htmlFor="listType"/>
                <select id="listType"
                        className="form-control"
                        onChange={() => listOrderChanged(widget.id, selectElem.value)}
                        value={widget.listType}
                        ref={node => selectElem = node}>
                    <option value="unordered">Unordered list</option>
                    <option value="ordered">Ordered list</option>

                </select>


                <label htmlFor="listName"/>
                <input id="listName"
                       className="form-control"
                       onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

                <br/>
                <h3>Preview</h3>
            </div>

            {widget.listType === "ordered" &&
            <ul>
                {widget.listItems.split("\n").map((text) =>
                    <li>{text}</li>
                )}
            </ul>}

            {widget.listType === "unordered" &&

            <ol>
                {widget.listItems.split("\n").map((text, index) =>
                    <li key={index}>{text}</li>
                )}
            </ol>}


        </div>
    )
}

const ListDispathToPropsMapper = dispatch => ({
    listTextChanged: (widgetId, newText) =>
        actions.listTextChanged(dispatch, widgetId, newText),
    listOrderChanged: (widgetId, newOrder) =>
        actions.listOrderChanged(dispatch, widgetId, newOrder),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),
})
const ListContainer = connect(stateToPropsMapper, ListDispathToPropsMapper)(List)


const Image = ({widget, preview, imageTextChanged, imageURLChanged, widgetNameChanged}) => {
    let inputURLElem
    let inputElem
    let inputName
    return (
        <div>
            <div hidden={preview}>
                <h2> Image widget</h2>
                <label htmlFor="ImageURL"/>
                <input className="form-control"
                       id="ImageURL"
                       onChange={() => imageURLChanged(widget.id, inputURLElem.value)}
                       placeholder="Image URL"
                       value={widget.src}
                       ref={node => inputURLElem = node}/>


                <label htmlFor="ImageText"/>
                <input className="form-control"
                       id="ImageText"
                       onChange={() => imageTextChanged(widget.id, inputElem.value)}
                       placeholder="Image text"
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <br/>
                <label htmlFor="ImageName"/>
                <input id="ImageName"
                       className="form-control"
                       onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

                <br/>
                <h3>Preview</h3>
            </div>

            <p>{widget.text}</p>
            <img className="form-control"
                 src={widget.src}
            />


        </div>
    )

}


const ImageDispathToPropsMapper = dispatch => ({
    imageTextChanged: (widgetId, newText) =>
        actions.imageTextChanged(dispatch, widgetId, newText),
    imageURLChanged: (widgetId, newURL) =>
        actions.imageURLChanged(dispatch, widgetId, newURL),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),
})
const ImageContainer = connect(stateToPropsMapper, ImageDispathToPropsMapper)(Image)


const Link = ({widget, preview, linkTextChanged, linkURLChanged, widgetNameChanged}) => {
    let inputURLElem
    let inputElem
    let inputName
    return (
        <div>
            <div hidden={preview}>
                <h2> Link widget</h2>
                <label htmlFor="linkURL"/>
                <input className="form-control"
                       id="linkURL"
                       onChange={() => linkURLChanged(widget.id, inputURLElem.value)}
                       placeholder="Link URL"
                       value={widget.hrefLink}
                       ref={node => inputURLElem = node}/>

                <label htmlFor="linkText"/>
                <input className="form-control"
                       id="linkText"
                       onChange={() => linkTextChanged(widget.id, inputElem.value)}
                       placeholder="Link Text"
                       value={widget.text}
                       ref={node => inputElem = node}/>

                <label htmlFor="linkName"/>
                <input id="linkName"
                       className="form-control"
                       onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

                <br/>
                <h3>Preview</h3>
            </div>


            <a href={widget.hrefLink}> {widget.text}</a>


        </div>
    )

}


const LinkDispathToPropsMapper = dispatch => ({
    linkTextChanged: (widgetId, newText) =>
        actions.linkTextChanged(dispatch, widgetId, newText),
    linkURLChanged: (widgetId, newURL) =>
        actions.linkURLChanged(dispatch, widgetId, newURL),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),
})
const LinkContainer = connect(stateToPropsMapper, LinkDispathToPropsMapper)(Link)


const Widget = ({widget, preview, dispatch}) => {
    let selectElement
    return (
        <li className="border p-4   rounded">
            <div hidden={preview} className="float-right">


                <button
                    type="button"
                    className="btn btn-outline-success fa fa-arrow-up pull-left"
                    onClick={() => {
                        dispatch(actions.moveUp(widget))
                    }}>

                </button>

                <button
                    type="button"
                    className="	btn  btn-outline-success  fa fa-arrow-down pull-left "
                    onClick={() => {
                        dispatch(actions.moveDown(widget))
                    }}>

                </button>

                <select
                    className="custom-select rounded 	"
                    style={{width: '120px', height: '33px', marginTop: '-2px', borderRadius: '50px'}}
                    data-style="btn-primary"
                    value={widget.widgetType}
                    onChange={e =>
                        dispatch({
                            type: 'SELECT_WIDGET_TYPE',
                            id: widget.id,
                            widgetType: selectElement.value
                        })}

                    ref={node => selectElement = node}>

                    <option

                    >Heading
                    </option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                    <option>Link</option>
                </select>


                <button
                    type="button"
                    className="	btn btn-outline-danger fa fa-remove pull-right "
                    onClick={e => (
                        dispatch({type: DELETE_WIDGET, id: widget.id})
                    )}>
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