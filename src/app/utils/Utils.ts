export class Utils{
  public static mapString(el: string | undefined) {
    if (el!.length <= 2) {
      return el;
    }
    return el?.at(0)?.concat(el?.substring(1, el.length).toLowerCase()!.toString());
  }
}
