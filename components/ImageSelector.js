import { useState, memo } from 'react';
import { Zoom } from "react-awesome-reveal";
import { useDisclosure, Box, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Icon,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton
} from '@chakra-ui/react';
import { MotionButton, MotionImage } from './MotionElements';
import { FaRegCheckCircle } from 'react-icons/fa';

export default memo(function ImageSelector({children, buttonIcon, data, onClick}) {
    const modalState = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(data)[0]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <>
        <MotionButton leftIcon={buttonIcon} onClick={modalState.onOpen} >
            {children}
        </MotionButton>
        <Modal size='full' isOpen={modalState.isOpen} onClose={modalState.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{children}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs isLazy defaultIndex={Object.keys(data).indexOf(selectedCategory)}  >
                    <TabList>
                        {Object.keys(data).map((category) => 
                            <Tab key={category} >{category}</Tab> 
                        )}
                    </TabList>
                    <TabPanels>
                        {Object.keys(data).map((category) => 
                            <TabPanel key={category} >
                                <Flex wrap='wrap' align='start' justify='start' >
                                    {data[category].map((imageUrl, key) => {
                                        const selected = selectedCategory==category && selectedImageIndex==key;
                                        return (
                                            <Zoom key={key} delay={key * 100} duration='300'>
                                                <Box position='relative' >
                                                    <MotionImage
                                                        filter={selected ? 'contrast(50%)' : ''}
                                                        m='4' opacity='0.85' borderColor='#fcbe03' borderRadius='0' border='2px'
                                                        whileHover={{ scale: 1.05, opacity:1, borderRadius:'1em', boxShadow:"10px 10px 0 rgba(0, 0, 0, 0.2)" } }
                                                        whileTap={{ scale: 0.9 }}
                                                        w='25vw' fit='cover' alt='obs' src={imageUrl}
                                                        onClick={() => {
                                                            setSelectedCategory(category);
                                                            setSelectedImageIndex(key);
                                                            onClick(category, imageUrl);
                                                            modalState.onClose();
                                                        }}
                                                    />
                                                    {selected &&
                                                        <Icon boxSize='5vw' color="white" pointerEvents='none' as={FaRegCheckCircle} position='absolute' top='40%' left='45%' />
                                                    }
                                                </Box>
                                            </Zoom>
                                        );
                                    })}
                                </Flex>
                            </TabPanel>
                        )}
                    </TabPanels>
                </Tabs>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={modalState.onClose}>
                    Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
});
/*
      <Image
        boxSize="200px"
        fit="cover"
        src="https://resizing.flixster.com/wTgvsiM8vNLhCcCH-6ovV8n5z5U=/300x300/v1.bjsyMDkxMzI5O2o7MTgyMDQ7MTIwMDsxMjAwOzkwMA"
      />
*/
// textShadow="0px 0px 3px red"