import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Header from "./components/vievs/Header/Header";
import Footer from "./components/vievs/Footer/Footer";
import HomePage from "./components/pages/HomePage/HomePage";
import AddTable from "./components/pages/AddTable/AddTable";
import TablePage from "./components/pages/TablePage/TablePage";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";

const App = () => {
  
  const dispach = useDispatch();
  useEffect(() => dispach(fetchTables(), [dispach]));

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/newtable" element={<AddTable />}></Route>
        <Route path='/table/:id' element={<TablePage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;