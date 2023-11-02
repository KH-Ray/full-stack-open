import { useState } from "react";

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

const Persons = ({ filterNames }) => {
  return filterNames.map((person, i) => (
    <div key={i}>
      {person.name} {person.number}
    </div>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const addName = (e) => {
    e.preventDefault();

    for (const person of persons) {
      if (newName === person.name) {
        return alert(`${newName} is already added to phonebook`);
      }
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
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
      <Persons filterNames={filterNames} />
    </div>
  );
};

export default App;
