/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

export function App(props) {
  // noinspection JSAnnotator
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Resto"
        defaultTitle="Resto partner app"
        meta={[
            { name: 'partner app', content: 'Resto' },
        ]}
      />
      {React.Children.toArray(props.children)}
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;/**
 * Created by c260 on 1/11/17.
 */
