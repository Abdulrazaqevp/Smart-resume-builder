import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { configureNotifications } from "./lib/notifications";

configureNotifications();

createRoot(document.getElementById('root')).render(<App />);
