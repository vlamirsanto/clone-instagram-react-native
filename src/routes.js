import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Feed from '~/pages/Feed';
import New from '~/pages/New';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Feed,
      New,
    },
    {
      defaultNavigationOptions: {
        headerTitle: 'Instagram',
        headerTintColor: '#000',
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);

export default Routes;
