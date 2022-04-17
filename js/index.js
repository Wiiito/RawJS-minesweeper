var width = 10 //Default 10, get from the user
var height = 10 //Default 10, get from the user

var difficulty = 15 //(10-40)% of bombs

var display = [] //Showing squares
var bombs = [] //hiddenBombs

var bombsLeft = 0 //Used to display the left bombs and create the bombs array

for (i = 0; i < width * height; i++) {
  display.push(0) //Create the display array
  bombs.push(0) //Create the bomb array
}

while (bombsLeft < width * height * difficulty * 0.01) {
  //Set the bombs in the bomb array
  bombs[Math.round(Math.random() * (display.length - 1))] = 1
  bombsLeft++
}

const root = document.getElementsByClassName('root')[0]

for (i = 0; i < height; i++) {
  //Render the display
  const line = document.createElement('div')
  line.classList.add('line')
  root.appendChild(line)
  for (j = 0; j < width; j++) {
    const id = i * width + j //[Display] index
    const button = document.createElement('button') //Creating the checkbox
    button.id = `Button${id}`
    button.addEventListener('click', () => handleClick(id))

    line.appendChild(button) //Rendering the elements
  }
}

function handleClick(id) {
  //Handle the logic
  if (isBomb(Number(id))) {
    console.log('perdeu')
  } else {
    /*document.getElementById(`Button${id}`).style.backgroundColor =
      'rgba(0,0,0,0.4)'*/
    document.getElementById(`Button${id}`).innerHTML = getNearBombs(id)
    expandClick(id)
  }
}

function expandClick(id) {
  for (i = id; getNearBombs(i) <= 0 && getCloseHouses(i).includes(i + 1); i++) {
    //Expand Right
    document.getElementById(`Button${i + 1}`).innerHTML = getNearBombs(i + 1)
    for (j = i; getNearBombs(j) <= 0 && j >= width; j = j - width) {
      //On right, expand top
      document.getElementById(`Button${j - width}`).innerHTML = getNearBombs(
        j - width
      )
    }
    for (
      j = i;
      getNearBombs(j) <= 0 && j < display.length - width;
      j = j + width
    ) {
      //On right, expand bottom
      document.getElementById(`Button${j + width}`).innerHTML = getNearBombs(
        j + width
      )
    }
  }

  for (i = id; getNearBombs(i) <= 0 && getCloseHouses(i).includes(i - 1); i--) {
    //Expand Left
    document.getElementById(`Button${i - 1}`).innerHTML = getNearBombs(i - 1)
    for (j = i; getNearBombs(j) <= 0 && j >= width; j = j - width) {
      //On left, expand top
      document.getElementById(`Button${j - width}`).innerHTML = getNearBombs(
        j - width
      )
    }
    for (
      j = i;
      getNearBombs(j) <= 0 && j < display.length - width;
      j = j + width
    ) {
      //On left, expand bottom
      document.getElementById(`Button${j + width}`).innerHTML = getNearBombs(
        j + width
      )
    }
  }
}

function isBomb(id) {
  //Cheks if theres a bomb on the clicked square
  if (bombs[id]) {
    return true
  }
  return false
}

function getCloseHouses(id) {
  //Return all near houses []
  var closeHouses = [id]
  var left = id - 1
  var right = id + 1

  //Side houses
  if (
    !(
      /*Pegando o primeiro quadrado da linha*/
      (left < Math.floor(id / width) * width) //Recebe um valor menor que o da casa
    )
  ) {
    closeHouses.push(left)
  }
  if (
    /*Pegando o ultimo quadrado da linha*/
    !(right >= Math.ceil(right / width) * width) //Recebe um valor que seja igual a casa
  ) {
    closeHouses.push(right)
  }

  //Upper houses
  var up = id + width
  var down = id - width

  if (down >= 0) {
    //Checks if there's a line under it
    closeHouses.push(down)
    if (
      !(
        /*Pegando o primeiro quadrado da linha*/
        (left < Math.floor(id / width) * width) //Recebe um valor menor que o da casa
      )
    ) {
      closeHouses.push(left - width)
    }
    if (
      /*Pegando o ultimo quadrado da linha*/
      !(right >= Math.ceil(right / width) * width) //Recebe um valor que seja igual a casa
    ) {
      closeHouses.push(right - width)
    }
  }
  if (up < display.length) {
    //Checks if there's a line above it
    closeHouses.push(up)
    if (
      !(
        /*Pegando o primeiro quadrado da linha*/
        (left < Math.floor(id / width) * width) //Recebe um valor menor que o da casa
      )
    ) {
      closeHouses.push(left + width)
    }
    if (
      /*Pegando o ultimo quadrado da linha*/
      !(right >= Math.ceil(right / width) * width) //Recebe um valor que seja igual a casa
    ) {
      closeHouses.push(right + width)
    }
  }
  return closeHouses
}

function getNearBombs(id) {
  var count = 0
  getCloseHouses(id).map(house => {
    if (isBomb(house)) {
      count++
    }
  })
  return count
}
