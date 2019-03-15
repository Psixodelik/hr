import React from 'react';
import './Modal-add.css';

export default (props) => {

  if (props.modalType === 'project') {
    const modalClass = props.isOpen ? 'projectAdd modalVisible' : 'projectAdd';
    const inputAddProject = document.getElementById('projectAddInput');
 
    return(
      <div className = { modalClass }>
        <div className = 'overlay'></div>
        <div className = 'modalProjectAdd'>
          <header>
            <div className = 'title'>Новый проект</div>
            <div className = 'close' onClick = {() => props.modalToggle('project')}>X</div>
          </header>
          <div className = 'projectAddBottom'>
            <input type = 'text' id = 'projectAddInput' placeholder = 'Название проекта' />
            <div className = 'addBtn' onClick = { 
              () => {
                if (inputAddProject.value.trim() === '') {
                  inputAddProject.classList.add('inputError');
                  return false;
                }

                props.addProjectHandler(inputAddProject.value);
                inputAddProject.value = '';
              }}>Создать</div>
          </div>
        </div>
      </div>
      
    );
  } else if (props.modalType === 'vacancy') {
    const inputAddVacancy = document.getElementById('vacancyAddInput');
    const modalClass = props.isOpen ? 'vacancyAdd modalVisible' : 'vacancyAdd';

    return(
      <div className = { modalClass }>
        <div className = 'overlay'></div>
        <div className = 'modalVacancyAdd'>
          <header>
            <div className = 'title'>Новая вакансия</div>
            <div className = 'close' onClick = {() => props.modalToggle('vacancy')}>X</div>
          </header>
          <div className = 'vacancyAddBottom'>
            <input type = 'text' id = 'vacancyAddInput' placeholder = 'Название вакансии' />
            <div className = 'addBtn' onClick = { 
              () => {
                if (inputAddVacancy.value.trim() === '') {
                  inputAddVacancy.classList.add('inputError');
                  return false;
                }

                props.addVacancyHandler(inputAddVacancy.value);
                inputAddVacancy.value = '';
              }}>Создать</div>
          </div>
        </div>
      </div> 
    );
  }



  
};