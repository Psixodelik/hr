import React from 'react';
import './Control-panel.css';

export default (props) => {
  return(
    <div className = 'controlPanel'>
      <div className = 'searchPanel'>
        <input 
          type = 'text'
          placeholder = 'Поиск по вакансиям'
          onChange = { props.searchHandle } 
        />
      </div>
      <div className = 'filter' >
        <input type = 'checkbox' id="filterOpen" onClick = { props.checkboxHandler } /> <label htmlFor = 'filterOpen'>Только открытые</label>
      </div>
      <div className = 'addProject' onClick = { () => props.modalToggle('project') }>Добавить проект</div>
    </div>
    
  );
};