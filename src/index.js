import ReactDOM from 'react-dom'; // Correct import

import './index.css';
import App from './App';
import { AuthContextProvider } from './components/store/auth-context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
