import React from 'react';
import { createRoot } from 'react-dom/client';
import './translations';
import 'fonts.css';

import App from '@/app/App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
