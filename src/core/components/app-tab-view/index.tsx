import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';

interface Route {
  key: string;
  title: string;
}

interface AppTabViewProps {
  routes: Route[];
  scenes: {[key: string]: React.ComponentType<any>};
  sceneProps?: {[key: string]: any};
  initialIndex?: number;
  lazy?: boolean;

  onIndexChange?: (index: number) => void;
}

export const AppTabView: React.FC<AppTabViewProps> = ({
  routes,
  scenes,
  sceneProps,
  lazy = true,
  initialIndex = 0,
  onIndexChange,
}) => {
  const [index, setIndex] = React.useState(initialIndex);
  const [tabRoutes] = React.useState(routes);

  const renderScene = ({route, jumpTo}: any) => {
    const Scene = scenes[route.key];
    return <Scene jumpTo={jumpTo} {...sceneProps?.[route.key]} />;
  };

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      tabStyle={styles.tab}
      pressOpacity={1}
      pressColor={'transparent'}
      inactiveColor={'#000'}
      activeColor={'#000'}
    />
  );

  return (
    <TabView
      lazy={lazy}
      navigationState={{index, routes: tabRoutes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={{width: Dimensions.get('window').width}}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  indicator: {
    backgroundColor: '#000',
    height: 2,
  },
  label: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tab: {
    margin: 0,
  },
});
