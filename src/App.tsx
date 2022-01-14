import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import './App.css';
import { Pokemon } from './data/Pokemon';
import { IPokemonService, PokemonService } from './data/PokemonService';

let ticketDataService: IPokemonService = new PokemonService();

function App() {
  let [pokemons, setTickets] = React.useState<Pokemon[]>([]);
  let [showPokemons, setShowTickets] = React.useState<boolean>(false);
  let [showNewPokemonForm, setShowNewTicketForm] = React.useState<boolean>(false);

  let onGetAllTickets = React.useCallback(async () => {
    let ticketsFromService = await ticketDataService.list()
    setTickets(ticketsFromService);
    setShowTickets(!showPokemons);
    setShowNewTicketForm(false);
  }, [showPokemons]);

  let onToggleNewTicketForm = React.useCallback(async () => {
    setShowTickets(false);
    setShowNewTicketForm(!showNewPokemonForm);
  }, [showNewPokemonForm]);

  let onSubmitNewTicket = React.useCallback(async () => {
    let [
      id, name, color, level
    ] = [
      (document.querySelector('#idInput') as HTMLInputElement).value,
      (document.querySelector('#nameInput') as HTMLInputElement).value,
      (document.querySelector('#colorInput') as HTMLInputElement).value,
      +(document.querySelector('#levelInput') as HTMLInputElement).value,
    ]

    if (!id || !name || !color || !level) {
      alert("Please complete all fields");
      return;
    }
   
    ticketDataService.add({
      id, name, color, level
    });

    (document.querySelector('#idInput') as HTMLInputElement).value = '';
    (document.querySelector('#nameInput') as HTMLInputElement).value = '';
    (document.querySelector('#colorInput') as HTMLInputElement).value = '';
    (document.querySelector('#levelInput') as HTMLInputElement).value = '';

    alert("Pokemon created!")
  }, []);

  return (
    <div>
      <div className="container" style={{
        marginTop: '4rem'
      }}>
        <h3 className="header">
          Capsule Corp - Tracking System
        </h3>
        <div className="card">
          <div className="card-body">
              <button className="btn btn-primary btn-sm" onClick={onGetAllTickets}>
                Show all pokemons
              </button>
              &nbsp;
              <button className="btn btn-primary btn-sm" onClick={onToggleNewTicketForm}>
                Create new pokemon
              </button>
          </div>
        </div>

        <br/>

        {showPokemons && pokemons && !!pokemons.length && <>
            <h6 className="header">
              Pokemons
            </h6>
            {pokemons.map(ticket => {
              return <div className="card">
                <div className="card-body">
                  <b>ID:</b>&nbsp;{ticket.id}
                  &nbsp;|&nbsp;
                  <b>Name:</b>&nbsp;{ticket.name}
                  &nbsp;|&nbsp;
                  <b>Color:</b>&nbsp;{ticket.color}
                  &nbsp;|&nbsp;
                  <b>Level:</b>&nbsp;{ticket.level}
                </div>
              </div>
            })}
        </>}

        {showNewPokemonForm &&  <>
            <h6 className="header">
              New Pokemon
            </h6>
            <div className="card">
              <div className="card-body">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="idInput">ID</label>
                      <input type="text" className="form-control" id="idInput" placeholder="1"/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="nameInput">Name</label>
                      <input type="text" className="form-control" id="nameInput" placeholder="Charmander"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="colorInput">Color</label>
                      <input type="text" className="form-control" id="colorInput" placeholder="Orange"/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="levelInput">Level</label>
                      <input type="number" className="form-control" id="levelInput" placeholder="13"/>
                    </div>
                  </div>
                </div>
              </form>
              <br/>
              <button className="btn btn-primary btn-sm" onClick={onSubmitNewTicket}>
                Create new Pokemon
              </button>
              </div>
            </div>
        </>}

      </div>
    </div>
  );
}

export default App;
