/**
* CAMBIOS EN EL CIFRADO CAESAR
 * En los metodos de cipher y decipher extraje el bucle y los metí dentro de la función moveLettersFromText(), ya que eran casi idénticos.
 * Cree el método adjustShift que se ejecuta si el movimiento se sale fuera de los alfabetos y teniendo en cuenta qué debe hacer para cifrar y descifrar.
 * Aparte, los métodos His Upper Case, Letter Out of Range y y isLowerCaseOutOfRange tenian un fallo que no se veía porque el código era 3
 * Pero en caso de que el número sea mayor, se salían de rango a la hora de descifrar.
 * Ya que al hacer la operación de char - shift < LETTER.a  o char + shift < LETTERS.a al pasarle un shift negativo del decipher en lugar de restar sumaba
 * Asi que he cambiado el operador de '+' a '-'.
 */
const ALPHABET_LENGTH = 26;
const LETTERS = {A: 65, Z: 90, a:97 ,z:122}

function isUpperCaseLetterOutOfRange(char, shift){
  return char >= LETTERS.A && char <= LETTERS.Z && (char + shift > LETTERS.Z || char + shift < LETTERS.A);
}

function isLowerCaseOutOfRange(char, shift){
  return char >= LETTERS.a && char <= LETTERS.z && (char + shift > LETTERS.z || char + shift < LETTERS.a);
}

function isOutOfAlphabet(char, shift){
  return isUpperCaseLetterOutOfRange(char, shift) || isLowerCaseOutOfRange(char, shift);
}

function adjustShift(shift) {
  return shift > 0 ? shift - ALPHABET_LENGTH : shift + ALPHABET_LENGTH;
}

function moveLettersFromText(oldText, shift) {
  let newText = '';
  let newCharToAddToNewText, shiftToApply, currentChar;
  for (let i = 0; i < oldText.length; i++) {
    currentChar = oldText.charCodeAt(i);
    shiftToApply = isOutOfAlphabet(currentChar, shift) ? adjustShift(shift) : shift;
    newCharToAddToNewText = String.fromCharCode(currentChar + shiftToApply);
    newText = newText.concat(newCharToAddToNewText);
  }
  return newText;
}

function cipher(text, shift) {
    shift = shift % ALPHABET_LENGTH;
    return moveLettersFromText(text, shift);
}
  
  function decipher(text, shift) {
    shift = -shift % ALPHABET_LENGTH;
    return moveLettersFromText(text, shift);;
  }

  console.log(cipher('Hello World', 20))
  
  console.assert(
    cipher('Hello World', 1) === 'Ifmmp!Xpsme',
    `${cipher('Hello World', 1)} === 'Ifmmp!Xpsme'`,
  );
  console.assert(
    decipher(cipher('Hello World', 3), 3) === 'Hello World',
    `${decipher(cipher('Hello World', 3), 3)} === 'Hello World'`,
  );