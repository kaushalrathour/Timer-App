import NavigationContainer from "./NavigationContainer";
import { Provider } from "react-redux";
import { store } from "./app/store";

export default function App ():React.JSX.Element {
  return(
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  )
}