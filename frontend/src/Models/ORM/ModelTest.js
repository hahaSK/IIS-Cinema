import { createStore } from "redux";
import { createReducer, ORM } from "redux-orm";

import { proxyClassForORM } from "./Utils";

/**
 * Abstract class for testing entities
 */
export default class ModelTest
{
	/**
	 * ModelTest constructor.
	 *
	 * @param {Object} entities
	 */
	constructor(...entities)
	{
		/**
		 * @type {Store}
		 */
		this.store = null;

		if (ModelTest.shouldSkip())
		{
			const orm = new ORM();
			//orm.register(...entities); // until proxy is needed we use following register:
			orm.register(...entities.map(entity => proxyClassForORM(entity)));

			const ormReducer = createReducer(orm);
			const reducer = (state, action) =>
			{
				if (action.type === "RESET") {
					return ormReducer(undefined, action);
				}
				return ormReducer(state, action);
			};
			this.store = createStore(reducer);


			afterEach(() =>
			{
				this.store.dispatch({ type: "RESET" });
			});


			describe(this.constructor.name.replace(/Test$/, "") + " entity", () =>
			{
				// run test suite
				this.test(this.store);
			});
		}
	}


	/**
	 * Abstract method for test itself
	 *
	 * @param {Store} store
	 */
	test(store)
	{
	}


	/**
	 * Indicates wheather this test should be skipped.
	 *
	 * @returns {boolean}
	 */
	static shouldSkip()
	{
		return !("skipImportedTests" in global) || !global.skipImportedTests;
	}


	static importTests(callback)
	{
		let skip = ModelTest.skipImportedTests();
		let res = callback();
		ModelTest.restoreSkipValue(skip);
		return res;
	}


	/**
	 * @returns {bool|null}
	 */
	static skipImportedTests()
	{
		let skip = "skipImportedTests" in global ? global.skipImportedTests : null;
		global.skipImportedTests = true;
		return skip;
	}


	/**
	 * @param {bool} skip
	 */
	static restoreSkipValue(skip)
	{
		global.skipImportedTests = skip;
	}
}
