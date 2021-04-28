import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'

function Tickets(props) {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const endpoint = `https://60882486a6f4a30017425cb9.mockapi.io/tickets/ticket`;
      await (await fetch(endpoint)).json().then((data) => {
        let sort = data.sort((a,b) => (a.date > b.date) ? 1  : 
        ((b.date > a.date) ? -1 : 0))
        setTickets(sort);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const search = props.location.state.search;

    let _tickets = tickets.filter(
      (ticket) =>
        ticket.startLocation === search.startLocation &&
        ticket.destination === search.destination &&
        new Date(ticket.date).getMonth() === search.date.getMonth() &&
        new Date(ticket.date).getDay() === search.date.getDay() + 1 &&
        new Date(ticket.date).getYear() === search.date.getYear()
    );
    setFilteredTickets(_tickets);
  }, [props.location, tickets]);

  return (
    <>
      <h1>Tickets</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Places</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => {
              let date = ticket.date.toString().replace("T", " ").slice(0, -8);
            return (
                <tr key={ticket.id}>
                  <td>
                   {ticket.startLocation}
                  </td>
                  <td>{ticket.destination}</td>
                  <td>{ticket.price} RON</td>
                  <td>{ticket.number}</td>
                  <td>{date}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                     
                    >Buy</button>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Tickets;
