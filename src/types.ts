export interface License {
	name: string; // Название лицензии
}

export interface RepoInfo {
	id: string; // Id репозитория
  name: string; // Название репозитория
  language: string; // Язык программирования
  forks: number; // Количество форков
  stargazers_count: number; // Количество звезд
  updated_at: number; // Дата последнего обновления
	topics: string[]; // Теги репозитория
	license: License; // Лицензия репозитория
}

export interface RepoState {
	repoInfo?: RepoInfo[]; // Список найденных репозиториев
	activeRepo?: RepoInfo; // Выбранный репозиторий
	rowsPerPage: number; // Количество строк в таблице
	currentPage: number; // Текущая страница пагинации таблицы
	sortDirection?: 'asc' | 'desc'; // Направление сортировки таблицы
	sortBy?: keyof RepoInfo; // Поле по которому сортируется таблица
}
