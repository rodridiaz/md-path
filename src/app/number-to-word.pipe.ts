import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "numberToWords",
})
export class NumberToWordPipe implements PipeTransform {
  transform(value: any): string {
    if (value && isInteger(value)) return words[value];

    return value;
  }
}

const isInteger = function (x: any) {
  return x % 1 === 0;
};

const words = ["", "one", "two", "3", "4", "5", "6", "7", "8", "9", "Ten"];
