// 表示一個數值範圍的類別
export class NumericRange {
	kind: RangeKind;
	min?: number;
	max?: number;

	constructor(kind?: RangeKind, min?: number, max?: number) {
		this.kind = kind ?? new RangeKind(false, false);
		this.min = min;
		this.max = max;
	}

	toString(prefix = ' @ '): string {
		if (this.min === this.max) {
			return `${prefix}${
				this.min !== undefined ? `${this.min}` : `${this.kind.toString()}`
			}`;
		}
		return `${prefix}${this.min!}${this.kind.toString()}${this.max!}`;
	}
}

// 表示範圍種類的類別，用於指定範圍是否排除邊界值
export class RangeKind {
	isLeftExclusive: boolean;
	isRightExclusive: boolean;

	constructor(isLeftExclusive: boolean, isRightExclusive: boolean) {
		this.isLeftExclusive = isLeftExclusive;
		this.isRightExclusive = isRightExclusive;
	}

	toString(): string {
		const prefix = this.isLeftExclusive ? '<' : '';
		const suffix = this.isRightExclusive ? '<' : '';
		return `${prefix}..${suffix}`;
	}
}

// 檢查給定的字串是否為資源定位符
export function isResourceLocation(value: string): boolean {
	return !!value.match(/^[a-z0-9_]*:[a-z0-9_]+$/);
}
