export class Part {
  constructor(header: string | null | undefined, content: string | null | undefined) {
    this.header = header;
    this.text = content;
  }

  id!: number
  header!: string | null | undefined
  text!: string | null | undefined
}
