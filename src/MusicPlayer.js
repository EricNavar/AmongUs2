import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const MenuButtons = styled.button`
  width: 94%;
  padding: 4px;
  background: #383838;
  color: white;
  border-radius: 8px;
  border-style: none;
  font-size: 0.8rem;
  font-weight: bold;
  height: fit-content;
  text-decoration: none;
  margin: 3px;
  transition: transform 0.3 ease;

  &::after, &::before {
    content: "";
    position: absolute;
    opacity: 0.3;
    background: #383838;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    left 0;
    bottom: 0;
    z-index: -1;
    transition: transform 0.3 ease;
  }

  &:hover {    
    transform: translate(-12px, -12px)
  }

  &:hover:after {
    transform: translate(6px, 6px)
  }

  &:hover:before {
    transform: translate(12px, 12px)
  }
`

// https://stackoverflow.com/questions/47686345/playing-sound-in-react-js

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

// eslint-disable-next-line react/prop-types
const MusicPlayer = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <MenuButtons onClick={toggle}>{playing ? "Pause" : "Play"}</MenuButtons>
    </div>
  );
};


export {MusicPlayer};