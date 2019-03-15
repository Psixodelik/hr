import React, { Component } from 'react';
import Header from '../Header/Header';
import ControlPanel from '../Control-panel/Control-panel';
import ProjectList from '../Project-list/Project-list';
import ModalAdd from '../Modal-add/Modal-add';
import './App.css';  

class App extends Component {

  state = {
    projects: [
      {
        name: 'Название первого проекта',
        isDone: false,
        isRemove: false,
        hidden: false,
        vacancyIsOpen: false,
        activeVacancy: [
          {
            name: 'Первая вакансия',
            isOpen: true
          },
          {
            name: 'Вторая вакансия',
            isOpen: true
          },
          {
            name: 'Третья вакансия',
            isOpen: true
          },
        ]
      },

      {
        name: 'Название проекта, который раскрыт',
        hidden: false,
        isDone: false,
        isRemove: false,
        vacancyIsOpen: true,
        activeVacancy: [
          {
            name: 'Первая вакансия',
            isOpen: true
          },
          {
            name: 'Вторая вакансия',
            isOpen: true
          },
          {
            name: 'Третья вакансия',
            isOpen: false
          },
        ]
      },

      {
        name: 'Название второго проекта',
        hidden: false,
        isDone: false,
        isRemove: false,
        vacancyIsOpen: false,
        activeVacancy: [
          {
            name: 'Первая вакансия',
            isOpen: true
          },
          {
            name: 'Вторая вакансия',
            isOpen: true
          },
          {
            name: 'Третья вакансия',
            isOpen: false
          },
        ]
      },

      {
        name: 'Очень-очень длинное название третьего проекта, которое переносится на две строки',
        hidden: false,
        isDone: true,
        isRemove: false,
        vacancyIsOpen: false,
        activeVacancy: [
          {
            name: 'Первая вакансия',
            isOpen: false
          },
          {
            name: 'Вторая вакансия',
            isOpen: false
          },
          {
            name: 'Третья вакансия',
            isOpen: false
          },
          {
            name: 'Четвёртая вакансия',
            isOpen: false
          },
        ]
      },

    ],
    modalProjectState: false,
    modalVacancyState: false,
    IdForAddVacancyInProject: null,
    hiddenVacancyDone: false,
  };

  

  removeProjectHandler = (index) => {
    const newProjects = [...this.state.projects];
    newProjects.splice(index, '1');

    this.setState({
      projects: newProjects
    });
  };

  removeVanacyHandler = (indexProject, indexVacancy) => {
    const projects = [...this.state.projects];
    projects[indexProject].activeVacancy.splice(indexVacancy, 1);

    this.setState({
      projects: projects
    });
  };

  closeProjectHandler = (indexProject) => {
    const projects = [...this.state.projects];
    projects[indexProject].isDone = !projects[indexProject].isDone;
    projects[indexProject].vacancyIsOpen = false;

    const closeVacancy = projects[indexProject].activeVacancy.map((vacancy) => {
      vacancy.isOpen = false;
      return vacancy;
    });

    projects[indexProject].activeVacancy = closeVacancy;

    this.setState({
      projects: projects
    });
  };

  closeVanacyHandler = (indexProject, indexVacancy) => {
    const projects = [...this.state.projects];
    projects[indexProject].activeVacancy[indexVacancy].isOpen = !projects[indexProject].activeVacancy[indexVacancy].isOpen;

    if (projects[indexProject].activeVacancy[indexVacancy].isOpen === true && projects[indexProject].isDone) {
      projects[indexProject].isDone = false;
    }

    this.setState({
      projects: projects
    });
  };

  modalToggle = (modalName, indexProject) => {
    const inputAddProject = document.getElementById('projectAddInput');
    const inputAddVacancy = document.getElementById('vacancyAddInput');

    inputAddProject.classList.remove('inputError');
    inputAddVacancy.classList.remove('inputError');
    let newModalState = null;

    if (modalName === 'project') {
      newModalState = {
        modalProjectState: !this.state.modalProjectState,
      }
    } else if (modalName === 'vacancy') {
        newModalState = {
          modalVacancyState: !this.state.modalVacancyState,
          indexProjectForVacancy: indexProject
        }
    }

    this.setState(newModalState);
  };

  addProjectHandler = (nameProject) => {
    const projects = [...this.state.projects];
    const newProjects = {
      name: nameProject,
      isDone: false,
      isRemove: false,
      hidden: false,
      vacancyIsOpen: true,
      activeVacancy: []
    };

    projects.push(newProjects);

    this.setState({
      projects: projects,
      modalProjectState: !this.state.modalProjectState
    });
  };

  addVacancyHandler = (nameVacancy) => {
    const projects = [...this.state.projects];
    const newVacancy = {
      name: nameVacancy,
      isOpen: true
    }
    projects[this.state.indexProjectForVacancy].activeVacancy.push(newVacancy);
    this.setState({
      projects: projects,
      modalVacancyState: !this.state.modalVacancyState
    })
  };

  checkboxHandler = () => {
      const newStateHiddenVacancyDone = !this.state.hiddenVacancyDone;

      this.setState({
        hiddenVacancyDone: newStateHiddenVacancyDone
      });
  };

  searchHandle = (event) => {
    const search = event.target.value.trim();
    const projects = [...this.state.projects];
    let countHiddenVacancy = 0;
   
    
    const filterProject = projects.map((project) => {
      project.vacancyIsOpen = true;
      project.hidden = false;
      if (project.activeVacancy.length === 0 && search !== '') {
        project.hidden = true;
        return project;
      }
      const filterVacancy = project.activeVacancy.map((vacancy) => {
        vacancy.hidden = false;
        if (!(~vacancy.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()))) {
          vacancy.hidden = true;
          countHiddenVacancy += 1;
        }
        return vacancy;
      });

      if (filterVacancy.length === countHiddenVacancy && search !== '') project.hidden = true;
      if (search === '') project.vacancyIsOpen = false;

      project.activeVacancy = filterVacancy;
      countHiddenVacancy = 0;
      return project;
    });

    

    this.setState({
      projects: filterProject
    });

  };

  vacancyToggle = (indexProject) => {
    const projects = [...this.state.projects];
    projects[indexProject].vacancyIsOpen = !this.state.projects[indexProject].vacancyIsOpen;

    this.setState({
      projects: projects
    });
  };

  
  render() {
    return (
      <div className='hr-root'>
        <Header />
        <ControlPanel
          modalToggle = { this.modalToggle }
          checkboxHandler = { this.checkboxHandler }
          searchHandle = { this.searchHandle }
        />
        <ProjectList 
          projects = { this.state.projects }
          removeProjectHandler = { this.removeProjectHandler }
          removeVanacyHandler = { this.removeVanacyHandler }
          closeProjectHandler = { this.closeProjectHandler }
          closeVanacyHandler = { this.closeVanacyHandler }
          modalToggle = { this.modalToggle }
          hiddenVacancyDone = { this.state.hiddenVacancyDone }
          vacancyToggle = { this.vacancyToggle }
        />
        <ModalAdd 
          isOpen = { this.state.modalProjectState }
          modalToggle = { this.modalToggle }
          addProjectHandler = { this.addProjectHandler }
          modalType = 'project'
        />
        <ModalAdd 
          isOpen = { this.state.modalVacancyState }
          modalToggle = { this.modalToggle }
          addVacancyHandler = { this.addVacancyHandler }
          modalType = 'vacancy'
        />
      </div> 
    );
  };

}

export default App;
