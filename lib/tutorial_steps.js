// FAQ
export const TUT_FAQ_CHANGE_SLIDE = [
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Changing Powerpoints",
        content: "So you want to switch to another Powerpoint file without being obvious...",
        disableBeacon: true,
    },
    {
        target: ".atem-chroma-key-off",
        placement: "top-start",
        title: "Off Chroma Key",
        content: "Firstly, turn OFF the chroma key",
    },
    {
        target: ".presenter-slides",
        title: "Change File",
        content: "Change to whatever Powerpoint file",
    },
    {
        target: ".atem-chroma-key-on",
        placement: "top-start",
        title: "On Chroma Key",
        content: "Finally, turn back ON the chroma key",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The new Powerpoint should be shown here",
    }
];

// Stages
export const TUT_CHURCH_VISION = [
    {
        target: ".presenter-slides",
        title: "Church Vision Video",
        content: "Prepare the video first",
        disableBeacon: true,
    },
    {
        target: ".atem-micChan3",
        title: "Turn on Channel 3 Audio",
        content: "Make sure the Channel 3 audio is on.",
    },
    {
        target: ".atem-mic1",
        title: "Turn off Mic 1",
        content: "Don't forget to turn off Mic 1",
    },
    {
        target: ".atem-chan3",
        title: "Channel 3 Preview",
        content: "Select Channel 3",
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The video should be shown here",
    }
];

export const TUT_PRE_SERVICE = [
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Pre-Service",
        content: "After the church vision videp, you want to switch to pre-service green screen slides...",
        disableBeacon: true,
    },
    {
        target: ".atem-micChan3",
        title: "Turn off Channel 3 Audio",
        content: "Turn off the Channel 3 audio",
    },
    {
        target: ".atem-mic1",
        title: "Turn on Mic 1",
        content: "Don't forget to turn on Mic 1",
    },
    {
        target: ".atem-chan1",
        title: "Channel 1 Preview",
        content: "Select Channel 1",
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "What happened?",
        content: "After pressing Auto, Camera 1 is live",
    },
    {
        target: ".presenter-slides",
        title: "Slides",
        content: "Prepare the pre-service slides",
    },
    {
        target: ".macros-menu",
        title: "Macros",
        content: "Click the GreenScreenFull macro",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The pre-service slide should be shown here",
    }
];

export const TUT_WORSHIP = [
    {
        target: ".macros-menu",
        title: "Worship",
        content: "Same as Pre-Service, use the GreenScreenFull macro. If already in green screen, no need to do anything.",
        disableBeacon: true,
    }
];

export const TUT_ANNOUNCEMENTS = [
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Announcements",
        content: "After worship ends, you want to switch to announcements...",
        disableBeacon: true,
    },
    {
        target: ".atem-chroma-key-off",
        placement: "top-start",
        title: "Off Chroma Key",
        content: "Firstly, turn OFF the chroma key",
    },
    {
        target: ".atem-chan1",
        title: "Channel 1 Preview",
        content: "Select Channel 1",
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch to Camera 1",
    },
    {
        target: ".presenter-slides",
        title: "Slides",
        content: "Prepare the announcement slides",
    },
    {
        target: ".macros-menu",
        title: "Macros",
        content: "Click the Announcements macro",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The announcement slides should be shown here",
    },
    {
        target: ".pip-controls",
        title: "PiP Controls",
        content: "Use these buttons to control the Picture-in-Picture",
    }
];

export const TUT_RECORDED_SERMON = [
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Recorded Sermon",
        content: "After announcements, you want to switch to the recorded sermon. Maybe you have to exit Powerpoint and open the file in VLC.",
        disableBeacon: true,
    },
    {
        target: ".pip-controls-hide",
        title: "Hide PiP",
        content: "Firstly, hide the PiP using any of the arrows.",
    },
    {
        target: ".atem-chan1",
        title: "Channel 1 Preview",
        content: "Select Channel 1",
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch to Camera 1",
    },
    {
        target: ".presenter-slides",
        title: "Slides",
        content: "Quit Powerpoint and open the video. Remember to change projector settings to Duplicate, not Extend.",
    },
    {
        target: ".atem-chan3",
        title: "Channel 3 Preview",
        content: "Select Channel 1",
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch to the video",
    },
    {
        target: ".atem-micChan3",
        title: "Channel 3 Audio",
        content: "Make sure the Channel 3 audio is on.",
    },
    {
        target: ".atem-mic1",
        title: "Turn off Mic 1",
        content: "Don't forget to turn off Mic 1",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The video should be shown here.",
    },
    {
        target: ".atem-mic1",
        title: "Turn on Mic 1",
        content: "At the end of the sermon, don't forget to turn on Mic 1 again.",
    },
];

export const TUT_LIVE_SERMON = [
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Live Sermon",
        content: "After announcements, you want to switch to live sermon. \
                Usually, it's the same format like announcements so there's no need to change anything. \
                Continue the guide if you want to show green screen slides",
        disableBeacon: true,
    },
    {
        target: ".pip-controls-hide",
        title: "Hide PiP",
        content: "Firstly, hide the PiP using any of the arrows.",
    },
    {
        target: ".atem-chan1",
        title: "Channel 1 Preview",
        content: "Select Channel 1",
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch to Camera 1",
    },
    {
        target: ".presenter-slides",
        title: "Slides",
        content: "Prepare the green sermon slide",
    },
    {
        target: ".macros-menu",
        title: "Macros",
        content: "Click the GreenScreenFull macro",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The green sermon slide should be shown here. To go back to normal slides, follow the Announcements guide.",
    },
];

export const TUT_WORSHIP_AGAIN = [
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Worship Again",
        content: "After the sermon, you want to switch to worship again...",
        disableBeacon: true,
    },
    {
        target: ".pip-controls-hide",
        title: "Hide PiP",
        content: "Firstly, hide the PiP using any of the arrows.",
    },
    {
        target: ".atem-chan1",
        title: "Channel 1 Preview",
        content: "Select Channel 1",
        disableBeacon: true,
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch to Camera 1",
    },
    {
        target: ".presenter-slides",
        title: "Slides",
        content: "Prepare the worship slides",
    },
    {
        target: ".macros-menu",
        title: "Macros",
        content: "Click the GreenScreenFull macro",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The worship slide should be shown here",
    }
];

export const TUT_OUTRO = [
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Announcements",
        content: "After worship ends, you want to show the Visitor's outro video...",
        disableBeacon: true,
    },
    {
        target: ".presenter-slides",
        title: "Visitor's Outro Video",
        content: "Prepare the video first",
    },
    {
        target: ".atem-chroma-key-off",
        placement: "top-start",
        title: "Off Chroma Key",
        content: "Firstly, turn OFF the chroma key",
    },
    {
        target: ".atem-micChan3",
        title: "Turn on Channel 3 Audio",
        content: "Make sure the Channel 3 audio is on.",
    },
    {
        target: ".atem-mic1",
        title: "Turn off Mic 1",
        content: "Don't forget to turn off Mic 1",
    },
    {
        target: ".atem-chan3",
        title: "Channel 3 Preview",
        content: "Select Channel 3",
    },
    {
        target: ".atem-auto",
        title: "Auto",
        content: "Press Auto to switch",
    },
    {
        target: ".obs-canvas",
        placement: "bottom-end",
        title: "Success!",
        content: "The video should be shown here",
    }
];