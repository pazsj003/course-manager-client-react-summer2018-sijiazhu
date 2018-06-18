import React from "react";
import TopicServiceClient from "../services/TopicServiceClient";
import Radium from "radium";

import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {FIND_ALL_WIDGETS, ADD_WIDGET, DELETE_WIDGET, SAVE} from "../constants/index"
import {widgetReducer} from "../reducers/widgetReducer"
import {WidgetContainer} from '../components/widget'
import {findAllWidgets, addWidget, save} from "../actions/index"
import WidgetListAPP from './widgetList'

import TopicList from "./TopicList";

class TopicEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.setCourseId =
            this.setCourseId.bind(this);
        this.setModuleId =
            this.setModuleId.bind(this);
        this.setLessonId =
            this.setLessonId.bind(this);
        this.setTopicId =
            this.setTopicId.bind(this);

        this.topicService = TopicServiceClient.instance;
        this.state = {

            courseId: '',
            moduleId: '',
            lessonId: '',
            topicId:'',
            title: '',
        };
        this.store = createStore(widgetReducer)

    }


    setTopicId(topicId) {
        this.setState
        ({topicId: topicId});
    }

    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState
        ({moduleId: moduleId});
    }

    setLessonId(LessonId) {
        this.setState
        ({lessonId: LessonId});

    }

    findTopicById(moduleId) {
        return this.topicService
            .findModuleById(moduleId)

    }


    componentDidMount() {
        this.setTopicId(
            this.props.match.params.topicId);

        this.setCourseId(
            this.props.match.params.courseId);

        this.setModuleId(
            this.props.match.params.moduleId);
        this.setLessonId(
            this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps) {

        this.setTopicId(
            newProps.match.params.topicId);
    }


    render() {

        return (

            <div>

                <Provider store={this.store}>
                    <WidgetListAPP/>
                </Provider>



            </div>


        )
    }


}

export default TopicEditor;