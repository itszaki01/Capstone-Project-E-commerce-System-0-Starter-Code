import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/app/store";
import { PersistGate } from "redux-persist/integration/react";
import Preloader from "./components/common/preloader/Preloader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { onAuthFail, onAuthSuccess } from "./redux/features/auth/authSlice";
import { apiService } from "./redux/services/emptySplitApi/apiSerivce";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Preloader />);
onAuthStateChanged(auth, (user) => {
    if (user) {
        store.dispatch(onAuthSuccess(user));
        store.dispatch(apiService.endpoints.getAuthUser.initiate(user));
    } else {
        store.dispatch(onAuthFail());
    }
    root.render(
        <Provider store={store}>
            <PersistGate isLoading={<Preloader />} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
});
