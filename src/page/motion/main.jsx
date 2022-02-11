import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

const MyComponent = () => (
  <motion.div animate={{ scale: 3 }} transition={{ duration: 1 }}>
    <div style={{ textAlign: 'center', lineHeight: '100vh' }}>hello motion</div>
  </motion.div>
);

ReactDOM.render(<MyComponent />, document.getElementById('root'));
