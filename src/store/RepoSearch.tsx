import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepoState, RepoInfo } from "../types";

const initialState: RepoState = {
	repoInfo: undefined,
	activeRepo: undefined,
	rowsPerPage: 10,
	currentPage: 1,
	sortDirection: 'asc',
	sortBy: undefined,
}

const { actions, reducer } = createSlice({
	name: 'repoSearch',
	initialState,
	reducers: {
		setRepoInfo(state, action: PayloadAction<RepoInfo[]>) {
			state.repoInfo = action.payload;
		},
		setActiveRepo(state, action: PayloadAction<RepoInfo>) {
			state.activeRepo = action.payload;
		},
		setRowsPerPage(state, action: PayloadAction<number>) {
			state.rowsPerPage = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSortDirection(state, action: PayloadAction<'asc' | 'desc'>) {
			state.sortDirection = action.payload;
		},
		setSortBy(state, action: PayloadAction<keyof RepoInfo>) {
			state.sortBy = action.payload;
		},
	}
})

export const { setRepoInfo, setActiveRepo, setRowsPerPage, setCurrentPage, setSortBy, setSortDirection } = actions;

export default reducer;