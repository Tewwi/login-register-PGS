import React, { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Table from '../components/Table';
import { mockData } from '../../../configs/mock-data';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { setTableData, setTableTempData } from '../redux/tableRedux';
import { ITableItem } from '../../../models/table';
import Footer from '../components/Footer';

const TablePage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataTable, setDataTable] = useState<ITableItem[]>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    currItem: 0,
    itemPerPage: 10,
    totalItem: mockData.length,
  });
  const data = useSelector((state: AppState) => state.table.tempItem);

  const handleChangePage = (num: number) => {
    if (dataTable) {
      if (num === 1 || num === dataTable?.length - 1) return;
      setPageInfo((prev) => {
        return { ...prev, page: num, currItem: num * pageInfo.itemPerPage - 10 };
      });
    }
  };

  useEffect(() => {
    dispatch(setTableData(mockData));
    dispatch(setTableTempData(mockData));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setDataTable(data.slice(pageInfo.currItem, pageInfo.page * pageInfo.itemPerPage));
    }
  }, [data, pageInfo]);

  useEffect(() => {
    if (data) {
      setPageInfo({ page: 1, currItem: 0, itemPerPage: 10, totalItem: data.length });
    }
  }, [data]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-4">
        <h3>Payroll Trancactions List</h3>
        <div className="btn btn-primary" style={{ width: '170px' }}>
          Export CSV
        </div>
      </div>
      <div>
        <Filter />
        {dataTable && <Table data={dataTable} />}
        {dataTable && (
          <Footer
            currPage={+pageInfo.page}
            totalPage={+(pageInfo.totalItem / pageInfo.itemPerPage)}
            itemPerPage={+pageInfo.itemPerPage}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default TablePage;
