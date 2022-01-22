import AnimatedGlyph from './AnimatedGlyph.js';
import ShuffleArray from '../functions/ShuffleArray.js';

export default class ElipticalGlyph extends AnimatedGlyph {

    constructor(p5, x, y, width) {
        super(p5, x, y, width);
        this.hueSet = ShuffleArray([30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360]);
        this.hue1 = this.hueSet[0];
        this.hue2 = this.hueSet[1];
        this.hue3 = this.hueSet[2];
        this.hue4 = this.hueSet[3];
       
    }

    draw() {
        const currentTime = this.p.millis();
        if(currentTime < this.endTime){
            const scale = this.p.min(1, (currentTime - this.startTime) / (this.endTime - this.startTime)),
                dist = window.p5.Vector.sub(this.destination, this.origin).mult(scale),
                pos = window.p5.Vector.add(this.origin, dist);

            this.p.translate(pos.x, pos.y);
            this.p.rotate(this.rotation);
            this.p.strokeWeight(2);
            this.p.stroke(this.hue1, 100, 100);
            this.p.fill(this.hue1, 100, 100, 0.25);
            this.p.ellipse(0, 0, this.width, this.width * 1.5);
            this.p.stroke(this.hue2, 100, 100);
            this.p.fill(this.hue2, 100, 100, 0.25);
            this.p.ellipse(0, 0, this.width / 2, this.width * 1.5 / 2);
            this.p.stroke(this.hue3, 100, 100);
            this.p.fill(this.hue3, 100, 100, 0.25);
            this.p.ellipse(0, 0, this.width / 4, this.width * 1.5 / 4);
            this.p.stroke(this.hue4, 100, 100);
            this.p.fill(this.hue4, 100, 100, 0.25);
            this.p.ellipse(0, 0, this.width / 8, this.width * 1.5 / 8);
            this.p.rotate(-this.rotation);
            this.p.translate(-pos.x, -pos.y);
        }
    }
}