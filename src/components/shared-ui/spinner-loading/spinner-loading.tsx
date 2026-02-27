import React from 'react';
import { CircularProgress, CircularProgressProps, styled } from '@mui/material';

interface CustomCircularProgressProps extends CircularProgressProps {
  size?: number; // Custom size
  thickness?: number; // Custom thickness
  customColor?: string; // Custom color
  customStyle?: React.CSSProperties;
}

const StyledCircularProgress = styled(CircularProgress, {
  shouldForwardProp: (prop) => prop !== 'customColor',
})<CustomCircularProgressProps>(({ customColor, thickness }) => ({
  color: customColor, // Default custom color
  svg: {
    circle: {
      strokeWidth: thickness || 3.6, // Default thickness
    },
  },
}));

const SpinnerLoading: React.FC<CustomCircularProgressProps> = ({
  size = 30,
  thickness = 4,
  customColor = '#3f5f90',
  customStyle = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '20vh', // Full height of the viewport
  },
  ...props
}) => {
  return (
    <div style={customStyle}>
      <StyledCircularProgress
        size={size}
        thickness={thickness}
        customColor={customColor}
        {...props}
      />
    </div>
  );
};

export default SpinnerLoading;
