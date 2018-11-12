import React from 'react';
import { observer, inject } from 'mobx-react';
import { Linking } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon, Linking as ExpoLinking } from 'expo';

import {
  AccountScreen,
  SettingsScreen,
  AddNetworkScreen,
  NetworkScreen as SettingsNetworkScreen,
  AccountsScreen,
  TransferScreen,
  TransferAmountScreen,
  TransferResultScreen,
  PermissionRequestScreen,
  ManageResourceScreen,
  PermissionScreen,
  ActivityScreen,
  ActivityDetailScreen
} from '../../screens/Main';

import {
  ImportAccountScreen,
  ShowErrorScreen,
  ConfirmPinScreen,
  ConfirmAppPinScreen,
  NewPinScreen,
  NewAppPinScreen
} from '../../screens/Shared';

import { Theme } from '../../constants';

// detail screens
const DetailScreens = {
  // accounts
  ImportAccount: ImportAccountScreen,
  ManageResource: ManageResourceScreen,
  Transfer: TransferScreen,
  TransferAmount: TransferAmountScreen,
  TransferResult: TransferResultScreen,
  Permission: PermissionScreen,
  // settings
  SettingsNetwork: SettingsNetworkScreen,
  AddNetwork: AddNetworkScreen,
  Accounts: AccountsScreen,
  // activity
  ActivityDetail: ActivityDetailScreen,
  // confirm pincode
  ConfirmPin: ConfirmPinScreen,
  ConfirmAppPin: ConfirmAppPinScreen,
  // new pincode
  NewPin: NewPinScreen,
  NewAppPin: NewAppPinScreen,
  // confirm dapp sign
  PermissionRequest: PermissionRequestScreen,
  // show error
  ShowError: ShowErrorScreen
};

// for tab icons
const iconMap = {
  Account: 'md-contact',
  Activity: 'md-filing',
  Settings: 'md-settings'
};

// tab navigator
const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Account: AccountScreen,
    Activity: ActivityScreen,
    Settings: SettingsScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        return (
          <Icon.Ionicons
            size={26}
            name={iconMap[routeName]}
            color={tintColor}
          />
        );
      }
    }),
    shifting: true,
    activeColor: Theme.activeColor,
    inactiveColor: Theme.inActiveColor,
    barStyle: {
      backgroundColor: Theme.mainBackgroundColor
    }
  }
);

@inject('accountStore')
@observer
class MainTabNavigatorWrapper extends React.Component {
  constructor(params) {
    super(params);

    this.addLinkingListener();
    this.state = { redirectData: null, initialLinkingUri: '' };
  }

  handleLinkingHandler = event => {
    const data = ExpoLinking.parse(event.url);
    if (data.path && data.path !== '') {
      this.props.navigation.navigate(data.path, data.queryParams);
    }
    this.setState({ redirectData: data });
  };

  addLinkingListener = () => {
    ExpoLinking.addEventListener('url', this.handleLinkingHandler);
  };

  async componentWillMount() {
    const initialLinkingUri = await Linking.getInitialURL();
    const data = ExpoLinking.parse(initialLinkingUri);
    if (data.path && data.path !== '') {
      this.props.navigation.navigate(data.path, data.queryParams);
    }
    this.setState({ initialLinkingUri });
  }

  componentWillUnmount() {
    ExpoLinking.removeEventListener('url', this.handleLinkingHandler);
  }

  componentDidMount() {
    this.props.accountStore.getAccountInfo();
  }

  render() {
    return <MainTabNavigator navigation={this.props.navigation} />;
  }
}

MainTabNavigatorWrapper.router = MainTabNavigator.router;

export const MainStackNavigator = createStackNavigator(
  {
    MainTab: MainTabNavigatorWrapper,
    ...DetailScreens
  },
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: '#fff' }
  }
);
