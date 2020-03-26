import axios from 'axios';
import {
  GET_TICKET,
  GET_TICKETS,
  SORT_TICKETS,
  ADD_TICKET,
  DELETE_TICKET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TICKET,
  FILTER_TICKETS,
  SET_ALL,
  OWNED_TICKETS,
  OPEN_TICKETS,
  RESOLVED_TICKETS,
  CLOSED_TICKETS,
  CLEAR_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR,
  SET_LOADING
} from './types';

// Get Ticket by Id
export const getTicket = id => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    const res = await axios.get(`/api/tickets/${id}`);

    dispatch({
      type: GET_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Get Tickets
export const getTickets = () => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    const res = await axios.get('/api/tickets');
  
    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Sort Tickets
export const sortTickets = field => async dispatch => {

  dispatch({ 
    type: SORT_TICKETS, 
    payload: field 
  });
};

// Add Ticket
export const addTicket = ticket => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/tickets', ticket, config);

    dispatch({
      type: ADD_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete Ticket
export const deleteTicket = id => async dispatch => {
  // Set Loading to True
  dispatch({
    type: SET_LOADING
  });

  try {
    await axios.delete(`/api/tickets/${id}`);

    dispatch({
      type: DELETE_TICKET,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Update Ticket
export const updateTicket = ticket => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/tickets/${ticket._id}`, ticket, config);

    dispatch({
      type: UPDATE_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: err.response.msg
    });
  }
};

// Clear Tickets
export const clearTicket = () => async dispatch => dispatch({ type: CLEAR_TICKETS });

// Set Curent Ticket
export const setCurrent = ticket => async dispatch => dispatch({ type: SET_CURRENT, payload: ticket });

// Clear Current Ticket
export const clearCurrent = () => async dispatch => dispatch({ type: CLEAR_CURRENT });

// Filter Tickets
export const filterTickets = text => async dispatch => dispatch({ type: FILTER_TICKETS, payload: text });

// See All Tickets
export const setAll = tickets => async dispatch => {
  dispatch({ type: SET_ALL, payload: tickets });
};

// Owned Tickets
export const ownedTickets = tickets => async dispatch => {
  dispatch({ type: OWNED_TICKETS, payload: tickets });
};

// Open Tickets
export const openTickets = tickets => async dispatch => {
  dispatch({ type: OPEN_TICKETS, payload: tickets });
}
// Resolved Tickets
export const resolvedTickets = tickets => async dispatch => {
  dispatch({ type: RESOLVED_TICKETS, payload: tickets });
};

// Closed Tickets
export const closedTickets = tickets => async dispatch => {
  dispatch({ type: CLOSED_TICKETS, payload: tickets });
};

// Clear Filter
export const clearFilter = () => async dispatch => dispatch({ type: CLEAR_FILTER });