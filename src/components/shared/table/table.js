import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import logo from '../../assets/images/avatar.svg';
import TablePagination from '@material-ui/core/TablePagination';
import firebase from 'firebase';
import avatar from '../../assets/images/avatar.svg';
import './popup.css';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    123,
    'John Doe',
    'johndoe@gmail.com',
    <a href="#" className="action-icon">
      <button className="view-button">View</button>
    </a>
  ),
  ,
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
];

export default function BasicTable() {
  const [page, setPage] = React.useState(5);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState();
  const [isClose, setIsClose] = useState(false);
  const [idData, setIdData] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection('userscollection')
      .get()
      .then((querySnapshot) => {
        setUsers(querySnapshot.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const viewHandler = (id) => {
    setIsClose(!isClose);
    firebase
      .firestore()
      .collection('userscollection')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIdData(doc.data());
        }
      });
  };
  const serchHandler = (e) => {
    users &&
      users.filter((item) => {
        setUsers(
          item.data().name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
  };
  return (
    <>
      <li>
        {isClose ? (
          <div className="popup">
            <div className="popup_inner">
              <button
                className="close"
                onClick={() => {
                  setIsClose(!isClose);
                }}
              >
                X
              </button>
              <div className="manage">
                <div>
                  <img className="circle-img" src={avatar} alt="" />
                </div>
                <div>
                  <div>name:{idData ? idData.name : ''}</div>
                  <div>email:{idData ? idData.email : ''}</div>
                  <div>phone:{idData ? idData.phone : ''}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <form className="global-search table--search">
          <div className="serach">
            <input
              className="form-control-table me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="myInput"
            />
            <button className="search-icon-btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </li>

      <TableContainer component={Paper}>
        <Table id="myTable" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((row, i) => (
                <TableRow
                  id={i}
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <span className="table-circle-img">
                      <img src={logo} />{' '}
                    </span>
                    {row.data().name}
                  </TableCell>
                  <TableCell align="right">{row.data().email}</TableCell>
                  <TableCell align="right">{row.data().phone}</TableCell>
                  <TableCell align="right">
                    <a href="#" className="action-icon">
                      <button
                        onClick={() => {
                          viewHandler(row.data().email);
                        }}
                        className="view-button"
                      >
                        View
                      </button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users ? users.length : ''}
        rowsPerPage={rowsPerPage}
        page={page}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
