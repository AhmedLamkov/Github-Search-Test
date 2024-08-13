import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button } from '@mui/material';
import classes from './Header.module.css'
import ApiService from '../../api/apiService';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setRepoInfo } from '../../store/RepoSearch';


const Header = ()=> {
	const { rowsPerPage, currentPage } = useAppSelector((state) => ({
		rowsPerPage: state.rowsPerPage,
		currentPage: state.currentPage,
	}));

	const dispatch = useAppDispatch();
	const [query, setQuery] = useState('');

	// Обработчик ввода в поле поиска
	const handleChangeQuery = useCallback((target: ChangeEvent<HTMLInputElement>) => {
		setQuery(target.currentTarget.value);
	}, []);

	// Обработчик нажатия на кнопку Искать
	const handleSearch = useCallback(async () => {
		const result = await ApiService.searchRepos(query, rowsPerPage, currentPage + 1);
		dispatch(setRepoInfo(result.items));
	}, [currentPage, dispatch, query, rowsPerPage]);

	return (
		<header className={classes.root}>
			<input className={classes.input} value={query} onChange={handleChangeQuery} placeholder="Введите поисковый запрос"></input>
			<Button size="large" variant="contained" onClick={handleSearch}>Искать</Button>
		</header>
	);
};

export default Header