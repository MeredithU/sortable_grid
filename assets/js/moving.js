/******************************************************************** 
		This function is called once a user clicks down on a box. 
		The moveElement function is triggered once the user starts 
		moving the box around.
********************************************************************/

function prepareMove(event) {
	event.preventDefault();
	
	elementXCoord = event.pageX - event.currentTarget.offsetLeft;
	elementYCoord = event.pageY - event.currentTarget.offsetTop;
	
	if (typeof event.currentTarget != 'undefined') {
		moveBlock = event.currentTarget.parentNode;
		moveBlockIndex = getChildIndex(parentElement, moveBlock);
		moveBox = event.currentTarget;

		moveBox.style.opacity = 0.5;
		
		/*************************************************************** 
		Once the mousedown event is called, it creates a clone of that 
		box to keep in the original position while user looks for a 
		new position.
		****************************************************************/ 
		moveBlock.appendChild(moveBox.cloneNode(true));

		moveBox.style.position = 'absolute';
		moveBox.style.zIndex = 2;

		moveBox.onmousemove = moveElement;
		moveElement(event);
	}
}

/******************************************************************** 
		This function is called when the user is moving the box around. 
		It first finds the x & y mouse coordinates and calculates the
		new position of the moving box.  
********************************************************************/

function moveElement(event) {
	var mouseXCoord = event.pageX; // x coordinate of the mouse as it moves
	var mouseYCoord = event.pageY; //y coordinate of the mouse as it moves

	var newMouseXCoord = event.pageX - event.currentTarget.parentNode.offsetLeft;
	var newMouseYCoord = event.pageY - event.currentTarget.parentNode.offsetTop;
	
	/* Re-calculate the top & left positions of the moving box */
	moveBox.style.left = (mouseXCoord - elementXCoord) + "px";
	moveBox.style.top = (mouseYCoord - elementYCoord) + "px";

	var block = parentElement.childNodes; // the container for all of the boxes (child nodes)

	/* Loop through the array containing all the boxes to determine new placement */
	for (i = 0; i < block.length; i++) {

		/* targetIndex will be used to determine the new position in the array */
		var targetIndex = getChildIndex(parentElement, block[i]);

		/* Get the box constraints to compare with the coordinates of the moving box */
		if (targetIndex != moveBlockIndex) {
			var minTopConstraint = block[i].childNodes[0].offsetTop;
			var maxTopConstraint = block[i].childNodes[0].offsetTop + block[i].childNodes[0].clientHeight;
			var minLeftConstraint = block[i].childNodes[0].offsetLeft;
			var maxLeftConstraint = block[i].childNodes[0].offsetLeft + block[i].childNodes[0].clientWidth;

			if (minTopConstraint <= newMouseYCoord && newMouseYCoord <= maxTopConstraint) {
				if (minLeftConstraint <= newMouseXCoord && newMouseXCoord <= maxLeftConstraint) {
					if (targetIndex < moveBlockIndex) {
						parentElement.insertBefore(moveBox.parentNode, block[i]);
					} else {
						insertAfter(block[i], moveBox.parentNode);
					}
					moveBlockIndex = getChildIndex(parentElement, moveBlock);
					break;
				}
			}
		}
	}
}

/********************************************************************  
		When the mouseup event is called, this function will reset our 
		variables used to track the moving box. In addition, it will
		remove the cloned box. 
********************************************************************/

function stopMove(event) {
	if (moveBox && moveBlock) {
		moveBox.style.opacity = 1;
		moveBox.style.position = 'static';
		moveBox.style.zIndex = 1;
		moveBox.onmousemove = null;
		moveBlock.removeChild(moveBlock.childNodes[1]);

		moveBox = null;
		moveBlock = null;
	}	
}