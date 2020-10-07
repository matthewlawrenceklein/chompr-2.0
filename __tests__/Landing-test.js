
import React from 'react';
import renderer from 'react-test-renderer';
import Landing from '../components/Landing'

test('renders correctly', () => {
    const tree = renderer.create(<Landing />).toJSON();
    expect(tree).toMatchSnapshot();
});