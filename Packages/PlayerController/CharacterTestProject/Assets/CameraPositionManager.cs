using UnityEngine;
using System.Collections;

public class CameraPositionManager : MonoBehaviour {

	public Vector3 NDesired, SDesired, WDesired, EDesired;
	public Vector3 NRot, SRot, WRot, ERot;
	public Vector3 desiredPlayerOffset;
	public string direction;
	public int rotationStep = 5;
	public float moveStep = 0.1f;
	public int desiredYRotation = 0;
	FPSInputController playerInput;



	// Use this for initialization
	void Start () {
		playerInput = GameObject.FindWithTag("Player").GetComponent<FPSInputController>();
		WDesired = 
			(Quaternion.Euler(0f,90f,0f)*
			(SDesired = 
   			    (Quaternion.Euler(0f,90f,0f) *
			 	(EDesired = 
			 		(Quaternion.Euler(0f,90f,0f)*
			 (NDesired = new Vector3(0f,2f,-1.25f)))
			 	))
			 ));
	}
	
	// Update is called once per frame
	void Update () {
		determineDesiredState();
		approachPosition();
		approachRotation();
	}

	void approachRotation(){
		transform.LookAt(GameObject.Find("PlayerCenter").transform.position);
	}

	void approachPosition(){
		transform.position = Vector3.MoveTowards(transform.position, GameObject.FindWithTag("Player").gameObject.transform.position + desiredPlayerOffset, moveStep);
	}

	void determineDesiredState(){
		direction = playerInput.DirectionString;
		desiredPlayerOffset = getDesiredOffset();
	}

	Vector3 getDesiredOffset(){
		switch(direction){
			case "North":
				return NDesired;
			case "East":
				return EDesired;
			case "South":
				return SDesired;
			case "West":	
				return WDesired;
			default:
				return NDesired;
		};
	}
}
