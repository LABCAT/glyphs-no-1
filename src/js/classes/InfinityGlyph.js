import AnimatedGlyph from './AnimatedGlyph.js';

export default class TriangleGlyph extends AnimatedGlyph {

    draw() {
        const currentTime = this.p.millis();
        if(currentTime < this.endTime){
            const scale = this.p.min(1, (currentTime - this.startTime) / (this.endTime - this.startTime)),
                dist = window.p5.Vector.sub(this.destination, this.origin).mult(scale),
                pos = window.p5.Vector.add(this.origin, dist);
            
                this.p.push();
                this.p.translate(pos.x, pos.y);
                this.p.rotate(this.rotation);
                this.p.strokeWeight(16);
                this.p.stroke(this.hue, 100, 100);
                this.p.fill(this.hue, 100, 100, 0.1);
                this.p.scale(0.4);
                this.p.beginShape();
                this.p.curveVertex(0, 0);
                this.p.curveVertex(0, 0);
                this.p.curveVertex(6 * this.width, 4 * this.width);
                this.p.curveVertex(9 * this.width, 3 * this.width);
                this.p.curveVertex(10 * this.width, 0);
                this.p.curveVertex(9 * this.width, -3 * this.width);
                this.p.curveVertex(6 * this.width, -4 * this.width);
                this.p.curveVertex(0, 0);
                this.p.curveVertex(-6  * this.width, 4 * this.width);
                this.p.curveVertex(-9  * this.width, 3  * this.width);
                this.p.curveVertex(-10  * this.width, 0);
                this.p.curveVertex(-9  * this.width, -3 * this.width);
                this.p.curveVertex(-6  * this.width, -4 * this.width);
                this.p.curveVertex(0, 0);
                this.p.endShape(this.p.CLOSE);
                this.p.rotate(-this.rotation);
                this.p.translate(-pos.x, -pos.y);
                this.p.pop();
        }
    }
}