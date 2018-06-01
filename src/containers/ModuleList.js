import React from 'react';
import ModuleListItem from '../components/ModuleListItem';

import ModuleService from '../services/ModuleService';


class ModuleList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            courseId: '',


            module: {title: ''},
            modules: [
                {title: 'Module 1 - jQuery', id: 123},
                {title: 'Module 2 - React', id: 234},
                {title: 'Module 3 - Redux', id: 345},
                {title: 'Module 4 - Angular', id: 456},
                {title: 'Module 5 - Node.js', id: 567},
                {title: 'Module 6 - MongoDB', id: 678},]
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule= this.createModule.bind(this);


        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);

        this.ModuleService= ModuleService.instance;

    }
    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }
    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);

    }
    setModules(modules) {
        this.setState({modules: modules})
    }


    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});

    }
    createModule() {
        this.ModuleService
            .createModule(
                this.state.courseId,
                this.state.module)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId);
            })
        ;

    }

    deleteModule(moduleId) {

        console.log(moduleId);
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });


    }

    renderListOfModules() {
        let modules = this.state.modules
            .map( (module)=> {
                return <ModuleListItem
                    title={module.title} key={module.id}
                    delete={this.deleteModule}/>
            });
        return  <ul>{modules}</ul>;
    }


    render() {
        return (
            <div>
                <h3>Module List for course:{this.state.courseId}</h3>
                <div className="container-fluid">
                    <input className="form-control"
                           onChange={this.titleChanged}
                           placeholder="title"/>
                    <button onClick={this.createModule}
                            className="btn btn-primary btn-block">
                        <i className="fa fa-plus"></i>
                    </button>

                    <ul className="list-group">
                        {this.renderListOfModules()}
                    </ul>
                </div>
            </div>
        )

    }
}

export default ModuleList;