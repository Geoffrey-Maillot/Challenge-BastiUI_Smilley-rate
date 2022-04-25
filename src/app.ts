// DOM elements
const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
const card: HTMLDivElement = document.querySelector('.card')!;
const bottomButton: HTMLButtonElement = document.querySelector('.button-send')!;
const textRate: HTMLParagraphElement = document.querySelector('.text-bottom')!;
const smileyItems: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.smilley-item')!;
const buttonClose: HTMLButtonElement = document.querySelector('.button-close')!;
const container: HTMLDivElement = document.querySelector('.container')!;

// Rates
const rate = [
  '1/5 - Pignolesque',
  '2/5 - Bof bof...',
  '3/5 - Peu mieux faire',
  '4/5 - Au top !',
  '5/5 - Parfait !',
];

// Pervious rate selectioned
let previousRate: string = '';

/**
 * Apply changes when smilley is active
 * @param numInput Smilley clicked
 */
const selectRate = (numInput: string): void => {
  // Apply Style
  card.classList.add('active');
  bottomButton.classList.add('active');
  textRate.innerHTML = `${rate[+numInput - 1]}`;

  // Apply change face
  Array.from(smileyItems).forEach((item) => {
    if (item.dataset['item'] === numInput) {
      item.classList.add('selected--smilley');
      item.classList.remove('unselected--smilley');
    }

    // Desapply change face for other smilley
    else {
      item.classList.remove('selected--smilley');
      item.classList.add('unselected--smilley');
    }
  });

  // Stock num of smilley clicked
  previousRate = numInput;
};

/**
 * Unselect Smilley
 */
const unselectRate = (): void => {
  card.classList.remove('active');
  bottomButton.classList.remove('active');
  textRate.innerHTML = ``;

  smileyItems.forEach((smilleyItem) => {
    smilleyItem.classList.remove('selected--smilley', 'unselected--smilley');
  });

  previousRate = '';
};

/**
 *  Click Event - Select or unselect smilley
 * @param e MouseEvent
 */
const onClickInput = (e: MouseEvent): void => {
  const inputTarget: HTMLInputElement = e.target as HTMLInputElement;
  const { value } = inputTarget;

  if (value !== previousRate) {
    selectRate(value);
  } else {
    unselectRate();
  }
};

// Close Card Animation
const closeCardAnimation = () => {
  card.classList.add('card-out');
  container.classList.add('container--out');
};

// Send card animation
const cardSendAnimation = () => {
  card.classList.add('card--send');
  container.classList.add('container--send');

  setTimeout(() => {
    container.classList.add('container--out');
  }, 480);
};

// Add Events listener
buttonClose.addEventListener('click', closeCardAnimation);
bottomButton.addEventListener('click', cardSendAnimation);
inputs.forEach((input) => input.addEventListener('click', onClickInput));

//! Ne marche pas, l'event mouseenter n'est pas capté... WHY?
const resetAnimation = (e: MouseEvent): void => {
  console.log(e);
};
smileyItems.forEach((smilley) =>
  smilley.addEventListener('mouseover', resetAnimation)
);
