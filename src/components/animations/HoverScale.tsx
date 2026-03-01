import React from 'react';
import { motion } from 'framer-motion';

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

const HoverScale: React.FC<HoverScaleProps> = ({ 
  children, 
  scale = 1.05,
  className = '' 
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 17 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default HoverScale;