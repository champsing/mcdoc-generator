import { isResourceLocation } from "./util";

// 定義具有參數的屬性名稱集合
const attributesWithValue = new Set<string>([
  "id",
  "dispatcher_key",
  "color"
]);
// 定義所有有效的屬性名稱集合
export const validAttributeNames = new Set<string>([
  ...attributesWithValue,
  "text_component",
  "command",
  "uuid"
]);

// 表示一個屬性的類別，用於在類型上添加元數據
export class Attribute {
  name: string;
  value: string;

  constructor(name: string, value?: string) {
    this.name = name;
    this.value = value ?? "";
  }

  // 判斷屬性是否具有參數
  get hasParam(): boolean {
    return attributesWithValue.has(this.name);
  }

  // 驗證屬性的方法
  validate(): boolean {
    if(!validAttributeNames.has(this.name)) {
      return false;
    }
    switch(this.name) {
      case "color":
        return this.value === "hex_rgb";
      case "dispatcher_key":
        return isResourceLocation(this.value);
    }
    return true;
  }

  // 將屬性轉為字串的方法
  toString(): string {
    if(this.hasParam && this.value) {
      return `#[${this.name}="${this.value}"]`;
    }
    return `#[${this.name}]`;
  }
}
