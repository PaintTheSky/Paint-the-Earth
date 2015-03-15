private var motor : CharacterMotor;
public var Direction : int; // 0 north, 1 east, 2 south, 3 west
public var TurnAllowed : boolean; // one turn per button press
public var DirectionString : String; // tells you direction in unity editor
public var ForwardVector : Vector3;
// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
}

// Update is called once per frame
function Update () {
	// Get the input vector from keyboard or analog stick
	var directionByInput = Input.GetAxis("Horizontal");
	
	// left
	if(directionByInput > 0 && TurnAllowed){
		turnRight();
		TurnAllowed = false;
	}
	// right
	else if(directionByInput < 0 && TurnAllowed){
		turnLeft();
		TurnAllowed = false;
	}
	else if(directionByInput == 0) { TurnAllowed = true; } 
	
	var directionVector = 
		new Vector3(
			(Direction==1)? 0.5 : ((Direction==3)? -0.5: 0), // for West and East (+/- X direction)
			0, 
			(Direction==0)? 0.5 : ((Direction==2)? -0.5: 0)); // for North and South (+/- Z direction)
	ForwardVector = directionVector;
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
	}
	
	DirectionString = getDirectionString(Direction);
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
}

public function getDirectionString(dir: int){
	switch(dir){
		case 0:
			return "North";
		case 1:
			return "East";
		case 2: 
			return "South";
		case 3:
			return "West";
		default: 
			return "WAT?";
	}
}

function turnRight(){
	Direction = (Direction + 1);
	if(Direction > 3) { Direction -= 4; }
}

function turnLeft(){
	Direction = (Direction - 1);
	if(Direction < 0) { Direction += 4; }
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
