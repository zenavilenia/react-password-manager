import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import App from './App';
import Register from './components/Register';
import AddApp from './components/AddApp';
import Login from './components/Login';
import Navbar from './components/Navbar';
import TablePasswordManager from './components/TablePasswordManager'
import Search from './components/Search';
import LocalStorageMock from './LocalStorageMock.js';
import Table from './components/Table';
import UserStore from './stores/UserStore.js';

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

  it('should have component form, div, button, input, label', () => {
    const component = renderer.create(<Register/>)
    expect(component).toMatchSnapshot();
    const wrapper = shallow(<Register/>);
    expect(wrapper.containsAllMatchingElements([
      <div/>,
      <form/>,
      <button/>,
      <input/>,
      <label/>
    ]))
    expect(component).toMatchSnapshot()
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

  it('should have component form, div, button, input, label', () => {
    const component = renderer.create(<Login/>)
    expect(component).toMatchSnapshot();
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsAllMatchingElements([
      <div/>,
      <form/>,
      <button/>,
      <input/>,
      <label/>
    ]))
    expect(component).toMatchSnapshot()
  })
})

describe('<TablePasswordManager/>', () => {
  it('should render start with empty key', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.state('key').length).toBe(0)
  })

  it('should render start with empty app', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.state('app').length).toBe(0)
  })

  it('should render start with empty username', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.state('username').length).toBe(0)
  })

  it('should render start with empty password', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.state('password').length).toBe(0)
  })

  it('should render start with empty createdAt', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.state('createdAt').length).toBe(0)
  })

  it('should render start with empty index', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.state('index').length).toBe(0)
  })

  it('should render <AddApp/>', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.containsAllMatchingElements([
      <AddApp/>
    ])).toBe(true)
  })

  it('should render <Table/>', () => {
    const wrapper = shallow(<TablePasswordManager/>);
    expect(wrapper.containsAllMatchingElements([
      <Table/>
    ])).toBe(true)
  })
})

describe('<AddApp/>', () => {
  it('should render start with empty app', () => {
    const wrapper = shallow(<AddApp/>);
    expect(wrapper.state('app').length).toBe(0)
  })

  it('should render start with empty username', () => {
    const wrapper = shallow(<AddApp/>);
    expect(wrapper.state('username').length).toBe(0)
  })

  it('should render start with empty password', () => {
    const wrapper = shallow(<AddApp/>);
    expect(wrapper.state('password').length).toBe(0)
  })

  it('should render <Search/>', () => {
    const wrapper = shallow(<AddApp/>);
    expect(wrapper.containsAllMatchingElements([
      <Search/>
    ])).toBe(true)
  })

  it('should add new app', async () => {
    const wrapper = shallow(<AddApp/>);
    wrapper.setState({
      app: 'testapp',
      username: 'testusername',
      password: 'testpassword'
    });
    wrapper.find('form')
           .simulate('submit', {
             preventDefault () { }
           })
    
  })
})

describe('<Search/>', () => {
  it('should render start with empty app', () => {
    const wrapper = shallow(<Search/>);
    expect(wrapper.state('search').length).toBe(0)
  })
})

// describe('UserStore', () => {
//   it('should create new app', () => {
//     const store = new UserStore;
    
//   })
// })