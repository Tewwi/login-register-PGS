import React, { useCallback, useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Table from '../components/Table';
import { mockData } from '../../../configs/mock-data';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { setTableData, setTableTempData, sortData } from '../redux/tableRedux';
import { ITableItem } from '../../../models/table';
import Footer from '../components/Footer';

const TablePage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataTable, setDataTable] = useState<ITableItem[]>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    currItem: 0,
    itemPerPage: 5,
    totalItem: mockData.length,
  });
  const data = useSelector((state: AppState) => {
    return state.table.tempItem;
  });

  const handleChangePage = useCallback(
    (num: number) => {
      if (dataTable) {
        if (num === 0 || num === Math.ceil(pageInfo.totalItem / pageInfo.itemPerPage) + 1) return;

        setPageInfo((prev) => {
          return { ...prev, page: num, currItem: num * pageInfo.itemPerPage - pageInfo.itemPerPage };
        });
      }
    },
    [dataTable, pageInfo.totalItem, pageInfo.itemPerPage],
  );

  const sortDatabyDate = useCallback(() => {
    if (data) {
      dispatch(sortData());
      setPageInfo({ page: 1, currItem: 0, itemPerPage: 5, totalItem: data.length });
    }
  }, [dispatch, data]);

  const changeItemPerPage = useCallback((num: number) => {
    setPageInfo((prev) => {
      return { ...prev, itemPerPage: num, page: 1, currItem: 0 };
    });
  }, []);

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
      if (data.length != pageInfo.totalItem) {
        console.log('reset page');
        setPageInfo({ page: 1, currItem: 0, itemPerPage: 5, totalItem: data.length });
        return;
      }
    }
  }, [data, pageInfo.totalItem, pageInfo.currItem, pageInfo.page, pageInfo.itemPerPage]);

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
        {dataTable && <Table data={dataTable} sort={sortDatabyDate} />}
        {dataTable && (
          <Footer
            currPage={+pageInfo.page}
            totalPage={+(pageInfo.totalItem / pageInfo.itemPerPage)}
            itemPerPage={+pageInfo.itemPerPage}
            handleChangePage={handleChangePage}
            handleChangeItemPerPage={changeItemPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default TablePage;
