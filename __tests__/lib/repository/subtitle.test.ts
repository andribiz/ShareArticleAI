import {
  create,
  getItemByJobId,
  updateJobId,
  updateStateByJobID,
} from "@/lib/repository/subtitle";
/**
 * @jest-environment jsdom
 */
describe.skip("Subtitle library", () => {
  it("should call create subtitle record", async () => {
    const res = await create("A", "1928341234", "1", "IN_QUEUE");
    expect(res).toBeDefined();
    console.log(res);
  });
  it("should call update subtitle record", async () => {
    const res = await updateJobId("A", "1928341234", "2");
    expect(res).toBeDefined();
    console.log(res);
  });
  it("should query by jobId", async () => {
    const res = await getItemByJobId("2");
    expect(res).toBeDefined();
    console.log(res.Items![0].PK);
  });
  it("should update state by jobId", async () => {
    const res = await updateStateByJobID("2", "IN_PROGRESS");
    expect(res).toBeDefined();
    expect(res.Attributes).toBeDefined();
    expect(res.Attributes!.state).toBe("IN_PROGRESS");
    console.log(res.Attributes!.state);
  });
});
