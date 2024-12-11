import React from 'react';
import { Box } from '@mui/material';

export const AppBox= ({ children, sx }) => {
  return <Box sx={sx}>{children}</Box>;
};
