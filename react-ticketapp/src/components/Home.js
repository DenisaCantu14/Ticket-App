import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import img from "../images/bus-ticket.gif";
import "../CSS/Home.css";

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


    if (!search.startLocation) _errors.startLocation = "required";
    if (!search.destination) _errors.endLocation = "required";
    setErrors(_errors);
    console.log(_errors);

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
      <h1>Tickets</h1>
      <div className="home-container">
        <form onSubmit={handleSubmit}>
          <div className="select-container">
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
              placeholder={errors.startLocation === undefined ?"From" : "Required"}
              className ={errors.startLocation  + " select"}
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
              placeholder={errors.endLocation === undefined ?"To" : "Required"}
              className ={"select " + errors.endLocation }
            />

          </div>
          <DatePicker
            selected={search.date}
            minDate={new Date()}
            onChange={(e) => setSearch({ ...search, date: e })}
          />
          <br></br>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        <img src={img} alt="bus"></img>
      </div>
    </>
  );
}

export default Home;
