import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import TablePasswordManager from './components/TablePasswordManager'
import LocalStorageMock from './LocalStorageMock.js';

Enzyme.configure({ adapter: new Adapter() });

global.localStorage = new LocalStorageMock;

it('renders without crashing', () => {
  const div = document.createElement('div', { id: 'root' });
  ReactDOM.render(<div id="root"><App /></div>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('tes the environment', () => {
  it('works, hopefully', () => {
    expect(true).toEqual(true)
  })
})

describe('<App/>', () => {
  it('should render <Navbar/>', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.containsAllMatchingElements([
      <Navbar/>
    ])).toBe(true)
  })
})

describe('<Register/>', () => {
  it('should render start with empty email', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.state('email').length).toBe(0)
  })

  it('should render start with empty password', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.state('password').length).toBe(0)
  })
})

describe('<Login/>', () => {
  it('should render start with empty email', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.state('email').length).toBe(0)
  })

  it('should render start with empty password', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.state('password').length).toBe(0)
  })
})

// modalIsOpen: false,
// modalCheckPwdIsOpen: false,
// key: '',
// app: '',
// username: '',
// password: '',
// createdAt: '',
// index: '',

describe('<TablePasswordManager/>', () => {
  it('should render start with empty key', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.state('key').length).toBe(0)
  })
})