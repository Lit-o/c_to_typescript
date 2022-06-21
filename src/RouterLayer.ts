import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter, RouteComponentProps } from 'react-router-dom';
import App from './App';
import store from './redux/store';

// const RouterLayer: React.FC<RouteComponentProps<any>> = () => {
//     return (
//             <BrowserRouter>
//                 <Provider store={store} >
//                     <App/>
//                 </Provider>
//             </BrowserRouter>
//         )
// };

// export default RouterLayer;