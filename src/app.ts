// input elem
const inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
const card: HTMLDivElement = document.querySelector('.card')!;
const bottomButton: HTMLButtonElement = document.querySelector('.button-send')!;
const textRate: HTMLParagraphElement = document.querySelector('.text-bottom')!;
const smileyItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.smilley-item')!;
const buttonClose: HTMLButtonElement = document.querySelector('.button-close')!;

console.log(buttonClose)


// Rates
const rate = [
  '1/5 - Pignolesque',
  '2/5 - Bof bof...',
  '3/5 - Peu mieux faire',
  '4/5 - Au top !',
  '5/5 - Parfait !'
];

// Pervious rate selectioned
let previousRate: string = '' 

// Select Rate
const selectRate = (numInput: string): void => {
  // Apply Style
  card.classList.add('active');
  bottomButton.classList.add('active');
  textRate.innerHTML = `${rate[+numInput - 1]}`;

  // Apply change face
  const selectedSmilley:HTMLDivElement | undefined = Array.from(smileyItems).find((item) => {
    return item.dataset['item'] === numInput
})

  selectedSmilley?.classList.add('selected--smilley');

 // Desapply change face
  const unselectedSmilley = Array.from(smileyItems).filter((item) => {
    return item.dataset['item'] !== numInput
})

  unselectedSmilley.forEach((smilley) => {
  smilley.classList.remove('selected--smilley')
})
 

  // remove change face
  previousRate = numInput;
}

// Unselect rate
const unselectRate = (numInput: string): void => {
  card.classList.remove('active');
  bottomButton.classList.remove('active');
  textRate.innerHTML = ``;

  smileyItems.forEach((smilleyItem) => {
  smilleyItem.classList.remove('selected--smilley')
})

  previousRate = ''
}

const onChangeInput = (e:Event) => {
  const inputTarget: HTMLInputElement = e.target as HTMLInputElement;
  const {value} = inputTarget

  if(value !== previousRate) {
selectRate(value);
} 
  else{ 
unselectRate(value);
}

}

const closeCardAnimation = () => {
  console.log('card-out')
  card.classList.add('card-out')
} 
// EVENTS
buttonClose.addEventListener('click', closeCardAnimation)
inputs.forEach((input) => input.addEventListener('click', onChangeInput))



//! Ne marche pas, l'event mouseenter n'est pas capté
const resetAnimation = (e: MouseEvent): void => {
console.log (e)
}
smileyItems.forEach((smilley) => smilley.addEventListener('mouseenter', resetAnimation))
