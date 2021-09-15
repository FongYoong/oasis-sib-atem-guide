import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import AtemMiniButton from './AtemMiniButton';

export default memo(function AtemPiPButton({...props}) {
    return (
        <AtemMiniButton highlightColor='yellow' >
            <Box m='1' borderRadius='2' position='absolute' w='45%' h='40%' bg='gray.300' {...props}>
                &nbsp;
            </Box>
        </AtemMiniButton>
    )
});
