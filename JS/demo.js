// Set new array and store it in localStorage
function setArray() {
  var myList = ['Shower', 'Brush teeth', 'Get dressed'];

  localStorage.setItem("todos", JSON.stringify(myList));
  loop();
}

//Print out from array to list
function loop() {
  var fromLocalStorage = JSON.parse(localStorage.getItem("todos"));
  if (fromLocalStorage === null) {
    setArray();
  } else {
    for (var i = 0; i < fromLocalStorage.length; i++) {
      document.getElementById("list").innerHTML += "<li id='" + [i] + "'>" + fromLocalStorage[i] + ' ' + "<input onclick='done(" + [i] + ")' type='checkbox' name='todo' value='" + [i] + "'>" + "</li>";
    }
  }
}

// Remove checked to-do and add it to done
function done(i) {
  var fromLocalStorage = JSON.parse(localStorage.getItem("todos"));

  var list = document.getElementById([i]);
  list.remove();

  document.getElementById("done").innerHTML += "<li id='" + [i] + "'>" + fromLocalStorage[i] + ' ' + "<input onclick='undo(" + [i] + ")' type='checkbox' name='todo' checked value='" + [i] + "'>" + "</li>";
}

//Undo to-do from done and put it back to list
function undo(i) {
  var fromLocalStorage = JSON.parse(localStorage.getItem("todos"));

  var undoTodo = document.getElementById([i]);
  undoTodo.remove();

  document.getElementById("list").innerHTML += "<li id='" + [i] + "'>" + fromLocalStorage[i] + ' ' + "<input onclick='done(" + [i] + ")' type='checkbox' name='todo' value='" + [i] + "'>" + "</li>";
}

//Add new to-do to array and list
function addToDo() {
  a = document.getElementById('addInput').value;
  if (a === "" || a === " " || a === "  " || a === "   ") {
    alert("You must write something!");
  } else {
    var fromLocalStorage = JSON.parse(localStorage.getItem("todos"));
    fromLocalStorage.push(a);

    localStorage.setItem("todos", JSON.stringify(fromLocalStorage));
    var fromLocalStorage = JSON.parse(localStorage.getItem("todos"));

    i = fromLocalStorage.lastIndexOf(a);
    document.getElementById("list").innerHTML += "<li id='" + [i] + "'>" + fromLocalStorage[i] + ' ' + "<input onclick='done(" + [i] + ")' type='checkbox' name='todo' value='" + [i] + "'>" + "</li>";
  }
  document.getElementById('addInput').value = "";
}

//Delete all new to-dos added to list and array
function deleteAll() {
  document.getElementById("list").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  localStorage.removeItem("todos");
  loop();
}

// Toggle sort, ascending (A to Z) and descending (Z to A)
function sortList() {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.getElementById("list");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  // Make a loop that will continue until no switching has been done:
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc): */
      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          /* If next item is alphabetically higher than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Each time a switch is done, increase switchcount by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}