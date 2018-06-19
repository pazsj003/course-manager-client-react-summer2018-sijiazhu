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
        // this.props.findAllWidgets()
        console.log("constrcutor topicId"+this.props.topicId),
        this.props.findAllWidgetsForTopic(this.props.topicId),
        //     this.props.findAllWidgets(),
        this.state = {

            moduleId: '',
            courseId: '',
            lessonId: '',

        };



        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.setTopicId = this.setTopicId.bind(this);


    }

    componentDidMount() {
        this.setTopicId(this.props.topicId);
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.topicId !== newProps.topicId) {
            this.setTopicId(newProps.topicId);
            this.setCourseId(newProps.courseId);
            this.setModuleId(newProps.moduleId);
            this.setLessonId(newProps.lessonId);
            this.props.findAllWidgetsForTopic(newProps.topicId);
        }
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(ModuleId) {
        this.setState({moduleId: ModuleId});
    }

    setLessonId(LessonId) {
        this.setState({lessonId: LessonId});
    }
    setTopicId(TopicId) {
        this.setState({topicId: TopicId});
    }


    render() {
        console.log("render")
        return (
            <div className=" p-4">
                <br/>

                <div className="float-right ">
                    <ul className="nav  ">


                        <li>
                            <button className="btn btn-outline-success  "
                                    style={{position: 'relative', right: '30px'}}
                                    hidden={this.props.previewMode}
                                    onClick={()=>this.props.save(this.props.topicId)}>
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
                                             key={widget.id}/>))}</ul>
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

    = (dispatch) => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    findAllWidgetsForTopic:(topicId)=>actions.findAllWidgetsForTopic(dispatch,topicId),
    addWidget: () => actions.addWidget(dispatch),
    save: (topicId) => actions.save(dispatch,topicId),
    preview: () => actions.preview(dispatch)
})


const WidgetListAPP = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)

export default WidgetListAPP