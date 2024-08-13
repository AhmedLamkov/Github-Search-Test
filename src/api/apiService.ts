// Сервис для взаимодейсвия с API Github
export class ApiService {
	static async searchRepos(query: string, page: number, perPage: number) {
		const response = await fetch(`https://api.github.com/search/repositories?q=${query}&page=${page}per_page=${perPage}`);

		return response.json();
	}
}

export default ApiService;
