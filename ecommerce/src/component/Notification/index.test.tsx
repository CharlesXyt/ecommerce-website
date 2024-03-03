import { render, waitFor, screen } from '@testing-library/react';
import Notification from './index';

describe('Notification Component', () => {
	it('renders and disappears after the specified duration', async () => {
		const onCloseMock = jest.fn();

		render(
			<Notification
				message='Test Notification'
				type='success'
				showNotification={true}
				onClose={onCloseMock}
				duration={2000}
			/>,
		);

		expect(screen.getByText('Test Notification')).toBeInTheDocument();

		await waitFor(
			() => {
				expect(onCloseMock).toHaveBeenCalled();
			},
			{ timeout: 3000 },
		);
	});
});
