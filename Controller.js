

class ControllerMenu { 
    constructor() { 
        
         this.isActive = false; 
         this.position = {x:0, y:0}; 
         this.mButton = null; 
         this.actor = null;
    }

    setActive(active) {
        this.isActive = active; 
    }

    getState(){ return this.isActive; }

    pollActive() { 
        if (this.isActive){
            console.log("ControllerMenu being polled is -ACTIVE-")
            this.mButton = mouseButton; 
            console.log("ControllerMenu being polled is", this.mButton);
            if (this.mButton == RIGHT){
                //do RIGHT BUTTON action 

            }
            else if (this.mButton == LEFT){//do left
                console.log("ControllerMenu being polled is", this.mButton);
                this.getVector(); 
            }

        }
        else 
            console.log("ControllerMenu being polled is -INACTIVE-")
    }
    setActor(actor){ 
        this.actor = actor; 

    }

    setActorPosition(position){ 
        this.actor.position.x = position.x; 
        this.actor.position.y = position.y;
    }
    getActorPosition() { 
        return this.actor.position; 
    }
    getActorSpeed() { 
        return this.actor.speed; 
    }
    getVector(){ 
        this.position = this.actor.getPosition(); 
        console.log("ControllerMenu being polled is at this position: " +  this.position);
        const mx = mouseX; 
        const my = mouseY; 
        const x = this.position.x; 
        const y = this.position.y; 
        console.log("ControllerMenu position: " + x + " " + y + " " + my + " " +mx)
        //determine vector of mouse coordinates
        //position vector: P-Q
        let vectorX = x-mx; let vectorY = y-my; 
        let magnitude = Math.sqrt(vectorX * vectorX + vectorY * vectorY)
        let direction = Math.tan(vectorY/vectorX)
        let updateDirection = Math.atan(vectorY/vectorX)
        let finalDirection = 360+updateDirection; 
        console.log("Direction: " + direction)
        console.log("Magnitude: " + magnitude)
        console.log("UpdateDirection: " + updateDirection)
      //  line(x, y, mx, my); 
      //  line(x, y, magnitude*Math.cos(finalDirection), magnitude*Math.sin(finalDirection))
        let tanDegreesY = Math.atan(vectorY/vectorX)
        let tanDegreesX = Math.atan(vectorX/vectorY)
        console.log(tanDegreesY, "tanDegrees was...")
        tanDegreesY = tanDegreesY*(180/Math.PI)
        tanDegreesX = tanDegreesX*180/Math.PI;
        console.log(tanDegreesX, "tanDegreesX was...")//cos value 
        let angleDegrees = Math.atan2(my, mx) * 180/Math.PI
        console.log(tanDegreesY, "tanDegrees was "); //gives quadrants in 90 degree segements
      //  line (x, y, magnitude*Math.cos(tanDegreesX), magnitude*Math.sin(tanDegreesY))

        let quadLR = 1; 
        let quadNS = 1; 
        if (my<=y) { 
            quadNS = -1
            console.log("mouse is north of center")
            //left quadrant
        }
        if (mx<=x) {
            console.log("mouse is left of center")
            quadLR = -1; 
            //south quadrant
        }
        //for evaluation: 
        let tempestX = tanDegreesX * quadLR; 
        let tempestY = tanDegreesY * quadNS;
        console.log("tempestX = " + tempestX);
        console.log("tempestY = " + tempestY);
        let tempestCW = 0; 
        let tempestCCW = 0; 
        let r = 1.5 //radius of line
        let q = random(0, 30); 
        //evaluate tempestX and Y 
        let w = .4 //width or arc
        if (tempestX<=0 && tempestY>=0){ 
            console.log("Based on Tempest Values, we are in: Quadrant 1{12-3}");
            tempestCW += Math.abs(tempestX); 
            tempestCCW += Math.abs(tempestY); 
            let rad = radians(tempestCW-90)
           // line(150, 150, 150+Math.cos(rad), 150+Math.sin(rad));  
            arc(x+Math.cos(rad), y+Math.sin(rad), 30, 45, rad-w, rad+w)
            
        }
        else if (tempestX>=0 && tempestY>=0){ 
            console.log("Based on Tempest Values, we are in: Quadrant 2{3-6}"); 
            tempestCW += Math.abs(tempestY)+90;  
            tempestCCW += Math.abs(tempestX)+270;
               let rad = radians(tempestCW-90)
         //   line(150, 150, 150+Math.cos(rad), 150+Math.sin(rad));  
            arc(x+Math.cos(rad), y+Math.sin(rad), 30, 45, rad-w, rad+w)
        }
        else if (tempestX>0 && tempestY<0){ 
            console.log("Based on Tempest Values, we are in: Quadrant 3{6-9_"); 
            tempestCW += Math.abs(tempestX)+ 180;
            tempestCCW += Math.abs(tempestY) + 180;
               let rad = radians(tempestCW-90)
           // line(150, 150, 150+Math.cos(rad), 150+Math.sin(rad));  
            arc(x+Math.cos(rad), y+Math.sin(rad), 30, 45, rad-w, rad+w)
        }
        else if (tempestX<0 && tempestY<0){ 
            console.log("Based on Tempest Values, we are in: Quadrant 4{9-12}"); 
            tempestCW += Math.abs(tempestY) + 270; 
            tempestCCW += Math.abs(tempestX) + 90;
               let rad = radians(tempestCW-90)
           /// line(150, 150, 150+Math.cos(rad), 150+Math.sin(rad));  
            arc(x+Math.cos(rad), y+Math.sin(rad), 30, 45, rad-w, rad+w)
        }

        console.log("CCW: " + tempestCCW + "  CW:" + tempestCW)
        console.log("Direction in radians(CW): " + (tempestCW*Math.PI)/180); 
        console.log("Direction in radians(CCW): " + (tempestCCW*Math.PI)/180)
        let radiansCCW = tempestCCW*Math.PI/180; 
        let radiansCW = tempestCW*Math.PI/180; 
        let value = {radiansCW:radiansCW,radiansCCW:radiansCCW}
         
       return value; 
        //float x = cos(radians(angle))* radius
        //float x = sin(radians(angle))* radius
     //   line(150, 150, cos(radiansCCW)*.3, sin(radiansCCW)*.3)
        }//end fn: getVector() 

}


class Controller { 
    constructor() {
        this.event = 0; 
        this.controllerMenu = new ControllerMenu()
        this.mouseActive = false; 
        this.mouseManage = function mouseReleased() { 
            console.log("we are updating mouse to inactive state")
            this.mouseActive = false; 
            this.controllerMenu.setActive(false)
        }
    }


    determineState() { 
        this.controllerMenu.pollActive()
        if (mouseIsPressed ===true) { 
            this.mouseActive = true; 
            this.controllerMenu.setActive(true)
            console.log("mouse is pressed from Controller class"); 
            if (mouseButton === LEFT){
                console.log("left is pressed from Controller class");
            }//end if (mouseButton === LEFT)
            else if (mouseButton === RIGHT) {
                console.log("right is pressed from Controller class");
                this.controllerMenu.setActive("true"); 
            }//end else if (mouseButton ===RIGHT)
            
        }//end if (mouseIsPressed === true)
        else {
            this.mouseManage()
            //have we just released or have we been released???
            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
            //do this check
        } //end else if mouseIsPressed === true
    }//end fn: determineState()

    manageMouseState(){ 

    }

    setActorForController(actor){ 
        this.controllerMenu.setActor(actor)
    }

    updatePosition(position){ 
        this.controllerMenu.setActorPosition(position)
    }

    getVector() { 
        let value = this.controllerMenu.getVector()
        return value; 
    }
    getActorSpeed() { 
        return this.controllerMenu.getActorSpeed(); 
    }
} //end class: Controller

