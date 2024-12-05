import { isResourceLocation } from './util';
import { type McdocType, AnyType } from './types';

// 表示一個調度語句的類別，用於將特定鍵映射到目標類型
export class DispatchStatement {
	dispatcher: string;
	// Accepted magic words: %unknown, %none
	keys: string[];
	targetType: McdocType;

	constructor() {
		this.dispatcher = '';
		this.keys = [];
		this.targetType = new AnyType();
	}

	// 驗證調度語句的方法
	validate(): boolean {
		return isResourceLocation(this.dispatcher);
	}

	// 將調度語句轉為字串的方法
	toString(): string {
		const keysStr = this.keys.length > 0 ? this.keys.join(', ') : '%unknown';
		return `dispatch ${
			this.dispatcher
		}[${keysStr}] to ${this.targetType.toString()}`;
	}
}
