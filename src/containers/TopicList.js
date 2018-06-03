import React from 'react'
import TopicsServiceClient from "../services/TopicsServiceClient";
import LessonListItem from '../components/LessonListItem';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleEditor from "./ModuleEditor";

export default class TopicList
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: {tittle: '', id: ''},
            moduleId: '',
            courseId: '',
            lessonId:'',
            topics: [
                {title: 'Topics 1', id: 123},
                {title: 'Topics 2 ', id: 234},
                {title: 'Topics 3', id: 345},
                {title: 'Topics 4 ', id: 456},
                {title: 'Topics 5', id: 567},
                {title: 'Topics 6 ', id: 678},]
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.CreateTopic = this.CreateTopic.bind(this);

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);

        this.deleteTopic = this.deleteTopic.bind(this);

        this.topicService = TopicServiceClient.instance;

    }

    setTopics(topics) {
        this.setState({topics: topics})
    }

    CreateTopics() {
        this.topicService
            .CreateTopics(

                this.state.lessonId,
                this.state.topic)
            .then(() => {
                this.findAllTopicsForLesson
                (this.state.lessonId);
            });

    }

    deleteTopic(TopicsId) {


        this.topicService
            .deleteTopic(TopicsId)
            .then(() => {
                this.findAllTopicsForLesson
                (this.state.LessonId)
            });


    }

    componentDidMount() {

        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setModuleId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setModuleId(newProps.lessonId);


    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(ModuleId) {
        this.setState({moduleId: ModuleId});
    }
    setLessonId(LessonId) {
        this.setState({lessonId:LessonId});
    }


    titleChanged(event) {
        console.log(event.target.value);
        this.setState({topics: {title: event.target.value}});


    }

    findAllTopicsForLesson(lessonId) {
        this.topicService
            .findAllTopicsForLesson(lessonId)
            .then((Topics) => {
                this.setTopics(Topics)
            });
    }

    renderListOfTopics() {
        let Topics = this.state.topics
            .map((topic) => {
                    return <TopicListItem
                    moduleId={this.state.moduleId}
                    title={topic.title}
                    key={topic.id}
                    courseId={this.props.courseId}
                    delete={this.deleteTopic}
                    Topic={topic}

                />
            });

        return <ul className="nav nav-tabs">{Topics}</ul>;
    }

    render() {
        return (
            <div>
                <div>
                    <input onChange={this.titleChanged}
                           className="form-control"
                           id="titleFld"
                           placeholder="Topic one"/>

                    <button onClick={this.CreateTopics}
                            className="btn btn-primary">Add

                    </button>


                </div>

                <ul className="nav nav-tabs">
                    {this.renderListOfTopics()}


                </ul>
                {/*<Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"*/}
                                  {/*component={TopicList}>*/}
            {/*</Route>*/}
            </div>

        );
    }
}
