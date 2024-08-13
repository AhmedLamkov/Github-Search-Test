import classes from './Details.module.css';
import { useAppSelector } from '../../hooks/store';
import {Chip} from '@mui/material';
import Star from '../Icons/Star';

const Details = () => {
	const { activeRepo} = useAppSelector((state) => ({
		activeRepo: state.activeRepo,
	}));

	return (
		<div className= {classes.root}>
			{activeRepo ? (
				<>
					<div className={classes.name}>{activeRepo.name}</div>
					<div className={classes.row}>
						<Chip label={activeRepo.language} color='primary'  size='medium'/>
						<div className={classes.stargazers}>
							<Star/>
							<div className={classes.number}>{activeRepo.stargazers_count}</div>
						</div>
					</div>
					<div className={classes.chip}>
						{activeRepo.topics.map(topic => (
							<Chip size='small' label={topic} />
						))}
					</div>
					{activeRepo.license && <div>{activeRepo.license.name}</div>}
				</>
			) : (
				<div className={classes.placeholder}>
					Выберите репозиторий
				</div>
			)}
		</div>
	);
}

export default Details