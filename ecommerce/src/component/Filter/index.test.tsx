import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './index';

const mockOptions = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

describe('Filter Component', () => {
	it('renders with options', () => {
		const handleFilterMock = jest.fn();
		render(
			<Filter options={mockOptions} handleFilter={handleFilterMock} />,
		);

		expect(screen.getByText('Category')).toBeInTheDocument();
		expect(screen.getByLabelText('Category Filter')).toBeInTheDocument();

		mockOptions.forEach(option => {
			expect(screen.getByText(option.label)).toBeInTheDocument();
		});
	});

	it('calls handleFilter when an option is selected', () => {
		const handleFilterMock = jest.fn();
		render(
			<Filter options={mockOptions} handleFilter={handleFilterMock} />,
		);

		fireEvent.click(screen.getByLabelText('Category Filter'));
		fireEvent.click(screen.getByText('Option 1'));

		expect(handleFilterMock).toHaveBeenCalledWith(['option1']);
	});

	it('calls handleFilter with multiple selected options', () => {
		const handleFilterMock = jest.fn();
		render(
			<Filter options={mockOptions} handleFilter={handleFilterMock} />,
		);

		fireEvent.click(screen.getByLabelText('Category Filter'));
		fireEvent.click(screen.getByText('Option 1'));
		fireEvent.click(screen.getByText('Option 2'));

		expect(handleFilterMock).toHaveBeenCalledWith(['option1', 'option2']);
	});
});
