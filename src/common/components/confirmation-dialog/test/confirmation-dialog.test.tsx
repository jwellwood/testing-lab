import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ConfirmationDialogComponent } from '../confirmation-dialog.component';

const props = {
  isOpen: true,
  onAccept: jest.fn(),
  onClose: jest.fn(),
  title: 'title',
  labels: { closeButton: 'close', acceptButton: 'accept' },
};

const mockChildren = <div>Mock Children</div>;

describe('ConfirmationDialogComponent tests', () => {
  test('should not render anything if dialog is closed', () => {
    const { queryByText } = render(
      <ConfirmationDialogComponent {...{ ...props, isOpen: false }}>
        {mockChildren}
      </ConfirmationDialogComponent>
    );
    expect(queryByText('title')).not.toBeInTheDocument();
    expect(queryByText('close')).not.toBeInTheDocument();
    expect(queryByText('accept')).not.toBeInTheDocument();
    expect(queryByText('Mock Children')).not.toBeInTheDocument();
  });
  test('should render a title', () => {
    const { getByText } = render(
      <ConfirmationDialogComponent {...props}>
        {mockChildren}
      </ConfirmationDialogComponent>
    );
    expect(getByText('title')).toBeInTheDocument();
  });
  test('should render children', () => {
    const { getByText } = render(
      <ConfirmationDialogComponent {...props}>
        {mockChildren}
      </ConfirmationDialogComponent>
    );
    expect(getByText('Mock Children')).toBeInTheDocument();
  });
  test('should render two buttons', () => {
    const { getAllByRole } = render(
      <ConfirmationDialogComponent {...props}>
        {mockChildren}
      </ConfirmationDialogComponent>
    );
    expect(getAllByRole('button')).toHaveLength(2);
  });
  test('should close the dialog when close button is clicked', () => {
    const { getAllByRole } = render(
      <ConfirmationDialogComponent {...props}>
        {mockChildren}
      </ConfirmationDialogComponent>
    );
    const closeButton = getAllByRole('button')[0];
    fireEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalled();
  });
  test('should close the dialog when accept button is clicked', () => {
    const { getAllByRole } = render(
      <ConfirmationDialogComponent {...props}>
        {mockChildren}
      </ConfirmationDialogComponent>
    );
    const acceptBtn = getAllByRole('button')[1];
    fireEvent.click(acceptBtn);
    expect(props.onAccept).toHaveBeenCalled();
  });
});
