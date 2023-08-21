import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTableId, addNewTable } from "../../../redux/tablesRedux";
import { useState } from "react";


const AddTable = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const tableIds = useSelector(getTableId);

  const [tableId, setTableId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispach(addNewTable(tableId));
    navigate('/');
  };

  const errorMessage = !tableId
  ? 'Table ID is required'
  : isNaN(tableId)
  ? 'Table ID must be a number'
  : tableIds.includes(tableId)
  ? 'Table ID is already used'
  : null;

  return (
    <div>
      <h1 className='my-4'>Add new table</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className='my-3'>
          <Form.Label column sm={3}>
            <strong>Table number:</strong>
          </Form.Label>
          <Col sm={2} lg={1}>
            <Form.Control
              type='text'
              value={tableId}
              onChange={(e) => {
                setTableId(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant='primary' type='submit'>
          Add table
        </Button>
      </Form>
      </div>
  );  
};

export default AddTable;