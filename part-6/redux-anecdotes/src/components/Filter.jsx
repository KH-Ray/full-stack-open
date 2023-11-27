import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterAnecdote";

const Filter = ({ filter, setFilter }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFilter(event.target.value);
    dispatch(filterAnecdotes(filter));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
