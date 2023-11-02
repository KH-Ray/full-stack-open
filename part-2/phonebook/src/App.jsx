import { useEffect, useState } from "react";
import personService from "./services/persons";

const Filter = ({ handleSearchName }) => {
  return (
    <div>
      filter shown with{" "}
      <input onChange={(e) => handleSearchName(e.target.value)} />
    </div>
  );
};

const PersonForm = ({ addName, handleNewName, handleNewNumber }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input onChange={(e) => handleNewName(e.target.value)} />
      </div>
      <div>
        number: <input onChange={(e) => handleNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filterNames, deletePerson }) => {
  return filterNames.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person.name, person.id)}>
        delete
      </button>
    </div>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService.getAllPerson().then((data) => setPersons(data));
  }, [persons]);

  const addName = (e) => {
    e.preventDefault();

    for (const person of persons) {
      if (newName === person.name) {
        return replacePerson(person.name, person.id);
      }
    }

    personService.createPerson({ name: newName, number: newNumber });
    // .then((data) => setPersons([...persons, data]));
  };

  const deletePerson = (personName, personId) => {
    if (window.confirm(`Delete ${personName}?`)) {
      personService.erasePerson(personId);
    }
  };

  const replacePerson = (personName, personId) => {
    if (
      window.confirm(
        `${personName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService.updatePerson(
        { name: newName, number: newNumber },
        personId
      );
    }
  };

  const filterNames = persons.filter((person) =>
    person["name"].includes(searchName)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchName={setSearchName} />

      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        handleNewName={setNewName}
        handleNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons filterNames={filterNames} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
