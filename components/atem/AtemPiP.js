import { memo } from 'react';
import { Flex, VStack, Heading } from '@chakra-ui/react';
import AtemMiniButton from './AtemMiniButton';
import AtemPiPButton from './AtemPiPButton';

export default memo(function AtemPiP({enabled, enableCallback, ...props}) {
    return (
        <VStack align="center" justify="center" {...props} >
            <Flex align="center" justify="center" >
                <VStack align="center" justify="center" >
                    <AtemPiPButton left='0' top='0' />
                    <AtemPiPButton left='0' bottom='0' />
                </VStack>
                <VStack align="center" justify="center" >
                    <AtemPiPButton right='0' top='0' />
                    <AtemPiPButton right='0' bottom='0' />
                </VStack>
                <VStack align="center" justify="center" >
                    <AtemMiniButton highlight={enabled} onClick={() => enableCallback(true)} >
                        ON
                    </AtemMiniButton>
                    <AtemMiniButton highlight={!enabled} onClick={() => enableCallback(false)} >
                        OFF
                    </AtemMiniButton>
                </VStack>
            </Flex>
            <Heading textAlign='center' px={8} m={4} color='white' fontSize="md" fontWeight="bold" >
                PICTURE IN PICTURE
            </Heading>
        </VStack>
    )
});
