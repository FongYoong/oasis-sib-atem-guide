import { memo } from 'react';
import { Flex, Box, Heading,
Slider,
SliderTrack,
SliderFilledTrack,
SliderThumb } from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';

export default memo(function MicIndicator({children, micEnabled, volume, setVolume, ...props}) {
    return (
        <Flex align="center" justify="center" {...props} >
            <Heading textDecoration={micEnabled?'':'line-through'} opacity={micEnabled?'1':'0.5'} textAlign='center' m={4} color='white' fontSize="xl" fontWeight="extrabold" >
                {children}
            </Heading>
            <Slider w='35vw' h='0.5em' value={volume} onChange={(val) => setVolume(val)} >
            <SliderTrack bg="red.100">
                <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6}>
                <Box color="tomato" as={MdGraphicEq} />
            </SliderThumb>
            </Slider>
        </Flex>
    )
});
