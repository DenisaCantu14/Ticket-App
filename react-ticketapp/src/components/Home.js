import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home(props) {
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState({
    date: new Date(),
    startLocation: "",
    destination: "",
  });

  useEffect(() => {
    async function fetchData() {
      let op = [];
      const endpoint = `https://60882486a6f4a30017425cb9.mockapi.io/tickets/city`;
      await (await fetch(endpoint)).json().then((data) => {
        data.map((city) => op.push({ value: city.city, label: city.city }));
        setOptions(op);
      });
    }
    fetchData();
  }, []);

  function formIsValid() {
    const _errors = {};

    if (!search.date) _errors.date = "Date is required";
    if (!search.startLocation) _errors.startLocation = "Location is required";
    if (!search.destination) _errors.destination = "Location is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return false;
    return props.history.push({
      pathname: "/tickets",
      state: { search },
    });
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <label>From</label>
        <Select
          styles={{
            container: (base) => ({
              ...base,
              padding: 5,
              width: 200,
            }),
          }}
          onChange={(e) => setSearch({ ...search, startLocation: e.value })}
          options={options}
        />
        <Select
          styles={{
            container: (base) => ({
              ...base,
              padding: 5,
              width: 200,
            }),
          }}
          onChange={(e) => setSearch({ ...search, destination: e.value })}
          options={options}
        />

        <DatePicker
          selected={search.date}
          minDate={new Date()}
          onChange={(e) => setSearch({ ...search, date: e })}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </>
  );
}

export default Home;
