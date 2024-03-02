import TextField from '@mui/material/TextField';

interface SearchInputProps {
	handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: SearchInputProps) => {
	const { handleSearch } = props;

	return (
		<TextField
			id='outlined-search'
			label='Search field'
			type='search'
			onChange={handleSearch}
		/>
	);
};

export default SearchInput;
