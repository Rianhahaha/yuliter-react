// utils/shuffle.ts
export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex, temporaryValue;
  
    // Mengacak array dengan algortima Fisher-Yates (Durstenfeld)
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  