import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

interface Route {
  key: string;
  title: string;
}

interface AppTabViewProps {
  routes: Route[];
  scenes: {[key: string]: React.ComponentType<any>};
  initialIndex?: number;
}

export const AppTabView: React.FC<AppTabViewProps> = ({
  routes,
  scenes,
  initialIndex = 0,
}) => {
  const [index, setIndex] = React.useState(initialIndex);
  const [tabRoutes] = React.useState(routes);

  const renderScene = SceneMap(scenes);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      activeColor="#000"
      inactiveColor="#666"
    />
  );

  return (
    <TabView
      navigationState={{index, routes: tabRoutes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
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
    textTransform: 'none',
  },
});
