import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {

    const response = await api.post('repositories',{
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
      const repo = response.data;

      setRepositories([...repositories,repo]);
    
    
  }

  async function handleRemoveRepository(id) {

    const resp = await api.delete(`repositories/${id}`).then((resp) =>{
      console.log(resp);

      const repoIndex = repositories.findIndex(repo => repo.id === id);

      if(repoIndex < 0){
        console.log('erro');
      }else{
        const newRepo = [...repositories];

        newRepo.splice(repoIndex,1);
        console.log(newRepo);

        console.log('depois ');

        setRepositories(newRepo);
        console.log(repositories);
      }
    });
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>  <li key={repository.id}>
          <p>{repository.title}</p>
          <p>{repository.techs}</p>
          <p>{repository.url}</p>
          <p>{repository.likes}</p>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
