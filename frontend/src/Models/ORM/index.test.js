import orm from "./index";

describe("model test", () =>
{
	it("test creating schema", () =>
	{
		const emptyDBState = orm.getEmptyState();
		expect(emptyDBState).toBeInstanceOf(Object);
	});
});
