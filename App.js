import React from 'react';
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(false);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken(null);
      setIsLoading(false)
    }
  }));
  return (
    <AppNavigation userToken={userToken}></AppNavigation>
  );
}

export default App;
