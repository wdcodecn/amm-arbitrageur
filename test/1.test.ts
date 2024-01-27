const MBOX_pairs_2: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < MBOX_pairs_2.length - 1; i++) {
  for (let j = i + 1; j < MBOX_pairs_2.length; j++) {
    const pair1 = MBOX_pairs_2[i];
    const pair2 = MBOX_pairs_2[j];
    if (pair1 && pair2) {
      const pair = [pair1, pair2];
      console.log(pair);
    }
  }
}