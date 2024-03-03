import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';

interface NotificationProps {
	message: string;
	type: 'success' | 'error' | 'warning' | 'info';
	showNotification: boolean;
	onClose: () => void;
	duration?: number;
}
const Notification: React.FC<NotificationProps> = ({
	message,
	showNotification,
	onClose,
	type,
	duration = 2000,
}) => {
	useEffect(() => {
		if (showNotification) {
			const timerId = setTimeout(() => {
				onClose();
			}, duration);
			return () => {
				clearTimeout(timerId);
			};
		}
	}, [showNotification]);

	return showNotification ? (
		<Alert
			severity={type}
			sx={{
				position: 'fixed',
				bottom: '20px',
				right: '40px',
				zIndex: 10,
			}}
		>
			{message}
		</Alert>
	) : (
		<></>
	);
};

export default Notification;
