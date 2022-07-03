MAX_X= 300; 
MAX_Y= 300; 


function* testRan (obj) { 
    while (true) { 
       obj.x = random(0, 100); 
       obj.y = random(0, 100);
       console.log("run 1 in testRan");  
        yield; 
       obj.x=25; 
       obj.y=25; 
       console.log("run 2 in testRan"); 
        yield; 
    }
    }

function checkPosition (obj) { 
    let x = obj.x; 
    let y = obj.y; 
    if (x<0) x=0; if (x>MAX_X) x = MAX_X; 
    if (y<0) y =0; if (y>MAX_Y) y = MAX_Y; 
    let newPos = {x:x, y:y}; 
    return newPos; 
}
class Squared  { 
    
    constructor(){ console.log("squared");
            this.pos = {x:0, y:0};
          
            this.t= testRan(this.pos); 

    } 
    
    move (updatePos) { 
        this.addPos(updatePos.x, updatePos.y); 
        console.log("moving"); 
        circle(this.pos.x, this.pos.y, 25); 
        this.t.next(); 
        this.setPos(checkPosition(this.pos));

        //circle()
    }
    startle () { 
        console.log("i am startled"); 
       this.t.next();  
    }
    
    getPos() { 
        return this.pos; 
    }
    setPos(xx, yy) { 
        this.pos.x=xx; 
        this.pos.y=yy; 
    }
    addPos(xx, yy) { 
        this.pos.x +=xx; 
        this.pos.y +=yy; 
    }
    addPos(updatePos){ 
        this.pos+= updatePos; 
    }
    checkPos() { 
        console.log(this.pos + " " + this.pos.x + " " + this.pos.y); 
    }
}//end class: Squared; 


 let s = new Squared(); 
let tt = test(); 




let actor = new Actor();
let quadrantMap; 
let controller; 


function setup () { 

    c = createCanvas(MAX_X, MAX_Y); 
  
    background(125);  
    tt.next(); 


    
    quadrantMap = new Quadrant_Map(); 
    controller = new Controller();
    controller.setActorForController(actor)

    controller.updatePosition({x:150, y:150});
   
   // let vector = controller.getVector(); 
   // s.move(); 
}
 
function draw () { 
    background(225); 
    quadrantMap.printQuad()
    actor.printPosition()
   // actor.updatePosition(150, 150);
    let circ_pos = actor.getPosition(); 
    circle(circ_pos.x, circ_pos.y, random(0, 20)); 

    
    
    controller.determineState(); 

    //request actor position to update actor position 
    let actor_pos = actor.getPosition(); 
   
    controller.updatePosition(actor_pos);

    const value = controller.getVector(); 
    console.log(value.radiansCCW + "Player choice radians are: ")
    let dirX = Math.cos(value.radiansCCW); 
    let dirY = Math.sin(value.radiansCCW);
    console.log(dirX + " " + dirY + ": Local coordinate for vector movement")
    let qx = dirX
    let qy = dirY; 
    actor_pos.x = actor_pos.x + qx; 
    actor_pos.y = actor_pos.y + qy;
    const player_position = {x:actor_pos.x, y:actor_pos.y};
    controller.updatePosition(player_position);
    requestAnimationFrame; 
   
}

function* test (inputVal) { 
    console.log("hello"); 
    inputVal++; 
    var x = yield; 
    console.log("first i got a" + x); 
    let y = yield; 
    console.log("second i got a" + y); 
    while (true){ 
        let z = yield; 
        console.log("then we loop..."); 
        let w = yield; 
        console.log("and we keep looping")
    }
}
