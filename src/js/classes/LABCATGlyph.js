import AnimatedGlyph from './AnimatedGlyph.js';
import ShuffleArray from '../functions/ShuffleArray.js';

export default class LABCATGlyph extends AnimatedGlyph {

    constructor(p5, x, y, width) {
        super(p5, x, y, width);

        this.width = this.maxWidth / 8;
        
        // the HSB colour that this Glyph represents
        this.hsbColour = [
            this.p.random(0, 360),
            this.p.random(0, 100),
            this.p.random(0, 100)
        ];
        
        this.brightnessTrans = this.p.map(this.hsbColour[2], 0, 100, 0.9, 0);
    }

    update() {
        if(this.width < this.maxWidth) {
            this.width = this.width + (Math.random() / 4);
        }
        this.rotation++;

        // variables created by the saturation dimension
        this.circleSize = this.p.map(this.hsbColour[1], 100, 0, this.width, 0 + this.width/16);

        // JSON object containing the different values for the three circles drawn to represent the saturation dimension
        this.satCircles = {
            'brightness' : [
                0,
                100,
                0
            ],
            'alpha' : [
                0.1875,
                0.625,
                0.375
            ],
            'size' : [
                this.circleSize,
                this.circleSize/2,
                this.circleSize/4,
            ]
        }
    }

    draw() {
        const currentTime = this.p.millis();
        if(currentTime < this.endTime){
            const scale = this.p.min(1, (currentTime - this.startTime) / (this.endTime - this.startTime)),
                dist = window.p5.Vector.sub(this.destination, this.origin).mult(scale),
                pos = window.p5.Vector.add(this.origin, dist);

            this.p.push();
            this.p.translate(pos.x, pos.y);
            this.p.rotate(this.rotation);
            
            // draw the circles that represent the saturation dimension
            this.p.stroke(0);
            for(var i = 0; i < 3; i++){
                this.p.fill(0, 0, this.satCircles['brightness'][i], this.satCircles['alpha'][i]);
                this.p.ellipse(0, 0, this.satCircles['size'][i]);
            }

            // draw the octagon that represents the brightness dimension
            this.p.fill(this.hue, 100, 100, this.brightnessTrans);
            this.octagon(0, 0, this.width / 3);

            this.p.rotate(-this.rotation);
            this.p.translate(-pos.x, -pos.y);
            this.p.pop();
        }
    }

    /**
     * function to draw a hexagon shape
     * adapted from: https://p5js.org/examples/form-regular-polygon.html
     * @param {Number} x  - x-coordinate of the hexagon
     * @param {Number} y  - y-coordinate of the hexagon
     * @param {Number} radius - radius of the hexagon
     */
    octagon(x, y, radius) {
        this.p.angleMode(this.p.RADIANS);
        const angle = this.p.TWO_PI / 8;
        this.p.beginShape();
        for (let a = this.p.TWO_PI/16; a < this.p.TWO_PI + this.p.TWO_PI/16; a += angle) {
            const sx = x + this.p.cos(a) * radius;
            const sy = y + this.p.sin(a) * radius;
            this.p.vertex(sx, sy);
        }
        this.p.endShape(this.p.CLOSE);
        this.p.angleMode(this.p.DEGREES);
    }
}