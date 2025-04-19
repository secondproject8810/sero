import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the app with both methods for maximum compatibility
AppRegistry.registerComponent('main', () => App);
registerRootComponent(App); 