import { useState, useRef, useEffect, memo } from 'react';
import { Zoom } from "react-awesome-reveal";
import { useDisclosure, ScaleFade, Box, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Icon, Image as ChakraImage,
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

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}


export default memo(function ImageSelector({children, buttonClassName, buttonIcon, buttonColor, data, onClick}) {
    const modalState = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(data)[0]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Button Hover
    const hoverImageRef = useRef(null);
    const [hoverShow, setHoverShow] = useState(false);
    const hoverShowRef = useRef(false);
    const [hoverImageURL, setHoverImageURL] = useState(data[selectedCategory][selectedImageIndex]);

    const updateHoverImagePos = (event) => {
        if (hoverImageRef.current) {
            hoverImageRef.current.style.left = event.clientX - vw(10) + 'px';
            hoverImageRef.current.style.top = event.clientY + vw(2) + 'px';
        }
    };

    useEffect(() => {
     // Button Hover
      document.addEventListener('mousemove', (event) => {
          if (hoverShowRef.current) {
            updateHoverImagePos(event);
          }
      });
    }, []);

    return (
        <>
        <ChakraImage ref={hoverImageRef} w='20vw' position='fixed' pointerEvents='none' zIndex='1000' alt='selector-button-hover' src={hoverImageURL}
            opacity={hoverShow? 1 : 0} transition='opacity 0.5s'  border='2px' borderColor='white' boxShadow="0 0px 24px 0 rgba(0, 196, 170, 1)"
        />
        <MotionButton className={buttonClassName} leftIcon={buttonIcon} colorScheme={buttonColor}
            onMouseEnter={(event) => {
                updateHoverImagePos(event);
                hoverShowRef.current = true;
                setHoverShow(true);
                setHoverImageURL(data[selectedCategory][selectedImageIndex]);
            }}
            onMouseLeave={() => {
                hoverShowRef.current = false;
                setHoverShow(false);
            }}
            onClick={modalState.onOpen}
        >
            {children}
        </MotionButton>
        <Modal size='full' isOpen={modalState.isOpen} onClose={modalState.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{children}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs isLazy defaultIndex={Object.keys(data).indexOf(selectedCategory)}  >
                    <TabList overflowX='auto' overflowY= 'hidden' >
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