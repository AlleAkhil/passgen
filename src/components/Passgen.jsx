// Passgen.js
import React, { useState } from 'react';
import { GoShieldLock } from 'react-icons/go';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { FaCopy } from "react-icons/fa6";
import { LuCopyCheck } from "react-icons/lu";
import './Passgen.css';
import Check from './Check';

const Passgen = () => {
  const [pass, setPass] = useState({
    length: 8,
    uppercase: true,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [handleText, setHandleText] = useState("");
  const [copy, setCopy] = useState(false);

  const ChangeUppercase = () => {
    setPass({
      ...pass,
      uppercase: !pass.uppercase,
    });
  };

  const ChangeLowercase = () => {
    setPass({
      ...pass,
      lowercase: !pass.lowercase,
    });
  };

  const ChangeNumbers = () => {
    setPass({
      ...pass,
      numbers: !pass.numbers,
    });
  };

  const ChangeSymbols = () => {
    setPass({
      ...pass,
      symbols: !pass.symbols,
    });
  };

  const setPasslen = (val) => {
    setPass({
      ...pass,
      length: val,
    });
  };

  const generatePassword = () => {
    const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const charCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = charCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = pass;

    const availableChar = [
      ...(lowercase ? lowerCaseLetters : []),
      ...(uppercase ? upperCaseLetters : []),
      ...(numbers ? numArray : []),
      ...(symbols ? symArray : []),
    ];

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const char = shuffleArray(availableChar).slice(0, length);
    setHandleText(char.join(''));
  };

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <p>Generate strong, random, and unique passwords with the click of a button</p>

      <div className="strong">
        <GoShieldLock className="icon" />
        <h3>STRONG</h3>
      </div>

      <div className="passField">
        <input
          type="number"
          min="8"
          max="20"
          value={pass.length}
          onChange={(e) => setPasslen(e.target.value)}
        />
        <input
          type="text"
          className="pass"
          size="33"
          autoComplete='off'
          value={handleText}
          onChange={(e) => setHandleText(e.target.value)}
        />

        <Button variant='contained' color='success'
          onClick={() => {
            if (handleText.length > 0) {
              navigator.clipboard.writeText(handleText);
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 3000);
            }
          }}
        >
          {copy ? <LuCopyCheck style={{ height:'3em',width:'3em' }}/> : <FaCopy style={{ height:'2.5em',width:'2.5em' }}/>}
        </Button>
      </div>

      <div className="inputs">
        <div className="inputs upperCase">
          <Check value={pass.uppercase} onChange={ChangeUppercase} />
          <p> A - Z </p>
        </div>
        <div className="inputs lowerCase">
          <Check value={pass.lowercase} onChange={ChangeLowercase} />
          <p> a - z</p>
        </div>
        <div className="inputs numbers">
          <Check value={pass.numbers} onChange={ChangeNumbers} />
          <p> 0 - 9 </p>
        </div>
        <div className="inputs symbols">
          <Check value={pass.symbols} onChange={ChangeSymbols} />
          <p> !@#$%^& </p>
        </div>
      </div>

      <Button variant="contained" color='success' endIcon={<SendIcon />} onClick={generatePassword}>Generate Password</Button>
    </div>
  );
};

export default Passgen;
