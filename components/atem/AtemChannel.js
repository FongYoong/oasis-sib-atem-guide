import { memo } from 'react';
import { VStack, Tooltip } from '@chakra-ui/react';
import AtemChannelControl from './AtemChannelControl';
import AtemBigButton from './AtemBigButton';

export default memo(function AtemChannel({children, tooltip, isLive, isPreview, previewOnClick, micEnabled, enableCallback, volumeCallback, ...props}) {
    const highlightColor = isLive ? 'red' : (isPreview ? 'green' : '');
    return (
        <VStack align="center" justify="center" {...props} >
            <AtemChannelControl micEnabled={micEnabled} enableCallback={enableCallback} volumeCallback={volumeCallback} />
                <AtemBigButton mt="6" highlight={isLive || isPreview} highlightColor={highlightColor} onClick={previewOnClick} >
                    <Tooltip w='100%' h='100%' hasArrow label={tooltip} >
                        {children}
                    </Tooltip>
                </AtemBigButton>
        </VStack>
    )
});
