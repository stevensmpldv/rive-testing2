import React from "react";
import { useRive, useStateMachineInput, Layout, Fit } from "rive-react";
import styled from "styled-components";
//themes
const theme = {
    blue: {
        default: '#3498DB',
        hover:  '#2874A6'
    },
    red: {
        default: '#E74C3C',
        hover: '#B03A2E'
    },
    green: {
        default: '#2ECC71',
        hover: '#239B56'
    }
}
//button styling 
const Button = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color: 250ms;
    &:hover {
        background-color: ${props => theme[props.theme].hover}
    }
`
Button.defaultProps = {

    theme: 'blue'
}



// animation constants
export default function App() {
    const STATEMACHINE = "Login Machine"
    const LISTENING = "isListening"
    const BLINK = "trigBlink"
    const FOOTTAP = "trigFoottap"
    const SUCCESS = "trigSuccess"
    const FAIL = "trigFail";
    



//load panda frame image and auto play idle
    const { rive, RiveComponent } = useRive({
        src: "audio_panda_teddy_07.riv",
        stateMachines: STATEMACHINE,
        autoplay: true,
        layout: new Layout({ fit: Fit.Contain }),

    });
// state machine constants
    const BLINKB = useStateMachineInput( 
        rive, 
        STATEMACHINE, 
        BLINK 
        );
    const FOOTTAPB = useStateMachineInput( 
        rive, 
        STATEMACHINE, 
        FOOTTAP 
            );
    const SUCCESSB = useStateMachineInput( 
        rive, 
        STATEMACHINE, 
        SUCCESS 
                );
    const FAILB = useStateMachineInput( 
        rive, 
        STATEMACHINE, 
        FAIL 
        );
    const LISTENINGB = useStateMachineInput( 
        rive, 
        STATEMACHINE, 
        LISTENING
            );


//logger
if(rive){
    console.log(rive.contents);
}

 return (
     <>
 <div>
    <RiveComponent style={{ height: "1000px" }} />
 </div>
 <div>
    <Button theme="red"  onClick={() => BLINKB.fire()}>
        Blink
    </Button>
 </div>

 <div>
    <Button theme="red"  onClick={() => FOOTTAPB.fire()}>
        Tap Foot
    </Button>
 </div>

 <div>
    <Button theme="red"  onClick={() => SUCCESSB.fire()}>
        Nod Head
    </Button>
 </div>

 <div>
    <Button theme="red"  onClick={() => FAILB.fire()}>
        Shake Head
    </Button>
 </div>

 <div>
 <Button theme="blue"  onClick={() => LISTENINGB.value = true}>
     LISTEN
 </Button>
</div>

<div>
 <Button theme="green"  onClick={() => LISTENINGB.value = false}>
     STOP LISTEN
 </Button>
</div>

    </>
 );

}
