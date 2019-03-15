import React, {Component} from 'react';
import './Project-list.css';

class ProjectList extends Component {
  
  render() {

    const projects = this.props.projects.map((project, indexProject) => {

      let activeVacancy = null;
      let activeVacancyCount = 0;
      let addBtnVacancy = null;
      let closeBtnProject = null;
      let projectClass = null;

      if (!project.isDone) {
        projectClass = 'projectOpen';
        addBtnVacancy = {
          title: 'Добавить вакансию',
          class: 'add-open'
        };
        closeBtnProject = {
          title: 'Закрыть проект',
          class: 'closeProject'
        };
      } else {
        projectClass = 'projectClose';
        addBtnVacancy = {
          title: 'Проект закрыт, сотрудники наняты',
          class: 'add-close'
        };
        closeBtnProject = {
          title: 'Открыть проект',
          class: 'openProject'
        };
      }

      if (project.activeVacancy){
        activeVacancy = project.activeVacancy.map((vacancy, indexVacancy) => {

          if (this.props.hiddenVacancyDone && !vacancy.isOpen) return false;
          let vacancyStatus = null;
          let vacancyAction = null; 
          if (!vacancy.hidden) activeVacancyCount += 1;
  
          if (vacancy.isOpen) {
            vacancyStatus = {
              label: 'Вакансия открыта, идет подбор кандидатов',
              class: 'vacancyOpen'
            };
            vacancyAction = {
              label: 'Закрыть вакансию',
              class: 'actionClose'
            };
          } else {
            vacancyStatus = {
              label: 'Вакансия закрыта, сотрудник нанят',
              class: 'vacancyClose'
            };
            vacancyAction = {
              label: 'Открыть вакансию',
              class: 'actionOpen'
            };
          }
          
          

          return(
            <div className={ 'vacancy-item' + (vacancy.hidden ? ' hidden' : '') } key={indexVacancy}>
              <div className='vacancy-item-name'>{ vacancy.name }</div>
              <div className='vacancy-item-bottom'>
                <div className={ 'vacancy-status ' + vacancyStatus.class }>{ vacancyStatus.label }</div>
                <div className='vacancy-action'>
                  <span 
                    className={ vacancyAction.class }
                    onClick = { 
                      () => this.props.closeVanacyHandler(indexProject, indexVacancy) 
                    }>{ vacancyAction.label }</span>
                  <span className='removeVacancy' onClick = { () => this.props.removeVanacyHandler(indexProject, indexVacancy) }>Удалить</span>
                </div>
              </div>
            </div>
          );
          
        });
      }

      if (activeVacancyCount === 0 && this.props.hiddenVacancyDone) {
        return false;
      }

      return(
        <div className={projectClass + ' project-item' + (project.hidden ? ' hidden' : '')} key={indexProject}>
          <h2 className='project-item-name'>{ project.name }</h2>
          <div className='project-item-bottom'>
            <div className='project-vacancy-count'>
              <div className='count' onClick = { () => this.props.vacancyToggle(indexProject) }>
                { activeVacancyCount } вакансии
              </div>
              { 
                !project.isDone ?
                  <div className='add'>
                    <span className={ addBtnVacancy.class } onClick = { () => this.props.modalToggle('vacancy', indexProject) }>{ addBtnVacancy.title }</span>
                  </div>
                :
                  <div className='add'>
                    <span className={ addBtnVacancy.class } >{ addBtnVacancy.title }</span>
                  </div> 
              }
                 
            </div>
            <div className='project-action'>
              <span className={ closeBtnProject.class } onClick = { () => this.props.closeProjectHandler(indexProject) }>{ closeBtnProject.title }</span>
              <span className='removeProject' onClick = { () => this.props.removeProjectHandler(indexProject) }>Удалить</span>
            </div>
          </div>
          {
            project.vacancyIsOpen && activeVacancy
              ? <div className='vacancy-wrap'>{activeVacancy}</div>
              : null
          }
        </div>
      );
    });


    return (
      <div className='project'>
        { projects }
      </div>
    );
  }
}

export default ProjectList;