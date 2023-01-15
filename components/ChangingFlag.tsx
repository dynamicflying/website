import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export interface ChangingFlagProps {
  countries: string[];
  seconds: number;
}

export default function ChangingFlag(props: ChangingFlagProps) {
  const { countries, seconds } = props;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % countries.length);
    }, seconds * 1000);
    return () => clearInterval(interval);
  }, [index, countries.length, seconds]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={index} timeout={1000} classNames="countryflag">
        <div className="flex mt-[1px]">
          <ReactCountryFlag countryCode={countries[index]} svg />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
