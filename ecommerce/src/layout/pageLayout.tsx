import { Box, Grid } from '@mui/material';
import { ReactNode } from 'react';
import Header from './header';

const PageLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				flexGrow: 1,
				maxWidth: '1500px',
				margin: 'auto',
				padding: '30px',
			}}
		>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={4} sm={8} md={12}>
					<Header />
				</Grid>
				{children}
			</Grid>
		</Box>
	);
};

export default PageLayout;
