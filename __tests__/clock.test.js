import renderer from 'react-test-renderer';
import Clock from '../src/core/components/clock';

jest.useFakeTimers().setSystemTime(new Date('2021-01-01T00:00:00Z').getTime());

it('renders correctly', () => {
  const testRenderer = renderer.create(<Clock />);

  try {
    expect(testRenderer.toJSON()).toMatchSnapshot();
  } finally {
    testRenderer.unmount();
  }
});
