import React, { useState, useEffect } from 'react';
import Header from '../../shared/header/header';
import firebase from 'firebase';
import Table from '../../shared/table/table';
const Dashboard = (props) => {
  return (
    <>
      <Header data={props} />
      <Table />
    </>
  );
};
export default Dashboard;
