export class Utils {
  public static mapStringToCorrectUserView(el: string | null | undefined) {
    return el!.length <= 2 ? el : `${el?.at(0)}${el?.slice(1).toLowerCase()}`;
  }

  public static changeOutputOptionFeature(el: string | null | undefined): string {
    return el?.toString() === "true" ? "+" : "-";
  }

  public static changeInputOptionFeature(el: string): string {
    return el.toString() === "true" ? "Yes" : "No";
  }

  public static changeOptionFeatureToBoolean(el: string |  null | undefined): string {
    return el?.toString() === "Yes" ? "true" : "false";
  }
}
