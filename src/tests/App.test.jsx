import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import APP from '../App';

describe('APP', () => {
  test('should calculate pensions correctly', () => {
    render(<APP />);

    fireEvent.change(screen.getByLabelText('年齡:'), { target: { value: '65' } });
    fireEvent.change(screen.getByLabelText('性別:'), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText('保險年資:'), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText('平均月投保薪資:'), { target: { value: '30000' } });

    fireEvent.click(screen.getByText('計算'));

    expect(screen.getByText(/老年年金給付:/)).toHaveTextContent('老年年金給付: 12345.67');
    expect(screen.getByText(/老年一次金給付:/)).toHaveTextContent('老年一次金給付: 23456.78');
    expect(screen.getByText(/一次請領老年給付:/)).toHaveTextContent('一次請領老年給付: 34567.89');
  });
});