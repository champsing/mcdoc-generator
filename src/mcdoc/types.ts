import { type NumericRange, isResourceLocation } from './util';
import { Attribute } from './attribute';

// 定義所有 Mcdoc 類型的抽象基類
export abstract class McdocType {
	attributes: Attribute[];

	constructor() {
		this.attributes = [];
	}

	// 驗證屬性類型的方法
	abstract validateAttributeTypes(): boolean[];
	// 驗證欄位的方法
	abstract validateField(): boolean;

	toString(): string {
		return this.attributes.length > 0
			? this.attributes.map((attr) => attr.toString()).join(' ') + ' '
			: '';
	}
}

// 無屬性類型的抽象基類
abstract class NoAttributeType extends McdocType {
	validateAttributeTypes(): boolean[] {
		return this.attributes.map((_) => false);
	}
}

// 簡單類型的抽象基類，例如 'any' 或 'boolean'
abstract class SimpleType extends NoAttributeType {
	protected typeName: string;

	constructor(typeName: string) {
		super();
		this.typeName = typeName;
	}

	validateField(): boolean {
		return true;
	}

	toString(): string {
		return `${this.typeName}`;
	}
}

// 表示任意類型的類別
export class AnyType extends SimpleType {
	constructor() {
		super('any');
	}
}

// 表示布林值類型的類別
export class BooleanType extends SimpleType {
	constructor() {
		super('boolean');
	}
}

// 定義數值類型的可能種類集合
const numericTypeKinds = new Set([
	'byte',
	'short',
	'int',
	'long',
	'float',
	'double',
] as const);
export type NumericTypeKinds = typeof numericTypeKinds extends Set<infer V>
	? V
	: never;

// 表示數值類型的類別
export class NumericType extends NoAttributeType {
	kind?: NumericTypeKinds;
	valueRange?: NumericRange;

	constructor() {
		super();
	}

	validateField(): boolean {
		return !!this.kind && numericTypeKinds.has(this.kind);
	}

	toString(): string {
		return `${this.kind}${this.valueRange?.toString() ?? ''}`;
	}
}

// 表示字串類型的類別
export class StringType extends McdocType {
	lengthRange?: NumericRange;

	constructor() {
		super();
	}

	validateAttributeTypes(): boolean[] {
		return this.attributes.map((attr) => {
			return attr.name !== 'uuid';
		});
	}
	validateField(): boolean {
		return true;
	}

	toString(): string {
		return `${super.toString()}string${this.lengthRange?.toString() ?? ''}`;
	}
}

// 定義原始數組元素的可能種類集合
const primitiveArrayElementKinds = new Set(['byte', 'int', 'long'] as const);
export type PrimitiveArrayElementKind =
	typeof primitiveArrayElementKinds extends Set<infer V> ? V : never;

// 表示原始數組類型的類別，例如 'int[]'
export class PrimitiveArray extends McdocType {
	elementKind?: PrimitiveArrayElementKind;
	valueRange?: NumericRange;
	lengthRange?: NumericRange;

	constructor() {
		super();
	}

	validateAttributeTypes(): boolean[] {
		return this.attributes.map((attr) => {
			return (
				attr.name === 'uuid' &&
				this.elementKind === 'int' &&
				this.lengthRange?.min === 4 &&
				this.lengthRange?.max === 4
			);
		});
	}
	validateField(): boolean {
		return (
			!!this.elementKind && primitiveArrayElementKinds.has(this.elementKind)
		);
	}

	toString(): string {
		return `${super.toString()}${this.elementKind}${
			this.valueRange?.toString() ?? ''
		}[]${this.lengthRange?.toString() ?? ''}`;
	}
}

// 表示列表類型的類別，例如 '[Type]'
export class ListType extends NoAttributeType {
	elementType: McdocType;
	lengthRange?: NumericRange;

	constructor() {
		super();
		this.elementType = new AnyType();
	}

	validateField(): boolean {
		return !!this.elementType;
	}

	toString(): string {
		return `[${this.elementType?.toString() ?? '??'}]${
			this.lengthRange?.toString() ?? ''
		}`;
	}
}

// 表示結構體類型的類別，包含鍵值對的映射
export class StructType extends NoAttributeType {
	#name: string;
	// Key-value pairs
	mapping: [StructKey, McdocType][];

	constructor() {
		super();
		this.#name = '';
		this.mapping = [];
	}

	get name() {
		return this.#name;
	}
	set name(name: string) {
		IdentifierType.removeIdentifier(this.#name);
		IdentifierType.addIdentifier(name);
		this.#name = name;
	}

	// 當物件被移除時的處理
	onRemoved(): void {
		IdentifierType.removeIdentifier(this.#name);
	}

	validateField(): boolean {
		return true;
	}

	toString(indentLevel = 0): string {
		const nameStr = this.#name ? `${this.#name} ` : '';
		if (this.mapping.length === 0) {
			return `struct ${nameStr}{}`;
		}
		return (
			'  '.repeat(indentLevel) +
			`struct ${nameStr}{\n` +
			'  '.repeat(indentLevel + 1) +
			this.mapping
				.map(([k, v]) => `${k.toString()}: ${v.toString()}`)
				.join(',\n') +
			'\n' +
			'  '.repeat(indentLevel) +
			'}'
		);
	}
}

// 表示結構體中的鍵
export class StructKey {
	isDynamic: boolean;
	name: string;
	dynamicKey: StringType;

	constructor() {
		this.isDynamic = false;
		this.name = '';
		this.dynamicKey = new StringType();
	}

	// 驗證鍵的有效性
	validate(): boolean {
		return this.isDynamic || !!this.name;
	}

	// 將鍵轉為字串的方法
	toString(): string {
		if (this.isDynamic) {
			return `[${this.dynamicKey.toString()}]`;
		}
		return this.name || '??';
	}
}

// 表示聯合類型的類別，包含多個類型的集合
export class UnionType extends NoAttributeType {
	contents: McdocType[];

	constructor() {
		super();
		this.contents = [];
	}

	validateField(): boolean {
		return true;
	}

	toString(indentLevel = 0): string {
		if (this.contents.length === 0) {
			return '()';
		}
		return (
			'  '.repeat(indentLevel) +
			'(\n' +
			'  '.repeat(indentLevel + 1) +
			this.contents.map((v) => v.toString()).join(' |\n') +
			'\n' +
			'  '.repeat(indentLevel) +
			')'
		);
	}
}

// 管理標識符類型的類別，用於引用其他定義的類型
export class IdentifierType extends NoAttributeType {
	static #occurrences = new Map<string, number>();
	static addIdentifier(identifier: string): void {
		if (identifier) {
			const occurrence = this.#occurrences.get(identifier) ?? 0;
			this.#occurrences.set(identifier, occurrence + 1);
		}
	}
	static removeIdentifier(identifier: string): void {
		if (identifier) {
			const occurrence = this.#occurrences.get(identifier)!;
			if (occurrence > 1) {
				this.#occurrences.set(identifier, occurrence - 1);
			} else {
				this.#occurrences.delete(identifier);
			}
		}
	}
	static hasIdentifier(identifier: string): boolean {
		return this.#occurrences.has(identifier);
	}
	static get identifiers(): string[] {
		return [...this.#occurrences.keys()];
	}

	// Struct / enum name
	// Enum is not implemented
	identifier: string;

	constructor() {
		super();
		this.identifier = '';
	}

	// TODO: vaildate vanilla-mcdoc reference type
	validateField(): boolean {
		return (
			!!this.identifier &&
			(IdentifierType.#occurrences.get(this.identifier) === 1 ||
				this.identifier.startsWith('::java::'))
		);
	}

	toString(): string {
		return `${this.identifier}`;
	}
}

// 表示索引類型的類別，用於調度
export class IndexedType extends NoAttributeType {
	// Dispatcher name, e.g. mcdoc:custom_data
	dispatcher: string;
	index: IndexKey;

	constructor() {
		super();
		this.dispatcher = '';
		this.index = new IndexKey();
	}

	validateField(): boolean {
		return isResourceLocation(this.dispatcher);
	}

	toString(): string {
		return `${this.dispatcher}[${this.index.toString()}]`;
	}
}

// 表示索引鍵的類別，用於指定調度的索引
export class IndexKey {
	// The extra pair of [] is generated according to this property
	isDynamic: boolean;
	// Literal string
	staticKey: string;
	// Accepted magic words: %fallback, %key, %parent (indicating path)
	dynamicKey: string;

	constructor() {
		this.isDynamic = false;
		this.staticKey = '';
		this.dynamicKey = '';
	}

	validate(): boolean {
		return (
			(this.isDynamic && !!this.dynamicKey) ||
			(!this.isDynamic && !!this.staticKey)
		);
	}

	toString(): string {
		return this.isDynamic
			? `[${this.dynamicKey ?? '%fallback'}]`
			: `${this.staticKey ?? '[%fallback]'}`;
	}
}
