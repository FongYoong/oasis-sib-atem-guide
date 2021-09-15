import { memo } from 'react';
import { VStack } from '@chakra-ui/react';
import AtemChannelControl from './AtemChannelControl';
import AtemBigButton from './AtemBigButton';

export default memo(function AtemChannel({children, isLive, isPreview, previewOnClick, micEnabled, enableCallback, volumeCallback, ...props}) {
    const highlightColor = isLive ? 'red' : (isPreview ? 'green' : '');
    return (
        <VStack align="center" justify="center" {...props} >
            <AtemChannelControl micEnabled={micEnabled} enableCallback={enableCallback} volumeCallback={volumeCallback} />
            <AtemBigButton mt="6" highlight={isLive || isPreview} highlightColor={highlightColor} onClick={previewOnClick} >
                {children}
            </AtemBigButton>
        </VStack>
    )
});
