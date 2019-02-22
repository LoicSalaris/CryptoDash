import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Error404 from './Error404'

configure({ adapter: new EnzymeAdapter() });

describe('rendering Error404', () => {

    it('+++ renders error404 div class', () => {
        expect(shallow(<Error404 />).find('.error404-view').length).toEqual(1);
    });
});