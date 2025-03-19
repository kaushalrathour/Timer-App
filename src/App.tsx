import NavigationContainer from "./NavigationContainer";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useEffect } from "react";
import requestNotificationPermission from "./helpers/requestNotificationPermission";
import createNotificationChannel from "./helpers/createNotificationChannel";

export default function App ():React.JSX.Element {
  useEffect(()=>{
    requestNotificationPermission();
    createNotificationChannel();
  },[])
  return(
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  )
}