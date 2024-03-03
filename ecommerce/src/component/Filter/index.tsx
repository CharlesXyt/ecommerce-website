import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Checkbox, ListItemText } from '@mui/material';

interface FilterProps {
	options: { label: string; value: string }[];
	handleFilter: (value: string[]) => void;
}

export default function Filter(props: FilterProps) {
	const [value, setValue] = React.useState<string[]>([]);
	const { handleFilter } = props;

	const onChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value: targetValue },
		} = event;
		const newValue =
			typeof targetValue === 'string'
				? targetValue.split(',')
				: targetValue;
		setValue(newValue);
		handleFilter(newValue);
	};

	return (
		<FormControl fullWidth>
			<InputLabel id='category-select-label'>Category</InputLabel>
			<Select
				labelId='category-select-label'
				id='category-select'
				multiple
				value={value}
				onChange={onChange}
				renderValue={selected => selected.join(', ')}
				data-testid='category-select'
			>
				{props.options.map(option => (
					<MenuItem key={option.value} value={option.value}>
						<Checkbox checked={value.indexOf(option.value) > -1} />
						<ListItemText primary={option.label} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
