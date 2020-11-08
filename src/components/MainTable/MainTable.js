import React from 'react';
import DateTable from '../DateTable/DateTable';
import Table from '../Table/Table';
import style from './mainTable.module.css';

const MainTable = () => {
  const backData = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    null,
    true,
    true,
  ];

  const done = backData.filter(item => item === true).length;
  const total = backData.length;

  const percentage = Math.floor((done / total) * 100);

  return (
    <>
      <div className={style.dateTableWrapper}>
        <DateTable backData={backData} />
        <Table percentage={percentage} backData={backData} />
      </div>
    </>
  );
};

export default MainTable;
