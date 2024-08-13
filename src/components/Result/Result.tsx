import React, { useCallback, useMemo } from 'react';
import { Table, TableBody, TableHead, TableCell , TableContainer , TableRow , TablePagination, TableSortLabel } from '@mui/material';
import classes from './Result.module.css';
import Empty from '../Empty';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setActiveRepo, setCurrentPage, setRowsPerPage, setSortBy, setSortDirection } from '../../store/RepoSearch';
import { RepoInfo } from '../../types';


const headCells: readonly HeadCell[] = [
	{
		id:'name',
		label: 'Название'
	},
	{
		id:'language',
		label: 'Язык'
	},
	{
		id:'forks',
		label: 'Число форков',
		sortable: true,
	},
	{
		id:'stargazers_count',
		label: 'Число звезд',
		sortable: true,
	},
	{
		id:'updated_at',
		label: 'Дата обновления',
		sortable: true,
	}
];

interface HeadCell {
	id: keyof RepoInfo; // Ключ колонки
	label: string; // Название колонки
	sortable?: boolean; // Сортируема ли колонка
}

const Result = () => {
	const { repoInfo, sortBy, sortDirection, currentPage, rowsPerPage } = useAppSelector((state) => ({
		repoInfo: state.repoInfo,
		sortBy: state.sortBy,
		sortDirection: state.sortDirection,
		currentPage: state.currentPage,
		rowsPerPage: state.rowsPerPage,
	}));

	const dispatch = useAppDispatch();

	// Выбор репозитория
	const changeActiveRepo = useCallback((repoInfo: RepoInfo) => {
		dispatch(setActiveRepo(repoInfo));
	}, [dispatch]);

	// Изменение страницы пагинации
  const handleChangePage = useCallback((
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(setCurrentPage(newPage));
  }, [dispatch]);

	// Изменение количества рядов в таблице
  const handleChangeRowsPerPage = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setCurrentPage(0));
  }, [dispatch]);

	// Изменение поля или направления сортировки
	const handleSort = useCallback((
    property: keyof RepoInfo,
  ) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    dispatch(setSortDirection(isAsc ? 'desc' : 'asc'));
    dispatch(setSortBy(property));
  }, [dispatch, sortBy, sortDirection]);
	
	const rows = useMemo(() => {
		const sortedRows = sortBy && repoInfo
			? [...repoInfo]?.sort((a, b) => sortDirection === 'asc'
				? a[sortBy] > b[sortBy] ? 1 : -1 : a[sortBy] < b[sortBy] ? 1 : -1)
			: repoInfo;
		return sortedRows?.slice(
			currentPage * rowsPerPage,
			currentPage * rowsPerPage + rowsPerPage,
		);
	}, [currentPage, repoInfo, rowsPerPage, sortBy, sortDirection]); 

	if (!rows) {
		return <Empty />
	}

	return (
		<section className={classes.root} >
			<div className={classes.wrapper}>
				<h1 className={classes.title}>Результаты поиска</h1>
				<TableContainer className={classes.tableContainer}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableHead>
							<TableRow>
								{headCells.map((headCell) => {
									const handleClickSort = () => handleSort(headCell.id);
									return (
									<TableCell
										key={headCell.id}
										sortDirection={sortBy === headCell.id ? sortDirection : false}
									>
										{headCell.sortable ? (
											<TableSortLabel
												active={sortBy === headCell.id}
												direction={sortBy === headCell.id ? sortDirection : 'asc'}
												onClick={handleClickSort}
											>
												{headCell.label}
											</TableSortLabel>
										) : headCell.label}
										
									</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => {
								const handleClick = () => changeActiveRepo(row);

								return (
									<TableRow
										key={row.id}
										sx={{ cursor: 'pointer' }}
										onClick={handleClick}
									>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.language}</TableCell>
										<TableCell>{row.forks}</TableCell>
										<TableCell>{row.stargazers_count}</TableCell>
										<TableCell>{row.updated_at}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination 
					className={classes.pagination}
					rowsPerPageOptions={[5, 10, 25]} 
					component='div'
		      count={repoInfo?.length || 0}
		      page={currentPage}
		      rowsPerPage={rowsPerPage}
					onPageChange={handleChangePage}
		      onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</section>
	);
};

export default Result