import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/widget'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/css-toggle-switch/dist/toggle-switch.css';

// import '../../node_modules/css-toggle-switch/src/themes/material.scss';
class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }

    render() {
        return (
            <div className=" p-4">
                <br/>

                <div className="float-right ">
                    <ul className="nav  ">


                        <li>
                            <button className="btn btn-outline-success  "
                                    style={{position: 'relative', right: '30px'}}
                                    hidden={this.props.previewMode} onClick={this.props.save}>
                                Save
                            </button>
                        </li>


                        <li>
                            <label className="switch-light switch-material  ">
                                <input type="checkbox"
                                       onClick={this.props.preview}/>

                                <strong className="d-inline-block" style={{
                                    position: 'relative',
                                    right: '15px'
                                }}>
                                    Preview
                                </strong>

                                <span className="d-inline-block"
                                      style={{
                                          position: 'relative',
                                          top: '5px'
                                      }}>

                                    <a/>
                                </span>
                            </label>

                        </li>


                    </ul>

                </div>

                <br/>
                <br/>
                <br/>

                <div className="">
                    < ul className="list-unstyled">
                        {this.props.widgets.map(widget => (
                            <WidgetContainer widget={widget}
                                             preview={this.props.previewMode}
                                             key={widget.id}/>
                        ))
                        }
                    </ul>
                </div>
                <br/>

                <button className="float-right btn btn-outline-danger fa fa-plus-circle"
                        onClick={this.props.addWidget}>
                </button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>


            </div>
        )
    }
}


const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})


const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
})


const WidgetListAPP = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)

export default WidgetListAPP