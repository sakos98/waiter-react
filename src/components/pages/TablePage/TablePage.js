import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import styles from '../TablePage/TablePage.module.scss';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getTableProporties, updateTable } from "../../../redux/tablesRedux";
import { useDispatch } from "react-redux";

const TablePage = () => {
  const { id } = useParams();
  const table = useSelector((state) => getTableProporties(state, id));

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(Number(table.peopleAmount));
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(Number(table.maxPeopleAmount));
  const [bill, setBill] = useState(Number(table.bill));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'Cleaning' || status === 'Free') {
      setPeopleAmount('0');
    }
    if (status !== 'Busy') {
      setBill('0');
    }
  }, [status]);

  useEffect(() => {
    if (maxPeopleAmount < peopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    }
  }, [peopleAmount, maxPeopleAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id,
      status,
      bill: bill.toString(),
      peopleAmount: peopleAmount.toString(),
      maxPeopleAmount: maxPeopleAmount.toString(),
    };
    dispatch(updateTable(payload));
    navigate('/');
  };

  return (
    <div className={styles.Tables}>
      <h1 className='my-4'>Table {table.id}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className='my-3'>
          <Form.Label column sm={2} lg={1}>
            <strong>Status:</strong>
          </Form.Label>
          <Col sm={5} lg={4}>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Busy</option>
              <option>Reserved</option>
              <option>Free</option>
              <option>Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='my-3'>
          <Form.Label column sm={2} lg={1}>
            <strong>People:</strong>
          </Form.Label>
          <Col sm={2} lg={1}>
            <Form.Control
              type='number'
              min='0'
              max={maxPeopleAmount}
              value={peopleAmount || ''}
              onChange={(e) => setPeopleAmount(Number(e.target.value))}
            />
          </Col>
          /
          <Col sm={2} lg={1}>
            <Form.Control
              type='number'
              min='0'
              max='10'
              value={maxPeopleAmount || ''}
              onChange={(e) => setMaxPeopleAmount(Number(e.target.value))}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className={status !== 'Busy' ? 'd-none' : 'my-3'}>
          <Stack direction='horizontal'>
            
            <Form.Label column sm={2} lg={1}>
              <strong>Bill:</strong>
            </Form.Label>
            <Form.Text>
              <p className='m-1'>$ </p>
            </Form.Text>
            <Col sm={2} lg={1}>
              <Form.Control type='number' value={bill} onChange={(e) => setBill(e.target.value)} />
            </Col>
          </Stack>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Update
        </Button>
      </Form>
      </div>
  );
};


export default TablePage;