import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import useSettings from 'src/hooks/useSettings';
import useTable from 'src/hooks/useTable';
import { PATH_DASHBOARD } from 'src/routes/paths';
import SubjectTableRow from 'src/sections/subject/list/SubjectTableRow';
import SubjectTableToolbar from 'src/sections/subject/list/SubjectTableToolbar';
import axiosInstance from 'src/utils/axios';

const TABLE_HEAD = [
  { id: 'code', label: 'Code', align: 'left' },
  { id: 'name', label: 'Role', align: 'left' },
  { id: '' },
];

export default function ExaminationReportList() {
  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [filterText, setFilterText] = useState('');

  const handleBtnClick = () => {
    navigate(PATH_DASHBOARD.subject.new);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleFilterTextChange = (value: string) => {
    setFilterText(value);
  };

  const handleRowClick = (value: string) => {
    navigate(PATH_DASHBOARD.subject.edit(value));
  };

  const [data, setData] = useState<any[]>([]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const fetch = useCallback(
    async (value) => {
      try {
        // "pageNum" : 1,
        // "pageSize": 10,
        // "keyword": "a",
        // "orderBy": "name",
        // "sort": "asc"
        const response: any = await axiosInstance.post('/exanmination_report/search', {
          pageNum: page + 1,
          pageSize: rowsPerPage,
          keyword: value,
          orderBy: 'name',
          sort: 'asc',
        });

        if (response.error) {
          throw Error(response.error);
        }
        setData(response);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error, { variant: 'error' });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, rowsPerPage]
  );

  useEffect(() => {
    fetch(filterText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, filterText]);

  const isNotFound = !data.length;
  const total = 10;

  return (
    <Page title="Topic: Listing">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Topic: Listing"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Topic',
              href: PATH_DASHBOARD.subject.root,
            },
            { name: 'Listing' },
          ]}
          action={
            <Button variant="contained" onClick={() => handleBtnClick()}>
              Create
            </Button>
          }
        />

        <Card>
          <SubjectTableToolbar filterText={filterText} onFilterText={handleFilterTextChange} />

          <TableContainer>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data.length}
                numSelected={selected.length}
              />

              <TableBody>
                {data.map((row: any) => (
                  <SubjectTableRow
                    key={row.id}
                    row={row}
                    onRowClick={() => handleRowClick(row.id)}
                  />
                ))}
                {/* 
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, data.length)}
                /> */}

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
