import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { swallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Navbar from './components/Navbar'

Enzyme.configure({ adapter: new Adapter() });

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

// describe('<App/>', () => {
//   it('should render <Navbar/>', () => {
//     const wrapper = swallow(<App/>);
//     expect(wrapper.containsAllMatchingElements([
//       <Navbar/>
//     ])).to.be.true
//   })
// })