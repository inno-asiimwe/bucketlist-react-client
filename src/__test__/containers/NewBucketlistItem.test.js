import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { NewItem } from '../../containers/NewBucketlistItem';

describe('NewItem', () => {
  it('Matches its snapshot', () => {
    const output = shallow(<NewItem
      match={{ params: { id: 1 } }}
      handleSubmit={() => {}}
      auth={{ Authenticated: true }}
    />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
