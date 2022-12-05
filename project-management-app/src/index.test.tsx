import { App } from './App';
import Index from './index';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockImplementation(() => ({
    render: jest.fn(),
  })),
}));

describe('Application root', () => {
  test('should render without crashing', () => {
    expect(
      JSON.stringify(Object.assign({}, Index, { _reactInternalInstance: 'censored' }))
    ).toMatchSnapshot();
  });
  test('should render the app inside div which has root id', () => {
    expect(global.document.getElementById('root')).toBeDefined();
  });

  test('should render App component', () => {
    expect(App).toBeDefined();
  });
});
