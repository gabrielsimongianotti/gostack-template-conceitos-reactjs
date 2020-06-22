import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState(["desenvolvimento de app", "front-end "])

  useEffect(() => {
    api.get("repositories")
      .then(response => {
        console.log(response.data)
        setRepositories(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  async function handleAddRepository() {
    api.post("repositories", { title: "new project" + Date.now(), owner: "gatão" })
      .then(response => {
        console.log(response.data)
        setRepositories([...repositories, response.data])
      })
  }

  async function handleRemoveRepository(id) {
    api.delete("repositories/" + id)
      .then(response => {
        const newRepositories = repositories.filter(Repositorie => Repositorie.id !== id)
        setRepositories(newRepositories)
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((Repositorie,index) =>
        <li>
          Repositório {index} 
        
           <lu> {Repositorie.title} </lu>
          <button onClick={() => handleRemoveRepository(Repositorie.id)}>
            Remover
         </button>

        </li>
         )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
