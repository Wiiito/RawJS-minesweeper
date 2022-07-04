var width = 10 //Default 10, get from the user
var height = 10 //Default 10, get from the user

var difficulty = 15 //(10-40)% of bombs

var display = [] //Showing squares
var bombs = [] //hiddenBombs
var clickedHouses = []

var bombsLeft = 0 //Used to display the left bombs and create the bombs array

function renderGame() {
  for (i = 0; i < width * height; i++) {
    display.push(0) //Create the display array
    bombs.push(0) //Create the bomb array
    clickedHouses.push(1)
  }

  while (bombsLeft < width * height * difficulty * 0.01) {
    //Set the bombs in the bomb array
    bombs[Math.round(Math.random() * (display.length - 1))] = 1
    bombsLeft++
  }
}

renderGame()

const root = document.getElementById('game')

window.addEventListener(
  'contextmenu',
  function (e) {
    e.preventDefault()
  },
  false
)

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
    button.addEventListener('contextmenu', () => guessBomb(id))

    line.appendChild(button) //Rendering the elements
  }
}

//Comparing arrays to win condition
const equals = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

function guessBomb(id) {
  //Assign bomb to square
  if (
    !document.getElementById(`Button${id}`).classList.contains('noBomb') &&
    document.getElementById(`Button${id}`).style.color === ''
  ) {
    if (!document.getElementById(`Button${id}`).classList.contains('bomb')) {
      display[id] = 1
      bombsLeft--
      document.getElementById(`Button${id}`).classList.add('bomb')
    } else {
      //Removing bomb from square
      display[id] = 0
      bombsLeft++
      document.getElementById(`Button${id}`).classList.remove('bomb')
    }
  }
  //Win Condition
  if (equals(display, bombs)) {
    console.log('Won')
  }
}

function handleClick(id) {
  //Handle the logic
  if (isBomb(Number(id))) {
    console.log('perdeu')
  } else {
    expandClick(id)
    //Win Condition
    if (equals(clickedHouses, bombs)) {
      console.log('Won')
    }
  }
}

function expandClick(id) {
  if (getNearBombs(id) !== 0) {
    clickedHouses[id] = 0
    numberColor(id)
    document.getElementById(`Button${id}`).innerHTML = getNearBombs(id) //Colore o primeiro botão
  }

  if (getNearBombs(id) > 0) return //Volta se a casa clicada não tiver o valor de 0

  var noBombsHouses = [id] //Inital value
  var initialBombsQuantity = noBombsHouses.length //Exit loop condition
  do {
    //Spread algorithm
    initialBombsQuantity = noBombsHouses.length //Starts exit condition
    noBombsHouses.map(house => {
      colorHouses(house)
      //Color every empty house added to [noBombsHouses]

      getCloseHouses(house).map(current => {
        //If the near house of the current house (house from map()),
        //has no bomb and it's no already in [noBombsHouses],
        //will be pushed
        if (getNearBombs(current) === 0) {
          if (!noBombsHouses.includes(current))
            return noBombsHouses.push(current)
        }
      })
    })
  } while (noBombsHouses.length !== initialBombsQuantity) //Break condition: [noBombsHouses] changed
}

function colorHouses(id) {
  getCloseHouses(id).map(house => {
    clickedHouses[house] = 0
    numberColor(house)
    if (getNearBombs(house) !== 0) {
      document.getElementById(`Button${house}`).innerHTML = getNearBombs(house)
    }
  })
}

function numberColor(id) {
  //Coloring the bomb indicator box
  switch (getNearBombs(id)) {
    case 1:
      document.getElementById(`Button${id}`).classList.add('one', 'noBomb')
      break
    case 2:
      document.getElementById(`Button${id}`).classList.add('two', 'noBomb')
      break
    case 3:
      document.getElementById(`Button${id}`).classList.add('three', 'noBomb')
      break
    case 4:
      document.getElementById(`Button${id}`).classList.add('four', 'noBomb')
      break
    case 5:
      document.getElementById(`Button${id}`).classList.add('five', 'noBomb')
      break
    case 6:
      document.getElementById(`Button${id}`).classList.add('six', 'noBomb')
      break
    case 7:
      document.getElementById(`Button${id}`).classList.add('seven', 'noBomb')
      break
    case 8:
      document.getElementById(`Button${id}`).classList.add('eight', 'noBomb')
      break
    default:
      document.getElementById(`Button${id}`).classList.add('noBomb')
      break
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
