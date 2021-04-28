import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../CSS/Tickets.css";

function Tickets(props) {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = props.location.state.search;
  console.log(search);

  useEffect(() => {
    async function fetchData() {
      const endpoint = `https://60882486a6f4a30017425cb9.mockapi.io/tickets/ticket`;
      await (await fetch(endpoint)).json().then((data) => {
        let sort = data.sort((a, b) =>
          a.startDate > b.startDate ? 1 : b.startDate > a.startDate ? -1 : 0
        );
        setTickets(sort);
        setLoading(false);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    let _tickets = tickets.filter(
      (ticket) =>
        ticket.startLocation === search.startLocation &&
        ticket.destination === search.destination &&
        new Date(ticket.startDate).getMonth() === search.date.getMonth() &&
        new Date(ticket.startDate).getDay() === search.date.getDay() + 1 &&
        new Date(ticket.startDate).getYear() === search.date.getYear()
    );
    setFilteredTickets(_tickets);
  }, [props.location, tickets]);

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();

    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    var strTime = hours + " : " + minutes;
    return strTime;
  }
  return (
    <>
      {loading ? (
        <div>Loading </div>
      ) : (
        <>
          <h4 className="general-info">
            From {search.startLocation} to {search.destination} -{" "}
            {search.date.getDate() +
              "." +
              (search.date.getMonth() + 1) +
              "." +
              search.date.getFullYear()}
          </h4>
          <div className="tickets-table">
          <Table bordered hover striped>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Price</th>
                <th>Places</th>
                <th>departure</th>
                <th>arrival</th>
                <th>
                  {" "}
                  <FontAwesomeIcon icon={faTicketAlt} />
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                let startDate = formatDate(new Date(ticket.startDate));

                let endDate = formatDate(new Date(ticket.endDate));
                return (
                  <tr key={ticket.id}>
                    <td>{ticket.startLocation}</td>
                    <td>{ticket.destination}</td>
                    <td>{ticket.price} RON</td>
                    <td>{ticket.number}</td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                    <td>
                      {ticket.number === 0 ? (
                        <div className="div-disabled">
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                          ></FontAwesomeIcon>
                          <div className="div-no-online-line"></div>
                        </div>
                      ) : (
                        <button className="btn btn-primary ">Buy</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </div>
        </>
      )}
    </>
  );
}

export default Tickets;
