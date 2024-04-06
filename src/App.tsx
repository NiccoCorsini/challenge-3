import { Provider } from "react-redux";
import { store } from "./store/store";
import Paper from "./components/Paper";

const App = () => {
  return (
    <Provider store={store}>
      <div className="dead-center height100">
        <Paper />
      </div>
    </Provider>
  );
};

export default App;
