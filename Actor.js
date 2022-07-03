class Actor { 
    constructor() { 
        this.position = {x:0, y:0};
        this.controller = new Controller();
        this.speed = random(0, 1); 

    }

    updatePosition(x, y){
        this.position.x = x; 
        this.position.y = y; 
    }

    getPosition() { 
        return this.position; 
    }
    getSpeed () { 
        return this.speed; 
    }
    printPosition() { 
        console.log("Position: " + this.position)
        console.log("Position: " + this.position.x)
        console.log("Position: " + this.position.y);
    }

}

class Coordinate { 
    constructor(){
        let x = 0; let y = 0; 
        this.coordinate = {x,y}; 
    }
    getCoordinate() { 
        return this.coordinate; 
    }
    setCoordinate(x1,y1){ 
        this.x=x1; this.y=y1; 
        this.coordinate= {x:x1,y:y1}; 
    }

}
class Quadrant_Map {
    constructor() {

        let quadrant_map = [];
        let coord1 = new Coordinate(); coord1.setCoordinate(1, 1); 
        let coord2 = new Coordinate(); coord2.setCoordinate(-1, 1); 
        let coord3 = new Coordinate(); coord3.setCoordinate(1, -1); 
        let coord4 = new Coordinate(); coord4.setCoordinate(-1, -1); 
        quadrant_map.push(coord1);
        quadrant_map.push(coord2);
        quadrant_map.push(coord3);
        quadrant_map.push(coord4);

        console.log(quadrant_map)
        
    }

    get_quad1(){ 
        console.log("get_quad1 called")
        return this.quadrant_map; 
    }
    get_quad2(){
        return this.quadrant_map[1]; 
    }
    get_quad3(){ 
        return this.quadrant_map[2]; 
    }
    get_quad4(){
        return this.quadrant_map[3]; 
    }
    printQuad(){
        let t = this.get_quad1(); 
        console.log(t)
            
    }//end fn:printQuad
}//end class:Quadrant_Map

class Bouncer_Quadrant extends Actor {

    constructor(quadrant) { 
        super(); 
        this.quadrant = quadrant; //1-4 for circular regions
                                  //regions are defined by +- sin/cos
        //REGION1: +sin, +cos
        //REGION2: +sin, -cos     //x values map to cos
        //REGION3: -sin, +cos     //y values map to sin
        //REGION4:  -sin, -cos      
        
    }   
}

