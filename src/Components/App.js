import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Trash from "../Assets/iconmonstr-trash-can-filled-240.png";

function App() {
  const [argonautes, setArgonautes] = useState(false);
  const [argonautesArray, setArgonautesArray] = useState([]);
  const AddArgonautes = useRef();

  useEffect(() => {
    getArgonautes();
  }, []);

  function getArgonautes() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {


        setArgonautes(data);

        let dataParse = JSON.parse(data)
        setArgonautesArray(dataParse);

      });
  }

  const submit = (event) => {
    const name = AddArgonautes.current.value;

    fetch("http://localhost:3001/argonautes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getArgonautes();
      });
  };

  function deleteArgonautes(id) {
    console.log(id)
    fetch(`http://localhost:3001/argonautes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getArgonautes();
      });
  }

  return (
    <div>
      <header>
        <h1>
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
          />
          Les Argonautes
        </h1>
      </header>

      <main>
        <h2>Ajouter un(e) Argonaute</h2>
        <form class="new-member-form">
          <label for="name">Nom de l&apos;Argonaute</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Charalampos"
            ref={AddArgonautes}
          />
          <button type="submit" onClick={submit}>
            Envoyer
          </button>
        </form>

        <h2>Membres de l'équipage</h2>
        <section class="member-list">
          <div class="member-item">
            {" "}
            {argonautes ?   argonautesArray.map((argonautes)=> {return(<li key={argonautes.id} className="ArgonautesList"><p>{argonautes.name}</p><img src={Trash} onClick={()=> deleteArgonautes(argonautes.id)}></img></li>)}) : "There is no argonautes data available"}
          </div>

          {}
        </section>
      </main>

      <footer>
        <p>Réalisé par Anthony en Gallia de l'an 2023 apres JC</p>
      </footer>
    </div>
  );
}

export default App;
