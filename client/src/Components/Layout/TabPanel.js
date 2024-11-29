import React from 'react';
import { Typography, Box } from '@material-ui/core';

function TabPanel(props) {
    const { value, index, children } = props;

    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default TabPanel;
