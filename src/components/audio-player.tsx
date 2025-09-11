"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

type AudioPlayerProps = {
  audioSrc: string;
};

export function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.volume = volume;

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((e) => console.error("Audio play failed", e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardContent className="p-4 flex flex-col space-y-3">
        <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono w-12 text-center text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 1}
            step={1}
            onValueChange={handleSeek}
            className="mx-4"
          />
          <span className="text-xs font-mono w-12 text-center text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 w-32">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted || volume === 0 ? (
                <VolumeX className="size-5" />
              ) : (
                <Volume2 className="size-5" />
              )}
            </Button>
            <Slider
              value={isMuted ? [0] : [volume]}
              max={1}
              step={0.05}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSeek([Math.max(0, currentTime - 10)])}
            >
              <Rewind className="size-6" />
            </Button>
            <Button
              size="lg"
              onClick={togglePlayPause}
              className="w-16 h-16 rounded-full"
            >
              {isPlaying ? (
                <Pause className="size-8 fill-primary-foreground" />
              ) : (
                <Play className="size-8 fill-primary-foreground ml-1" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                handleSeek([Math.min(duration, currentTime + 10)])
              }
            >
              <FastForward className="size-6" />
            </Button>
          </div>

          <div className="w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
