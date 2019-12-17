import React from 'react';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import '~/config/ReactotronConfig';

import Routes from '~/routes';

const App = () => <Routes />;

export default App;
