// @flow

export function proxyClassForORM(klass: Function)
{
	return new Proxy(klass, {
		apply(target, thisArg, rest) {
			return new target(...rest);
		}
	});
}
