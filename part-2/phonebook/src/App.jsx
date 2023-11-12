import { useEffect, useState } from "react";
import personService from "./services/persons";
import "./index.css";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="notification"
      style={type === "success" ? { color: "green" } : { color: "red" }}
    >
      {message}
    </div>
  );
};

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
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    personService.getAllPerson().then((data) => setPersons(data));
  }, []);

  const addName = (e) => {
    e.preventDefault();

    for (const person of persons) {
      if (newName === person.name) {
        return replacePerson(person.name, person.id);
      }
    }

    personService
      .createPerson({ name: newName, number: newNumber })
      .then(() => {
        setNotificationMessage(`Added ${newName}`);
        setNotificationType("success");
      })
      .catch((error) => {
        setNotificationMessage(error.response.data.error);
        setNotificationType("error");
      })
      .finally(() => {
        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationType("");
        }, 5000);
      });
  };

  const deletePerson = (personName, personId) => {
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .erasePerson(personId)
        .then(() => {
          setNotificationMessage(`Deleted ${personName}'s phone number`);
          setNotificationType("success");
        })
        .catch((error) => {
          setNotificationMessage(error.response.data.error);
          setNotificationType("error");
        })
        .finally(() => {
          setTimeout(() => {
            setNotificationMessage(null);
            setNotificationType("");
          }, 5000);
        });
    }
  };

  const replacePerson = (personName, personId) => {
    if (
      window.confirm(
        `${personName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .updatePerson({ name: newName, number: newNumber }, personId)
        .then(() => {
          setNotificationMessage(`Updated ${newName}'s phone number`);
          setNotificationType("success");
        })
        .catch((error) => {
          setNotificationMessage(error.response.data.error);
          setNotificationType("error");
        })
        .finally(() => {
          setTimeout(() => {
            setNotificationMessage(null);
            setNotificationType("");
          }, 5000);
        });
    }
  };

  const filterNames = persons.filter((person) =>
    person["name"].includes(searchName)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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
