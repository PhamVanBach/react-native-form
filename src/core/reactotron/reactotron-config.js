import Reactotron, { networking, asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure({ name: 'MosoApp' })
  .useReactNative({
    asyncStorage: true,
    networking: {
      // Ignore some of logs not necessary
      ignoreUrls: /symbolicate/,
    },
  })
  .use(
    asyncStorage({
      ignore: ['secret'],
    }),
  )
  .use(
    networking({
      // Ignore some of logs not necessary
      ignoreUrls: /generate_204/,
    }),
  )
  .use(reactotronRedux())
  .use(sagaPlugin({ except: [''] }))
  .connect();

/* You should be clear all of logs everytime you start up */
Reactotron.clear();
const sagaMonitor = Reactotron.createSagaMonitor();
export { sagaMonitor, reactotron };
