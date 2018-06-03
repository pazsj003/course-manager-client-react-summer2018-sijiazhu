
import React from 'react'
import ModuleList from './ModuleList'
import  LessonTabs from './LessonTabs'
import ModuleEditor from "./ModuleEditor";
import CourseServiceClient from "../services/CourseServiceClient";

export default class CourseEditor
    extends React.Component {
    constructor(props){
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseServiceClient.instance;
        this.state={courseId:'',
             title:'',

        }


    }
    selectCourse(courseId) {
        this.setState({courseId: courseId});
        this.renderCourse(courseId);
    }
    // selectCourseTitle(course) {
    //     this.setState({tittle: course.tittle});
    // }

    findCourseById(courseId){
       return  this.courseService
            .findCourseById(courseId)

    }
    renderCourse(courseId){
        this.findCourseById(courseId).then((course)=>{
            this.setState({title: course.title});
        });

    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
        // this.selectCourseTitle(this.props.match.params.course);

    }

    componentWillReceiveProps(newProps){
        this.selectCourse
        (newProps.match.params.courseId);
        // this.selectCoursetitle(newProps.match.params.course);
    }

    render() {
        return (
            <div>

                <h3>{this.state.title}</h3>
                {/*<div className="row">*/}
                    {/*<div className="col-4">*/}
                        <ModuleList courseId={this.state.courseId}/>
                    {/*</div>*/}
                    {/*<div className="col-8">*/}
                        {/*<LessonTabs courseId={this.state.courseId}*/}
                                    {/*moduleId ={this.state.moduleId}*/}
                        {/*/>*/}

                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

