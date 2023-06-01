import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material';
import rawpixel_holographic from '../images/rawpixel_holographic-background.jpg';

const styles = {
    patternedBackground: {
        backgroundImage: `url(${rawpixel_holographic})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px',
        width: '100%',
        maxHeight: false,
        minHeight: '100vh'
    },
    opaqueBacking: {
        backgroundColor: alpha('#FFFFFF', 1),
        width: '80%',
        height: '100%',
        margin: 'auto',
        borderRadius: '0px',
        minHeight: '100vh'
    },
    semiTransparentBacking: {
        backgroundColor: alpha('#FFFFFF', 0.7),
        width: '80%',
        height: '100%',
        margin: 'auto',
        borderRadius: '0px',
        minHeight: '100vh'
    },
    darkenBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: alpha('#000000', 0),
    },
};

function Background({children, opaque, nospacing}) {
    return (
        <Paper container style={styles.patternedBackground}>
            <Paper container style={opaque ? styles.opaqueBacking : styles.semiTransparentBacking} position="fixed" elevation={0}>
                {nospacing && (
                    <Grid container margin="auto">
                        { children }
                    </Grid>
                )}
                {!nospacing && (
                    <Grid container rowSpacing={1} sx={{ px: '40px', py: '30px' }} margin="auto">
                        { children }
                    </Grid>
                )}
            </Paper>
        </Paper>
    );
}

export default Background;