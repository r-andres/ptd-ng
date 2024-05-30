

export class ChunkArray {

  map: Map<number, number[][]>;
  chunkSize: number;


  public static initialChunkArray(array: number [][]): ChunkArray {
    const chuckArray = new ChunkArray();
    chuckArray.addChunk(0, array);
    return chuckArray;
  }

  constructor(chunkSize= 100) {
   this.map = new Map();
   this.chunkSize = chunkSize;
  }

  addChunk(chunkIndex: number, array: number [][]) {
    this.map.set(chunkIndex, array);
  }

  getIndex(index: number) {
    const chunkIndex = Math.floor(index / this.chunkSize);
    const arrayIndex = index % this.chunkSize;
    if (this.map.has(chunkIndex)) {
      return this.map.get(chunkIndex)[arrayIndex];
    }
    return null;
  }

}


export class ChunkDates {


  map: Map<number, string[]>;
  chunkSize: number;


  public static initialChunkArray(array: string[]): ChunkDates {
    const chuckArray = new ChunkDates();
    chuckArray.addChunk(0, array);
    return chuckArray;
  }

  constructor(chunkSize= 100) {
   this.map = new Map();
   this.chunkSize = chunkSize;
  }

  addChunk(chunkIndex: number, array: string[]) {
    this.map.set(chunkIndex, array);
  }

  getIndex(index: number) {
    const chunkIndex = Math.floor(index / this.chunkSize);
    const arrayIndex = index % this.chunkSize;
    if (this.map.has(chunkIndex)) {
      return this.map.get(chunkIndex)[arrayIndex];
    }
    return null;
  }

  getLastChunk(): number {
    return Math.max(...Array.from(this.map.keys()));
  }


  getLastIndex() {

    return ((this.getLastChunk() + 1) * this.chunkSize) - 1;
  }
  getLastDate() {
    return this.map.get(this.getLastIndex());
  }
  getFirstDate() {
    return this.getIndex(0);
  }
}
