import { API_URL } from '../config';

//selectors
export const getAllTables = (state) => state.tables;
export const getTableId = (state) => state.tables.map((table) => table.id);
export const getTableProporties = ({ tables }, tableId) => tables.find((table) => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
export const SHOW_TABLES = createActionName('SHOW_TABLES');
export const DELETE_TABLE = createActionName('DELETE_TABLE');
export const ADD_TABLE = createActionName('ADD_TABLE');
export const UPDATE_TABLE = createActionName('UPADATE_TABLE');

// action creators
export const showTables = (payload) => ({ type: SHOW_TABLES, payload });
export const deleteTable = (payload) => ({ type: DELETE_TABLE, payload });
export const addTable = (payload) => ({ type: ADD_TABLE, payload });
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });

export const fetchTables = () => {
  return (dispach) => {
    fetch(`${API_URL}/tables`)
      .then((res) => res.json())
      .then((tables) => dispach(showTables(tables)));
  }
}

export const removeTable = (id) => {
  return (dispach) => {
    const removeTab = { id };
    const options = {
      method: 'DELETE',
      headers: {
        'Conter-Type': 'application/json',
      },
      body: JSON.stringify(removeTab),
    };
    fetch(`${API_URL}/tables/${id}`, options)
      .then((res) => res.json)
      .then((data) => dispach(deleteTable(data.id)));
  };
};

export const addNewTable = (id) => {
  return (dispatch) => {
    const newTable = {
      id,
      peopleAmount: 0,
      bill: 0,
      maxPeople: 0,
      status: 'Free',
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTable),
    };
    fetch(`${API_URL}/tables`, options)
      .then((res) => res.json())
      .then((data) => dispatch(addTable(data.id)));
  };
};

export const updateTables = (data) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(`${API_URL}/tables/${data.id}`, options)
      .then((res) => res.json())
      .then((data) => dispatch(updateTable(data)));
  };
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case SHOW_TABLES:
      return [...action.payload];
    case DELETE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    case ADD_TABLE:
      return [...statePart, { ...action.payload }];
    case UPDATE_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    default:
      return statePart;
  };
};


export default tablesReducer;