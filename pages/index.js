import Head from 'next/head';
import dynamic from 'next/dynamic';
//import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Zoom, Slide } from "react-awesome-reveal";
import { MotionButton } from '../components/MotionElements';
import { TUT_FAQ_CHANGE_SLIDE,
TUT_CHURCH_VISION, TUT_PRE_SERVICE, TUT_WORSHIP, TUT_ANNOUNCEMENTS, TUT_RECORDED_SERMON, TUT_LIVE_SERMON, TUT_WORSHIP_AGAIN, TUT_OUTRO
} from '../lib/tutorial_steps';
import { ACTIONS, EVENTS, STATUS } from "react-joyride";
const Joyride = dynamic(
  () => import('react-joyride'),
  { ssr: false }
);
import { Image as ChakraImage, Button, HStack, Box, Divider, Heading, Flex, VStack, Icon, IconButton,
Accordion,
AccordionItem,
AccordionButton,
AccordionPanel,
AccordionIcon,
Menu,
MenuButton,
MenuList,
MenuItem,
MenuGroup
} from "@chakra-ui/react";
import Navbar from '../components/Navbar';
import NavbarSpace from '../components/NavbarSpace';
import AtemMic from '../components/atem/AtemMic';
import AtemChannel from '../components/atem/AtemChannel';
import AtemPiP from '../components/atem/AtemPiP';
import AtemMiniButton from '../components/atem/AtemMiniButton';
import AtemBigButton from '../components/atem/AtemBigButton';
import MicIndicator from '../components/atem/MicIndicator';
import ImageSelector from '../components/ImageSelector';
import {presenterImages} from '../lib/presenterData';
import {cam1Images, cam2Images} from '../lib/camData';
import { MdContentCut } from "react-icons/md";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaDesktop } from "react-icons/fa";
import { RiRemoteControl2Line, RiPictureInPictureFill, RiQuestionLine } from "react-icons/ri";
import { AiFillAudio, AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { ImShrink } from "react-icons/im";
import { GrResume, GrWaypoint } from "react-icons/gr";
import { CgArrowUpR, CgArrowDownR, CgArrowLeftR, CgArrowRightR } from "react-icons/cg";

const limitVolume = (value) => {
  return Math.min(Math.max(value, 0), 100);
};

export default function Home() {
    //const router = useRouter();
    //const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
    const atemRef = useRef(null);
    // Canvas
    const obsImageRef = useRef(null);
    const previewImageRef = useRef(null);
    const presenterImageRef = useRef(null);
    const cam1ImageRef = useRef(null);
    const obsCanvasRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const presenterCanvasRef = useRef(null);
    const [obsImageURL, setObsImageURL] = useState('images/cam1/1.png');
    const [previewImageURL, setPreviewImageURL] = useState('images/cam2/1.png');
    const [presenterImageURL, setPresenterImageURL] = useState('images/worship/1.png');
    const [cam1ImageUrl, setCam1ImageUrl] = useState('images/cam1/1.png');
    const [cam2ImageUrl, setCam2ImageUrl] = useState('images/cam2/1.png');
    // Intermediate Animation State
    const animRequestRef = useRef(null);
    const animProgressRef = useRef(0);
    const animCanvasXRef = useRef(0); 
    const animCanvasYRef = useRef(0);
    const animCanvasWidthRef = useRef(0);
    const animCanvasHeightRef = useRef(0);
    // Final Animation State
    const animCanvasXFinalRef = useRef(0);
    const animCanvasYFinalRef = useRef(0);
    const animCanvasWidthFinalRef = useRef(0);
    const animCanvasHeightFinalRef = useRef(0);
    // States
    const [cropped, setCropped] = useState(true);
    const [chromaKeyEnabled, setChromaKeyEnabled] = useState(true);
    const [pipEnabled, setPipEnabled] = useState(false);
    const [pipDirection, setPipDirection] = useState('B'); // A, B, Full // Up, Down, Left, Shrink, Right
    const [pipAccordionOpen, setPipAccordionOpen] = useState(false);
    // Mics
    const [mic1Enabled, setMic1Enabled] = useState(false);
    const [mic1Volume, setMic1Volume] = useState(50);
    const [mic2Enabled, setMic2Enabled] = useState(false);
    const [mic2Volume, setMic2Volume] = useState(50);
    // Channels
    const [chan1Enabled, setChan1Enabled] = useState(false);
    const [chan1Volume, setChan1Volume] = useState(50);
    const [chan2Enabled, setChan2Enabled] = useState(false);
    const [chan2Volume, setChan2Volume] = useState(50);
    const [chan3Enabled, setChan3Enabled] = useState(false);
    const [chan3Volume, setChan3Volume] = useState(50);
    const [chan4Enabled, setChan4Enabled] = useState(false);
    const [chan4Volume, setChan4Volume] = useState(50);
    const [liveChannel, setLiveChannel] = useState(0);
    const [previewChannel, setPreviewChannel] = useState(3);

    // Joyride Tour
    const [tutorialType, setTutorialType] = useState(TUT_CHURCH_VISION);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [runTutorial, setRunTutorial] = useState(false);
    const [resumeTutorial, setResumeTutorial] = useState(false);
    const openTutorial = (steps) => {
        setTutorialStep(0);
        setTutorialType(steps);
        setRunTutorial(true);
        setResumeTutorial(false);
    };
    const joyrideCallback = (state) => {
        // action, index, status, type or (event)
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(state.type)) {
          if (state.action === ACTIONS.NEXT) {
            setTutorialStep(Math.max(0, tutorialStep + 1));
          }
          else if (state.action === ACTIONS.PREV) {
            setTutorialStep(Math.max(0, tutorialStep - 1));
          }
          else if (state.action === ACTIONS.CLOSE) {
            setRunTutorial(false);
            setResumeTutorial(true);
          }
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED, STATUS.ERROR].includes(state.status) || [ACTIONS.RESET].includes(state.action)) {
          setRunTutorial(false);
          setTutorialStep(0);
        }
    };

    const scrollToOBS = () => {
      obsCanvasRef.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    };

    useEffect(() => {
      // Canvas
      const multiplier = 2.5;
      const width = Math.round(window.screen.width / multiplier);
      const height = Math.round(width * 9 / 16);
      // OBS
      const obsCanvas = obsCanvasRef.current;
      obsCanvas.width = width; // 1280
      obsCanvas.height = height; // 720
      // Presenter
      const previewCanvas = previewCanvasRef.current;
      previewCanvas.width = width; // 1280
      previewCanvas.height = height; // 720
      // Presenter
      const presenterCanvas = presenterCanvasRef.current;
      presenterCanvas.width = width; // 1280
      presenterCanvas.height = height; // 720

      animCanvasXRef.current = width * 0.7;
      animCanvasYRef.current = height * 0.7;
      animCanvasWidthRef.current = width * 0.3;
      animCanvasHeightRef.current = height * 0.3;
      animCanvasXFinalRef.current = width * 0.7;
      animCanvasYFinalRef.current = height * 0.7;
      animCanvasWidthFinalRef.current = width * 0.3;
      animCanvasHeightFinalRef.current = height * 0.3;
    }, []);

    // Display functions
    const displayPreview = () => {
      const previewCanvas = previewCanvasRef.current;
      const previewContext = previewCanvas.getContext('2d');
      const previewImageElement = previewImageRef.current;
      if (previewImageElement.complete) {
        // Draw Preview Image
        previewContext.drawImage(previewImageElement, 0, 0, previewCanvas.width, previewCanvas.height);
      }
    };

    const displayOBS = (startup=false) => {
      const obsCanvas = obsCanvasRef.current;
      const obsContext = obsCanvas.getContext('2d');
      const obsImageElement = obsImageRef.current;
      if (obsImageElement.complete) {
        // Draw OBS Image
        obsContext.drawImage(obsImageElement, 0, 0, obsCanvas.width, obsCanvas.height);
        if(startup) {
          presenterImageRef.current.onload = () => {
            displayPresenter();
            presenterImageRef.current.onload = () => {};
          };
          if (presenterImageRef.current.complete) {
            displayPresenter();
          }
        }
      }
    };

    const displayPresenter = () => {
      // OBS
      const obsCanvas = obsCanvasRef.current;
      const obsContext = obsCanvas.getContext('2d');
      // Presenter
      const presenterCanvas = presenterCanvasRef.current;
      const presenterContext = presenterCanvas.getContext('2d');
      const presenterImageElement = presenterImageRef.current;
      // Draw presenter image
      presenterContext.drawImage(presenterImageElement, 0, 0, presenterCanvas.width, presenterCanvas.height);
      // Green screen effect
      if (chromaKeyEnabled) {
        const obsImage = obsContext.getImageData(0, 0, obsCanvas.width, obsCanvas.height);
        const obsImageData = obsImage.data;
        const presenterImage = presenterContext.getImageData(0, 0, presenterCanvas.width, presenterCanvas.height);
        const presenterImageData = presenterImage.data;
        // Iterate through all pixels
        for(let i = 0; i < presenterImageData.length; i += 4) {
          const red = presenterImageData[i + 0];
          const green = presenterImageData[i + 1];
          const blue = presenterImageData[i + 2];
          if (green > 40 && red < 30 && blue < 30) {
            presenterImageData[i + 3] = 0;
          }
          else {
            obsImageData[i] =  presenterImageData[i];
            obsImageData[i + 1] =  presenterImageData[i + 1];
            obsImageData[i + 2] =  presenterImageData[i + 2];
            obsImageData[i + 3] =  presenterImageData[i + 3];
          }
        }
        // Set image data
        obsContext.putImageData(obsImage, 0, 0);
      }
      if (pipEnabled) {
        const cam1ImageElement = cam1ImageRef.current;
        if (cam1ImageElement.complete) {
          // Draw Camera 1 as PiP
          obsContext.drawImage(cam1ImageElement, 0, 0, cam1ImageElement.width, cam1ImageElement.height,
                            animCanvasXRef.current, animCanvasYRef.current, animCanvasWidthRef.current, animCanvasHeightRef.current);
        }
      }
      if (!cropped) {
        const width = obsCanvas.width;
        const height = obsCanvas.height;
        // Draw cropped version
        obsContext.drawImage(obsCanvas, 0, 0, width, height, width*0.05, height*0.05, width * 0.9, height*0.9);
        // Draw black rectangle
        obsContext.beginPath();
        obsContext.lineWidth = (height*0.1).toString();
        obsContext.strokeStyle = "black";
        obsContext.rect(0, 0, width, height);
        obsContext.stroke();
        // Draw black vertical left line
        obsContext.beginPath();
        obsContext.lineWidth = (width*0.1).toString();
        obsContext.strokeStyle = "black";
        obsContext.moveTo(0, 0);
        obsContext.lineTo(0, height);
        obsContext.stroke();
        // Draw black vertical right line
        obsContext.beginPath();
        obsContext.lineWidth = (width*0.1).toString();
        obsContext.strokeStyle = "black";
        obsContext.moveTo(width, 0);
        obsContext.lineTo(width, height);
        obsContext.stroke();
      }
    }

    useEffect(() => {
      displayOBS();
      displayPresenter();
    }, [presenterImageURL, cam1ImageUrl, pipEnabled, pipDirection, chromaKeyEnabled, cropped]);

    useEffect(() => {
      scrollToOBS();
    }, [presenterImageURL, cam1ImageUrl, liveChannel, pipEnabled, chromaKeyEnabled, cropped]);

    useEffect(() => {
      if (previewChannel == 0) {
        setPreviewImageURL(cam1ImageUrl);
      }
      else if (previewChannel == 1) {
        setPreviewImageURL('images/black.png');
      }
      else if (previewChannel == 2) {
        setPreviewImageURL(presenterImageURL);
      }
      else if (previewChannel == 3) {
        setPreviewImageURL(cam2ImageUrl);
      }
    }, [previewChannel, cam1ImageUrl, cam2ImageUrl, presenterImageURL]);

    useEffect(() => {
      if (liveChannel == 0) {
        setObsImageURL(cam1ImageUrl);
      }
      else if (liveChannel == 1) {
        setObsImageURL('images/black.png');
      }
      else if (liveChannel == 2) {
        setObsImageURL(presenterImageURL);
      }
      else if (liveChannel == 3) {
        setObsImageURL(cam2ImageUrl);
      }
    }, [liveChannel, cam1ImageUrl, cam2ImageUrl, presenterImageURL]);

    const animatePiP = () => {
      if (animProgressRef.current < 1){
        const animProgress = animProgressRef.current;
        animCanvasXRef.current = animCanvasXRef.current + animProgress * (animCanvasXFinalRef.current - animCanvasXRef.current);
        animCanvasYRef.current = animCanvasYRef.current + animProgress * (animCanvasYFinalRef.current - animCanvasYRef.current);
        animCanvasWidthRef.current = animCanvasWidthRef.current + animProgress * (animCanvasWidthFinalRef.current - animCanvasWidthRef.current);
        animCanvasHeightRef.current = animCanvasHeightRef.current + animProgress * (animCanvasHeightFinalRef.current - animCanvasHeightRef.current);
        displayOBS();
        displayPresenter();
        animProgressRef.current = animProgress + 1 / 100;
        animRequestRef.current = requestAnimationFrame(animatePiP);
      }
      else{
          cancelAnimationFrame(animRequestRef.current);
      }
    }

    const changePipPosition = (dir) => {
      if (dir != pipDirection) {
        const cw = obsCanvasRef.current.width;
        const ch = obsCanvasRef.current.height;
        let x, y, w, h;
        if (dir == 'A') {
          x = 0;
          y = ch * 0.7;
          w = cw * 0.3;
          h = ch * 0.3;
        }
        else if (dir == 'B') {
          x = cw * 0.7;
          y = ch * 0.7;
          w = cw * 0.3;
          h = ch * 0.3;
        }
        else if (dir == 'Full') {
          x = 0;
          y = 0;
          w = cw;
          h = ch;
        }
        else if (dir == 'Up') {
          x = animCanvasXRef.current;
          y = -ch;
          w = 0;
          h = 0;
        }
        else if (dir == 'Down') {
          x = animCanvasXRef.current;
          y = 2 * ch;
          w = 0;
          h = 0;
        }
        else if (dir == 'Left') {
          x = -cw;
          y = animCanvasYRef.current;
          w = 0;
          h = 0;
        }
        else if (dir == 'Shrink') {
          x = animCanvasXRef.current;
          y = animCanvasYRef.current;
          w = 0;
          h = 0;
        }
        else if (dir == 'Right') {
          x = 2 * cw;
          y = animCanvasYRef.current;
          w = 0;
          h = 0;
        }
        animCanvasXFinalRef.current = x;
        animCanvasYFinalRef.current = y;
        animCanvasWidthFinalRef.current = w;
        animCanvasHeightFinalRef.current = h;
        animProgressRef.current = 0;
        cancelAnimationFrame(animRequestRef.current);
        animRequestRef.current = requestAnimationFrame(animatePiP);
      }
      setPipDirection(dir);
    };

    return (
        <div>
            <Head>
                <title>Oasis SIB Atem Guide - Home</title>
            </Head>
            <main>
              {/* Floating buttons */}
              <VStack position='fixed' zIndex='1000' m='8' bottom='0' right='0'>
                {resumeTutorial &&
                  <Slide direction='right' duration='500' triggerOnce >
                    <Button colorScheme='whatsapp' leftIcon={<GrResume />} 
                      _hover={{ bg: "green.600" }}
                      _focus={{ boxShadow: "outline" }}
                      boxShadow="0 0px 12px 0 rgba(0, 196, 170, 1)"
                      onClick={() => {
                        setRunTutorial(true);
                        setResumeTutorial(false);
                      }}
                    >
                      Resume
                    </Button>
                  </Slide>
                }
                <Slide direction='right' duration='500' triggerOnce >
                  <Menu isLazy placement='top' >
                    <MenuButton as={Button} leftIcon={<RiQuestionLine />} colorScheme="messenger" rightIcon={<AiOutlineCaretUp />}
                      _hover={{ bg: "blue.700" }}
                      _expanded={{ bg: "blue.700" }}
                    >
                      FAQ
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="FAQ">
                        <MenuItem onClick={() => {
                          openTutorial(TUT_FAQ_CHANGE_SLIDE);
                        }} >Changing Powerpoints</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                  <Menu isLazy >
                    <MenuButton as={Button} leftIcon={<GrWaypoint />} colorScheme="purple" rightIcon={<AiOutlineCaretUp />}
                      _hover={{ bg: "purple.700" }}
                      _expanded={{ bg: "purple.700" }}
                    >
                      Guide
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="Guides">
                        <MenuItem onClick={() => {
                          openTutorial(TUT_CHURCH_VISION);
                        }} >Church Vision</MenuItem>
                        <MenuItem onClick={() => {
                          openTutorial(TUT_PRE_SERVICE);
                        }} >Pre-Service Prayer</MenuItem>
                        <MenuItem onClick={() => {
                          openTutorial(TUT_WORSHIP);
                        }} >Worship</MenuItem>
                        <MenuItem onClick={() => {
                          openTutorial(TUT_ANNOUNCEMENTS);
                        }} >Announcements</MenuItem>
                        <MenuItem onClick={() => {
                          openTutorial(TUT_RECORDED_SERMON);
                          setPipAccordionOpen(true);
                        }} >Recorded Sermon</MenuItem>
                        <MenuItem onClick={() => {
                          openTutorial(TUT_LIVE_SERMON);
                          setPipAccordionOpen(true);
                        }} >Live Sermon</MenuItem>
                        <MenuItem onClick={() => {
                          openTutorial(TUT_WORSHIP_AGAIN);
                          setPipAccordionOpen(true);
                        }} >Worship Again</MenuItem>
                        <MenuItem onClick={() => {
                          openTutorial(TUT_OUTRO);
                          //setLiveChannel(2);
                          //setPipEnabled(true);
                          //setChromaKeyEnabled(false);
                          //changePipPosition('B');
                        }} >Visitor&apos;s Outro Video</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                  <Button leftIcon={<RiRemoteControl2Line />} 
                    _hover={{ bg: "gray.400" }}
                    _focus={{ boxShadow: "outline" }}
                    boxShadow="0 0px 12px 0 rgba(0, 196, 170, 1)"
                    onClick={() => atemRef.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})}
                  >
                    Go to Atem
                  </Button>
                </Slide>
              </VStack>

              {/* Page start */}
              <Navbar />
              <VStack>
                <NavbarSpace />
                <VStack spacing={4} w="100%" h='100%' align="center" justify="center">
                  <Heading textAlign='center' m={4} color='white' fontSize="4xl" fontWeight="extrabold" >
                    Display
                  </Heading>
                  <HStack spacing='4' wrap='wrap' align="center" justify="center" >
                    <ImageSelector buttonClassName='cam1-slides' buttonColor='pink' data={cam1Images} buttonIcon={<BsCameraVideoFill />}
                      onClick={(category, imageUrl) => {
                        setCam1ImageUrl(imageUrl);
                      }}
                    >
                      Camera 1
                    </ImageSelector>
                    <ImageSelector buttonClassName='cam2-slides' buttonColor='pink' data={cam2Images} buttonIcon={<BsCameraVideoFill />}
                      onClick={(category, imageUrl) => {
                        setCam2ImageUrl(imageUrl);
                      }}
                    >
                      Camera 2
                    </ImageSelector>
                    <ImageSelector buttonClassName='presenter-slides' buttonColor='green' data={presenterImages} buttonIcon={<FaDesktop />}
                      onClick={(category, imageUrl) => {
                        setPresenterImageURL(imageUrl);
                      }}
                    >
                      Slides
                    </ImageSelector>
                  </HStack>
                  
                  <HStack spacing='4' wrap='wrap' align="center" justify="center" >
                    <Menu isLazy >
                      <MenuButton className='macros-menu' as={Button} colorScheme="purple" rightIcon={<AiOutlineCaretDown />}
                        _hover={{ bg: "purple.700" }}
                        _expanded={{ bg: "purple.700" }}
                        _focus={{ boxShadow: "outline" }}
                      >
                        Macros
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => {
                          setLiveChannel(2);
                          setPipEnabled(true);
                          setChromaKeyEnabled(false);
                          changePipPosition('B');
                        }} >Announcements</MenuItem>
                        <MenuItem onClick={() => {
                          setChromaKeyEnabled(true);
                          setPipEnabled(false);
                        }} >GreenScreenFull</MenuItem>
                      </MenuList>
                    </Menu>
                    <MotionButton colorScheme='yellow' leftIcon={<MdContentCut />} onClick={() => setCropped(!cropped)} >
                      Transition to {cropped?'uncropped':'cropped'}
                    </MotionButton>
                  </HStack>

                  {/* Canvas and Images */}
                  <HStack spacing='4' align="center" justify="center" >
                    <Box border='2px' borderColor='white' >
                        <canvas className='preview-canvas' ref={previewCanvasRef} />
                    </Box>
                    <canvas ref={presenterCanvasRef} style={{display: 'none'}} />
                    <Box border='2px' borderColor='white' >
                      <canvas className='obs-canvas' ref={obsCanvasRef} />
                    </Box>
                  </HStack>
                  <ChakraImage ref={obsImageRef}
                    onLoad={() => {
                      displayOBS(true);
                      displayPresenter();
                    }}
                    display='none' alt='obs' src={obsImageURL} />
                  <ChakraImage ref={previewImageRef}
                    onLoad={() => {
                      displayPreview();
                    }}
                    display='none' alt='obs' src={previewImageURL} />
                  <ChakraImage ref={presenterImageRef} display='none' alt='presenter' src={presenterImageURL} />
                  <ChakraImage ref={cam1ImageRef} display='none' alt='cam1' src={cam1ImageUrl} />

                  {/* Mic controls */}
                  <Flex wrap='wrap' w='100%' align='start' justify='space-between' >
                    <Accordion allowToggle flex='1' p='4' >
                        <AccordionItem border='0' >
                            <AccordionButton py='4' borderRadius='1em' bg='red.500' _hover={{ bg: "tomato", color: "tomato" }} _expanded={{ bg: "tomato", color: "white" }} >
                              <Icon boxSize='5vh' color="white" pointerEvents='none' as={AiFillAudio} />
                              <Heading flex="1" textAlign='center' color='white' fontSize="2xl" fontWeight="extrabold" >
                                Mic Controls
                              </Heading>
                              <AccordionIcon />
                            </AccordionButton>
                        <AccordionPanel w='100%' >
                          <Flex align="center" justify="center" >
                            <VStack spacing='4' align="end" justify="end" >
                              <MicIndicator alignSelf='flex-end' micEnabled={mic1Enabled} volume={mic1Volume} setVolume={setMic1Volume} >
                                Mic 1
                              </MicIndicator>
                              <MicIndicator alignSelf='flex-end' micEnabled={mic2Enabled} volume={mic2Volume} setVolume={setMic2Volume} >
                                Mic 2
                              </MicIndicator>
                              <MicIndicator alignSelf='flex-end' micEnabled={chan1Enabled} volume={chan1Volume} setVolume={setChan1Volume} >
                                Channel 1
                              </MicIndicator>
                              <MicIndicator alignSelf='flex-end' micEnabled={chan2Enabled} volume={chan2Volume} setVolume={setChan2Volume} >
                                Channel 2
                              </MicIndicator>
                              <MicIndicator alignSelf='flex-end' micEnabled={chan3Enabled} volume={chan3Volume} setVolume={setChan3Volume} >
                                Channel 3
                              </MicIndicator>
                              <MicIndicator alignSelf='flex-end' micEnabled={chan4Enabled} volume={chan4Volume} setVolume={setChan4Volume} >
                                Channel 4
                              </MicIndicator>
                            </VStack>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  
                    <Accordion className='pip-controls' flex='1' p='4' allowToggle index={[pipAccordionOpen?0:-1]} onChange={() => setPipAccordionOpen(!pipAccordionOpen)} >
                        <AccordionItem border='0' >
                            <AccordionButton py='4' borderRadius='1em' bg='red.500' _hover={{ bg: "tomato", color: "tomato" }} _expanded={{ bg: "tomato", color: "white" }} >
                              <Icon boxSize='5vh' color="white" pointerEvents='none' as={RiPictureInPictureFill} />
                              <Heading flex="1" textAlign='center' color='white' fontSize="2xl" fontWeight="extrabold" >
                                PiP Controls
                              </Heading>
                              <AccordionIcon />
                            </AccordionButton>
                        <AccordionPanel w='100%' >
                          <Flex align="center" justify="center" >
                            <VStack spacing='4' align="center" justify="center" w='100%' >
                              <HStack spacing='4' align="center" justify="center" w='100%' >
                                <MotionButton className='pip-controls-A' w='3.5em' onClick={() => changePipPosition('A')} > {/* setPipDirection('A')*/}
                                  A
                                </MotionButton>
                                <MotionButton className='pip-controls-B' w='3.5em' onClick={() => changePipPosition('B')} >
                                  B
                                </MotionButton>
                                <MotionButton className='pip-controls-full' w='3.5em' onClick={() => changePipPosition('Full')} >
                                  Full
                                </MotionButton>
                              </HStack>
                              <Zoom triggerOnce style={{width:'100%'}} duration={500} >
                                <VStack className='pip-controls-hide' w='100%'>
                                  <IconButton icon={<CgArrowUpR />} size='lg' w='4em'  onClick={() => changePipPosition('Up')} >
                                    Up
                                  </IconButton>
                                  <HStack w='100%' align="center" justify="center" >
                                    <IconButton icon={<CgArrowLeftR />} size='lg' w='4em'  onClick={() => changePipPosition('Left')} >
                                      Left
                                    </IconButton>
                                    <IconButton icon={<ImShrink />} size='lg' w='4em'  onClick={() => changePipPosition('Shrink')} />
                                    <IconButton icon={<CgArrowRightR />} size='lg' w='4em'  onClick={() => changePipPosition('Right')} >
                                      Right
                                    </IconButton>
                                  </HStack>
                                  <IconButton icon={<CgArrowDownR />} size='lg' w='4em'  onClick={() => changePipPosition('Down')} >
                                    Down
                                  </IconButton>
                                </VStack>
                              </Zoom>
                            </VStack>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Flex>

                  <Divider w='95%' borderWidth={2} borderColor='gray.400' />

                  {/* Atem controls */}
                  <Heading textAlign='center' pb="8" color='white' fontSize="4xl" fontWeight="extrabold" >
                    Atem Controls
                  </Heading>
                  <Flex ref={atemRef} my={20} wrap='wrap' align="end" justify="start"
                    borderRadius='1em'
                    boxShadow='0 10px 4px 5px #666, /*bottom external highlight*/
                                0 -5px 4px 10px #4f4f4f, /*top external shadow*/ 
                                inset 0 -1px 1px rgba(0,0,0,0.5), /*bottom internal shadow*/ 
                                inset 0 1px 1px rgba(255,255,255,0.8)' >
                    <Flex wrap='wrap' align="end" justify="start" >
                      <Zoom triggerOnce style={{alignSelf:'flex-end'}} >
                        <VStack p={4} >
                          <AtemMic className="atem-mic1" micEnabled={mic1Enabled} enableCallback={setMic1Enabled} volumeCallback={(value)=>setMic1Volume(limitVolume(mic1Volume + value))} >
                            MIC 1
                          </AtemMic>
                          <AtemChannel micClassName="atem-micChan1" bigButtonClassName="atem-chan1"
                            pt="4" tooltip='Cam 1' isLive={liveChannel==0} isPreview={previewChannel==0} previewOnClick={()=>setPreviewChannel(0)}
                            micEnabled={chan1Enabled} enableCallback={setChan1Enabled} volumeCallback={(value)=>setChan1Volume(limitVolume(chan1Volume + value))}
                          >
                            1
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                      <Zoom triggerOnce style={{alignSelf:'flex-end'}} >
                        <VStack p={4} >
                          <AtemMic micEnabled={mic2Enabled} enableCallback={setMic2Enabled} volumeCallback={(value)=>setMic2Volume(limitVolume(mic2Volume + value))} >
                            MIC 2
                          </AtemMic>
                          <AtemChannel micClassName="atem-micChan2" bigButtonClassName="atem-chan2"
                            pt="4" tooltip='Unused' isLive={liveChannel==1} isPreview={previewChannel==1} previewOnClick={()=>setPreviewChannel(1)}
                            micEnabled={chan2Enabled} enableCallback={setChan2Enabled} volumeCallback={(value)=>setChan2Volume(limitVolume(chan2Volume + value))}
                          >
                            2
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                      <Zoom triggerOnce style={{alignSelf:'flex-end'}} >
                        <VStack p={4} >
                          <AtemChannel micClassName="atem-micChan3" bigButtonClassName="atem-chan3"
                            pt="4" tooltip='Presenter' isLive={liveChannel==2} isPreview={previewChannel==2} previewOnClick={()=>setPreviewChannel(2)}
                            micEnabled={chan3Enabled} enableCallback={setChan3Enabled} volumeCallback={(value)=>setChan3Volume(limitVolume(chan3Volume + value))}
                          >
                            3
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                      <Zoom triggerOnce style={{alignSelf:'flex-end'}} >
                        <VStack p={4} >
                          <AtemChannel micClassName="atem-micChan4" bigButtonClassName="atem-chan4"
                            pt="4" tooltip='Cam 2' isLive={liveChannel==3} isPreview={previewChannel==3} previewOnClick={()=>setPreviewChannel(3)}
                            micEnabled={chan4Enabled} enableCallback={setChan4Enabled} volumeCallback={(value)=>setChan4Volume(limitVolume(chan4Volume + value))}
                          >
                            4
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                    </Flex>
                    <Flex wrap='wrap' alignSelf='flex-end' align="end" justify="start" >
                      <Zoom triggerOnce style={{alignSelf:'flex-end'}} >
                        <VStack p={4} >
                          <Flex align="center" justify="center" >
                            <AtemPiP enabled={pipEnabled} enableCallback={setPipEnabled} />
                            <VStack ml="16" align="center" justify="center" >
                                <AtemMiniButton className='atem-chroma-key-on' highlight={chromaKeyEnabled} onClick={() => setChromaKeyEnabled(true)} >
                                    ON
                                </AtemMiniButton>
                                <AtemMiniButton className='atem-chroma-key-off' highlight={!chromaKeyEnabled} onClick={() => setChromaKeyEnabled(false)} >
                                    OFF
                                </AtemMiniButton>
                                <Heading textAlign='center' px={8} m={4} color='white' fontSize="md" fontWeight="bold" >
                                  KEY
                                </Heading>
                            </VStack>
                          </Flex>
                          <AtemBigButton className="atem-auto" mt="6" onClick={() => {
                            setPreviewChannel(liveChannel);
                            setLiveChannel(previewChannel);
                          }} >
                            AUTO
                          </AtemBigButton>
                        </VStack>
                      </Zoom>
                    </Flex>
                  </Flex>

                </VStack>
                <Joyride
                  scrollToFirstStep
                  scrollOffset={100}
                  run={runTutorial}
                  stepIndex={tutorialStep}
                  steps={tutorialType}
                  continuous={true}
                  showProgress={true}
                  showSkipButton={true}
                      locale={{
                      last: "End Guide",
                  }}
                  callback={joyrideCallback}
                />
              </VStack>

            </main>
            <footer>

            </footer>
        </div>
  )
}

/*

                  <Flex align='center' justify='center'>
                    <Heading textAlign='center' m={4} color='white' fontSize="lg" fontWeight="semibold" >
                      PiP
                    </Heading>
                    <Switch colorScheme='purple' size='md' />
                </Flex>

                      <Heading textAlign='center' px={8} m={4} color='white' fontSize={breakpoint==='base'?'2xl':'6xl'} fontWeight="extrabold" >
                        Bla bla
                      </Heading>
                      <Divider borderWidth={1} borderColor='gray.50' />
                      <MotionGetAttention attentionType='expand' >
                        <Button mt={4} rightIcon={<MdNavigateNext />} colorScheme={"purple"} >
                          Get Started
                        </Button>
                      </MotionGetAttention>
  */

          /*
          //const tolerance = 160;
        const diff = Math.abs(presenterImageData[i] - presenterImageData[0]) + Math.abs(presenterImageData[i+1] - presenterImageData[1]) + Math.abs(presenterImageData[i+2] - presenterImageData[2]);
        if(diff < tolerance) {
          //presenterImageData[i + 3] = 0;
        }
        else {
          obsImageData[i] =  presenterImageData[i];
          obsImageData[i + 1] =  presenterImageData[i + 1];
          obsImageData[i + 2] =  presenterImageData[i + 2];
          obsImageData[i + 3] =  presenterImageData[i + 3];
        }*/