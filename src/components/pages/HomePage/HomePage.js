import { useDispatch, useSelector } from 'react-redux';
import styles from '../HomePage/HomePage.module.scss';
import { getAllTables, removeTable } from '../../../redux/tablesRedux';
import Loading from '../../features/Load/Load';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const tables = useSelector(getAllTables);
  const dispach = useDispatch();

  const deleteTab = (id) => {
    dispach(removeTable(id));
  }
  
  if (tables.length === 0) {
    return <Loading></Loading>;
  } else {
    return (
      <div className={styles.Tables}>
        <p className={styles.title}>All tables</p>
        {tables.map((table) => (
          <div key={table.id} {...table}>
            <div className={styles.table1}>
              <div className={styles.right}>
                <div className={styles.titleTable}>
                  <p>Table {table.id}</p>
                </div>
                <div className={styles.status}>
                  <p className={styles.statusParagraph}>Status: {table.status}</p>
                </div>
              </div>
              <div className={styles.left}>
                  <Link className='ms-auto' to={`/table/${table.id}`}>
                    <Button variant='primary'>Show more</Button>
                  </Link>
                  <Button variant='danger' onClick={() => deleteTab(table.id)}>
                    Delete
                  </Button>
                </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
    
  };
};


export default HomePage;
