/* These variables determine the new location of the moving box */
var parentElement; // Represents the container of the box grid
var moveBox; // The moving box
var moveBlock; // The parent of the moving box
var moveBlockIndex; // Index of the moveBlock variable

/* Top left x & y coordinates of the box while it's moving */
var elementXCoord;
var elementYCoord;

/********************************************************************  
		This function will load all of the boxes into a grid. 
		The prepareMove function is assigned to the mousedown event and 
		the stopMove function is assigned to mouseup. 
********************************************************************/

function moveInit() {
	var gridDiv = document.getElementById("boxLayout");
	parentElement = document.getElementById("boxLayout");

	for (i = 0; i < 10; i++) {
		var newList = document.createElement("li");
		newList.className = "block";

		var box = document.createElement("span");
		box.className = "box";
		box.textContent = i;
		box.onmousedown = prepareMove;

		newList.appendChild(box);
		gridDiv.appendChild(newList);
	}
	document.onmouseup = stopMove;
}

/********************************************************************  
		As the user moves the box around, this function is called to 
		find what the current index is where the box would be 
		re-positioned.  
********************************************************************/

function getChildIndex (parent, child) {
	for (i = 0; i < parentElement.childNodes.length; i++) {
		if (child == parent.childNodes[i]) {
			return i;
		}
	}
}

/********************************************************************  
		This function is called when the moving box is to be placed 
		after its original location in the node list. If 
		referenceNode.nextSibling is null, then it will insertBefore 
		that node.
********************************************************************/

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}