import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';
import TriangleGlyph from './classes/TriangleGlyph.js';
import RectangleGlyph from './classes/RectangleGlyph.js';
import InfinityGlyph from './classes/InfinityGlyph.js';
import EllipticalGlyph from './classes/EllipticalGlyph.js';
import FlowerGlyph from './classes/FlowerGlyph.js';
import StarGlyph from './classes/StarGlyph.js';
import LABCATGlyph from './classes/LABCATGlyph.js';

import audio from "../audio/glyphs-no-1.ogg";
import midi from "../audio/glyphs-no-1.mid";

const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.animatedGlyphs = [];

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    console.log(result);
                    const noteSet1 = result.tracks[0].notes; // Synth 1 - metal swell
                    const noteSet2 = result.tracks[3].notes; // Synth 2 - DnK - Glass
                    const noteSet3 = result.tracks[4].notes; // Synth 3 - DreamPatch 3
                    const noteSet4 = result.tracks[5].notes; // Synth 4 - Groovy
                    const noteSet5 = result.tracks[1].notes; // Sampler 1 - GRANDPIANO
                    const noteSet6 = result.tracks[7].notes; // Synth 5 - Sweep Lead
                    const noteSet7 = result.tracks[6].notes; // Synth 6 - SynthBass2
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.scheduleCueSet(noteSet2, 'executeCueSet2');
                    p.scheduleCueSet(noteSet3, 'executeCueSet3');
                    p.scheduleCueSet(noteSet4, 'executeCueSet4');
                    p.scheduleCueSet(noteSet5, 'executeCueSet5');
                    p.scheduleCueSet(noteSet6, 'executeCueSet6');
                    p.scheduleCueSet(noteSet7, 'executeCueSet7');
                    p.audioLoaded = true;
                    document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.background(0);
            p.colorMode(p.HSB);
            p.rectMode(p.CENTER);
            p.angleMode(p.DEGREES)
        }

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
                p.background(0);
                for (let i = 0; i < p.animatedGlyphs.length; i++) {
                    const glyph = p.animatedGlyphs[i];
                    glyph.update();
                    glyph.draw();
                }
            }
        }

        p.executeCueSet1 = (note) => {
            p.animatedGlyphs.push(
                new InfinityGlyph(p, p.width/2, p.height/2, p.width/16)
            );
        }

        p.executeCueSet2 = (note) => {
            p.animatedGlyphs.push(
                new RectangleGlyph(p, p.width/2, p.height/2, p.width/16)
            );
        }

        p.executeCueSet3 = (note) => {
            p.animatedGlyphs.push(
                new TriangleGlyph(p, p.width/2, p.height/2, p.width/16)
            );
        }

        p.executeCueSet4 = (note) => {
            p.animatedGlyphs.push(
                new EllipticalGlyph(p, p.width/2, p.height/2, p.width/16)
            );
            p.animatedGlyphs.push(
                new EllipticalGlyph(p, p.width/2, p.height/2, p.width/16)
            );
        }

        p.executeCueSet5 = (note) => {
            p.animatedGlyphs.push(
                new StarGlyph(p, p.width/2, p.height/2, p.width/16)
            );
        }

        p.executeCueSet6 = (note) => {
            p.animatedGlyphs.push(
                new FlowerGlyph(p, p.width/2, p.height/2, p.width/16)
            );
        }

        p.executeCueSet7 = (note) => {
            p.animatedGlyphs.push(
                new LABCATGlyph(p, p.width/2, p.height/2, p.width/16)
            );
        }

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                    }
                    document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                }
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/"
                );
                p.song.stop();
            }
        };

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
            <PlayIcon />
        </div>
    );
};

export default P5SketchWithAudio;
