import React, {
  useRef,
  useState,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from 'react';
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
  UseRiveParameters,
  RiveState,
  StateMachineInput,
} from 'rive-react';
import './AudioPandaComponent.css';
import $ from "jquery"

const STATE_MACHINE_NAME = 'Login Machine';
const LOGIN_PASSWORD = 'teddy';
const ACTION_ONE = 'Nod';
const ACTION_TWO = 'Shake';
var wrapCounter = 1;
var wrapOffset = 0;
var lengthCheck;
var lengthOfTextBox = 1;

/**
 * Use case for a simple login experience that incorporates a Rive asset with a
 * state machine to coordinate user interaction with a form
 * @param riveProps
 */
const AudioPandaComponent = (riveProps: UseRiveParameters = {}) => {
  const { rive: riveInstance, RiveComponent }: RiveState = useRive({
    src: 'audio_panda_teddy_01.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    ...riveProps,
  });
  const [userValue, setUserValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [actionOneText, setactionOneText] = useState(ACTION_ONE);
  const [actionTwoText, setactionTwoText] = useState(ACTION_TWO);
  const inputRef = useRef(null);

  const isCheckingInput: StateMachineInput | null = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'isChecking'
  );
  const numLookInput: StateMachineInput | null = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'numLook'
  );
  const nodding: StateMachineInput | null = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'trigSuccess'
  );
  const shaking: StateMachineInput | null = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'trigFail'
  );
  const blinking: StateMachineInput | null = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'trigBlink'
  );
  
  

  // Divide the input width by the max value the state machine looks for in numLook.
  // This gets us a multiplier we can apply for each character typed in the input
  // to help Teddy track progress along the input line
  useEffect(() => {
    if (inputRef?.current && !inputLookMultiplier) {
      setInputLookMultiplier(
        (inputRef.current as HTMLInputElement).offsetWidth / 100
      );
    }
    console.log("hi");
  }, [inputRef]);

  // As the user types in the username box, update the numLook value to let Teddy know
  // where to look to according to the state machine
  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {

    const newVal = e.target.value;
    setUserValue(newVal);
    if (!isCheckingInput!.value) {
      isCheckingInput!.value = true;
    }
    var numChars = newVal.length - ((wrapCounter-1)*lengthOfTextBox);
    var $txt=$('#textbox'),i = 1;
    var font = $txt.css('font');
    var padding = $txt.css('padding');
    var realTxtWidth = wrapCounter * $txt.width();
    var txtwidth = (wrapCounter * $txt.width()) - wrapOffset;
    var txt = $('#textbox').val().split('\n');
    $(txt).each(function(){
      var w = textWidth(this,font,padding);
      if(w>txtwidth){
        if(wrapCounter === 1) {
          lengthCheck = e.target.value;

          lengthOfTextBox = lengthCheck.length; //actual length of box is closer to 30 than 32
        }
        wrapCounter++;
        if (typeof(lengthofTextBox) !== 'undefined' && lengthofTextBox != null) {
          wrapOffset = wrapOffset + Math.round(lengthofTextBox * .75);
        }
      }
      i++;
    });


    numLookInput!.value = numChars * inputLookMultiplier;
  };

  // Start Teddy looking in the correct spot along the username input
  const onUsernameFocus = () => {
    isCheckingInput!.value = true;

    if (numLookInput!.value !== userValue.length * inputLookMultiplier) {
      numLookInput!.value = userValue.length * inputLookMultiplier;
    }
  };

  // When submitting, simulate password validation checking and trigger the appropriate input from the

  // state machine
  const actionOne = (e: SyntheticEvent) => {
    setactionOneText('Nodding...');
    rive.play("success");
    return false;
  };
  
  const actionTwo = (e: SyntheticEvent) => {
    setactionTwoText('Shaking...');
    return false;
  };
  

  

  function textWidth(txt, font,padding) {
    var $span = $('<span></span>');
    $span.css({
      font:font,
      position:'absolute',
      top: -1000,
      left:-1000,
      padding:padding
    }).text(txt);
    $span.appendTo('body');
    return $span.width();
  }

  return (
    <div className="login-form-component-root">
      <div className="login-form-wrapper">
        <div className="rive-wrapper">
          <RiveComponent className="rive-container" />
        </div>
        <div className="form-container">
            <button className="login-btn" onClick={actionOne}>{actionOneText}</button>
            <button className="login-btn" onClick={actionTwo}>{actionTwoText}</button>
        </div>
            
       </div>
    </div>
  );
};

export default AudioPandaComponent;
