import React from 'react';
import { motion, Variants } from 'framer-motion';

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.3,
        ease: [0.6, 0.05, -0.01, 0.9] as [number, number, number, number],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
  },
};

const StaggerChildren: React.FC<StaggerChildrenProps> = ({ 
  children, 
  className = '',
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerChildren;